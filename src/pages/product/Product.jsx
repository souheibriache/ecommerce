import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import {useState , useMemo , useEffect} from 'react'
import {useParams} from 'react-router'
import {useSelector} from 'react-redux'
import {userRequest} from '../../requestMethods'

export default function Product() {

    const [file , setfile] = useState(null)
    const {productId} = useParams();
    const [productStats , setproductStats] = useState([])
    const pf = process.env.REACT_APP_PUBLIC_FOLDER
    const product = useSelector(state => state.product.products.find(product => product._id === productId))

    const MONTHS = useMemo(
        ()=> [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ] , [])

    useEffect(()=> {
        const getStats = async ()=> {
            try{
                const res = await userRequest.get('orders/income?productId='+product._id);
                res.data.map(item => {
                    setproductStats(prev => [...prev , {name : MONTHS[item._id -1] , Sales: item.total}])
                })
            }catch(e){
                console.log(e)
            }

        }
        getStats()
    }, MONTHS)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={pf + product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>

                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock ? 'YES' : 'NO'} </span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title}  />

                  <label>Product Description</label>
                  <input type="text" placeholder={product.desc}  />

                  <label>Product Price</label>
                  <input type="text" placeholder={product.price}  />

                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      { 
                        <img src={file ? URL.createObjectURL(file) : pf + product.img} alt="" className="productUploadImg" />
                          
                      }
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" onChange={(e) => setfile(e.target.files[0])} accept='.png,.jpeg,.jpg' style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
