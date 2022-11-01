import React ,{ useEffect , useState } from 'react' ;
import axios from 'axios';
import Product from './Product';

const Products = () => {
  const [products , setProducts] = useState() ;
  const sendRequest = async() => {
      const res = await axios.get("http://localhost:5000/api/product").catch(err => console.log(err)) ;
      const data = await res.data ;
      return data ;
    }
  useEffect(()=>{ 
   sendRequest().then(data =>setProducts(data.products)) ;
  } ,[]) ;
  console.log(products) ;
  return (
    <div>
    {products && products.map((product,index) => (
      <Product
      key={index}
      id={product._id}
      //add checks to edit or delete icon(isUser)
      isUser = {localStorage.getItem("userId") === product.user._id}
      title={product.title}
      description={product.description}
      imageURL={product.image}
      userName = {product.user.name}
      manufactureDate={product.manufactureDate}
      expiryDate={product.expiryDate}
      
      />
    ))}
    </div>
  )
}

export default Products ;