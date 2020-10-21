import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Con } from '../../Contexts/Context'

const ShopItem = ({ data }) => {

    const { handleAddToCart } = Con()
    const Description = data.Description.substr(0, 98)

    return (
        <Card key={data.id} className="position-relative" style={{ maxWidth: '18rem', margin: '15px', minHeight: '485px' }}>
            <Card.Img className="mb-1" variant="top" style={{maxWidth: '100%', height: '200px'}} src={data.Img} />
            <Card.Body className="position-absolute item">
                <Card.Title>{data.Title}</Card.Title>
                <Card.Text className="remove">
                    {Description}
                </Card.Text>
                <div className="d-flex container-grid justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => handleAddToCart(data.id)}>Add To Cart</Button>
                    <h5> Price ${data.Price} </h5>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ShopItem
