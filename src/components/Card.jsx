import React from 'react'

const Card = ({data}) => {

  return (
    <div>
    { data.data.map(user => (
        <div className="card bg-base-100 w-96 shadow-xl">
        
        <figure >
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>

        <div className="card-body">
            {user.firstName}
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Pass</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>

      </div>
    ))

    } 
    </div>
  )
}

export default Card