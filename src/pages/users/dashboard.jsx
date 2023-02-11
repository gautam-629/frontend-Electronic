import { useContext } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom"
import UserContext from "../../context/user.context"
import { isLoggedIn } from "../../auth/helper.auth"
const Dashboard = () => {

    const userContext = useContext(UserContext);

    // const redirect = useNavigate()

    //private dashboard view

    const dashboardView = () => {
        return (<div>
            <h1>this is user Dashboard</h1>


            {/* nested */}

            <Outlet />
        </div>)
    }

    // not logged in  vew

    const notLoggedInView = () => {
        return (
            <Container>
                <Row>
                    <Col md={{
                        span: 8,
                        offset: 2
                    }}>
                        <Card className="border-0 shadow mt-3">
                            <Card.Body className="text-center">

                                <h3>You are not logged In !!</h3>
                                <p>Please do login to view the page </p>
                                <Button as={NavLink} to="/login" variant="success" >Login Now</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (

        (isLoggedIn()) ? dashboardView() : <Navigate to="/login" />
    )
}
export default Dashboard