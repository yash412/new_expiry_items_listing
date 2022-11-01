import React from 'react' ;
import { Box, CardContent ,Card , CardHeader ,Avatar ,CardMedia ,Typography, IconButton} from '@mui/material'
import  ModeEditOutlineIcon  from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useNavigate} from 'react-router-dom' ;
import axios from 'axios' ;

const Product = ({title,description,imageURL ,userName,isUser,id, manufactureDate, expiryDate}) => {
  const navigate = useNavigate() ;
  const handleEdit = (e) => {
    navigate(`/myProducts/${id}`) ;
  }
  const deleteRequest =  async() => {
    const res = await axios.delete(`http://localhost:5000/api/product/${id}`).catch(err => console.log(err)) ;
    const data = await res.data ;
    navigate("/products") ;
    return data ;
  }
  const handleDelete = (e) => {
   
     deleteRequest().then(() => navigate("/")).then(() => navigate("/products")) ;
  }
  return (
    <div>
        {" "}
         <Card sx={{width:"40%",
         margin:'auto',
         mt:2 ,
         padding:2 ,
         boxShadow:"5px 5px 10px #ccc" ,
         ":hover":{
           boxShadow:"10px 10px 20px #ccc"
         } ,
         }}>
          {
            isUser && (
              <Box display="flex">
                <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color="warning"/></IconButton>
                <IconButton onClick={handleDelete} ><DeleteOutlineIcon color="error"/></IconButton>
              </Box>
            )
          }
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{backgroundColor: 'red'}}>
           {userName}
          </Avatar>
        }
       
        title={title}
        subheader="Price : 50$"
      />
      <CardMedia
        sx={{ height: 0,
        paddingTop: '56.25%'}}
        image={imageURL}
        title={title}
      />
      
      <CardContent>
      <hr/><br/>
        <Typography variant="body2" color="textSecondary" component="p">
          <b><h3>Description :</h3></b>
         {description}
         <br/><br/>
         <b><h5>Manufacture Date : {manufactureDate} </h5></b>
         <b><h5>Expiry Date : {expiryDate} </h5></b>
        </Typography>
      </CardContent>
     
      
    </Card>
    </div>
  )
}

export default Product ;