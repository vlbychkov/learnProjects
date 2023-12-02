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
    this.wrapperForFetchWeatherWithCoords =
      this.wrapperForFetchWeatherWithCoords.bind(this)
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
          waitingGeolocationPermissionUser: false,
        })
      }
    })
  }

  setErrorToState = (message) => {
    this.setState({
      error: true,
      isLoading: false,
      messageError: message,
      waitingGeolocationPermissionUser: false,
    })
  }

  wrapperForFetchWeatherWithCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ isLoading: true })
      this.setState({ waitingGeolocationPermissionUser: false })

      searchCityMethod(paramsCoordForFetch(position, this.state))
        .then((res) => {
          this.setState({
            dataWeather: res.data,
            isLoading: false,
            messageError: '',
            error: false,
            waitingGeolocationPermissionUser: false,
          })
        })
        .catch((error) => {
          this.setErrorToState(error.response.data.message)
        })
    })
  }

  switchPermissionStatusState = (PermissionStatus) => {
    if ('granted' === PermissionStatus.state) {
      this.wrapperForFetchWeatherWithCoords()
      // сделать реакцию на блокировку разрешения местоположения
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  searchCoordUser = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((PermissionStatus) => {
        switch (PermissionStatus.state) {
          case 'prompt':
            this.setState({ waitingGeolocationPermissionUser: true })
            navigator.geolocation.getCurrentPosition(() => {})
            PermissionStatus.onchange = () => {
              this.switchPermissionStatusState(PermissionStatus)
            }
            break
          case 'granted':
            this.wrapperForFetchWeatherWithCoords()
            break
          case 'denied':
            this.setErrorToState('Error with permission geolocation')
            break
          default:
            break
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
            waitingGeolocationPermissionUser={
              state.waitingGeolocationPermissionUser
            }
          />
        </main>
      </div>
    )
  }
}

export default App
