import Button from './button/Button'
import Display from './display/Display'

const BlockPanelTemp = (props) => {
  return (
    <div className="blockPanel">
      <Display temp={props.temp} />
      <div className="blockPanelButton">
        {props.arrButtonValue.map((value, key) => (
          <Button func={props.funcs[key]} valueText={value} key={key} />
        ))}
      </div>
    </div>
  )
}

export default BlockPanelTemp
