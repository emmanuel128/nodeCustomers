var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb+srv://emmanuel128:Emma_111@customercluster.0rs9p.mongodb.net/Customers?retryWrites=true&w=majority';
    // console.log(process.env)
} else if (env === 'test') {
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/CustomerTest';
}