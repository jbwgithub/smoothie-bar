import React from 'react'
import {Link} from 'react-router-dom'

export default function Item({item}) {
  return (
    <div className="itemAll">
      <Link to={`/catalog/${item.id}`}>
        <h1>{item.name}</h1>
        <p>
          <img src={item.imageUrl} width={100} />
        </p>
      </Link>
    </div>
  )
}
