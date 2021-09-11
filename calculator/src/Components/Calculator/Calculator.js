import React from 'react'
import { useState } from 'react'
import Numpad from '../Numpad/Numpad'
import './Calculator.css'


export default function Input() {
  const [equation, setEquation] = useState('')
  // useState to control equation inside of the Input
  const [answer, setAnswer] = useState('')
  // useState to control answer display

  const handleChange = (e) => {
    setEquation(`${e.target.value}`)
  }
  //takes in values from numpad to update equation

  const calculate = (e) => {
    e.preventDefault()
    let newAnswer = e.target[0].value.split(" ").join("")
    if (newAnswer.search(/[A-Za-z]/) !== -1) {
      setAnswer('Invalid Input')
      return
    //Immediately stops function from running if equation includes letters.
    } else if (newAnswer.includes('(')) {
      //Currently only accounts for a single nested equation, need to modify to accommodate multiple nests.
      const startParentheses = newAnswer.indexOf('(')
      const endParentheses = newAnswer.indexOf(')')
      const nestedEquation = newAnswer.slice(startParentheses + 1, endParentheses)
      const nestedAnswer = operations(nestedEquation).toString()
      //Runs equations for the nested equation first, then will replace all, including (), with answer and run full equation.
      newAnswer = newAnswer.replace(`(${nestedEquation})`, nestedAnswer)
    }
    newAnswer = operations(newAnswer)
    setAnswer(newAnswer)
  }

  const operations = (newAnswer) => {
    let configured = newAnswer.split('')
    //used to break down equation into individual pieces, so that it can be re combined to accommodate parseFloat and check for syntax errors.
    for (let i = 0; i < configured.length; i++) {
      while (configured[i] === '.' && isNaN(configured[i - 1]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i - 1]}${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        configured.splice(i - 1, 1)
      }
      while (configured[i] === '.' && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
      while (isNaN(configured[i]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
    }

    for (let i = 0; i < configured.length; i++) {
      if (configured[i] === '-' && isNaN(configured[i + 1]) === false && isNaN(configured[i - 1]) === true && configured[i - 1] !== ')') {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
    }

    for (let i = 0; i < configured.length; i++) {
      const l = i + 1
      if (isNaN(configured[i]) === true && isNaN(configured[l]) === true && configured[i].search(/[+*/-]/g) !== -1 && configured[l].search(/[+*/-]/g) !== -1) {
        configured = 'Syntax Error'
      }
    }

    if (configured !== 'Syntax Error') {
      for (let i = 0; i < configured.length; i++) {
        if (isNaN(configured[i]) === false) {
          configured[i] = parseFloat(configured[i])
        }
      }
    
      for (let i = 0; i < configured.length; i++) {
        if (isNaN(configured[i]) === true && configured[i].match(/[*/]/g) !== null) {
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
      //Switch case used to allow either * or / to be run simultaneously from left to right to accommodate order of operations.

      for (let i = 0; i < configured.length; i++) {
        if (isNaN(configured[i]) === true && configured[i].match(/[-+]/g) !== null) {
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
      //Switch case used to allow either + or - to be run simultaneously from left to right to accommodate order of operations.
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

