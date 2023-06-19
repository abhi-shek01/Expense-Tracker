const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')
const path = require ('path')

const app = express();
dotenv.config({path: './config/config.env'})
connectDB();

app.use(express.json())
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'))
}

const PORT = process.env.PORT
const transaction = require('./routes/transaction')
app.use('/api/transaction', transaction)

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT,console.log(`Server running on port ${PORT} and in ${process.env
.NODE_ENV} mode`.yellow.bold));



//use command npm run start to run it.