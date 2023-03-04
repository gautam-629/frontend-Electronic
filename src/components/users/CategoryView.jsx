

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import defaultCategoryImage from '../../assets/default_profile.jpg'
import { Link } from 'react-router-dom'

const CategoryView = () => {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategores(0, 100000)
    }, [])


    const loadCategores = (pageNumber, pageSize) => {


        getCategories(pageNumber, pageSize).then(data => {
            console.log(data)
            setCategories({ ...data })
        })
            .catch(error => {
                console.log(error);
            })

    }


    const categoryView = () => {
        return categories && (

            <>
                <ListGroup variant='flush' className='stick-top'>

                    <ListGroup.Item action as={Link} to={'/store'}>
                        <img
                            className=' rounded-circle'
                            src={defaultCategoryImage} alt={'default category image'} style={{
                                width: "40px",
                                height: '40px',
                                objectFit: 'cover'
                            }}
                            onError={event => {
                                event.currentTarget.setAttribute('src', defaultCategoryImage)
                            }}

                        />
                        <span className="ms-2 "> All Products</span>
                    </ListGroup.Item>

                    {categories.content.map(cat => (

                        <ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} action key={cat.categoryId}>
                            <img
                                className=' rounded-circle'
                                src={cat.coverImage} alt={cat.title} style={{
                                    width: "40px",
                                    height: '40px',
                                    objectFit: 'cover'
                                }}
                                onError={event => {
                                    event.currentTarget.setAttribute('src', defaultCategoryImage)
                                }}

                            />
                            <span className="ms-2">{cat.title}</span>
                        </ListGroup.Item>

                    ))}


                </ListGroup>

            </>
        )
    }

    return categories && categoryView()
}

export default CategoryView