import React from 'react'

export default function Numpad(props) {
  const handleClick = (e) => {
    e.preventDefault()
    props.setEquation(props.equation.concat(e.target.value))
  }

  const handleClear = (e) => {
    e.preventDefault()
    props.setEquation('')
  }

  return (
    <div>
      <button onClick={handleClear}>Clear</button>
      <button value='(' onClick={handleClick}>(</button>
      <button value=')' onClick={handleClick}>)</button>
      <button value='1' onClick={handleClick}>1</button>
      <button value='2' onClick={handleClick}>2</button>
      <button value='3' onClick={handleClick}>3</button>
      <button value='+' onClick={handleClick}>+</button>
      <button value='4' onClick={handleClick}>4</button>
      <button value='5' onClick={handleClick}>5</button>
      <button value='6' onClick={handleClick}>6</button>
      <button value='-' onClick={handleClick}>-</button>
      <button value='7' onClick={handleClick}>7</button>
      <button value='8' onClick={handleClick}>8</button>
      <button value='9' onClick={handleClick}>9</button>
      <button value='*' onClick={handleClick}>*</button>
      <button value='.' onClick={handleClick}>.</button>
      <button value='0' onClick={handleClick}>0</button>
      <button value='/' onClick={handleClick}>/</button>
    </div>
  )
}
