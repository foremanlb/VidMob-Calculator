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
    }
    while (newAnswer.search(/[()]/g) !== -1) {
      //Currently only accounts for a single nested equation, need to modify to accommodate multiple nests.
      if (newAnswer.includes(')') === false) {
        newAnswer = newAnswer.replace('(', '')
      } else if (newAnswer.includes('(') === false) {
        newAnswer = newAnswer.replace(')', '')
      } else if (newAnswer.match(/[(]/g).length !== newAnswer.match(/[)]/g).length) {
        newAnswer = '*/+-'
        //Forces Syntax Error based on incomplete nests.
      } else if (newAnswer.includes(')(')) {
        newAnswer = newAnswer.replaceAll(')(', ')*(')
        //treats nested equations with no operator between them as being multiplied, per standard mathematics.
      } else {
        let startParentheses = newAnswer.indexOf('(')
        while (newAnswer.indexOf('(', startParentheses + 1) < newAnswer.indexOf(')') && newAnswer.indexOf('(', startParentheses + 1) !== -1) {
          startParentheses = newAnswer.indexOf('(', startParentheses + 1)
        }
        const endParentheses = newAnswer.indexOf(')')
        const nestedEquation = newAnswer.slice(startParentheses + 1, endParentheses)
        const nestedAnswer = operations(nestedEquation).toString()
        //Runs equations for the nested equation first, then will replace all, including (), with answer and run full equation.
        newAnswer = newAnswer.replace(`(${nestedEquation})`, nestedAnswer)
      }
    }
    newAnswer = operations(newAnswer)
    setAnswer(newAnswer)
  }

  const operations = (newAnswer) => {
    if (newAnswer.search(/[A-Za-z]/) !== -1) {
      newAnswer = '*/+-'
    }
    let configured = newAnswer.split('')
    //used to break down equation into individual pieces, so that it can be re combined to accommodate parseFloat and check for syntax errors.
    for (let i = 0; i < configured.length; i++) {
      while (configured[i] === '.' && isNaN(configured[i - 1]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i - 1]}${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        configured.splice(i - 1, 1)
      }
      //Combines all decimal numbers above 1.
      while (configured[i] === '.' && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
      }
      //combines all decimal numbers below 1.
    }
    
    for (let i = 0; i < configured.length; i++) {
      if (isNaN(configured[i]) === false && isNaN(configured[i + 1]) === false) {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        i -= 1
      }
    }
//combines all remaining numbers

    for (let i = 0; i < configured.length; i++) {
      let repeat = configured[i].indexOf('.')
      if (configured[i].includes('.', repeat + 1) === true) {
        configured = '*/+-'
      }
    }
//Watches for improper decimal points

    for (let i = 0; i < configured.length; i++) {
      if (configured[i] === '-' && isNaN(configured[i + 1]) === false && isNaN(configured[i - 1]) === true && configured[i - 1] !== ')') {
        configured[i] = `${configured[i]}${configured[i + 1]}`
        configured.splice(i + 1, 1)
        i -= 1
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
              console.log(configured)
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
      <h2>Answer:</h2>
      <h1>{answer}</h1>
    </form>
  )
}

