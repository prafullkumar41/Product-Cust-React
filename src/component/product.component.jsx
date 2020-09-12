import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';



export default function Product(props) {
    const {product, order} = props
    const [indproduct, setindproduct] = useState([])


    useEffect( () => {
        
        if  (product && order) {
            var ID = order.id
            setindproduct(product.filter((data) => data.order === ID))
        }
    },[product, order])

    const quantityChange = data => evt =>{
        props.quantityChange(data)
    }

    return (
        <div className='product-details'>
            {  
                indproduct && indproduct.map( prod => {
                    return ( <h3 key = {prod.id} 
                                className='prod-item'
                    > {prod.product_name}  Quantity: {prod.quantity}
                    <FontAwesomeIcon icon={faEdit} className='icon' onClick={quantityChange(prod)}/></h3>  
                    )     
                })
    
            }
        </div>
    )
}
