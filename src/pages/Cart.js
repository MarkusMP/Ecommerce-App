import React from 'react'
import {  Card, ListGroup, ListGroupItem, Button, Row, } from 'react-bootstrap'
import { CartItem } from '../components'
import { Con } from '../Contexts/Context'

const Cart = () => {
    const { productsCart } = Con()

    const CartItems = productsCart.map(product => <CartItem key={product.id} data={product} />)

    const TotalPrice = productsCart.map(products => (products.Price * products.quantity) )

    return (
         <div className="container-grid mt-5 con" style={{width: '90%' }}>
       <Card className="m-4 items" style={{width: '60%'}}>
           <Card.Body>
               <h5 className="mb-4">Cart ({productsCart.length} items)</h5>
               <Row className="mb-4">
                   {CartItems}
               </Row>
           </Card.Body>
       </Card>
        {productsCart.length !== 0 ? <Card style={{ padding: '10px', maxWidth: '24rem', height: '20rem' }}>
           <Card.Body>
               <h5 className="mb-5" >The total amount of</h5>
               <ListGroup variant="flush">
                   <ListGroupItem>
                       Shipping: <span>$3.39</span>
                   </ListGroupItem>
                   <ListGroupItem>
                       Total amount: <span>${(TotalPrice.reduce((previousValue, currentValue) => previousValue + currentValue, 0)  + 3.39).toFixed(2) }</span>
                   </ListGroupItem>

                   <div className="d-flex justify-content-center mt-2">
                   <Button className="m-1">Go To Checkout</Button>
                   </div>
               </ListGroup>
           </Card.Body>
       </Card> : null} 
   </div >
    )
}

export default Cart
