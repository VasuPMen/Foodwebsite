import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Image is required" });
    }

    let image_name = req.file.filename; // ✅ Store only filename

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_name,  // ✅ No "/src/assets/" path here
        description: req.body.description,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occurred" });
    }
};




const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        console.log("Fetched Foods:", foods);
        res.json({success:true, data:foods});
    } catch (error) {
        console.log("Error fetching food list:", error);
        res.json({success:false,message:"error"});
    }
}


const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true , message:"food deleted"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error Occure"})
    }
}

export {addFood , listFood , removeFood}