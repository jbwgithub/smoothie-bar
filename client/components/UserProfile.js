import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {Link} from 'react-router-dom'
import UpdateUser from './UpdateUser'

export class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      isToggleOn: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.me()
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    })
  }

  render() {
    console.log(this.props)
    return (
      <div id="personWelcome">
        <h3>Welcome back {this.props.user.email}</h3>

        <p>
          <h3>
            View Order History
            <Link to="/orders">My Orders</Link>
          </h3>
        </p>
        <p>
          <button onClick={this.handleClick}>Update Your Profile</button>
          {this.state.isToggleOn ? <UpdateUser user={this.props.user} /> : null}
        </p>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
