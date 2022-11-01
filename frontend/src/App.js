import Header from "./components/Header";
import React, { useEffect } from "react";
import {Routes,Route} from 'react-router-dom' ;
import Auth from './components/Auth' ;
import Products from './components/Products';
import UserProducts from './components/UserProducts' ;
import ProductDetail from './components/ProductDetail' ;
import AddProduct from './components/AddProduct' ;
import { useSelector , useDispatch} from 'react-redux' ;
import { authActions } from "./store";
function App() {
  const dispatch = useDispatch() ;
  const isLoggedIn = useSelector(state => state.isLoggedIn) ; ;
  console.log(isLoggedIn) ;
  useEffect(() => {
    if(localStorage.getItem("userId")){
       dispatch(authActions.login()) ;
    }
  } ,[dispatch]) ; // while re rendering the body 
  return (
    <React.Fragment>{/* Parent element of all of the elements inside that*/}
    <header>{/* React.Fragment consists header tags */}
      <Header/>
    </header>
    <main>{/* Inside main we can add routing functionality */}
     <Routes>
      { !isLoggedIn ?  <Route path='/auth' element={<Auth/>} /> :
      <>
     <Route path='/products' element={<Products/>} />
     <Route path='/products/add' element={<AddProduct/>} />
     <Route path='/myProducts' element={<UserProducts/>} />
     <Route path='/myProducts/:id' element={<ProductDetail/>} />
     </>
    
     }
     </Routes> 
    </main>
    </React.Fragment>
  );
}

export default App;
