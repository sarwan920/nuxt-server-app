import mongoose from 'mongoose'

export default async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/mydb')
        // console.log(res);
        console.log('Database connected');

    } catch (error) {
        console.log(error)

    }
}