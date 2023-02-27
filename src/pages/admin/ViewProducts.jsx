
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { getProductImageUrl, PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import { getAllProducts } from "../../services/product.service"
import { Container, Row, Col, Table, Button, Card, Form, Pagination, Modal } from 'react-bootstrap'
import defaultImage from '../../assets/default_profile.jpg'
import ShowHtml from "../../components/ShowHtml"
const ViewProducts = () => {

    const [products, setProducts] = useState(undefined)
    const [currentProduct, setCurrentProduct] = useState(undefined)

    // view product state variables
    const [show, setShow] = useState(false);
    const closeProductViewModal = () => {
        setShow(false)
    };
    const openProductViewModal = (event, product) => {
        console.log(product)
        setCurrentProduct(product)

        setShow(true)
    };

    //#END view product state variables

    // edit product state variables 

    const [showEditModal, setShowEditModal] = useState(false);

    const closeEditProductModel = (event, product) => {
        setShowEditModal(false)
    }

    const openEditProductModel = (event, product) => {
        setCurrentProduct(product)
        setShowEditModal(true)
    }


    // END edit product state variables 

    useEffect(() => {
        getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
    }, [])

    const getProducts = (
        pageNumber = 0,
        pageSize = 10,
        sortBy = "addedDate",
        sortDir = "asc") => {


        //all products function of service
        getAllProducts(pageNumber, pageSize, sortBy, sortDir)
            .then(data => {
                console.log(data);
                setProducts({
                    ...data
                })
            })
            .catch(error => {
                console.log(error)
                toast.error("error in loading products")
            })

    }

    //
    const updateProductList = (productId) => {
        const newArray = products.content.filter(p => p.productId != productId)
        setProducts({
            ...products,
            content: newArray
        })
    }


    // modal view:
    const viewProductModalView = () => {
        return currentProduct && (
            <>
                <Modal size={"xl"} animation={false} show={show} onHide={closeProductViewModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentProduct.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="shadow-sm">
                            <Card.Body>

                                {/* {product picture} */}
                                <Container className="text-center py-3">

                                    <img style={{
                                        height: '300px'
                                    }} src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId) : defaultImage} alt="" />
                                </Container>

                                {/* information table  */}

                                <Table striped bordered responsive className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>Product Id</td>
                                            <td className="fw-bold">{currentProduct.productId}</td>

                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td className="fw-bold">{currentProduct.quantity}</td>

                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td className="fw-bold"> {currentProduct.price} ₹ </td>

                                        </tr>
                                        <tr>
                                            <td>Discounted Price</td>
                                            <td className="fw-bold">  {currentProduct.discountedPrice} ₹</td>

                                        </tr>
                                        <tr className={currentProduct.live ? '' : 'table-danger'}>
                                            <td>Live</td>
                                            <td className="fw-bold">{currentProduct.live ? 'True' : 'False'}</td>

                                        </tr>
                                        <tr className={currentProduct.stock ? '' : 'table-danger'}>
                                            <td>Stock</td>
                                            <td className="fw-bold">{currentProduct.stock ? 'In Stock' : 'Not in Stock'}</td>

                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td className="fw-bold">{currentProduct.category?.title}</td>

                                        </tr>
                                    </tbody>

                                </Table>


                                {/* description */}

                                <div className="p-3 border border-1" >

                                    <ShowHtml htmlText={currentProduct.description} />

                                </div>
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeProductViewModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={closeProductViewModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )


    }


    const editProductModalView = () => {
        return (
            <>


                <Modal size="xl" animation={false} show={showEditModal} onHide={closeEditProductModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEditProductModel}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={closeEditProductModel}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    ///products view
    const productsView = () => {
        return (
            <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">View Products</h5>
                    <Form.Group className="mb-2">
                        <Form.Label>Search Product</Form.Label>
                        <Form.Control type="text" placeholder="Seach here" />
                    </Form.Group>
                    <Table className="" bordered hover responsive size="sm"
                    >

                        <thead>
                            <tr>
                                <th className="px-3 small">SN</th>
                                <th className="px-3 small"  >Title</th>
                                <th className="px-3 small">Quantity</th>
                                <th className="px-3 small">Price</th>
                                <th className="px-3 small">Discounted</th>
                                <th className="px-3 small">Live</th>
                                <th className="px-3 small">Sock</th>
                                <th className="px-3 small" >Category</th>
                                <th className="px-3 small">Date</th>
                                <th className="px-3 small">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.content.map((product, index) => (
                                    <SingleProductView
                                        key={index}
                                        index={index}
                                        product={product}
                                        updateProductList={updateProductList}
                                        openProductViewModal={openProductViewModal}
                                        openEditProductModel={openEditProductModel}

                                    />
                                ))
                            }
                        </tbody>
                    </Table>
                    <Container className=" d-flex justify-content-end" >

                        <Pagination size="md">
                            {/* 0 -- totalpages-1 */}

                            <Pagination.First />

                            <Pagination.Prev onClick={(event) => {
                                if ((products.pageNumber - 1) < 0)
                                    return
                                getProducts(products.pageNumber - 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                            }} />
                            {
                                // [0,1,2,3,4]
                                [...Array(products.totalPages)].map((ob, i) => i).map(item => {
                                    return products.pageNumber == item ? <Pagination.Item active key={item}>{item + 1}</Pagination.Item> : <Pagination.Item onClick={(event) => {
                                        getProducts(item, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                                    }} key={item}>{item + 1}</Pagination.Item>
                                }

                                )
                            }

                            <Pagination.Next onClick={(event) => {
                                if (products.lastPage)
                                    return
                                getProducts(products.pageNumber + 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                            }} />


                            <Pagination.Last />


                        </Pagination>

                    </Container>

                </Card.Body>


            </Card>
        )
    }

    return (
        <>
            <Container fluid>

                <Row>

                    <Col>

                        {products ? productsView() : ""}

                    </Col>

                </Row>

            </Container>

            {
                viewProductModalView()

            }

            {
                editProductModalView()
            }


        </>
    )
}

export default ViewProducts