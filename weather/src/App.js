import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import PanelOfMineWeather from './components/Panels/PanelOfMineWeather'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      city: '',
      dataWeater: {},
      error: false,
      isLoading: false,
      messageError: '',
    }
    this.searchCity = this.searchCity.bind(this)
    this.enterCity = this.enterCity.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ isLoading: !this.state.isLoading })
      axios
        .get(
          process.env.REACT_APP_COORD_URL +
            process.env.REACT_APP_API +
            '&lat=' +
            position.coords.latitude +
            '&lon=' +
            position.coords.longitude,
        )
        .then((res) => {
          this.setState({
            city: res.data[0].name,
            isLoading: false,
            messageError: '',
          })
          this.state.city && this.searchCity()
        })
        .catch((error) => {
          this.setState({
            error: true,
            isLoading: !this.state.isLoading,
            messageError: error.response.data.message,
          })
        })
    })
  }

  enterCity = (inputCityFromUser) => {
    this.setState({
      city: inputCityFromUser,
    })
  }

  searchCity = () => {
    this.setState({ isLoading: !this.state.isLoading })
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          process.env.REACT_APP_API +
          '&q=' +
          this.state.city,
      )
      .then((res) => {
        this.setState({
          dataWeater: res.data,
          isLoading: !this.state.isLoading,
          messageError: '',
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          isLoading: !this.state.isLoading,
          messageError: error.response.data.message,
        })
      })
  }

  render() {
    let state = this.state
    return (
      <div className="App">
        <main>
          <Header />
          <PanelOfMineWeather
            data={state.dataWeater}
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
