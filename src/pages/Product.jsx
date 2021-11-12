import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Anouncment from "../components/Anouncment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import {useParams} from 'react-router-dom'
import { useState , useEffect} from "react";
import { publicRequest } from "../requestMethods";
import {addProduct} from '../redux/cartRedux'
import axios from 'axios'
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER
  const {productId} = useParams();
  const [product, setProduct] = useState({});
  const [quantity , setQuantity] = useState(1)
  const [color , setcolor] = useState("")
  const [size , setsize] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    const getProduct = async() => {
      try{
        const res = await publicRequest.get('/products/find/'+productId)
        setProduct(res.data)

      }catch(err){
        console.log(err);
      }
    }
    getProduct()
  }, [productId, ])

  const handleClick = () => {
    //UPDATE OUR CART
    dispatch(addProduct({... product , quantity , color , size , price : product.price}))

    
  }

  return (
    <Container>
      <Navbar />
      <Anouncment />
      <Wrapper>
        <ImgContainer>
          <Image src={pf+product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map(c => <FilterColor color={c} key={c} onClick={() => setcolor(c)}/> )}
              {/* <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" /> */}
            </Filter>
            <Filter>
              <FilterTitle onChange={(e) => setsize(e.target.value)} >Size</FilterTitle>
              <FilterSize>
              {product.size?.map(s => <FilterSizeOption key={s} >{s}</FilterSizeOption> )}
                {/* <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption> */}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => setQuantity(quantity === 1 ? 1 :quantity-1)} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => setQuantity(quantity+1)} />
            </AmountContainer>
            <Button onClick={handleClick} >ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
