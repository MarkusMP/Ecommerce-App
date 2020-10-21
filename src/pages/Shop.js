import React, {useState} from 'react'
import { Card, Container, Form, Row } from 'react-bootstrap'
import { ShopItem } from '../components'
import { Con } from '../Contexts/Context'

const Shop = () => {
    const [option, setOption] = useState('')
    const { products } = Con()

    function HandleOptionChange(value) {
setOption(value)
    }

    const sortedProducts = products.sort((a, b) => {
        if(option === 'dec') return a.Price > b.Price ? 1 : -1;
        if(option === 'inc') return a.Price < b.Price ? 1 : -1;
        if(option === 'first') return a.Title > b.Title ? 1 : -1;
        if(option === 'last') return a.Title < b.Title ? 1 : -1;
    return 0
    })

    const Product = sortedProducts.map(product => <ShopItem key={product.id} data={product} />)
    return (
        <Container style={{ marginTop: '50px' }} >
            <div className="d-flex justify-content-center">
                <Card style={{ width: '68rem' }} >
                    <Card.Body className="d-flex container-grid w-100 justify-content-around align-items-center">
                        <span><strong>{products.length}</strong> Products found</span>
                        <Form>
                            <Form.Control as="select" value={option} onChange={e => HandleOptionChange(e.target.value)}>
                            <option value="first">Sort by a to z</option>
                                <option value="last">Sort by z to a</option>
                                <option value="dec">Sort by lowest</option>
                                <option value="inc">Sort by highest</option>
                            </Form.Control>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Container className="d-flex justify-content-around align-items-center ">
                <Row className=" justify-content-around align-items-center ">
                    {Product}
                </Row>
            </Container>
        </Container >
    )
}

export default Shop
