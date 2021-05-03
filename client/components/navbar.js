import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Dropdown} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="plate">
      <p className="script">
        <span>Smoothie</span>
      </p>
      {/* <p className="shadow text1">Smoothie</p> */}
      <p className="shadow text2">Bar</p>
      <p className="script">
        <span>by the Lake</span>
      </p>
    </div>
    <div>
      {isLoggedIn ? (
        <div>
          <Menu inverted>
            <Menu.Item icon="bar" name="Smoothie Bar" as={Link} to="/" />
            <Menu.Item name="catalog" as={Link} to="/catalog" />
            <Menu.Menu position="right">
              <Menu.Item name="profileDropdown">
                <Dropdown icon="user" labeled className="icon">
                  <Dropdown.Menu>
                    <Dropdown.Header content={`Hello ${'User'}`} />
                    <Dropdown.Item name="profile" as={Link} to="/user/me">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item name="orders" as={Link} to="/orders">
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="logout"
                      onClick={handleClick}
                      as={Link}
                      to="/"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              <Menu.Item icon="shopping cart" as={Link} to="/cart" />
            </Menu.Menu>
          </Menu>
        </div>
      ) : (
        <div>
          <Menu>
            <Menu.Item as={Link} to="/">
              Smoothie Bar
            </Menu.Item>
            <Menu.Item name="catalog" as={Link} to="/catalog" />
            <Menu.Menu position="right">
              <Menu.Item name="profileDropdown">
                <Dropdown icon="user" labeled className="icon">
                  <Dropdown.Menu>
                    <Dropdown.Header content="Hello Guest!" />
                    <Dropdown.Item name="login" as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="signup"
                      onClick={handleClick}
                      as={Link}
                      to="/signup"
                    >
                      Signup
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

              <Menu.Item icon="shopping cart" as={Link} to="/cart" />
            </Menu.Menu>
          </Menu>
        </div>
      )}
    </div>
    {/* ) */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
