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
    let newAnswer = e.target[0].value.split(" ").join("")
    if (newAnswer.search(/[A-Za-z]/) !== -1) {
      setAnswer('Invalid Input')
      return
    } else if (newAnswer.includes('(')) {
      const startParentheses = newAnswer.indexOf('(')
      const endParentheses = newAnswer.indexOf(')')
      const nestedEquation = newAnswer.slice(startParentheses + 1, endParentheses)
      const nestedAnswer = operations(nestedEquation).toString()
      newAnswer = newAnswer.replace(`(${nestedEquation})`, nestedAnswer)
    }
    newAnswer = operations(newAnswer)
    setAnswer(newAnswer)

  }

  const operations = (newAnswer) => {
    let configured = newAnswer.split('')
    for (let i = 0; i < configured.length; i++) {
      while (configured[i] === '.' && isNaN(configured[i - 1]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i - 1]}${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        configured.splice(i - 1, 1)
      }
    }
    for (let i = 0; i < configured.length; i++) {
      while (configured[i] === '.' && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
    }
    for (let i = 0; i < configured.length; i++) {
      while (isNaN(configured[i]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
    }
    for (let i = 0; i < configured.length; i++) {
      while (configured[i] === '-' && isNaN(configured[i + 1]) === false && isNaN(configured[i - 1]) === true && configured[i - 1] !== ')') {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        console.log(configured)
      }
    }
    for (let i = 0; i < configured.length; i++) {
      if (isNaN(configured[i]) === false) {
        configured[i] = parseFloat(configured[i])
        console.log(configured)
      }
    }
    for (let i = 0; i < configured.length; i++) {
      const l = i + 1
      if (isNaN(configured[i]) === true && isNaN(configured[l]) === true && configured[i].search(/[+*/-]/g) !== -1 && configured[l].search(/[+*/-]/g) !== -1) {
        configured = 'Syntax Error'
      }
    }

    for (let i = 0; i < configured.length; i++) {
      if (answer !== 'Syntax Error' && isNaN(configured[i]) === true && configured[i].match(/[*/]/g) !== null) {
        switch (configured[i]) {
          case '*':
            configured[i] = configured[i - 1] * configured[i + 1]
            configured.splice(i + 1, 1)
            configured.splice(i - 1, 1)
            i -= 1
            break
          case '/':
            configured[i] = configured[i - 1] / configured[i + 1]
            configured.splice(i + 1, 1)
            configured.splice(i - 1, 1)
            i -= 1
            break
          default:
            break;
        }
      }
    }

    for (let i = 0; i < configured.length; i++) {
      if (answer !== 'Syntax Error' && isNaN(configured[i]) === true && configured[i].match(/[-+]/g) !== null) {
        switch (configured[i]) {
          case '+':
            configured[i] = configured[i - 1] + configured[i + 1]
            configured.splice(i + 1, 1)
            configured.splice(i - 1, 1)
            i -= 1
            break
          case '-':
            configured[i] = configured[i - 1] - configured[i + 1]
            configured.splice(i + 1, 1)
            configured.splice(i - 1, 1)
            i -= 1
            break
          default:
            break;
        }
      }
    }
    return configured
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
