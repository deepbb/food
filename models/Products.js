import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:50
    },
    price: {
        type:[Number],
        required:true,
    },
    desc:{
        type:String,
        required:true,
        maxlength:50
    },
    img:{
        type:String,
    },
    extras:{
        type: [
            {
                text:{type:String},
                price:{type:Number}
            },
        ],
    },
},{timestamps:true}
);

export default mongoose.models.Product || mongoose.model("Product",ProductSchema)