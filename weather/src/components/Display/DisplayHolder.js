import React, { Component } from 'react'
import './css/displayHolder.css'
export default class DisplayHolder extends Component {
  render() {
    console.log(this.props.data.wind)

    return (
      <div className="Displays">
        <div>{this.props.data.wind?.speed}</div>
        <div>Humidity</div>
        <div>temp min and max</div>
        <div>pressure (* 0.75)</div>
        <div>sea level</div>
        <div>map ????</div>
      </div>
    )
  }
}
