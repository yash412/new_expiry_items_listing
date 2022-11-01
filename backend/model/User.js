// mongoose (NoSql) can stores documents in Collections
import mongoose from 'mongoose' ;

const schema = mongoose.Schema ;

const userSchema = new schema({
    name:{
        type:String ,
        required:true
    } ,
    email:{
     type:String ,
     required:true ,
     unique:true
    } ,
    password: {
        type:String ,
        required:true ,
        minlength:6
    } ,
    blogs:[{
        type:mongoose.Types.ObjectId ,
        ref:"Blog" ,
        required:true
    }]
}) ;

export default mongoose.model("User",userSchema);
// in mongodb the collection is stored as users  (by default naming convention is lowercase and also in plural form)
