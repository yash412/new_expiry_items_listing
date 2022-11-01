import mongoose from 'mongoose';
import Product from '../model/Product' ;
import User from '../model/User';

export const getAllProducts = async (req,res,next) => {
    let products ;
    try{
      products = await Product.find().populate('user') // find all of the records (for empty query)
    }catch(err){
        return console.log(err) ;
    }
    if(!products){
        return res.status(404).json({message:"No products Found"}) ;
    }

    return res.status(200).json({products}) ;

} ;

export const addProduct =async(req,res,next) => {
  const { title ,description ,image ,  user ,manufactureDate ,expiryDate} = req.body ;
   
  let existingUser ;
  try{
  existingUser = await User.findById(user) ;
  }catch(err){
    return console.log(err) ;
  }
  if(!existingUser){
    return res.status(400).json({message:"Unable to find user by this Id"}) ;
  }
  
  // new instance
  const product = new Product( {
       title,
       description,
       image,
       user ,
       manufactureDate ,
       expiryDate
    }) ;
    try{
     //await product.save() ;
     // add session for there (insted of adding directly , add the session)
     // session to save the product
     const session = await mongoose.startSession() ;
     session.startTransaction() ;
     await product.save();
     // await product.save({session})
      // save the user from session only
     // push to the array of existing user always
     existingUser.products.push(product) ;
     await existingUser.save(); // again save proper new document or object and from this session only
     // await existingUser.save({session})
     await session.commitTransaction() ;

    }catch(err){
         console.log(err) ;
         return res.status(500).json({message:err}) ;
    }
    return res.status(200).json({product}) ;

} ;

export const updateProduct = async(req,res,next) => {
    const {title,description} = req.body ;
    const productId = req.params.id ;
    let product ;
    try{
        product = await Product.findByIdAndUpdate(productId ,{
            title,
            description
        }) ;
    
    }catch(err){
        return console.log(err) ;
    }
    if(!product){
        return res.status(500).json({message:"Unable to update the product"}) ;
    }
    return res.status(200).json({product}) ; 
} ;

export const getById = async(req,res,next) => {
   const id = req.params.id ;
   let product ;
   try{
    product = await Product.findById(id) ;
   }catch(err) {
    return console.log(err) ;
   }
   if(!product){
    return res.status(404).json({message:"No product Found"}) ;
   }
   return res.status(200).json({product}) ;
 } ;

 export const deleteProduct = async(req,res,next) => {
   const id = req.params.id ;
   let product ;
   try{

   product = await Product.findByIdAndRemove(id).populate('user') ; // populate works for the reference collection
   console.log(product) ;
   await product.user.products.pull(product) ; // pull is method in mongoose to pull out element based on Id
   await product.user.save() ;

   }catch(err){
    return console.log(err) ; 
   }
   if(!product){
    return res.status(500).json({message:"unable to delete"}) ;
   }
   return res.status(200).json({message:"successfully deleted"}) ;
 } ;

 export const getByUserId = async(req,res,next) => {
  console.log("hello this is user") ;
   const userId = req.params.id ;
   let userproducts ;
   try{
     userproducts = await User.findById(userId).populate("products") ;
     console.log(userproducts) ;
   }catch(err){
    return console.log(err) ;
   }
   if(!userproducts){
    return res.status(404).json({message:"No products found"}) ;
   }
   return res.status(200).json({user:userproducts}) ;
 } ;