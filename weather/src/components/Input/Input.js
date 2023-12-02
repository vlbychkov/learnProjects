const InputCity = (funcs) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        funcs.searchCity()
      }}
    >
      <input
        type="text"
        placeholder="Поиск города"
        onChange={(event) => {
          funcs.enterCity(event.target.value)
        }}
      />
    </form>
  )
}

export default InputCity
