import React from 'react'
import { useState } from 'react'
import Numpad from '../Numpad/Numpad'
import './Calculator.css'

export default function Input() {
  const [equation, setEquation] = useState('')
  // useState to control equation inside of the Input
  const [answer, setAnswer] = useState('')

  const handleChange = (e) => {
    setEquation(`${e.target.value}`)
  }

  const calculate = (e) => {
    e.preventDefault()
    const newAnswer = e.target[0].value.split(" ").join("")
    if (newAnswer.search(/^[A-Za-z]/) !== -1) {
      setAnswer('Invalid Input')
    } else if (newAnswer.includes('(')) {
      const startParentheses = newAnswer.indexOf('(')
      const endParentheses = newAnswer.indexOf(')')
      const nestedEquation = newAnswer.slice(startParentheses + 1, endParentheses)
      console.log(nestedEquation)
    } else {
      const configured = newAnswer.split('')
      for (let i = 0; i < configured.length; i++) {
        while (configured[i] === '.' && isNaN(configured[i - 1]) === false && isNaN(configured[i + 1]) === false) {
          configured[i] = `${configured[i - 1]}${configured[i]}${configured[i + 1]}`
          configured.splice(i + 1, 1)
          configured.splice(i - 1, 1)
        }
      }
      for (let i = 0; i < configured.length; i++) {
        while (isNaN(configured[i]) === false && isNaN(configured[i + 1]) === false) {
          configured[i] = `${configured[i]}${configured[i + 1]}`
          configured.splice(i + 1, 1)
        }
      }
      console.log(configured)
    }
  }

  return (
    <form id='calculator' onSubmit={calculate}>
      <label>
        Enter Equation:
        <input type='text' id='calculator-input' value={equation} onChange={handleChange} autoFocus></input>
      </label>
      <button type='submit' value={equation}>Calculate</button>
      <Numpad equation={equation} setEquation={setEquation} />
      <h2>Answer:{answer}</h2>
    </form>
  )
}
