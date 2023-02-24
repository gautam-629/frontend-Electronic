import { Button, Card, Col, Container, Row } from "react-bootstrap"
import image from '../assets/logo.png'
const CategoryView = ({ category, deleteCat, viewCat, updateCat }) => {
    const imageStyle = {
        width: "100px",
        height: "100px",
        objectFit: "cover"
    }

    const deleteCategory = (categoryId) => {
        deleteCat(categoryId)
    }
    return (
        <div className="mb-3">
            <Card className="border-bottom shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={2} className="text-center">
                            <img src={(category.coverImage ? (category.coverImage.startsWith("http") ? category.coverImage : image) : image)} className="rounded-circle" style={imageStyle} alt="" />
                        </Col>

                        <Col md={8}>
                            <h5>{category.title}</h5>
                            <p>{category.description}</p>


                        </Col>
                        <Col md={2}>
                            <Container className="d-grid ">
                                <Button size="sm" variant="danger" onClick={(event) => deleteCategory(category.categoryId)}>Delete</Button>
                                <Button className="mt-1" size="sm" variant="info" onClick={(event) => viewCat(category)}>View</Button>

                                <Button className="mt-1" size="sm" variant="warning" onClick={(event) => updateCat
                                    (category)}>Update</Button>

                            </Container>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CategoryView