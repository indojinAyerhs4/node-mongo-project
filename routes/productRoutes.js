const express = require('express')
const routes = express.Router()
const Products = require('../models/Products.js')

routes.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDesc} = req.body
       
        const productExists = await Products.findOne({productName})
        if(productExists){
            return res.json({
                status:false,
                message:"product already exists"
            })
        }
        const productObj = new Products({productName,productPrice,productUnit,productDesc})
        await productObj.save()
        res.json({
            status:true,
            message:"Product added successfully"
        })

    }catch(err){
        return res.json({
            status:false,
            message:err
        })
    }
})

routes.get('/get-products',async(req,res)=>{
    try{
        const products = await Products.find()
        return res.json({
            status:true,
            message:products
        })
    }
    catch(err){
        return res.json({
            status:false,
            message:err
        })
    }
})

module.exports = routes