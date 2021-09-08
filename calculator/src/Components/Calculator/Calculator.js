import React from 'react'
import { useState } from 'react'
import Numpad from '../Numpad/Numpad'

export default function Input() {
  const [equation, setEquation] = useState('')
  // useState to control equation inside of the Input

  const handleChange = (e) => {
    setEquation(`${e.target.value}`)
  }

  return (
    <form>
      <label>
        Enter Equation:
        <input type='text' id='calculator-input' value={equation} onChange={handleChange}></input>
      </label>
      <Numpad equation={equation} setEquation={setEquation} />
    </form>
  )
}
