import React , { useState }from 'react' ;
import { Box ,TextField ,Button ,Typography, InputLabel } from '@mui/material' ;
import axios from 'axios';
import {useNavigate} from 'react-router-dom' ;

const labelStyles = {mb:1,mt:2,fontSize:'24px' ,fontWeight:'bold' } ;
const AddProduct = () => {
  
  const navigate = useNavigate() ;
  const [inputs,setInputs] = useState({
    title:"",
    description:"" ,
    manufactureDate:"",
    expiryDate:"",
    imageURL:""

  })  ;
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState ,
      [e.target.name] : e.target.value ,
     })) ;

  }
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/product/add" ,{
      title:inputs.title ,
      description:inputs.description ,
      manufactureDate:inputs.manufactureDate,
    expiryDate:inputs.expiryDate,
      image: inputs.imageURL ,
      user: localStorage.getItem("userId")
    }).catch(err => console.log(err)) ;
    const data =await res.data ;
    return data ;
  }


  const handleSubmit = (e) => {
    e.preventDefault() ;
    console.log(inputs) ;
    sendRequest().then(data => console.log(data)).then(() => navigate("/products")) ;
 }
  return (
    <div>
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
          <Typography  fontFamily='Roboto !important'  fontWeight={'bold'} padding={3}
          color="grey"
          variant='h3'
          textAlign={'center'}
          >Post Your product</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description}  margin='auto' variant='outlined'/>
          <InputLabel sx={labelStyles}>Manufactue Date</InputLabel>
          <TextField name="manufactureDate" onChange={handleChange} value={inputs.manufactureDate} margin='auto' variant='outlined'/>
          <InputLabel sx={labelStyles}>Expiry Date</InputLabel>
          <TextField name="expiryDate" onChange={handleChange} value={inputs.expiryDate} margin='auto' variant='outlined'/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL}  margin='auto' variant='outlined'/>
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type="submit"> Submit </Button>
        </Box>
      </form>
    </div>
  ) ;
}

export default AddProduct ;