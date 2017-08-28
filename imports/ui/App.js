import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { PropTypes } from 'prop-types'

import { Tasks } from '../api/tasks.js'
import Task from './Task'

// App component - represents the whole app
class App extends Component {

  static propType = {
    tasks: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ))
  }

  handleSubmit(event) {
    event.preventDefault()

    Tasks.insert({
      text: this.refs.textInput.value,
      createdAt: new Date(), // current time
    })

    // Clear form
    this.refs.textInput.value = ''
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
              defaultValue={this.state.input}
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}


export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  }
}, App)