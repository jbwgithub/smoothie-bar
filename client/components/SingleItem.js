import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedItem} from '../store/item'
import {addToCart} from '../store/order'
import {Link} from 'react-router-dom'

//local storage
import {me} from '../store/user'

export class SingleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      toggleOn: false,
      changeView: true
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.changeAdd = this.changeAdd.bind(this)
  }

  componentDidMount() {
    this.props.getSelectedItem(this.props.match.params.id)
  }

  handleAddToCart(event) {
    event.preventDefault()
    this.changeAdd()
    if (!this.props.user.id) {
      let valObj = JSON.parse(localStorage.getItem('cart')) || {}
      valObj[this.props.item.id] = this.state.quantity
      localStorage.setItem('cart', JSON.stringify(valObj))
    } else {
      this.props.addToCart(
        this.props.match.params.id,
        this.state.quantity,
        this.props.item.price
      )
    }
    this.changeAdd()
  }

  async changeAdd() {
    await this.setState({
      changeView: false
    })
  }

  handleChange(event) {
    this.setState({quantity: Number(event.target.value)})
  }

  handleDescription() {
    this.setState({
      toggleOn: !this.state.toggleOn
    })
  }

  render() {
    const {name, description, price, imageUrl, stock, region} = this.props.item
    return (
      <div id="singleItem">
        <p>{name}</p>
        <img src={imageUrl} width={200} />
        <p>
          <button type="submit" onClick={this.handleDescription}>
            Learn More
          </button>
          {this.state.toggleOn ? <p>{description}</p> : null}
        </p>
        <p>Country Of Origin: {region}</p>
        <p>
          Price: ${price / 100}
          <label id="quanColor">
            Quantity
            <select value={this.state.quantity} onChange={this.handleChange}>
              <option value={0}>Choose quantity</option>
              <option value={1}>Qty 1</option>
              <option value={2}>Qty 2</option>
              <option value={3}>Qty 3</option>
              <option value={4}>Qty 4</option>
            </select>
          </label>
        </p>

        {this.state.changeView ? (
          <button type="button" id="addButton" onClick={this.handleAddToCart}>
            <img
              src="https://t4.ftcdn.net/jpg/00/26/12/45/240_F_26124567_sPp9oby9DAjrDlnqZ6iSEriV4DJbWMZF.jpg"
              width={100}
            />
          </button>
        ) : (
          <button type="button" id="cartButton">
            <p>
              <Link to="/cart">
                <img
                  src="https://t3.ftcdn.net/jpg/00/30/30/64/240_F_30306492_54Fq37acp3NBQHlfSkQ1WQrpBS2yyOyt.jpg"
                  width={100}
                />
              </Link>
            </p>
            <p>
              <Link to="/catalog">
                <img
                  src="https://funwithcomposers.com/wp-content/uploads/continue_shopping.png"
                  width={100}
                />
              </Link>
            </p>
          </button>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  item: state.item.item,
  user: state.user
})
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    addToCart: (id, price, quantity) =>
      dispatch(addToCart(id, price, quantity)),
    me: () => dispatch(me())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
