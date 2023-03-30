import React, { Component } from 'react'


export default function Die (props) {

const style = {
    width: props.isHeld? "80px" : '',
    color: props.isHeld? "black" : ''
}


   return (
 <div style ={style}className='die' onClick={props.clicked}>
    <img  src={props.value} alt = "dice"/>
 </div>

   )
}