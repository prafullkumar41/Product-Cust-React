import React, {useEffect,useState} from 'react'

export default function OrderDetails2(props) {
   
    const {orderData, selectedName, product} = props
    const [indcustdata, setindcustdata] = useState([])
    const [indorderproductquant, setindorderproductquant] = useState([])
    const [indorderproduct, setindorderproduct] = useState([])

    console.log(orderData);
    console.log(selectedName);
    useEffect( () => {
        
        if  (orderData && selectedName) {
            var ID = selectedName.id
            setindcustdata(orderData.filter((data) => data.customer === ID))
            setindorderproductquant([])
            setindorderproduct([])
        }
    },[orderData, selectedName])

   

    function filtered(indcustdata,product) {
        var filteredproduct = []
        if  (indcustdata.length > 0) {
            for (let index = 0; index < indcustdata.length; index++) {
                for (let index2 = 0; index2 < product.length; index2++) {
                    if (product[index2].order === indcustdata[index].id) {
                        filteredproduct.push(product[index2]);
                    }                  
                }
            }
        }
        return filteredproduct
    }

    var filteredOutputProduct = filtered(indcustdata,product);
    
    var checkSameProduct = new Set(filteredOutputProduct.map(itr => (itr.product_name)))
    
    var ind = 'N'
    if (checkSameProduct.size < filteredOutputProduct.length) {
        ind = 'Y'     
    }
    
    var quant
    var quant1 = 0
    if (ind ==='Y') {
        quant = filteredOutputProduct.map(itr => {return(itr.quantity)})
        quant1 = quant.reduce( (a, b) => a+b,0)
    }
   
    useEffect(() => {
        if (filteredOutputProduct.length > 0){
            setindorderproductquant(quant1);
            setindorderproduct(filteredOutputProduct[0].product_name)
        }
    },[quant1])


    
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
        <div>
            {   
            indorderproductquant > 0 ? 
            
              <div> 
                <h3>{indorderproduct}</h3>
                <h4>{indorderproductquant}</h4>
               </div> 
                         
               : 
            
                indcustdata && indcustdata.map( data => {
                    return(
                        <div key={data.id}>
                            <h4 onClick={orderNameClicked(data)} className='ordername' >
                            {data.orderName}</h4> 
                            <h5 className='processing' onClick={processedClick(data)}>Processed: {data.processed ? 'Done' : 'Processing'}</h5>   
                        </div>
                    )
                }       
              )
            }
        </div>
    )
}
