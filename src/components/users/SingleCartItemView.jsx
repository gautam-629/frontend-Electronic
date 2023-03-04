import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'
import defaultProductImage from '../../assets/default_product_image.jpg'
import { useContext } from "react";
import CartContext from '../../context/CartContext';
import { toast } from 'react-toastify';


const SingleCartItemView = ({ item }) => {

    const { cart, setCart, addItem, removeItem, clearCart } =
        useContext(CartContext);



    return (

        <Card className='shadow-sm mb-3 ' >
            <Card.Body>

                <Row>
                    <Col md={1} className="d-flex align-items-center justify-content-center">

                        <img
                            style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'contain'
                            }}
                            onError={event => {
                                event.currentTarget.setAttribute('src', defaultProductImage)
                            }}
                            src={getProductImageUrl(item.product.productId)} alt="" />

                    </Col>
                    <Col md={9}>
                        <h5>{item.product.title}</h5>
                        <p className='text-muted'><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, dolor.</span></p>
                        <Row>
                            <Col>
                                <p > <b>{item.quantity}</b> <span className='text-muted'>Quantity</span></p>
                            </Col>
                            <Col>
                                <p > <span className='text-muted'>Price </span> <b> ₹{item.product.discountedPrice}</b> </p>
                            </Col>
                            <Col>
                                <p > <span className='text-muted'>Total Price </span> <b> ₹{item.totalPrice}</b> </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">


                        <div className='w-100' >
                            <div className='d-grid'>
                                <Button onClick={event => {
                                    removeItem(item.cartItemId)
                                }} variant='danger' className='' size="sm">Remove</Button>
                            </div>
                            <div className='mt-2'>
                                <Row>
                                    <Col className='d-grid'>
                                        <Button onClick={event => {
                                            const decreaseQuantity = item.quantity - 1
                                            if (decreaseQuantity > 0) {
                                                addItem(decreaseQuantity, item.product.productId, () => {
                                                    toast.info("Quantity Updated")
                                                })
                                            } else {
                                                toast.info("Quantity can not be less than 1")
                                            }
                                        }} className='' variant='info' size="sm">-</Button>
                                    </Col>
                                    <Col className='d-grid'>
                                        <Button className=''
                                            onClick={event => {
                                                const increasedQuantity = item.quantity + 1
                                                addItem(increasedQuantity, item.product.productId, () => {
                                                    toast.success("Quantity Update")
                                                })

                                            }}
                                            variant='success' size="sm">+</Button>
                                    </Col>
                                </Row>


                            </div>

                        </div>
                    </Col>
                </Row>


            </Card.Body>
        </Card>
    )
}

export default SingleCartItemView