import mongoose from "mongoose";

const mongoUri = "mongodb+srv://naimalAuth:MongoDB@mycluster01.kj79t.mongodb.net/AuthDB"

if(!mongoUri) {
    throw new Error("Please provide mongodb connection string variable in .env.local file")
}
let isConnected = false
export  async function dbConnect(){
    if(isConnected){
        console.log("Already connected to mongodb")
        return;
    }
    try {
       const{ connection }=  await mongoose.connect(mongoUri);
        isConnected = connection.readyState === 1;
        console.log("Connected to mongodb" , connection.readyState === 1)
    } catch (error) {
        console.log("Mongodb Connection error" ,error)
    }
}