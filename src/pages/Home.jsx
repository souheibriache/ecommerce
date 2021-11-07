import React from 'react'
import Anouncment from '../components/Anouncment'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

function Home() {
    return (
        <div>
            <Anouncment/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/> 
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
