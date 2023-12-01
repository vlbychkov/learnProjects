import React from 'react'
import { FaSearchLocation, FaRegCompass } from 'react-icons/fa'
import InputCity from '../Input/Input'
import DispalyTemp from '../Display/DispalyTemp'
import Wrapper from '../Loading/Wrapper'
import { FaInfoCircle } from 'react-icons/fa'

class PanelOfMineWeather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoOpen: false,
    }
  }
  render() {
    return (
      <div>
        <div>
          <InputCity enterCity={this.props.enterCity} />
          <FaSearchLocation onClick={this.props.searchCity} />
          <FaRegCompass
            onClick={() => {
              this.props.searchCoordUser()
            }}
          />
        </div>
        <IsLoadingOrErrorWrapper props={this.props} />
      </div>
    )
  }
}
const isLoadingOrError = (props) => {
  if (props.messageError) {
    if (props.messageError === 'city not found') {
      return <Wrapper text="Ошибка. Такой город не найден. Введите другой." />
    } else if (props.messageError === 'Nothing to geocode') {
      return <Wrapper text="Ошибка. Вы не ввели город." />
    }
  } else if (props.isLoading) {
    return <Wrapper text="Loading..." />
  } else if (Object.entries(props.data).length) {
    return <DispalyTemp data={props.data} />
  } else {
    return (
      <div>
        <Wrapper text="Введите город или используйте Геолокацию" />
        <FaInfoCircle />
      </div>
    )
  }
}
const IsLoadingOrErrorWrapper = (state) => {
  return isLoadingOrError(state.props)
}

export default React.memo(PanelOfMineWeather)
