import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}


export default {
  Query: {
    products(){
      return Product.find({})
    },
    product(_,args,context){
      console.log("coming to product")
      return Product.findById(args.id)
    }
  },
  Mutation: {
    newProduct(_,args,context){
      return Product.create({...args.input,createdBy:mongoose.Types.ObjectId()})
    },
    updateProduct(_,args,context){
      return Product.findByIdAndUpdate(args.id,args.input,{new:true})
    },
    removeProduct(_,args,context){
      return Product.findByIdAndDelete(args.id)
    }
  },
  Product: {
    __resolveType(product) {
      return product
    },
      createdBy(product){
        return User.findById(product.createdBy)
      }
    
  }
}
