import React , { useState }from 'react' ;
import { useDispatch } from 'react-redux' ;
import { Box ,TextField,Typography ,Button } from '@mui/material' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom' ;
import { authActions } from '../store';
//import { authActions } from '../store';
// After login we store the user id in local storage
const Auth = () => {
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ; // after login update the redux (data)
  const [inputs,setInputs] = useState({
    name:"",
    email:"" ,
    password:""

  })  ;
  const [isSignup ,setIsSignup] = useState(false) ;
  const handleChange = (e) => {
     setInputs((prevState) => ({
      ...prevState ,
      [e.target.name] : e.target.value ,
     })) ;
  }
  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`
     , {
      name:inputs.name ,
      email:inputs.email ,
      password:inputs.password
     }).catch(err => console.log(err)) ; //axios is promise
     
     const data = res.data ;
     return data ;

    }
  const handleSubmit = (e) => {
    e.preventDefault() ;
    console.log(inputs) ;
    if(isSignup){
     sendRequest("signup").then(data => localStorage.setItem("userId" ,data.user._id) )
     .then(() => dispatch(authActions.login()))
     .then(() => navigate("/products")) ; // localStorege is available globally in side the javascript
    }else{
      sendRequest()
      .then(data => localStorage.setItem("userId" ,data.user._id) )
      .then(() => dispatch(authActions.login())).then(() => navigate("/products")) ; // use dispatch before calling the data
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} 
        flexDirection={'column'} 
        alignItems='center'
        justifyContent={'center'}
        boxShadow="10px 10px 20px #ccc" // vertical horizontal blur color(light gray#ccc)
        padding={3}
        margin='auto'
        marginTop={5}
        borderRadius={5}
        maxWidth={400}
        >
         <Typography padding={3} textAlign='center' variant='h3'>{!isSignup ? "Login":"Signup"}</Typography>
       { isSignup &&  <TextField name='name' onChange={handleChange} value={ inputs.name } placeholder='Name' margin='normal'/> }
         <TextField name="email" onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin='normal' />
         <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password' margin='normal' />
         <Button type="submit" variant='contained' sx={{borderRadius:3,marginTop:3}} color='warning'>Submit</Button>
         <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius:3,marginTop:3}}  /*Anonymous function onclick*/ >
          Change To {isSignup ? "Login":"Signup"}</Button>

        </Box>
      </form>
    </div>
  )
}

export default Auth ;