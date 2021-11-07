import { Badge } from '@material-ui/core';
import { Search , ShoppingCartOutlined} from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'

const Container = styled.div`
    height : 60px;
    ${mobile({height: '50px'})};
`;

const Wrapper = styled.div`
padding: 10px 20px;
display: flex ;
align-items: center;

${mobile({padding: "10px 0"})};

`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size :14px;
    cursor : pointer;
    ${mobile({display: 'none'})};
`;

const SearchContainer = styled.div`
    border : 1px solid lightgray;
    display: flex ;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({marginLeft: '10px'})};

`;

const Input = styled.input`
    border: none ;
    outline : none;
    ${mobile({width: '50px'})};
`;

const Center = styled.div`
flex: 1;
text-align: center; 
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: '24px'})}
`;


const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({justifyContent: 'center' , flex: 2})};
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-right: 25px;
    ${mobile({fontsize: '12px' , marginLeft: '10px'})};
`;


function Navbar() {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>En</Language>
                    <SearchContainer>
                        <Input  placeholder="Search"/>
                        <Search style={{color : 'gray' , fontsize : '16px'}} />
                    </SearchContainer>
                </Left>
                <Center><Logo>SHOP</Logo></Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Sign in</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
