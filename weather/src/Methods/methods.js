import axios from 'axios'

async function searchCityMethod(props) {
  try {
    const response = await axios.get(props.url, { params: props.params })
    return response
  } catch (error) {
    return { data: 'error', message: error.response.data.message }
  }
}

export const changeFirstLetter = () => {
  let replacingLastLetter = (string) => {
    if (string === 'март' || string === 'август') {
      return string.replace('ь', 'а')
    } else {
      return string.replace('ь', 'я')
    }
  }
  let upperFirstLetter = (string) => {
    string = replacingLastLetter(string)
    return string[0].toUpperCase() + string.substring(1)
  }
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
    days[day.getDay()] +
    ', ' +
    day.getDate() +
    ' ' +
    upperFirstLetter(day.toLocaleString('default', { month: 'long' }))
  )
}

export default searchCityMethod
