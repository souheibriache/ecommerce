import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'


const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #00000011;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    cursor: pointer;
`;

const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
min-height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;
&:hover ${Info} {
    opacity: 1;
}
`;

const Circle = styled.div`
    height:200px;
    width:200px;
    border-radius: 50%;
    background-color: white;
    position:  absolute;
`;
const Image = styled.img`
    height:75%;
    width: 100%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all .3s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;



const Product = ({item}) => {
    return (
        <Container>
            <Circle/>
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>

                <Icon>
                    <SearchOutlined/>
                </Icon>

                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
