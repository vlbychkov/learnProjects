import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import PanelOfMineWeather from './components/Panels/PanelOfMineWeather'
import searchCityMethod from './methods/methods'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      city: '',
      dataWeather: {},
      error: false,
      isLoading: false,
      messageError: '',
      units: 'metric',
      lang: 'ru',
    }
    this.searchCity = this.searchCity.bind(this)
    this.enterCity = this.enterCity.bind(this)
  }

  //   navigator.permissions
  //     .query({ name: 'geolocation' })
  //     .then((PermissionStatus) => {
  //       if (
  //         'granted' === PermissionStatus.state ||
  //         'prompt' === PermissionStatus.state
  //       ) {
  //         navigator.geolocation.getCurrentPosition((position) => {
  //           this.setState({ isLoading: true })

  //           searchCityMethod({
  //             url: process.env.REACT_APP_BASE_URL,
  //             params: {
  //               appid: process.env.REACT_APP_API,
  //               lat: position.coords.latitude,
  //               lon: position.coords.longitude,
  //             },
  //           })
  //             .then((res) => {
  //               this.setState({
  //                 city: res.data.name,
  //                 messageError: '',
  //               })
  //               this.state.city && this.searchCity()
  //             })
  //             .catch((error) => {
  //               this.setErrorToState(error.response.data.message)
  //             })
  //         })
  //       } else {
  //         this.setState({
  //           isLoading: false,
  //         })
  //       }
  //     })

  enterCity = (inputCityFromUser) => {
    this.setState({
      city: inputCityFromUser,
    })
  }

  searchCity = () => {
    !this.state.isLoading && this.setState({ isLoading: true })
    searchCityMethod({
      url: process.env.REACT_APP_BASE_URL,
      params: {
        appid: process.env.REACT_APP_API,
        q: this.state.city,
        lang: this.state.lang,
        units: this.state.units,
      },
    }).then((res) => {
      if (res.data === 'error') {
        this.setErrorToState(res.message)
      } else {
        this.setState({
          dataWeather: res.data,
          isLoading: false,
          messageError: '',
        })
      }
    })
  }

  setErrorToState = (message) => {
    this.setState({
      error: true,
      // isLoading: false,
      messageError: message,
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
            isLoading={state.isLoading}
            messageError={state.messageError}
          />
        </main>
      </div>
    )
  }
}

export default App
