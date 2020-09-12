import React,{useEffect,useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons';
import Customer from './component/customer.comoponent';
import OrderDetails from './component/order.component';
import Product from './component/product.component';
import Quantity from './component/quantityform.component'
import OrderDetails2 from './component/order.component-with-missing-functionality';

function App() {
  const [customerName, setcustomerName] = useState([])
  const [selectedName, setselectedName] = useState(null);
  const [orderData, setOrderData] = useState([])
  const [orderClicked, setOrderClicked] = useState([])
  const [product, setProduct] = useState([])
  const [quantChange, setQuantityChange] = useState([])


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/customer/',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => setcustomerName(res))
    .catch(err => console.log(err))
    },[])


    const loadName = name => {
      setselectedName(name)
      setOrderData([])
      setOrderClicked([])
      setProduct([])
      setQuantityChange([])

  
    }

useEffect(() => {
    fetch('http://127.0.0.1:8000/api/order/',{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => setOrderData(res))
  .catch(err => console.log(err))
},[selectedName])


const orderDataRefetch = (data) =>{
  setOrderData(data)
}

const orderNameClicked = (data) => {
  setOrderClicked(data)
}

useEffect(()=>{
  // if (orderClicked.id){
    fetch('http://127.0.0.1:8000/api/product/',{
      method:'GET',
      headers:{
          'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => setProduct(res))
    .catch(err => console.log(err))
// }
},[orderClicked])

const quantityChange = (data) => {
  setQuantityChange(data)
}

const productRefetch = (data) => {
  setProduct(data)
}

  return (
    <div className="App">
      <header className="App-header">
        <h2><FontAwesomeIcon icon={faAssistiveListeningSystems} /> 
            <span>Customer's Placed Orders</span></h2> 
            <p>Click on the Customer's Name to Access his Orders</p>
   
      </header>
      <div className='layout'>
        
        <Customer customerName={customerName} nameClicked={loadName}/>  
        <div>
        <OrderDetails orderData={orderData} 
            selectedName={selectedName}
            orderDataRefetch={orderDataRefetch}
            orderNameClicked={orderNameClicked}
            product={product}
          /> 
           <Product product={product} order={orderClicked} quantityChange={quantityChange} />
          {
            quantChange.id ? <Quantity quantData={quantChange} productRefetch={productRefetch}/> : [] 
          }
          
        </div>
          
         
          
      </div>

    </div>
  );
}

export default App;
