import { useContext, useEffect, useState } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import UserProfileView from "../../components/users/UserProfileView"
import UserContext from '../../context/UserContext'
import { getUser } from "../../services/user.service"
const Profile = () => {

    const userContext = useContext(UserContext)

    const { userId } = useParams()

    const [user, setUser] = useState(null)

    useEffect(() => {
        // console.log("data from url userid " + userId)
        // if (userContext.userData) {
        //     getUserDataFromServer()
        // }
        getUserDataFromServer()

    }, [userContext.userData])

    const getUserDataFromServer = () => {
        //api call
        console.log(userContext)

        getUser(userId)
            .then(data => {
                console.log(data);
                setUser(data)
            })
            .catch(error => {
                console.log(error)
                setUser(null)
                toast.error("Error in loading user information from server !")
            })

    }


    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col md={
                        {
                            span: 8,
                            offset: 2
                        }
                    }>

                        {(user ? (
                            <UserProfileView
                                user={
                                    // {
                                    //     name: "Durgesh Kumar Tiwari",
                                    //     email: "durgesh@gmail.com",
                                    //     gender: 'MALE',
                                    //     about: "I am professional react developer.",
                                    //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: 'NORMAL' }]
                                    // }
                                    user
                                }
                            />
                        ) : <Alert><h3 className="text-center text-uppercase m-2">User not loaded from server !</h3></Alert>)
                        }

                        {/* {userContext.userData.user.userId} */}
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Profile