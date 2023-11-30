import axios from 'axios'

async function searchCityMethod(props) {
  try {
    const response = await axios.get(props.url, { params: props.params })
    return response
  } catch (error) {
    return { data: 'error', message: error.response.data.message }
  }
}

export default searchCityMethod
