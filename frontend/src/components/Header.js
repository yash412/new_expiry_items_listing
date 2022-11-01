import React ,  { useState} from 'react' ;
import { AppBar, Toolbar, Typography ,Box,Button, Tabs ,Tab} from '@mui/material' ;
import { Link } from 'react-router-dom' ;
import { useSelector , useDispatch} from 'react-redux' ;
import { authActions } from '../store';
const Header = () => {
  const dispatch = useDispatch() ;
  const isLoggedIn = useSelector(state => state.isLoggedIn) ; ;
  const [value ,setValue] = useState() ;
  return (
   <AppBar 
   position='sticky' /* if position is not static or sticky then few elements under this AppBar */
   sx={{background:' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,47,121,1) 35%, rgba(0,212,255,1) 100%)'}}>
    <Toolbar>{/* toolbar is for full navigation */}
      <Typography variant='h4'>
          Products App
      </Typography>
     { isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'} >
      {/* Tabs to navigate between the links */}
      <Tabs 

      textColor='inherit'
      value={value} 
      onChange={(e,val) => setValue(val)}>
       <Tab LinkComponent={Link} to='/products' label='All products'></Tab>
       <Tab LinkComponent={Link} to='/myProducts' label='My products'></Tab>
       <Tab LinkComponent={Link} to='/products/add' label='Add product'></Tab>
      </Tabs>
      </Box> }
      <Box display='flex' marginLeft='auto'>
     { !isLoggedIn && <>
       <Button
       LinkComponent={Link} to='/auth'
        variant='contained' sx={{margin:'1',borderRadius:10}} color='warning'>Login</Button>
       <Button
       LinkComponent={Link} to='/auth'
        variant='contained' sx={{margin:'1',borderRadius:10}} color='warning'>Signup</Button>
      </> }
      { isLoggedIn && <Button 
      onClick={() => dispatch(authActions.logout())}
      LinkComponent={Link} to='/auth'
      variant='contained' sx={{margin:'1',borderRadius:10}} color='warning'>Logout</Button>}
      </Box> 
    </Toolbar>
   </AppBar>
  )
}

export default Header ;

/* for gradient colors go to website css gradients from that you can select background
 npm i react-redux @reduxjs/toolkit
 Redux is like central data store
*/