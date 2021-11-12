import "./newProduct.css";
import { useState } from 'react'
import styled from 'styled-components'
import { Cancel, CloudUpload, Publish } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";
import {useDispatch} from 'react-redux'
import { addProduct } from "../../redux/apiCalls";

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  margin-left: 50px;
  justify-content : space-between;
  align-items : start;
  margin-top: 0px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
`;
const Title = styled.label`
  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`;
const ColorItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

`;
const Color = styled.div`
  height:15px;
  width: 15px;
  border-radius: 50%;
  
  background-color: ${props => props.bg};
  border: ${props => props.selected ? '4px solid #b4b4b4' : '4px solid #f3f3f3}'};
`;
const ColorSpan = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

const SizeItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const Size = styled.div`
  height:15px;
  width: 15px;
  border-radius: 50%;
  border: ${props => props.selected ? '4px solid #b4b4b4' : '4px solid #f3f3f3}'};

`;

const SizeSpan = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

const Selections = styled.div`
  display: flex;
  padding-top: 0;
  flex :3 ;
  margin-right: 30px;

`;

const ImgInputContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction : column;
  align-items : center;
`;

const UploadImgContainer = styled.div`
  position: relative;
  margin-top: 10px;
  svg{
    position: absolute;
    top: 0;
    right : 0;
    opacity : .5;
    cursor : pointer;
  }

`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
  
`;



export default function NewProduct() {
  const dispatch = useDispatch()
  const initialState = {
    title: '',
    desc: '',
    price: '',
    inStock: false,
    color: [],
    size: [],
    categories: [],
    img: ''
  }
  const [product, setProduct] = useState(initialState);

  const [colors, setColors] = useState([
    { color: 'red', selected: false },
    { color: 'green', selected: false },
    { color: 'blue', selected: false },
    { color: 'black', selected: false },
    { color: 'yellow', selected: false },
    { color: 'white', selected: false },
    { color: 'gray', selected: false },
  ]
  )

  const [sizes, setsizes] = useState([
    { id: 1, size: 'XS', selected: false },
    { id: 2, size: 'S', selected: false },
    { id: 3, size: 'M', selected: false },
    { id: 4, size: 'L', selected: false },
    { id: 5, size: 'XL', selected: false },
    { id: 6, size: 'XXL', selected: false },
    { id: 7, size: 'XXXL', selected: false },
  ]
  )

  const [categories, setcategories] = useState([
    { id: 1, category: 'Men', selected: false },
    { id: 2, category: 'Women', selected: false },
    { id: 3, category: 'Pants', selected: false },
    { id: 4, category: 'Shoes', selected: false },
    { id: 5, category: 'Coats', selected: false },
    { id: 6, category: 'Hats', selected: false },
    { id: 7, category: 'Shirts', selected: false },
  ]
  )

  const [file, setfile] = useState(null)

  const handleChange = (e) => {
    
    setProduct(  {...product , [e.target.name] : e.target.name === "inStock" ? e.target.checked : e.target.value})
    console.log(product)
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const newProduct = {
      title: product.title,
      desc: product.desc,
      price: product.price,
      inStock: product.inStock,
      color: colors.filter(color => color.selected === true).map(item => item.color),
      size: sizes.filter(color => color.selected === true).map(item => item.size),
      categories: categories.filter(color => color.selected === true).map(item => item.category),
      img: ''
  }

  if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    newProduct.img = fileName;
    console.log(newProduct);

    try {
        await userRequest.post('http://localhost:5000/api/upload', data)

    } catch (err) {
        console.log(err)
    }

    try {
      addProduct(newProduct , dispatch)
      setProduct(initialState)
      // await userRequest.post('http://localhost:5000/api/products', newPost).then(result => window.location.reload())
  } catch (err) { console.log(err) }
}

  }


  return (
    <div className="newProduct">

      <h1 className="addProductTitle">New Product</h1>

      <form className="addProductForm" onSubmit={(e) => handleSubmit(e)}  >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div className="addProductItem">
              <label htmlFor="title" >Name</label>
              <input onChange={(e) => handleChange(e)} value={product.title} type="text" name='title' placeholder="Product name" />
            </div>

            <div className="addProductItem">
              <label htmlFor='price' >Price</label>
              <input onChange={(e) => handleChange(e)} value={product.price} type="number" name='price' placeholder="Price $ " />
            </div>

            <div className="addProductItem">
              <label style={{ width: '60vw' }} htmlFor='desc' >Description</label>
              <textarea style={{height: '100px'}} onChange={(e) => handleChange(e)} value={product.desc} name='desc' placeholder="Product description " />
            </div>


          </div>

          <Selections>
            <OptionsContainer>

              <Container>
                <Title>Colors</Title>
                {colors.sort((a, b) => a.color.localeCompare(b.color)).map(color => {
                  return (
                    <ColorItem key={color.color} onClick={() => {
                      // colors[colors.findIndex(c => c.color === color.color)].selected = true;
                      setColors(prev => [...prev.filter(elem => elem.color !== color.color), { ...color, selected: !color.selected }])
                    }}>
                      <Color bg={color.color} selected={color.selected} />
                      <ColorSpan>{color.color}</ColorSpan>
                    </ColorItem>
                  )
                })}



              </Container>
              <Container>
                <Title>Sizes</Title>
                {sizes.sort((a, b) => a.id - b.id).map(size => {
                  return (
                    <SizeItem key={size.id} onClick={() => {
                      // colors[colors.findIndex(c => c.color === color.color)].selected = true;
                      setsizes(prev => [...prev.filter(elem => elem.id !== size.id), { ...size, selected: !size.selected }])
                    }}>
                      <Size selected={size.selected} />
                      <SizeSpan>{size.size}</SizeSpan>
                    </SizeItem>
                  )
                })}


              </Container>

              <Container>
                <Title>Categories</Title>
                {categories.sort((a, b) => a.id - b.id).map(category => {
                  return (
                    <SizeItem key={category.id} onClick={() => {
                      // colors[colors.findIndex(c => c.color === color.color)].selected = true;
                      setcategories(prev => [...prev.filter(elem => elem.id !== category.id), { ...category, selected: !category.selected }])
                    }}>
                      <Size selected={category.selected} />
                      <SizeSpan>{category.category}</SizeSpan>
                    </SizeItem>
                  )
                })}


              </Container>
            </OptionsContainer>
            <ImgInputContainer>
              <label htmlFor='img'><Publish /></label>
              <input type="file" id="img" name="img" onChange={(e) => setfile(e.target.files[0])} accept='.png,.jpeg,.jpg,.jfif' style={{ display: "none" }} />

              <UploadImgContainer>
                <Image src={file ? URL.createObjectURL(file) : "https://www.bevi.com/static/files/0/ecommerce-default-product.png"} ></Image>
                {file && <Cancel onClick={() => setfile(null)} />}
              </UploadImgContainer>


            </ImgInputContainer>
          </Selections>

        </div>
        <div style={{width: '91.5%', marginTop : 20 ,display: 'flex' ,alignItems: 'center' , justifyContent: 'space-between'}} >
          <div className="addProductItem" style={{display: 'flex', flexDirection: 'row-reverse' , alignItems: 'center'}}>
            <label style={{marginLeft:10 , flex: 1}} htmlFor='desc' >In Stock</label>
            <input onChange={(e) => handleChange(e)} value={product.inStock}  type="checkbox" name='inStock' />
          </div>
          <button type="submit"  style={{ width: '120px' , fontSize: '18px'}}className="addProductButton">Create</button>
        </div>
      </form>
    </div>
  );
}
