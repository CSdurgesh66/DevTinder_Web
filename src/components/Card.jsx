import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeRequest } from '../Slices/RequestSlice';
import { removeFeed } from '../utils/feedSlice';

const Card = ({ data }) => {
  console.log("card data", data);

  const { _id, firstName, lastName, age, about, photoUrl, gender,skills } = data;

  const dispatch = useDispatch();

  const handleRequestSubmit = async(status,userId) =>{
    try{

      const res = await axios.post("http://localhost:3000/request/send/"+status+"/"+userId,{},{withCredentials:true});

      dispatch(removeFeed(userId));


    }catch(error){
      console.error(error);
    }
  }

  return (
    <div>

      <div className="card bg-base-100 w-96 shadow-xl">

        <div>
          <figure>
            <img className=''
              src={photoUrl}
              alt="" />
          </figure>

          <div className="card-body ">
            <h2 className="card-title ">{firstName}</h2>
            {age && gender && (
              <>
                <p>{age}</p>
                <p>{gender}</p>
              </>
            )}
            <p>{about}</p>

            <p>{skills.map(data =>{
                return (
                  <span  key={data}>{data} </span>
                )
               })}</p>

            <div className="card-actions justify-end">

              <button className="btn btn-primary" onClick={() => handleRequestSubmit("ignored",_id)}>Pass</button>
              <button className="btn btn-secondary" onClick={() => handleRequestSubmit("interested",_id)}>Interested</button>
              
            </div>

          </div>

        </div>



      </div>

    </div>
  )
}

export default Card