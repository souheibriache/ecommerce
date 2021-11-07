import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display: 'none'})};
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7F7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right:  ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: .5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display:flex;
    transform: translate(${props => props.slideIndex * -100}vw);
    transition: all 1s ease;
`;

const SlideContainer = styled.div`
    display: flex;
    align-items: center;
`;
const ImageContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    height: 80%;
    width: 100%;
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};

`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    text-transform: uppercase;
`;

const Title = styled.h1`
    font-size: 50px;
`;
const Description = styled.p`
    margin: 50px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing:3px;
`;
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick('left')} >
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex} >
                {sliderItems.map(slider => {
                    return (
                        <Slide bg={slider.bg} key={slider.id} >
                            <ImageContainer>
                                <Image src={slider.img}/>
                            </ImageContainer>
                            <InfoContainer>
                                <Title>{slider.title}</Title>
                                <Description>{slider.desc}</Description>
                                <Button>shop now</Button>
                            </InfoContainer>
                        </Slide>
                    )
                })}



            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
