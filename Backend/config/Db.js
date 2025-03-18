import mongoose from 'mongoose';

export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://mendaparavasu:Vasu123@cluster0.crfxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(
        ()=>{
            console.log('connected to db')
        }
    )
}