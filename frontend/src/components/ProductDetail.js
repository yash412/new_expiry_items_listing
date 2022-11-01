import axios from 'axios';
import React , {useEffect ,useState } from 'react' ;
import { useParams , useNavigate} from 'react-router-dom';
import {Box,InputLabel,TextField,Button,Typography} from '@mui/material' ;
const labelStyles = {mb:1,mt:2,fontSize:'24px' ,fontWeight:'bold' } ;
const ProductDetail = () => {
  const navigate = useNavigate() ;
  const [inputs,setInputs] = useState({ })  ;
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState ,
      [e.target.name] : e.target.value ,
     })) ;

  }
  const [product,setProduct] = useState() ;
  const id = useParams().id ;
  console.log(id) ;
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/product/${id}`).catch(err => console.log(err)) ; // eslint-disable-inline
    const data = await res.data ;
    return data ;
  }
  useEffect(()=>{
    fetchDetails().then(data => {
      setProduct(data.product) ;
      setInputs({title:data.product.title ,
                 description:data.product.description 
                 
      }) ;
    })
    //passing id to re-run the component
  },[id]) ; // eslint-disable-line
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/product/update/${id}`,{
      title:inputs.title ,
      description:inputs.description 
     
    }).catch(err => console.log(err)) ;
    const data = await res.data ;
    return data ;
  }
  console.log(product) ;
  const handleSubmit = (e) => {
        e.preventDefault() ;
        console.log(inputs) ;
        sendRequest().then(data => console.log(data)).then(() => navigate("/myproducts")) ;
  }
  return (
    <div>
      {inputs && 
      <form onSubmit={handleSubmit} >
        <Box border={3}  borderRadius={10}
          borderColor =' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,47,121,1) 35%, rgba(0,212,255,1) 100%)'
          boxShadow ="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={3}
          display="flex"
          flexDirection={'column'}
          width={'80%'}
          >
          <Typography fontWeight={'bold'} padding={3}
          color="grey"
          variant='h3'
          textAlign={'center'}
          >Post Your product</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description}  margin='auto' variant='outlined'/>
          
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type="submit"> Submit </Button>
        </Box>
      </form>
              }
    </div>
  )
}

export default ProductDetail ;