import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

// Task component - represents a single todo item
export const Task = (props) => {
  const { text, createdAt } = props.task
  const date = createdAt.toString().substr(0,10)
  return(
    <li>
      <span> {text} </span>
      <span className='date'>{date}</span>
    </li>
  )
} 


Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
}