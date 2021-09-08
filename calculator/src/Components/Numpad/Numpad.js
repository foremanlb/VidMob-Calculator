import React from 'react'

export default function Numpad(props) {
  const handleClick = (e) => {
    e.preventDefault()
    props.setEquation(props.equation.concat(e.target.value))
  }

  return (
    <div>
      <button value='1' onClick={handleClick}>1</button>
    </div>
  )
}
