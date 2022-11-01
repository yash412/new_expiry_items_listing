import express from 'express' ;
import { getAllProducts , addProduct, updateProduct,getById, deleteProduct, getByUserId } from '../controllers/product-controller';
const productRouter = express.Router() ;

productRouter.get('/',getAllProducts) ;
productRouter.post('/add',addProduct) ;
productRouter.put('/update/:id', updateProduct);
productRouter.get('/:id',getById) ;
productRouter.delete('/:id',deleteProduct) ; // colon is for declaring the variable
productRouter.get('/user/:id' ,getByUserId) ;


export default productRouter ;