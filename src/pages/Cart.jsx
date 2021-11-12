import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Anouncment from "../components/Anouncment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from "react";
import { TOKEN, userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom'
import { emptyingCart } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Cart = () => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const publishableKey = process.env.REACT_APP_STRIPE

  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token)
  }
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,

        })
        console.log(res.data)
        const newOrder = {
          userId: user._id,
          products: cart.products.map(product => {
            return { productId: product._id, quantity: product.quantity }
          }),
          amount: cart.totalPrice,
          address: res.data.billing_details.address
        }
        console.log('new order' , newOrder)
        const order = await userRequest.post('/orders', newOrder );
        console.log('order', order)
        dispatch(emptyingCart())
        window.location.href = '/'
        // navigate('/success', { data: res.data })
      } catch (err) {
        console.log(err)
      }
    }
    stripeToken && cart.totalPrice > 1 && makeRequest()
  }, [stripeToken])

  const orderTest = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("token", `Bearer ${TOKEN}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("userId", user._id);
      urlencoded.append("address", "MONACO");
      urlencoded.append("amount", cart.totalPrice);
      urlencoded.append("status", "pending");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/api/orders", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } catch (err) {
      console.log(err)
    }
  }

  const CheckoutButton = () => (<StripeCheckout name='ecommerce' image='https://lh3.google.com/u/0/ogw/ADea4I7Q6SYzYT8CVqXYGuuLC3tUHNKxsmCaqwyxmQY1=s192-c-mo'
    billingAddress shippingAddress description={'your total is $ ' + cart.totalPrice} amount={cart.totalPrice * 100} token={onToken}
    stripeKey={publishableKey}>
    <Button>CHECKOUT NOW</Button>
  </StripeCheckout>)

  return (
    <Container>
      <Navbar />
      <Anouncment />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate('/products')} >CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText onClick={(e) => orderTest()} >Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <CheckoutButton />
        </Top>
        <Bottom>
          <Info>
            {
              cart.products.map(product => {
                return (
                  <>
                    <Product>
                      <ProductDetail>
                        <Image src={pf + product.img} />
                        <Details>
                          <ProductName>
                            <b>Product: </b> {product.title}
                          </ProductName>
                          <ProductId>
                            <b>ID: </b> {product._id}
                          </ProductId>
                          <ProductColor color={product.color} />
                          <ProductSize>
                            <b>Size: </b> {product.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add />
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Remove />
                        </ProductAmountContainer>
                        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </>
                )
              })
            }

          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <CheckoutButton />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
