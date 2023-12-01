import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import PanelOfMineWeather from './components/Panels/PanelOfMineWeather'
import searchCityMethod from './methods/methods'
import {
  paramsCoordForFetch,
  paramsSearchCityForFetch,
} from './components/Const/const'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      city: '',
      dataWeather: {},
      error: false,
      isLoading: false,
      waitingGeolocationPermissionUser: false,
      messageError: '',
      units: 'metric',
      lang: 'ru',
    }
    this.searchCity = this.searchCity.bind(this)
    this.enterCity = this.enterCity.bind(this)
    this.searchCoordUser = this.searchCoordUser.bind(this)
    this.switchPermissionStatusState =
      this.switchPermissionStatusState.bind(this)
  }

  enterCity = (inputCityFromUser) => {
    this.setState({
      city: inputCityFromUser,
    })
  }

  searchCity = () => {
    !this.state.isLoading && this.setState({ isLoading: true })
    searchCityMethod(paramsSearchCityForFetch(this.state)).then((res) => {
      if (res.data === 'error') {
        this.setErrorToState(res.message)
      } else {
        this.setState({
          dataWeather: res.data,
          isLoading: false,
          messageError: '',
          error: false,
        })
      }
    })
  }

  setErrorToState = (message) => {
    this.setState({
      error: true,
      isLoading: false,
      messageError: message,
    })
  }

  wrapperSearchCityMehod = () => {}

  switchPermissionStatusState = (PermissionStatus) => {
    if ('granted' === PermissionStatus.state) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ isLoading: true })
        searchCityMethod(paramsCoordForFetch(position, this.state))
          .then((res) => {
            this.setState({
              dataWeather: res.data,
              isLoading: false,
              messageError: '',
            })
          })
          .catch((error) => {
            this.setErrorToState(error.response.data.message)
          })
      })
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  searchCoordUser = () => {
    // сделать отдельный granted и decide
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((PermissionStatus) => {
        if ('prompt' === PermissionStatus.state) {
          navigator.geolocation.getCurrentPosition(() => {})
          PermissionStatus.onchange = () => {
            this.switchPermissionStatusState(PermissionStatus)
          }
        } else if ('granted' === PermissionStatus.state) {
        }
      })
  }

  render() {
    let state = this.state
    return (
      <div className="App">
        <main>
          <Header />
          <PanelOfMineWeather
            data={state.dataWeather}
            searchCity={this.searchCity}
            enterCity={this.enterCity}
            searchCoordUser={this.searchCoordUser}
            isLoading={state.isLoading}
            messageError={state.messageError}
          />
        </main>
      </div>
    )
  }
}

export default App
