import { useEffect } from "react"
import { useState } from "react"
import { Card, Col, Container, Row, Modal, Button, Table, ListGroup, Badge } from "react-bootstrap"
import SingleOrderView from "../../components/SingleOrderView"
import { ADMIN_ORDER_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service"
import { getAllOrders } from "../../services/OrderService"
import { formatDate } from "../../services/helper.service"

const AdminOrders = () => {


    const [ordersData, setOrdersData] = useState(undefined)
    const [selectedOrder, setSelectedOrder] = useState(undefined)

    // const [fakeOrders, setFakeOrders] = useState([
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    // ])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const openViewOrderModal = (event, order) => {
        console.log("view order button clicked ")
        console.log(event)
        console.log(order)
        setSelectedOrder({ ...order })
        handleShow(true)
    }

    useEffect(() => {
        //single   time on load
        getOrdersLocally();
    }, [])

    const getOrdersLocally = async () => {

        try {
            const data = await getAllOrders(0, ADMIN_ORDER_PAGE_SIZE, 'orderedDate', 'desc');
            console.log(data)
            setOrdersData(data)
        } catch (e) {
            console.log("error")
            console.log(e)
        }

    }


    //view order modal
    const viewOrderModal = () => {

        return selectedOrder && (
            <>

                <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>  <h3>Order details</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>



                        <Row>
                            <Col>
                                <b>Order Id: </b>{selectedOrder.orderId}
                            </Col>
                            <Col>
                                <b>Billing Name: </b>{selectedOrder.billingName}
                            </Col>


                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <Table bordered striped>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Billing Phone
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingPhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Items
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.orderItems.length}
                                            </td>
                                        </tr>

                                        <tr className={selectedOrder.paymentStatus === 'NOTPAID' ? 'table-danger' : 'table-success'}>
                                            <td>
                                                Payment Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.paymentStatus}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Order Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.orderStatus}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Ordered Date
                                            </td>
                                            <td className="fw-bold">
                                                {formatDate(selectedOrder.orderedDate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Billing Address
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingAddress}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                DeliveredDate
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate) : ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Order Amount
                                            </td>
                                            <td className="fw-bold">
                                                ₹ {selectedOrder.orderAmount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Card>
                                    <Card.Body>
                                        <h3>Order Items</h3>

                                        <ListGroup>
                                            {
                                                selectedOrder.orderItems.map((item) => (
                                                    <ListGroup.Item action className="mt-3" key={item.orderItemId}>
                                                        <Row>
                                                            <Col md={1} className=" d-flex align-items-center">
                                                                <img
                                                                    style={{
                                                                        width: '40px'
                                                                    }}
                                                                    src={getProductImageUrl(item.product.productId)}
                                                                    alt="" />
                                                            </Col>
                                                            <Col md={11}>
                                                                <h5>{item.product.title}</h5>
                                                                <Badge pill size={'lg'}>Quantity: {item.quantity}</Badge>
                                                                <Badge bg="success" pill className="ms-2" size={'lg'}>Amount for This Item :  ₹  {item.totalPrice}</Badge>
                                                                <p className="text-muted mt-3">Product Id : {item.product.productId}</p>


                                                            </Col>

                                                            {/* <Container className="text-center my-3">
                                                                <Button variant="info" size="sm">View Product</Button>
                                                            </Container> */}
                                                        </Row>

                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>

                                    </Card.Body>
                                </Card>



                            </Col>

                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    const ordersView = () => {
        return (
            <Card className="shadow-sm">

                <Card.Body>
                    <h3 className="my-4 mx-2">All Orders is here </h3>
                    {
                        ordersData.content.map(o => {
                            return (

                                <SingleOrderView
                                    key={o.orderId}
                                    order={o}
                                    openViewOrderModal={openViewOrderModal}
                                />

                            )
                        })
                    }
                </Card.Body>
            </Card>
        )
    }


    return (
        <>

            <Container>
                <Row>
                    <Col>

                        {ordersData && ordersView()}
                        {viewOrderModal()}
                    </Col>
                </Row>
            </Container>


        </>
    )
}

export default AdminOrders