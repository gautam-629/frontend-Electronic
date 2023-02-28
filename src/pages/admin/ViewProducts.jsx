
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { getProductImageUrl, PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import { addProductImage, getAllProducts, searchProduct, udpateProductCategory, updateProduct } from "../../services/product.service"
import { Container, Row, Col, Table, Button, Card, Form, Pagination, Modal, FormGroup, InputGroup } from 'react-bootstrap'
import defaultImage from '../../assets/default_profile.jpg'
import ShowHtml from "../../components/ShowHtml"
import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import { getCategories } from "../../services/CategoryService"

const ViewProducts = () => {

    const [previousProducts, setPreviousProducts] = useState(undefined)
    const [products, setProducts] = useState(undefined)
    const [currentProduct, setCurrentProduct] = useState(undefined)
    const editorRef = useRef()
    const [categories, setCategories] = useState(undefined)
    const [imageUpdate, setImageUpdate] = useState({
        image: undefined,
        imagePreview: undefined
    })
    const [categoryChangeId, setCategoryChangeId] = useState('')

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        getCategories(0, 10000)
            .then(data => {
                setCategories({ ...data })
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // view product state variables
    const [show, setShow] = useState(false);
    const closeProductViewModal = () => {
        setShow(false)
    };
    const openProductViewModal = (event, product) => {
        console.log(product)
        setCurrentProduct(product)

        setShow(true)
    };

    //#END view product state variables

    // edit product state variables 

    const [showEditModal, setShowEditModal] = useState(false);

    const closeEditProductModel = (event, product) => {
        setShowEditModal(false)
    }

    const openEditProductModel = (event, product) => {
        setCurrentProduct(product)
        setShowEditModal(true)
    }


    // END edit product state variables 

    useEffect(() => {
        getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
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


    // handleUpdateFormSubmit

    const handleUpdateFormSubmit = (event) => {
        event.preventDefault()
        console.log(currentProduct)
        if (currentProduct.title === '') {
            toast.error("title required")
            return
        }

        //form submit api call

        updateProduct(currentProduct, currentProduct.productId)
            .then(data => {
                console.log(data)


                toast.success("Detail updated ", {
                    position: "top-right"
                })

                // update image also...

                if (imageUpdate.image && imageUpdate.imagePreview) {
                    addProductImage(imageUpdate.image, currentProduct.productId)
                        .then(imageData => {
                            console.log(imageData)
                            setCurrentProduct({
                                ...currentProduct,
                                productImageName: imageData.imageName
                            })
                            toast.success("image updaed", {
                                position: "top-right"
                            })

                            setImageUpdate({
                                image: undefined,
                                imagePreview: undefined
                            })
                        }).catch(
                            error => {
                                console.log(error)
                                toast.error("Error in updating image", {
                                    position: "top-right"
                                })
                            }
                        )
                }

                // category update:
                if (categoryChangeId === 'none' || categoryChangeId === currentProduct.category?.categoryId) {

                } else {

                    udpateProductCategory(categoryChangeId, currentProduct.productId)
                        .then(catData => {
                            console.log(catData)
                            toast.success("Category Updated ", {
                                position: "top-right"
                            })
                            setCurrentProduct({
                                ...currentProduct,
                                category: catData.category
                            })


                            const newArray = products.content.map(p => {
                                if (p.productId === currentProduct.productId)
                                    return catData
                                return p
                            })

                            setProducts({
                                ...products,
                                content: newArray
                            })



                        })
                        .
                        catch(error => {
                            console.log(error)
                        })

                }





                const newArray = products.content.map(p => {
                    if (p.productId === currentProduct.productId)
                        return data
                    return p
                })

                setProducts({
                    ...products,
                    content: newArray
                })



            })


    }

    //handle udpate file change

    const handleFileChange = (event) => {
        if (event.target.files[0].type === 'image/png' || event.target.files[0].type == 'image/jpeg') {
            //preview show
            const reader = new FileReader()
            reader.onload = (r) => {
                setImageUpdate({
                    imagePreview: r.target.result,
                    image: event.target.files[0]
                })
            }

            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("Invalid File !!")
            setImageUpdate({
                image: undefined,
                imagePreview: undefined
            })
        }
    }
    //
    const updateProductList = (productId) => {
        const newArray = products.content.filter(p => p.productId != productId)
        setProducts({
            ...products,
            content: newArray
        })
    }


    // modal view:
    const viewProductModalView = () => {
        return currentProduct && (
            <>
                <Modal size={"xl"} animation={false} show={show} onHide={closeProductViewModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentProduct.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="shadow-sm">
                            <Card.Body>

                                {/* {product picture} */}
                                <Container className="text-center py-3">

                                    <img style={{
                                        height: '300px'
                                    }} src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId) : defaultImage} alt="" />
                                </Container>

                                {/* information table  */}

                                <Table striped bordered responsive className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>Product Id</td>
                                            <td className="fw-bold">{currentProduct.productId}</td>

                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td className="fw-bold">{currentProduct.quantity}</td>

                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td className="fw-bold"> {currentProduct.price} ₹ </td>

                                        </tr>
                                        <tr>
                                            <td>Discounted Price</td>
                                            <td className="fw-bold">  {currentProduct.discountedPrice} ₹</td>

                                        </tr>
                                        <tr className={currentProduct.live ? '' : 'table-danger'}>
                                            <td>Live</td>
                                            <td className="fw-bold">{currentProduct.live ? 'True' : 'False'}</td>

                                        </tr>
                                        <tr className={currentProduct.stock ? '' : 'table-danger'}>
                                            <td>Stock</td>
                                            <td className="fw-bold">{currentProduct.stock ? 'In Stock' : 'Not in Stock'}</td>

                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td className="fw-bold">{currentProduct.category?.title}</td>

                                        </tr>
                                    </tbody>

                                </Table>


                                {/* description */}

                                <div className="p-3 border border-1" >

                                    <ShowHtml htmlText={currentProduct.description} />

                                </div>
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeProductViewModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={closeProductViewModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )


    }


    //update modal

    const editProductModalView = () => {
        return currentProduct && (
            <>


                <Modal size="xl" animation={false} show={showEditModal} onHide={closeEditProductModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {/* {JSON.stringify(currentProduct)} */}


                        <Form onSubmit={handleUpdateFormSubmit} >

                            {/* product title */}
                            <FormGroup className="mt-3">
                                <Form.Label>Product title</Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Enter here"
                                    value={currentProduct.title}
                                    onChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        title: event.target.value
                                    })}


                                />
                            </FormGroup>

                            {/* product description */}

                            <Form.Group className="mt-3" >

                                <Form.Label>Product Description</Form.Label>

                                {/* <Form.Control
                                            as={'textarea'}
                                            rows={6}
                                            placeholder="Enter here"

                                            onChange={(event) => setProduct({
                                                ...product,
                                                description: event.target.value
                                            })}

                                            value={product.description}
                                          /> */}

                                <Editor

                                    apiKey=""
                                    onInit={(evt, editor) => editorRef.current = editor}

                                    init={{
                                        height: 380,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    value={currentProduct.description}
                                    onEditorChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        description: editorRef.current.getContent()
                                    })}



                                />

                            </Form.Group>

                            <Row>
                                <Col>
                                    {/* price */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number"
                                            placeholder="Enter here"
                                            value={currentProduct.price}
                                            onChange={event => setCurrentProduct({
                                                ...currentProduct,
                                                price: event.target.value
                                            })}


                                        />
                                    </FormGroup>


                                </Col>

                                <Col>

                                    {/* discounted price */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Discounted Price</Form.Label>
                                        <Form.Control

                                            type="number"

                                            placeholder="Enter here"

                                            value={currentProduct.discountedPrice}
                                            onChange={event => setCurrentProduct({
                                                ...currentProduct,
                                                discountedPrice: event.target.value
                                            })}




                                        />
                                    </FormGroup>

                                </Col>
                            </Row>

                            {/* Product quantity */}

                            <Form.Group className="mt-3" >

                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter here"
                                    value={currentProduct.quantity}
                                    onChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        quantity: event.target.value
                                    })}


                                />
                            </Form.Group>

                            <Row className="mt-3 px-1">
                                <Col>
                                    <Form.Check

                                        type="switch"
                                        label={"Live"}
                                        checked={currentProduct.live}
                                        onChange={event => setCurrentProduct({
                                            ...currentProduct,
                                            live: !currentProduct.live
                                        })}


                                    />
                                </Col>
                                <Col>

                                    <Form.Check
                                        type="switch"
                                        label={"Stock"}
                                        checked={currentProduct.stock}
                                        onChange={event => setCurrentProduct({
                                            ...currentProduct,
                                            stock: !currentProduct.stock
                                        })}


                                    />

                                </Col>
                            </Row>

                            {/* product image */}
                            <Form.Group className="my-5">
                                <Container className="text-center  py-4 border border-2">
                                    <p className="text-muted">Image Preview</p>
                                    <img
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "250px"
                                        }}
                                        src={imageUpdate.imagePreview ? imageUpdate.imagePreview : getProductImageUrl(currentProduct.productId)}
                                        alt="" />
                                </Container>
                                <Form.Label>Select product image</Form.Label>
                                <InputGroup>
                                    <Form.Control type={'file'}
                                        onChange={(event) => handleFileChange(event)}

                                    />

                                    <Button

                                        onClick={event => {
                                            setImageUpdate({
                                                imagePreview: undefined,
                                                image: undefined

                                            })
                                        }}

                                        variant="outline-secondary">Clear</Button>
                                </InputGroup>
                            </Form.Group>


                            {/* {JSON.stringify(categoryChangeId)} */}
                            <Form.Group className="mt-3">
                                <Form.Label >Select Category</Form.Label>
                                <Form.Select onChange={(event) => {
                                    setCategoryChangeId(event.target.value)
                                }} >
                                    <option value="none">None</option>
                                    {
                                        categories && categories.content.map(cat => {
                                            return (
                                                <option selected={cat.categoryId == currentProduct.category?.categoryId} value={cat.categoryId} key={cat.categoryId}>{cat.title}</option>
                                            )
                                        })
                                    }

                                </Form.Select>


                            </Form.Group>
                            <Container className="text-center mt-3">
                                <Button type="submit" variant="success" size="sm">Save Details</Button>
                            </Container>

                        </Form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEditProductModel}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }


    // search product
    const searchProducts = () => {
        if (searchQuery === undefined || searchQuery.trim() === '') {
            return
        }

        //call server api to serach
        searchProduct(searchQuery)
            .then(data => {
                if (data.content.length <= 0) {
                    toast.info("No result found")
                    return
                }
                setPreviousProducts(products)
                setProducts(data)
            }).catch(
                error => {
                    console.log(error)
                    toast.error("Error in searching the products", {
                        position: "top-right"
                    })
                }
            )
    }

    ///products view
    const productsView = () => {
        return (
            <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">View Products</h5>
                    <Form.Group className="mb-2">
                        <Form.Label>Search Product</Form.Label>
                        <InputGroup>
                            <Form.Control
                                onChange={(event) => {
                                    if (event.target.value === '') {

                                        if (previousProducts) {
                                            setProducts(previousProducts)
                                        }

                                    }

                                    setSearchQuery(event.target.value)
                                }}


                                value={searchQuery}
                                type="text" placeholder="Seach here" />
                            <Button onClick={searchProducts} variant="outline-secondary">Search</Button>
                        </InputGroup>
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
                                    <SingleProductView
                                        key={index}
                                        index={index}
                                        product={product}
                                        updateProductList={updateProductList}
                                        openProductViewModal={openProductViewModal}
                                        openEditProductModel={openEditProductModel}

                                    />
                                ))
                            }
                        </tbody>
                    </Table>
                    <Container className=" d-flex justify-content-end" >

                        <Pagination size="md">
                            {/* 0 -- totalpages-1 */}

                            <Pagination.First />

                            <Pagination.Prev onClick={(event) => {
                                if ((products.pageNumber - 1) < 0)
                                    return
                                getProducts(products.pageNumber - 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                            }} />
                            {
                                // [0,1,2,3,4]
                                [...Array(products.totalPages)].map((ob, i) => i).map(item => {
                                    return products.pageNumber == item ? <Pagination.Item active key={item}>{item + 1}</Pagination.Item> : <Pagination.Item onClick={(event) => {
                                        getProducts(item, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                                    }} key={item}>{item + 1}</Pagination.Item>
                                }

                                )
                            }

                            <Pagination.Next onClick={(event) => {
                                if (products.lastPage)
                                    return
                                getProducts(products.pageNumber + 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                            }} />


                            <Pagination.Last />


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

            {
                viewProductModalView()

            }

            {
                editProductModalView()
            }


        </>
    )
}

export default ViewProducts