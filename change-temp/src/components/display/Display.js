const Display = (props) => {
  function categoryTemp() {
    let categoryTempValue
    if (props.temp > 59) categoryTempValue = 'venus'
    if (props.temp > 28 && props.temp <= 59) categoryTempValue = 'hot'
    if (props.temp > 14 && props.temp <= 29) categoryTempValue = 'normal'
    if (props.temp > 4 && props.temp <= 15) categoryTempValue = 'easy'
    if (props.temp > -4 && props.temp <= 5) categoryTempValue = 'null'
    if (props.temp > -11 && props.temp <= -3) categoryTempValue = 'cool'
    if (props.temp > -30 && props.temp <= -10) categoryTempValue = 'cold'
    if (props.temp > -70 && props.temp <= -29) categoryTempValue = 'arctic'
    if (props.temp < -69) categoryTempValue = 'frozen'

    return categoryTempValue
  }

  return (
    <div className="display">
      <div className={`circleDisplayTemp-${categoryTemp()}`}>
        <h1>{props.temp}°C</h1>
      </div>
    </div>
  )
}

export default Display
