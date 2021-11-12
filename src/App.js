import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useState , useEffect } from "react";

function App() {
  const location = window.location.href.split('/')[3];
  const ls = JSON.parse(localStorage.getItem("persist:root"))
  const [admin , setAdmin] = useState(false)
  useEffect(()=> {
    ls && setAdmin(ls.user ? JSON.parse(ls.user).currentUser?.isAdmin : false)
  },[ls?.currentUser])
  return (
    <Router>
      
        
          
            <Routes>
              <Route element={ <Login />} exact path="/login" />
            </Routes>
          
           {admin && <><Topbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route element={<Home />} exact path="/" />
                <Route element={<UserList />} path="/users" />
                <Route element={<User />} path="/user/:userId" />
                <Route element={<NewUser />} path="/newUser" />
                <Route element={<ProductList />} path="/products" />
                <Route element={<Product />} path="/product/:productId" />
                <Route element={<NewProduct />} path="/newproduct" />

              </Routes>
            </div></>}
          
      

    </Router>
  );
}

export default App;
