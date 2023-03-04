import { ListGroup, Badge } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { GrHome } from 'react-icons/gr'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { MdAddBox } from 'react-icons/md'
import { MdViewDay } from 'react-icons/md'
import { FaOpencart } from 'react-icons/fa'
import { FaUserSecret } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { HiOutlineLogout } from 'react-icons/hi'
import { useContext } from "react"
import UserContext from '../../context/UserContext'
const SideMenu = () => {

    const { logout } = useContext(UserContext)

    return (<>
        <ListGroup variant="flush" className="sticky-top"   >

            <ListGroup.Item as={NavLink} to="/admin/home" action>

                <GrHome size={20} />

                <span className="ms-2 "> Home</span>

            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/add-category" action>

                <BiCategory size={20} />
                <span className="ms-2"> Add Category</span>

            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/categories" action>
                <MdOutlineCategory size={20} />
                <span className="ms-2">  View Categories</span>

            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                <MdAddBox size={20} />
                <span className="ms-2">
                    Add Product
                </span>
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/products" action>
                <MdViewDay size={20} />
                <span className="ms-2">
                    View Products</span>
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/orders" action>
                <FaOpencart size={20} />
                <span className="ms-2">
                    Orders
                </span>
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/users" className="d-flex justify-content-between align-items-start" action>
                <div>
                    <FaUserSecret size={20} />

                    <span className="ms-2"> Users</span>

                </div>
                <Badge bg="danger" pill>
                    New
                </Badge>

            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/users/home" action>
                <MdDashboard size={20} />
                <span className="ms-2">
                    Dashboard
                </span>
            </ListGroup.Item>
            <ListGroup.Item action onClick={(event) => {
                logout()
            }}>
                <HiOutlineLogout size={20} />
                <span className="ms-2">
                    Logout
                </span>
            </ListGroup.Item>

        </ListGroup>
    </>)
}

export default SideMenu