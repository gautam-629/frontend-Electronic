import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import Base from "../components/Base"
import logo from "../assets/logo.png"
import { useState } from "react"
import { toast } from "react-toastify"
import { registerUser } from "../services/user.service"
const Register = () => {


    let [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        about: '',
        gender: ''

    })


    const [errorData, setErrorData] = useState({
        isError: false,
        errorData: null
    })


    const [loading, setLoading] = useState(false)

    //handle change
    const handleChange = (event, property) => {
        // console.log(event)
        // console.log(property)
        setData({
            ...data,
            [property]: event.target.value
        })
    }


    //clear data
    const clearData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            about: '',
            gender: ''
        })

        setErrorData({
            errorData: null,
            isError: false
        })
    }



    //do signup function
    const submitForm = (event) => {

        event.preventDefault();

        console.log(data)

        //validate client side 
        if (data.name == undefined || data.name.trim() == '') {
            toast.error("Name is required !!")
            return
        }

        if (data.email == undefined || data.email.trim() == '') {
            toast.error("Email is required !!")
            return
        }

        //basics...

        if (data.password == undefined || data.password.trim() == '') {
            toast.error("Password is required !!")
            return
        }

        if (data.confirmPassword == undefined || data.confirmPassword.trim() == '') {
            toast.error("Confirm Password is required !!")
            return
        }

        if (data.password != data.confirmPassword) {
            toast.error("Password and Confirm password not matched !!")
            return
        }

        //all right:
        //call api
        setLoading(true)
        registerUser(data)
            .then(userData => {
                //success handler
                console.log(userData)
                toast.success("User created successfully !!");
                clearData()

            })
            .catch(error => {
                //error handler
                console.log(error)
                setErrorData({
                    isError: true,
                    errorData: error
                })
                toast.error("Error in creating user ! Try again")
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const registerForm = () => {
        return (


            <Container >

                {/* Single Row==> 12 grids (col) */}

                <Row>


                    {/* {JSON.stringify(data)} */}

                    <Col sm={{ span: 8, offset: 2 }} >

                        <Card className="my-3 border-0 shadow p-4" style={
                            {
                                position: 'relative',
                                top: -60

                            }
                        } >


                            <Card.Body>

                                <Container className="text-center mb-3">
                                    <img src={logo} alt="Store logo" width={80} height={80} />
                                </Container>

                                <h3 className="mb-4 text-center text-uppercase">Store Signup Here</h3>


                                <Form noValidate onSubmit={submitForm}>

                                    {/* name field  */}

                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Enter your name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            onChange={(event) => handleChange(event, 'name')}
                                            value={data.name}
                                            isInvalid={errorData.errorData?.response?.data?.name}


                                        />
                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>


                                    </Form.Group>



                                    {/* email field      */}
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Enter your email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(event) => handleChange(event, 'email')}
                                            value={data.email}
                                            isInvalid={errorData.errorData?.response?.data?.email}
                                        />

                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>



                                    </Form.Group>

                                    {/* password field  */}

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Enter new password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(event) => handleChange(event, 'password')}
                                            value={data.password}
                                            isInvalid={errorData.errorData?.response?.data?.password}

                                        />

                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>


                                    </Form.Group>

                                    {/* confim password  */}


                                    <Form.Group className="mb-3" controlId="formConfigPassword">
                                        <Form.Label>Re enter  password</Form.Label>
                                        <Form.Control type="password" placeholder="Re Enter password"
                                            onChange={(event) => handleChange(event, 'confirmPassword')}
                                            value={data.confirmPassword}
                                        />

                                    </Form.Group>

                                    {/* gender radio buttons  */}

                                    <Form.Group className="mb-3">

                                        <Form.Label>Select Gender</Form.Label>

                                        <div>
                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Male"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'male'}
                                                checked={data.gender == 'male'}
                                                onChange={(event) => handleChange(event, 'gender')}
                                            />

                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Female"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'female'}
                                                checked={data.gender == 'female'}
                                                onChange={(event) => handleChange(event, 'gender')}
                                            />

                                        </div>

                                    </Form.Group>

                                    {/* about field  */}

                                    <Form.Group className="mb-2">
                                        <Form.Label>Write something about yourself</Form.Label>
                                        <Form.Control
                                            as={'textarea'} rows="6" placeholder="write here"
                                            onChange={(event) => handleChange(event, 'about')}
                                            value={data.about}
                                            isInvalid={errorData.errorData?.response?.data?.about}
                                        />
                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>

                                    </Form.Group>



                                    <Container>
                                        <p className="text-center">Already register !   <a href="">Login </a></p>
                                    </Container>

                                    <Container className="text-center">
                                        <Button
                                            type="submit"
                                            className="text-uppercase"
                                            variant="success"
                                            disabled={loading}
                                        >


                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                                hidden={!loading}
                                            />
                                            <span hidden={!loading}>Wait...</span>
                                            <span hidden={loading}>Register</span>

                                        </Button>
                                        <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>

                                    </Container>

                                </Form>


                            </Card.Body>

                        </Card>



                    </Col>



                </Row>

            </Container>

        )
    }

    return (<Base
        title="Electro Store /  Signup"
        description="Fill the form correctly to register with us. By register with use you can use services tha we provide."
    >
        {registerForm()}
    </Base>
    )
}

export default Register