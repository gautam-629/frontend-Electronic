import { useContext } from "react"
import { Button, Card, Container, Table } from "react-bootstrap"
import UserContext from "../../context/UserContext"
import { BASE_URL } from "../../services/helper.service"
import profileImage from "./../../assets/default_profile.jpg"

const UserProfileView = ({ user = null, handleShowModal }) => {

    const { userData, isLogin } = useContext(UserContext)

    const profileStyle = {
        height: "200px",
        width: "200px",
        borderRadius: "50%",
        objectFit: "cover"
    }

    return (

        <>
            {
                (user && (
                    <Card className="m-3 border-0 shadow">
                        <Card.Body  >
                            <Container className="text-center my-3 ">
                                <img

                                    onError={(event) => {
                                        console.log("error")
                                        event.currentTarget.setAttribute("src", profileImage)
                                    }}
                                    className="border border-dark" style={profileStyle} src={user.imageName ? BASE_URL + '/users/image/' + user.userId + '?' + new Date().getTime() : profileImage} alt="Profile Image" />
                            </Container>

                            <h1 className="text-center text-uppercase fw-bold text-primary">  {user.name} </h1>
                            <div className="mt-3">

                                <Card className=" border-0 shadow-sm " style={{
                                    borderRadius: "50px"
                                }}>
                                    <Card.Body>
                                        <Table className="text-center " responsive hover  >

                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td>{user.gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>About</td>
                                                    <td>{user.about}</td>
                                                </tr>
                                                <tr>
                                                    <td>Roles</td>
                                                    <td>{user.roles.map(role => <div key={role.roleId}>{role.roleName}</div>)}</td>
                                                </tr>
                                            </tbody>

                                        </Table>

                                    </Card.Body>
                                </Card>

                            </div>




                            {
                                (isLogin && userData.user.userId === user.userId) ? (
                                    <Container className="text-center mt-3">
                                        <Button variant="success" size="lg" onClick={handleShowModal}>Update</Button>
                                        <Button className="ms-2" variant="warning" size="lg">Orders</Button>
                                    </Container>
                                ) : ''
                            }

                        </Card.Body>
                    </Card>
                ))
            }
        </>

    )
}
export default UserProfileView