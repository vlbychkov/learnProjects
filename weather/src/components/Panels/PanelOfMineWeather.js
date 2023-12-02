import React from 'react'
import { FaSearchLocation, FaRegCompass } from 'react-icons/fa'
import InputCity from '../Input/Input'
import DispalyTemp from '../Display/DispalyTemp'
import Wrapper from '../Loading/Wrapper'
import { FaInfoCircle } from 'react-icons/fa'
import './css/PanelOfMineWeather.css'
class PanelOfMineWeather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoOpen: false,
    }
  }
  render() {
    return (
      <div className="Mine_panel">
        <div className="box_input">
          <InputCity
            enterCity={this.props.enterCity}
            searchCity={this.props.searchCity}
          />
          <FaSearchLocation
            onClick={this.props.searchCity}
            size={20}
            className="icon_search_city"
          />
          <FaRegCompass
            size={20}
            onClick={() => {
              this.props.searchCoordUser()
            }}
            className="icon_search_coords"
          />
        </div>
        <IsLoadingOrErrorWrapper props={this.props} />
      </div>
    )
  }
}
const isLoadingOrError = (props) => {
  if (props.messageError) {
    switch (props.messageError) {
      case 'Error with permission geolocation':
        return (
          <Wrapper text="Вы не разрешили использовать Вашу геопозицию..." />
        )
      case 'city not found':
        return <Wrapper text="Ошибка. Такой город не найден. Введите другой." />
      case 'Nothing to geocode':
        return <Wrapper text="Ошибка. Вы не ввели город." />

      default:
        return <Wrapper text="Ой, неожиданная ошибка..." />
    }
  } else if (props.waitingGeolocationPermissionUser) {
    return (
      <Wrapper text="Разрешите использовать вашу Геопозицию,иначе не сможем Вас найти" />
    )
  } else if (props.isLoading) {
    return <Wrapper text="Loading..." />
  } else if (Object.entries(props.data).length) {
    return <DispalyTemp data={props.data} />
  } else {
    return (
      <div>
        <Wrapper text="Введите город или используйте Геолокацию" />
        <FaInfoCircle size={20} />
      </div>
    )
  }
}
const IsLoadingOrErrorWrapper = (state) => {
  return isLoadingOrError(state.props)
}

export default React.memo(PanelOfMineWeather)
