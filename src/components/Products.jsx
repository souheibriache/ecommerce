import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {popularProducts} from '../data'
import Product from './Product'
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Products = ({category , filters , sort}) => {

    const [products , setProducts] = useState([]);
    const [filteredProducts , setfilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async() => {
            try{
                const res = await axios.get(category ? `http://localhost:5000/api/products?category=${category}` : 'http://localhost:5000/api/products');
                setProducts(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[category]);

    useEffect(()=> {
        category && setfilteredProducts(
            products.filter(product => Object.entries(filters).every(([key , value]) => 
                product[key].includes(value)
            ))
        )
    }, [category , filters]);

    useEffect(() => {
        if(sort === "newest"){
            setfilteredProducts(prev => 
                [...prev].sort((a , b) => a.createdAt - b.createdAt)
                )
        }else if(sort === "asc"){
            setfilteredProducts(prev => 
                [...prev].sort((a , b) => a.price - b.price)
                )
        }else{
            setfilteredProducts(prev => 
                [...prev].sort((a , b) => b.createdAt - a.createdAt)
                )
        }
    },[sort])

    return (
        <Container>
            { products.slice(0,8).map(product => {
                return(
                    <Product item={product} key={product.id} />
                )
            })}
        </Container>
    )
}

export default Products
