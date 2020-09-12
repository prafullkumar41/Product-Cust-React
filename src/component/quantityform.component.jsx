import React,{useState} from 'react'



export default function Quantity(props) {

    const {quantData} = props
    const [quantity, setquantity] = useState(quantData.quantity)


    const UpdateClicked = () =>{
        console.log(quantData.id);
        fetch(`http://127.0.0.1:8000/api/product/${quantData.id}/upd_quantity/`, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({'quantity':quantity})
          })
          .then( () => getDetails())
          .catch(error => console.log(error))
    }   

    const getDetails = () => {
        fetch('http://127.0.0.1:8000/api/product/',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => props.productRefetch(res))
      .catch(err => console.log(err))

}
    return (
        <div className='product-details'>
            <label htmlFor='title'>{quantData.product_name}</label>
            <br />
            <input type='number' value={quantity} min='0' onChange={ evt => setquantity(evt.target.value) } ></input>
            <button className='button' onClick={UpdateClicked} >Update</button>
        </div>
    )
}
