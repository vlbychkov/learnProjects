const InputCity = (funcs) => {
  return (
    <input
      type="text"
      placeholder="Search for place"
      onChange={(ev) => funcs.enterCity(ev.target.value)}
    />
  )
}

export default InputCity
