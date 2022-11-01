import React , { useEffect , useState } from 'react' ;
import axios from 'axios';
import Product from './Product';

const UserProducts = () => {
  const [user ,setUser] = useState() ;
  const id = localStorage.getItem("userId") ;

  const sendRequest = async () => {
    
   const res = await axios.get(`http://localhost:5000/api/product/user/${id}`) ;
   const data = await res.data ;
   console.log(data) ;
   return data ;

  } 

  useEffect(() => {
   
   sendRequest().then((data) => setUser(data.user)) ;
  },[]) ; // eslint-disable-line
  
  console.log(user) ;
  return (
    <div>
      {" "}
       {user && user.products && user.products.map((product,index) => (
      <Product key={index}
      id={product._id}
      isUser = {true}
      title={product.title}
      description={product.description}
      imageURL={product.image}
      userName = {user.name}
      manufactureDate={product.manufactureDate}
      expiryDate={product.expiryDate}
      
      />
    ))}
    </div>
  )
}

export default UserProducts ;