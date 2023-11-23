import React from 'react'
import { FaSearchLocation, FaRegCompass } from 'react-icons/fa'
import InputCity from '../Input/Input'
import DispalyTemp from '../Display/DispalyTemp'
import Wrapper from '../Loading/Wrapper'

class PanelOfMineWeather extends React.Component {
  isLoadingOrError = () => {
    if (this.props.messageError) {
      if (this.props.messageError === 'city not found') {
        return <Wrapper text="Ошибка. Такой город не найден. Введите другой." />
      } else if (this.props.messageError === 'Nothing to geocode') {
        return <Wrapper text="Ошибка. Вы не ввели город." />
      }
    } else if (this.props.isLoading) {
      return <Wrapper text="Loading..." />
    } else if (Object.entries(this.props.data).length) {
      return <DispalyTemp data={this.props.data} />
    } else {
      return <Wrapper text="Введите город или используйте Геолокацию" />
    }
  }
  render() {
    return (
      <div>
        <div>
          <InputCity enterCity={this.props.enterCity} />
          <FaSearchLocation onClick={this.props.searchCity} />
          <FaRegCompass />
        </div>
        <div>{this.isLoadingOrError()}</div>
      </div>
    )
  }
}

export default React.memo(PanelOfMineWeather)
