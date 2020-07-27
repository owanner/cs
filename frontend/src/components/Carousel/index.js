import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

import './styles.css'

export default Carousel => {

    let slides = [1, 2, 3, 4]
    let cell = [1, 2, 3, 4, 5]
    const [x, setX] = useState(0)

    const goLeft = () => {
        x === 0 ? setX(-100 * (slides.length - 1)) : setX(x + 100)
    }
    const goRight = () => {
        x === - 100 * (slides.length - 1) ? setX(0) : setX(x - 100)
    }

    return (
        <div className="carousel-container">
            <h2>Gênero</h2>

            <div className="slider-container" >
                {
                    <div className="slider">
                        {
                            slides.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="slide"
                                        style={{ transform: `translateX(${x}%)` }}>
                                        {
                                            cell.map((item, index) => {
                                                return (
                                                    <div key={index} className="cell">
                                                        {item}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <button id="left" onClick={goLeft}>
                    <MdKeyboardArrowLeft size={48} color="#321911" />
                </button>
                <button id="right" href="#" onClick={goRight}>
                    <MdKeyboardArrowRight size={48} color="#321911" />
                </button>
            </div>
        </div>
    )
}