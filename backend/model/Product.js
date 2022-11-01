import mongoose from 'mongoose' ;

const schema = mongoose.Schema ;

const productSchema = new schema({
    title:{
        type:String ,
        required:true 
    } ,
    description:{
        type:String ,
        required:true
    } ,
    image:{
        type:String ,
        required:true
    } ,
    user :{  // which user is posted
        type:mongoose.Types.ObjectId ,
        ref:"User" ,
        required:true
    } ,
    manufactureDate : {
        type:String ,
        required:true ,
    } ,
    expiryDate : {
        type:String ,
        required:true ,
    }

}) ;

export default mongoose.model("Product",productSchema) ;
