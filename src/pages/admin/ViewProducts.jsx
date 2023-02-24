
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import { getAllProducts } from "../../services/product.service"
const { Container, Row, Col, Table, Button, Card, Form, Pagination } = require("react-bootstrap")

const ViewProducts = () => {

    const [products, setProducts] = useState(undefined)

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
                                    <SingleProductView key={index} index={index} product={product} />
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
        </>
    )
}

export default ViewProducts