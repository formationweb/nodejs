import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('database connected')
})

export default db