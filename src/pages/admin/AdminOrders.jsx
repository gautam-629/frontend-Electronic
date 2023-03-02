import { useEffect } from "react"
import { useState } from "react"
import { Card, Col, Container, Row, Modal, Button, Table, ListGroup, Badge, Form } from "react-bootstrap"
import SingleOrderView from "../../components/SingleOrderView"
import { ADMIN_ORDER_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service"
import { getAllOrders, updateOroder } from "../../services/OrderService"
import { formatDate } from "../../services/helper.service"
import InfiniteScroll from "react-infinite-scroll-component"
import { toast } from "react-toastify"

const AdminOrders = () => {


    const [ordersData, setOrdersData] = useState(undefined)
    const [selectedOrder, setSelectedOrder] = useState(undefined)
    const [currentPage, setCurrentPage] = useState(0)

    // const [fakeOrders, setFakeOrders] = useState([
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    // ])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [updateShow, setUpdateShow] = useState(false);

    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);


    const openViewOrderModal = (event, order) => {
        console.log("view order button clicked ")
        console.log(event)
        console.log(order)
        setSelectedOrder({ ...order })
        handleShow(true)
    }

    const openEditOrderModal = (event, order) => {
        console.log("hi open edit modal")
        setSelectedOrder({ ...order })
        handleUpdateShow()
    }

    useEffect(() => {
        //single   time on load
        getOrdersLocally();
    }, [])

    useEffect(() => {
        if (currentPage > 0) {
            getOrdersLocally()
        }
    }, [currentPage])

    //get orders

    const getOrdersLocally = async () => {

        try {
            const data = await getAllOrders(currentPage, ADMIN_ORDER_PAGE_SIZE, 'orderedDate', 'desc');
            console.log(data)
            if (currentPage == 0) {
                setOrdersData(data)
            }
            else {
                setOrdersData({
                    content: [...ordersData.content, ...data.content],
                    lastPage: data.lastPage,
                    pageNumber: data.pageNumber,
                    pageSize: data.pageSize,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages
                })
            }
        } catch (e) {
            console.log("error")
            console.log(e)
        }

    }

    // load data of the next page
    const loadNextPage = () => {
        console.log("loading next page")
        setCurrentPage(currentPage + 1)
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


    //handle order update
    const handleOrderUpdate = async (event) => {
        event.preventDefault()
        console.log(selectedOrder)

        if (selectedOrder.billingName.trim() === '') {
            toast.error("Name required !!")
            return;
        }

        try {
            const data = await updateOroder(selectedOrder, selectedOrder.orderId)
            toast.success("Order datails updated", {
                position: "top-right"
            })


            const newList = ordersData.content.map(item => {
                if (item.orderId === selectedOrder.orderId) {
                    return data
                }
                else return item
            })

            setOrdersData({
                ...ordersData,
                content: newList
            })

        } catch (error) {
            console.log(error)
            toast.error("Order not updated ")
        }
    }

    //update order modal
    const updateOrderModal = () => {
        return selectedOrder && (
            <>
                <Modal animation={false} size={'lg'} show={updateShow} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Card className="border border-0 shadow-sm">
                            <Card.Body>
                                <Form onSubmit={handleOrderUpdate}>

                                    {/* billing name  */}
                                    <Form.Group>
                                        <Form.Label>Billing Name</Form.Label>
                                        <Form.Control type='text'
                                            value={selectedOrder.billingName}
                                            onChange={

                                                (event) => {
                                                    setSelectedOrder({
                                                        ...selectedOrder,
                                                        billingName: event.target.value
                                                    })

                                                }
                                            }
                                        />

                                    </Form.Group>


                                    {/* billing phone  */}
                                    <Form.Group className="mt-3">
                                        <Form.Label>Billing Phone</Form.Label>
                                        <Form.Control type='text'
                                            value={selectedOrder.billingPhone}
                                            onChange={

                                                (event) => {
                                                    setSelectedOrder({
                                                        ...selectedOrder,
                                                        billingPhone: event.target.value
                                                    })

                                                }
                                            }
                                        />

                                    </Form.Group>



                                    {/* billing address  */}
                                    <Form.Group className="mt-3">
                                        <Form.Label>Billing Address</Form.Label>
                                        <Form.Control
                                            as={'textarea'}
                                            type='text'
                                            rows={5}
                                            value={selectedOrder.billingAddress}
                                            onChange={

                                                (event) => {
                                                    setSelectedOrder({
                                                        ...selectedOrder,
                                                        billingAddress: event.target.value
                                                    })

                                                }
                                            }
                                        />

                                    </Form.Group>

                                    {/* payment status  */}


                                    <Form.Group className="mt-3">
                                        <Form.Label>Payment Status</Form.Label>
                                        <Form.Select
                                            onChange={(event) => {
                                                setSelectedOrder({
                                                    ...selectedOrder,
                                                    paymentStatus: event.target.value
                                                })
                                            }}
                                        >
                                            <option selected={selectedOrder.paymentStatus === 'NOTPAID'} value="NOTPAID">NOT PAID</option>
                                            <option selected={selectedOrder.paymentStatus === 'PAID'} value="PAID">PAID</option>
                                        </Form.Select>
                                    </Form.Group>


                                    {/* order status  */}

                                    <Form.Group className="mt-3">
                                        <Form.Label>Order Status</Form.Label>
                                        <Form.Select
                                            onChange={(event) => {
                                                setSelectedOrder({
                                                    ...selectedOrder,
                                                    orderStatus: event.target.value
                                                })
                                            }}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="DISPATCHED">DISPATCHED</option>
                                            <option value="ONWAY">ONWAY</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </Form.Select>
                                        {/* order delivered date */}
                                    </Form.Group>


                                    <Form.Group className="mt-3">
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control type="text"

                                            onChange={event => {
                                                setSelectedOrder({
                                                    ...selectedOrder,
                                                    deliveredDate: event.target.value
                                                })
                                            }}
                                        />
                                        <p className="text-muted">Format : YYYY-MM-dd</p>
                                    </Form.Group>

                                    <Container className="text-center">
                                        <Button type="submit" variant="primary">
                                            Save Changes
                                        </Button>
                                    </Container>

                                </Form>

                            </Card.Body>
                        </Card>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }


    const ordersView = () => {
        return (
            <Card className="shadow-sm">

                <Card.Body>
                    <h3 className="my-4 mx-2">All Orders is here </h3>
                    <InfiniteScroll
                        dataLength={ordersData.content.length}
                        next={loadNextPage}
                        hasMore={!ordersData.lastPage}
                        loader={<h3 className="text-center my-4">Loading...</h3>}
                        endMessage={<p className="my-3 text-center">All orders loaded</p>}

                    >

                        {
                            ordersData.content.map(o => {
                                return (

                                    <SingleOrderView
                                        key={o.orderId}
                                        order={o}
                                        openViewOrderModal={openViewOrderModal}
                                        openEditOrderModal={openEditOrderModal}
                                    />

                                )
                            })
                        }
                    </InfiniteScroll>
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
                        {updateOrderModal()}
                    </Col>
                </Row>
            </Container>


        </>
    )
}

export default AdminOrders