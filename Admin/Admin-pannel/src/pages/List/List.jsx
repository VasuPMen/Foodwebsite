import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import "./List.css"

export const List = ({url}) => {
  const [list, setList] = useState([]);

  const featchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await featchList();
    if(response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("error")
    }
  }

  useEffect(() => {
    featchList()
  }, [])


  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-formate">
              <img src={`${url}/images/` + item.image} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={()=>{removeFood(item._id)}}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
