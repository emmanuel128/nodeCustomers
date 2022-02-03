import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
    .then(result => console.log('Database connected'))
    .catch(error => console.log(error));

export { mongoose };