import React from 'react'

import './styles.css'

import Carousel from '../../components/Carousel'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default Home => {
    return (
        <>
            <Header />
            <div className="home-container" >
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
            </div>
            <Footer />
        </>

    )
}