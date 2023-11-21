import BlockPanelTemp from './components/blockPanelTemp'
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      temp: 25,
      arrButtonValue: ['+', '-'],
    }

    this.plusTemp = this.plusTemp.bind(this)
    this.minusTemp = this.minusTemp.bind(this)
  }

  render() {
    let state = this.state
    return (
      <div className="App">
        <BlockPanelTemp
          temp={state.temp}
          funcs={[this.plusTemp, this.minusTemp]}
          arrButtonValue={state.arrButtonValue}
        />
      </div>
    )
  }

  plusTemp() {
    this.setState({
      temp: this.state.temp + 1,
    })
  }

  minusTemp() {
    if (this.state.temp > -273) {
      this.setState({
        temp: this.state.temp - 1,
      })
    }
  }
}

export default App
