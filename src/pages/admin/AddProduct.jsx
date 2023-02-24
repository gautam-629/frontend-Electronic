import { useState } from "react"
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap"
import { toast } from "react-toastify"

const AddProduct = () => {


    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: undefined
    })

    const handleFileChange = (event) => {
        if (event.target.files[0].type === 'image/png' || event.target.files[0].type == 'image/jpeg') {
            //preview show
            const reader = new FileReader()
            reader.onload = (r) => {

                setProduct({
                    ...product,
                    imagePreview: r.target.result,
                    image: event.target.files[0]
                })


            }

            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("Invalid File !!")
            setProduct({
                ...product,
                image: undefined,
                imagePreview: undefined
            })
        }
    }


    const formView = () => {
        return (
            <>

                <Card className=" shadow-sm ">
                    {/* {JSON.stringify(product)} */}
                    <Card.Body>
                        <h5>Add Product here </h5>
                        <Form>

                            {/* product title */}
                            <FormGroup className="mt-3">
                                <Form.Label>Product title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter here"
                                    onChange={(event) => setProduct({
                                        ...product,
                                        title: event.target.value
                                    })}
                                    value={product.title}

                                />
                            </FormGroup>

                            {/* product description */}

                            <Form.Group className="mt-3" >

                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    rows={6}
                                    placeholder="Enter here"

                                    onChange={(event) => setProduct({
                                        ...product,
                                        description: event.target.value
                                    })}

                                    value={product.description}
                                />

                            </Form.Group>

                            <Row>
                                <Col>
                                    {/* price */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number"
                                            placeholder="Enter here"
                                            onChange={(event) => setProduct({
                                                ...product,
                                                price: event.target.value
                                            })}

                                            value={product.price}

                                        />
                                    </FormGroup>


                                </Col>

                                <Col>

                                    {/* discounted price */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Discounted Price</Form.Label>
                                        <Form.Control

                                            type="number"

                                            placeholder="Enter here"

                                            onChange={(event) => {
                                                if (event.target.value > product.price) {
                                                    toast.error("Invalid Discount value !!")
                                                    return
                                                }
                                                setProduct({
                                                    ...product,
                                                    discountedPrice: event.target.value
                                                })
                                            }}


                                        />
                                    </FormGroup>

                                </Col>
                            </Row>

                            {/* Product quantity */}

                            <Form.Group className="mt-3" >

                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control type="number" placeholder="Enter here" />
                            </Form.Group>

                            <Row className="mt-3 px-1">
                                <Col>
                                    <Form.Check

                                        type="switch"
                                        label={"Live"}
                                        checked={product.live}
                                        onChange={(event) => {
                                            setProduct({
                                                ...product,
                                                live: !product.live
                                            })
                                        }}
                                    />
                                </Col>
                                <Col>

                                    <Form.Check
                                        type="switch"
                                        label={"Stock"}
                                        checked={product.stock}
                                        onChange={(event) => {
                                            setProduct({
                                                ...product,
                                                stock: !product.stock
                                            })
                                        }}
                                    />

                                </Col>
                            </Row>

                            {/* product image */}
                            <Form.Group className="mt-3">
                                <Container hidden={!product.imagePreview} className="text-center  py-4 border border-2">
                                    <p className="text-muted">Image Preview</p>
                                    <img
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "250px"
                                        }}
                                        src={product.imagePreview}
                                        alt="" />
                                </Container>
                                <Form.Label>Select product image</Form.Label>
                                <InputGroup>
                                    <Form.Control type={'file'}
                                        onChange={(event) => handleFileChange(event)}
                                    />

                                    <Button onClick={(event) => {
                                        setProduct({
                                            ...product,
                                            imagePreview: undefined,
                                            image: undefined
                                        })
                                    }} variant="outline-secondary">Clear</Button>
                                </InputGroup>
                            </Form.Group>

                            <Container className="text-center mt-3">
                                <Button variant="success" size="sm">Add Product</Button>
                                <Button className="ms-1" variant="danger" size="sm">Clear Data</Button>
                            </Container>

                        </Form>
                    </Card.Body>
                </Card>

            </>

        )
    }

    return (<div>
        {
            formView()
        }
    </div>)
}

export default AddProduct