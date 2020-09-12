import React, {useEffect,useState} from 'react'

export default function OrderDetails(props) {
   
    const {orderData, selectedName} = props
    const [indcustdata, setindcustdata] = useState([])
    

    useEffect( () => {
        
        if  (orderData && selectedName) {
            var ID = selectedName.id
            setindcustdata(orderData.filter((data) => data.customer === ID))
        }
    },[orderData, selectedName])

    
    const processedClick = data => evt =>{
        var dataprocessed = data.processed
        fetch(`http://127.0.0.1:8000/api/order/${data.id}/upd_status/`, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({'processed':dataprocessed})
          })
          .then( () => getDetails())
          .catch(error => console.log(error))
    }

    const getDetails = () => {
            fetch('http://127.0.0.1:8000/api/order/',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(res => props.orderDataRefetch(res))
          .catch(err => console.log(err))

    }

    const orderNameClicked = data => evt =>{
        props.orderNameClicked(data)
    }

    return (
        <div className='order-details'>
            {
                indcustdata && indcustdata.map( data => {
                    return(
                        <div key={data.id}>
                            <h4 onClick={orderNameClicked(data)} className='ordername' >
                            {data.orderName}</h4> 
                            <h5 className='processing' onClick={processedClick(data)}>Processed: {data.processed ? 'Processing' : 'Done'}</h5>   
                        </div>
                    )
                }      
              )
            }
        </div>
    )
}
