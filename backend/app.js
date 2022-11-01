import express from 'express' ;
import mongoose from 'mongoose' ;
import router from './routes/user-routes';
import productRouter from './routes/product-routes';
import cors from 'cors' ; // to send data from one server to another seerver
const app = express() ;

app.use(cors()) ; // use it before the middlewares
// mongoose.connect is promise
// controllers will control the api routings
// routes will contain routing operations from which route
mongoose.connect('mongodb://0.0.0.0:27017/Product')
.then(() => app.listen(5000)).then(
    () => 
        console.log("connected to database") 
    
).catch((err) => console.log(err) ) ;
app.use(express.json()) ; // parse all of the data into json format
app.use("/api/user",router) ;
app.use("/api/product",productRouter) ;


