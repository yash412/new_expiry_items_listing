import User from '../model/User' ;
import bcrypt from 'bcryptjs' ;

 export const getAllUser = async (req,res,next) => {
    let users ;
    try{
      users = await User.find() ;
    } catch(err){
        console.log(err) ;
    }
    if(!users){
        // not found
        return res.status(404).json({message:"No Users Found"}) ; //unsuccess msg
    }
    // successfully found
    return res.status(200).json({users}) ; // success message
} ;

export const signup =async(req,res,next) => {
    // we can just destructure the fields
    const { name,email,password } = req.body ;

    let existingUser ;
    try{
      existingUser = await User.findOne({email});
    }catch(err){
     return console.log(err) ;
    }
    if(existingUser){
        // unAuthorised..
        return res.status(400).json({message:"User Already Exists !Login Insted"}) ;
    }
    const hashedPassword = bcrypt.hashSync(password) ;
    const user = new User({
        name,
        email ,
        password:hashedPassword ,
        blogs:[] ,
    }) ;

    try{
       await user.save() ;
    }catch(err){
     return console.log(err) ;
    }
    // status which is created or document created
    return res.status(201).json({user}) ;

} ;

export const login = async (req,res,next) => {
  // we can destructure the fields
  const { email, password } = req.body ;
  let existingUser ;
  try{
   existingUser = await User.findOne({email}) ;
  }catch(err){
    return console.log(err) ;
  }
  if(!existingUser){
    //not found
    return res.status(404).json({message:"Coudnt find the user with this Email ! Signup insted"}) ;
  }
  //now compare the password
  const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password) ;
  if(!isPasswordCorrect){
    //unauthorized
    return res.status(400).json({message:"Incorrect Password"} ) ;

  }

  return res.status(200).json({message:"Login Successfull" , user:existingUser}) ;

} ;

