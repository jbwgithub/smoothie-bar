import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyOrders} from '../store/order'
import Item from './Item'

export class MyOrders extends Component {
  componentDidMount() {
    this.props.getMyOrders()
  }
  render() {
    let date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '/')
    return (
      <div>
        {this.props.order.map(order => {
          return (
            <div key={order.id} id="orders">
              <h3>Order Status: {order.status}</h3>
              {order.items ? (
                <div className="allItems">
                  {order.items.map(item => {
                    return (
                      <div key={item.id}>
                        <h3>
                          Original Purchase Price: ${item.itemOrders
                            .purchasePrice / 100}
                        </h3>
                        <Item key={item.id} item={item} />
                      </div>
                    )
                  })}
                </div>
              ) : null}
              <h3>Order Total: ${order.total / 100}</h3>
              <h3>Date of Purchased :{date}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  order: state.order.myOrders
})
const mapDispatchToProps = dispatch => ({
  getMyOrders: () => dispatch(getMyOrders())
})
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
