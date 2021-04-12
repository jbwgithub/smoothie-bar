import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import {checkOut} from '../store/order'

// Local Storage
import axios from 'axios'
import {getSelectedItem} from '../store/item'
import {me} from '../store/user'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
      guestSubtotal: 0
    }
    this.handleToken = this.handleToken.bind(this)
  }
  async componentDidMount() {
    if (!this.props.user.id) {
      await this.getItemsFromLS()
      await this.updateStock()
    }
  }

  async getItemsFromLS() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let subtotal = 0
    const newItemList = []
    // eslint-disable-next-line guard-for-in
    for (let itemId in cart) {
      let {data} = await axios.get(`/api/items/${itemId}`)
      data.quantity = cart[itemId]
      data.total = data.price * data.quantity
      newItemList.push(data)
      subtotal += data.total
    }
    this.setState({
      ...this.state,
      itemList: newItemList,
      guestSubtotal: subtotal
    })
  }

  async updateStock() {
    let cart = JSON.parse(localStorage.getItem('cart'))

    // eslint-disable-next-line guard-for-in
    for (let itemId in cart) {
      let {data} = await axios.put(`/api/items/${itemId}`, {
        quantity: cart[itemId]
      })
    }
    localStorage.removeItem('cart')
  }

  handleToken(token) {
    console.log(this.props)
    const cartTotal =
      this.props.cart.total || this.state.guestSubtotal.toFixed(2) / 100
    this.props.checkOut(token, cartTotal)
  }

  render() {
    const cartTotal =
      this.props.cart.total || this.state.guestSubtotal.toFixed(2) / 100
    return (
      <div className="checkout">
        {this.props.user.id ? (
          <div>
            <h1>Case of Whiskey for my boys:</h1>
            <h3>Total Price · ${cartTotal / 100} </h3>
          </div>
        ) : (
          <div className="checkout">
            <h1>Your order is on the way</h1>

            <h2>
              Total price of cart {this.state.guestSubtotal.toFixed(2) / 100}
            </h2>
          </div>
        )}
        <StripeCheckout
          stripeKey="pk_test_QKVl0gcbzP4rkY2ona3fa7Up00It2MIOSj"
          token={this.handleToken}
          amount={cartTotal}
          billingAddress
          shippingAddress
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.order.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    me: () => dispatch(me()),
    checkOut: (token, cartTotal) => dispatch(checkOut(token, cartTotal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
