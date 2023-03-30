import React, { Component, useEffect } from 'react'
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'

function App() {

function getRandomNumbers() {
  const newArray = []
  for(let i = 0; i < 10 ; i++) {
    newArray.push(generateNewNum())
  }
  return newArray
}
function generateNewNum() {
const image = ["one.png","two.png", "three.png","four.png"]

  const randomNumber = Math.floor(Math.random() * 4)

  return {
    value:image[randomNumber],
    id: nanoid(4),
    isHeld: false
    
  }

}

const [die, setDie] = React.useState(getRandomNumbers())
const [tenize,setTenize] = React.useState(false)
const [count, setCount] = React.useState(0)
React.useEffect(() => {
   const allHeld = die.every(die => die.isHeld)
   const firstValue = die[0].value
   const allSameNum = die.every(die => firstValue === die.value)

   if(allHeld && allSameNum) {
    setTenize(true)
   }
},[die])



const dieElements =  die.map(die => <Die key = {die.id}
   value = {die.value}
   clicked = {() => holdDie(die.id)}
   isHeld = {die.isHeld} />)

function holdDie(id) {
  setDie(prevState => prevState.map(die => {
    return die.id === id ? {
      ...die, 
      isHeld : !die.isHeld
    } : die
  }))
}
function rollDice() {
  if(!tenize){
    setDie(prevState => prevState.map(die => {
      return die.isHeld? die : generateNewNum()
    }))
    setCount(prevState => prevState + 1)



  } else {
    setTenize(false)
    setDie(getRandomNumbers())
    setCount(0)
    setSeconds(0)
  }



}

const [seconds, setSeconds] = React.useState(0)

React.useEffect (() => {
if(!tenize) {
  const interval = setInterval(() => {
    setSeconds(prevSec => prevSec + 1)
  }, 1000)
   return () => clearInterval(interval)
}


}, [tenize])


localStorage.setItem('time', JSON.stringify(seconds))
JSON.parse(localStorage.getItem('time'))




  return (
    <main>

      <h1> Number of Roll: {tenize? 0:count} </h1>
      <p> Seconds: {seconds}</p>
      <div className='die-container'>
{dieElements}


      </div>

      <button onClick={rollDice}>{tenize? "New Game" :"Roll"}</button>


    </main>
  );
}

export default App;
