import mongoose from 'mongoose';

export const connectDb = async()=>{
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mendaparavasu:Vasu123@cluster0.crfxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoUri)
    .then(
        ()=>{
            console.log('connected to db')
        }
    )
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    })
}