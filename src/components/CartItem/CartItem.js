import React, {useEffect, useState} from 'react'
import { Card, Image, Button, FormControl } from 'react-bootstrap'
import {Con} from '../../Contexts/Context'

const CartItem = ({ data }) => {
const [quantity, setQuantity] = useState(1)
const {  handleDeleteCartItem, handleItemQuantity} = Con()

useEffect(() => {
setQuantity(data.quantity)
}, [data.quantity])

function handleOnChange(num) {
setQuantity(num)
handleItemQuantity(num, data.id)
}


    return (
        <Card className="w-100 m-1" >
            <Card.Body className=" card-items d-flex justify-content-around align-items-center">

                <Image style={{  maxWidth: '150px' }} src={data.Img} />
                <h2 className="texts">{data.Title}</h2>
                <h5 >Price: ${data.Price}</h5>
                <div className="d-flex" style={{ maxWidth: '10rem', marginRight: '5px' }}>
                    <FormControl style={{ width: '4rem', margin: '4px' }} as="select" value={quantity} onChange={(e) => handleOnChange(e.target.value)}>
                    <option defaultValue="1" >1</option>
      <option defaultValue="2">2</option>
      <option defaultValue="3">3</option>
      <option defaultValue="4">4</option>
      <option defaultValue="5">5</option>
                    </FormControl>
                </div>
                <Button variant="danger" onClick={() => handleDeleteCartItem(data.id)}>X</Button>
            </Card.Body>
        </Card>
    )
}

export default CartItem
