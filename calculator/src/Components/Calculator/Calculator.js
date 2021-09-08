import React from 'react'
import { useState } from 'react'
import Numpad from '../Numpad/Numpad'
import './Calculator.css'

export default function Input() {
  const [equation, setEquation] = useState('')
  // useState to control equation inside of the Input

  const handleChange = (e) => {
    setEquation(`${e.target.value}`)
  }

  const calculate = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
  }

  return (
    <form id='calculator' onSubmit={calculate}>
      <label>
        Enter Equation:
        <input type='text' id='calculator-input' value={equation} onChange={handleChange} autoFocus></input>
      </label>
      <button type='submit' value={equation}>Calculate</button>
      <Numpad equation={equation} setEquation={setEquation} />
    </form>
  )
}
