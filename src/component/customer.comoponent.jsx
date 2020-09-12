import React from 'react'

function Customer(props) {

    const nameClicked = name => evt =>{
        props.nameClicked(name)
    }
    
    
    return (
        <div className='customer-details'>
            {  
                props.customerName && props.customerName.map( nam => {
                    return ( <h3 key = {nam.id} 
                                onClick={nameClicked(nam)}
                                className='name-item'
                    >Customer {nam.id} : {nam.name}</h3>  
                    )     
                })
    
            }
        </div>
    )
}


export default Customer
