import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ShowHtml from '../../components/ShowHtml'
import { getProductImageUrl } from '../../services/helper.service'
import { getProduct } from '../../services/product.service'
import defaultProductImage from '../../assets/default_product_image.jpg'
import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import { toast } from 'react-toastify'
function ProductView() {

    const { cart, addItem } = useContext(CartContext)
    const [product, setProduct] = useState(null)
    const { productId } = useParams()

    useEffect(() => {

        loadUser(productId)

    }, [])


    const loadUser = (productdId) => {
        getProduct(productId).then(data => setProduct(data)).catch(error => console.log(error))
    }

    const handleAddItem = (productId, quantity) => {


        //if the product is in stock 

        addItem(quantity, productId, () => {
            toast.success("Product is added to card")
        })
    }

    const produdctView = () => {
        return (
            <Container className='py-4'>
                <Row>
                    <Col>

                        <Card className='mt-4 border border-0 shadow-sm'>

                            <Card.Body>

                                <Container className=' my-4'>
                                    <Row>
                                        <Col>
                                            <img
                                                style={{ width: " 500px " }}
                                                src={getProductImageUrl(product.productId)} alt=""
                                                onError={(event) => {
                                                    event.currentTarget.setAttribute('src', defaultProductImage)
                                                }}
                                            />
                                        </Col>
                                        <Col>
                                            <h3>{product.title}</h3>
                                            <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?</span> </p>
                                            <Badge pill bg='info'>{product.category?.title}</Badge>
                                            <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : " Out of Stock"}</Badge>
                                            <Container className='text-center'>
                                                <b><span className='h1 text-muted'><s>₹{product.price}</s></span></b>
                                                <b><span className='h2  ms-2'>₹{product.discountedPrice}</span></b>
                                            </Container>
                                            <Container className='d-grid mt-4'>
                                                <Button disabled={!product.stock} variant='warning' size={'sm'}
                                                    onClick={event => handleAddItem(product.productId, 1)}
                                                >Add to Cart</Button>
                                                <Button as={Link} to='/store' className='mt-2' variant='info' size={'sm'}>Go to Store</Button>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>

                                <div className="mt-5">
                                    <ShowHtml htmlText={product.description} />
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>
                </Row>

                <Container className='d-grid mt-4'>

                    <Button disabled={!product.stock} onClick={event => handleAddItem(product.productId, 1)} variant='warning' size={'sm'}>Add to Cart</Button>
                    <Button as={Link} to='/store' className='mt-2' variant='info' size={'sm'}>Go to Store</Button>
                </Container>
            </Container>
        )
    }

    return (

        product && produdctView()
    )
}

export default ProductView