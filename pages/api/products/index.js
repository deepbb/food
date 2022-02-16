import dbConnect from "../../../utils/mongo"

import Product from "../../../models/Products"



export default async function handler (req,res) {
    const {method} = req;

  await dbConnect()

    if(method === "GET") {
        try{
            const product = await Product.find()
            res.status(200).json(product)
            console.log(product);

        } catch(err) {
            res.status(400).json(err)
        }

    }

    if(method === "POST") {
        try{
            const product = await Product.create(req.body)
            res.status(200).json(product)

        } catch (err) {
            res.status(400).json(err)
        }
    }
    // if (method === "PUT") {
    //     try{
    //         const product = await Product.findByIdAndUpdate({_id:id})
    //         res.status(200).json(product)
    //     } catch (err) {
    //         res.status(400).json(err)
    //     }
    // }
}