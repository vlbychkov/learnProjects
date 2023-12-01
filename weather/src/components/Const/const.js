export const paramsSearchCityForFetch = (props) => {
  return {
    url: process.env.REACT_APP_BASE_URL,
    params: {
      appid: process.env.REACT_APP_API,
      q: props.city,
      lang: props.lang,
      units: props.units,
    },
  }
}

export const paramsCoordForFetch = (position, props) => {
  return {
    url: process.env.REACT_APP_BASE_URL,
    params: {
      appid: process.env.REACT_APP_API,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      units: props.units,
      lang: props.lang,
    },
  }
}
