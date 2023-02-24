
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { getAllProducts } from "../../services/product.service"
const { Container, Row, Col, Table, Button, Card, Form, Pagination } = require("react-bootstrap")

const ViewProducts = () => {

    const [products, setProducts] = useState(undefined)

    useEffect(() => {
        getProducts(0, 10, 'addedDate', 'desc')
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

                        <Pagination >
                            <Pagination.Prev></Pagination.Prev>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Next></Pagination.Next>
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