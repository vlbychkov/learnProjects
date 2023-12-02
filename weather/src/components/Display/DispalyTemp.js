import React from 'react'
import { changeFirstLetter } from '../../methods/methods'

class DisplayTemp extends React.Component {
  upperFirstLetter = (string) => {
    return string[0].toUpperCase() + string.substring(1)
  }

  render() {
    let data = this.props.data
    return (
      <div>
        <div>
          {/* img вынести */}
          <img
            src={
              'https://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '@2x.png'
            }
            alt=""
          />
          <h1>{Math.round(data.main.temp)}°C</h1>
          <h4>Чувствуется как {Math.round(data.main.feels_like)}</h4>
        </div>
        <div>
          <div>
            <h1>{data.name}</h1>
            {/* сделать отдельно */}
            <p>{changeFirstLetter()}</p>
          </div>
          <div>
            <p>
              {data.weather[0].description[0].toUpperCase() +
                data.weather[0].description.substring(1)}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default React.memo(DisplayTemp)
