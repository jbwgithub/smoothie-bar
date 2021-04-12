import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const GET_SELECTED_ITEM = 'GET_SELECTED_ITEM'

/**
 * INITIAL STATE
 */
const defaultItemList = {items: [], item: {}}

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})
const getItem = item => ({type: GET_SELECTED_ITEM, item})

/**
 * THUNK CREATORS
 */
export const getAllItems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/items')
    dispatch(getItems(data || defaultItemList))
  } catch (err) {
    console.error(err)
  }
}

export const getSelectedItem = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items/${id}`)
    dispatch(getItem(data || defaultItemList))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultItemList, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, items: action.items}
    case GET_SELECTED_ITEM:
      return {...state, item: action.item}
    default:
      return state
  }
}
