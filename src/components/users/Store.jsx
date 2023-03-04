import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Breadcrumb, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import defaultCategoryImage from '../../assets/default_profile.jpg'
import { getAllLive, getAllProducts } from '../../services/product.service'
import { toast } from 'react-toastify'
import SingleProductCard from './SingleProductCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SOTRE_PAGE_PRODUCT_SIZE } from '../../services/helper.service'
import { Link } from 'react-router-dom'
import CategoryView from './CategoryView'





function Store() {


    const [products, setProducts] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {

        loadProducts(currentPage, SOTRE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
    }, [])

    useEffect(() => {

        if (currentPage > 0) {
            loadProducts(currentPage, SOTRE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
        }

    }, [currentPage])

    //loading next page 
    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }






    const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
        getAllLive(pageNumber, pageSize, sortBy, sortDir)
            .then(data => {
                console.log(data)

                if (currentPage > 0) {

                    setProducts({
                        content: [...products.content, ...data.content],
                        lastPage: data.lastPage,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages
                    })

                } else {
                    setProducts({ ...data })
                }
            })
            .catch(error => {
                console.log(error)
                toast.error("Error in loading products ")
            })
    }




    const productsView = () => {
        return products && (



            <InfiniteScroll
                dataLength={products.content.length}
                next={loadNextPage}
                hasMore={!products.lastPage}
                loader={<h3 className='my-5 text-center'>Loading more products...</h3>}
                endMessage={<p className='my-4 text-center'>All Products loaded</p>}


            >
                <Container fluid>
                    <Row>
                        {
                            products.content.map(p => (

                                <Col key={p.productId} md={4} >
                                    <SingleProductCard product={p} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </InfiniteScroll>


        )
    }




    return (


        <Container fluid className='px-5 pt-5'>
            <Row >
                <Container >
                    <Breadcrumb className='mx-5'>
                        <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                        <Breadcrumb.Item>All Products</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
                <Col md={2} >
                    <CategoryView />
                </Col>
                <Col md={10}>
                    {productsView()}
                </Col>
            </Row>
        </Container>


    )
}

export default Store