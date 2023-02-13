import Base from "../components/Base"
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { loginUser } from "../services/user.service"
import UserContext from "../context/UserContext"
const Login = () => {


    const redirect = useNavigate()
    const userContext = useContext(UserContext);

    let [data, setData] = useState({
        email: '',
        password: ''
    })
    let [error, setError] = useState({
        errorData: null,
        isError: false
    })

    let [loading, setLoading] = useState(false)

    const handleChange = (event, property) => {
        setData({
            ...data,
            [property]: event.target.value
        })
    }

    const handleReset = () => {

        setData({
            email: '',
            password: ''
        })

        setError({
            errorData: null,
            isError: false
        })

        setLoading(false)
    }

    //submit form

    const submitForm = (event) => {
        event.preventDefault();

        console.log(data)

        //client side validations

        if (data.email === undefined || data.email.trim() === '') {
            toast.error("Email required !!")
            return
        }

        if (data.password === undefined || data.password.trim() === '') {
            toast.error("Password required !!")
            return
        }

        //login api

        setLoading(true)
        loginUser(data)
            .then((data) => {
                console.log(data)
                toast.success("Logged In")
                setError({
                    errorData: null,
                    isError: false
                })

                //redirect to dashboard page:
                // 1. normal : normal user ke dashboard per le jana hai 



                //home dashboard page
                // / users / home

                // userContext.setIsLogin(true)
                // userContext.setUserData(data)
                userContext.login(data)

                redirect("/users/home")


                // 2. admin : admin user dashabord per le jana hai 
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
                setError({
                    errorData: error,
                    isError: true
                })
            })
            .finally(() => {
                setLoading(false)
            })

    }


    const loginForm = () => {
        return (

            <Container>


                <Row>
                    <Col md={{
                        span: 8,
                        offset: 2
                    }}>



                        <Card className="my-3 border-0 shadow" style={{
                            position: "relative",
                            top: -60

                        }}>

                            <Card.Body>

                                {/* {JSON.stringify(userContext)} */}

                                <Container className="text-center mb-3">
                                    <img src={logo} alt="Store logo" width={80} height={80} />
                                </Container>


                                <h3 className="text-center text-uppercase">Store Login </h3>

                                <Alert className="mt-3" onClose={() => setError({
                                    isError: false,
                                    errorData
                                        : null
                                })} dismissible variant="danger" show={error.isError}>

                                    <Alert.Heading>Hey there ,</Alert.Heading>
                                    <p> {error.errorData?.response?.data?.message}</p>

                                </Alert>



                                <Form noValidate onSubmit={submitForm}>

                                    {/* email login field */}

                                    <Form.Group className="mb-3">
                                        <Form.Label>Enter Email </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter here"
                                            onChange={(event) => handleChange(event, 'email')}
                                            value={data.email}
                                        />
                                    </Form.Group>


                                    {/* password login field */}

                                    <Form.Group className="mb-3">
                                        <Form.Label>Enter Password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter here"
                                            onChange={(event) => handleChange(event, 'password')}
                                            value={data.password}

                                        />
                                    </Form.Group>


                                    <Container className="text-center">
                                        {/* <p>Forget Password ! <a href="/forget">Click here</a></p> */}
                                        <p>If not registered !  <NavLink to="/register" >Click here</NavLink></p>
                                    </Container>

                                    <Container className="text-center">

                                        <Button type="submit" className="" variant="success" disabled={loading}>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                hidden={!loading}
                                                className={'me-2'}

                                            />
                                            <span hidden={!loading}>Please wait...</span>

                                            <span hidden={loading}>  Login</span>

                                        </Button>

                                        <Button onClick={handleReset} className="ms-2" variant="danger">Reset</Button>
                                    </Container>

                                </Form>


                            </Card.Body>

                        </Card>



                    </Col>

                </Row>

            </Container>

        )
    }

    return (

        <Base
            title="Electro Store / Login Page"
            description={null}
        >
            {loginForm()}
        </Base>

    )
}

export default Login