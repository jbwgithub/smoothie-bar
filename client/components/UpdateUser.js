import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatingUser, me} from '../store/user'

class UpdateUser extends Component {
  constructor(props) {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updatingUser(this.props.user.id, this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>
              {' '}
              First name:
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </p>
          </label>

          <label>
            Last name:
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
            />
          </label>

          <label>
            <p>
              {' '}
              Email:
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </p>
          </label>

          <label>
            Password:
            <input
              type="text"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>

          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatingUser: (id, student) => dispatch(updatingUser(id, student)),
    me: () => dispatch(me())
  }
}

export default connect(null, mapDispatchToProps)(UpdateUser)
