import React from 'react'

class DisplayTemp extends React.Component {
  upperFirstLetter = (string) => {
    return string[0].toUpperCase() + string.substring(1)
  }

  render() {
    let data = this.props.data

    let day = new Date()
    let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ]
    return (
      <div>
        <div>
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
            <h3>Влажность: {data.main.humidity}%</h3>
            {/* сделать отдельно */}
            <p>
              {days[day.getDay()] +
                ', ' +
                this.upperFirstLetter(
                  day.toLocaleString('default', { month: 'long' }),
                ) +
                ' ' +
                day.getDate()}
            </p>
          </div>
          <div>
            <p>{this.upperFirstLetter(data.weather[0].description)}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default React.memo(DisplayTemp)
