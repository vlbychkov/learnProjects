import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Weather</h1>
      </div>
    )
  }
}

export default React.memo(Header)
