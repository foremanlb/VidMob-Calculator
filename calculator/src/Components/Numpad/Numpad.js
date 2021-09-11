import React from 'react'
import './Numpad.css'

export default function Numpad(props) {
  const handleClick = (e) => {
    e.preventDefault()
    props.setEquation(props.equation.concat(e.target.value))
    e.target.blur()
  }

  const handleClear = (e) => {
    e.preventDefault()
    props.setEquation('')
    e.target.blur()
  }

  return (
    <div id='numpad'>
      <div id='numpad-grid'>
        <button className='numpad-buttons' id='clear' onClick={handleClear}>Clear</button>
        <button className='numpad-buttons' value='(' onClick={handleClick}>(</button>
        <button className='numpad-buttons' value=')' onClick={handleClick}>)</button>
        <button className='numpad-buttons' value='1' onClick={handleClick}>1</button>
        <button className='numpad-buttons' value='2' onClick={handleClick}>2</button>
        <button className='numpad-buttons' value='3' onClick={handleClick}>3</button>
        <button className='numpad-buttons' value='+' onClick={handleClick}>+</button>
        <button className='numpad-buttons' value='4' onClick={handleClick}>4</button>
        <button className='numpad-buttons' value='5' onClick={handleClick}>5</button>
        <button className='numpad-buttons' value='6' onClick={handleClick}>6</button>
        <button className='numpad-buttons' value='-' onClick={handleClick}>-</button>
        <button className='numpad-buttons' value='7' onClick={handleClick}>7</button>
        <button className='numpad-buttons' value='8' onClick={handleClick}>8</button>
        <button className='numpad-buttons' value='9' onClick={handleClick}>9</button>
        <button className='numpad-buttons' value='*' onClick={handleClick}>*</button>
        <button className='numpad-buttons' value='.' onClick={handleClick}>.</button>
        <button className='numpad-buttons' value='0' onClick={handleClick}>0</button>
        <button className='numpad-buttons' id='divide' value='/' onClick={handleClick}>/</button>
      </div>
    </div>
  )
}
