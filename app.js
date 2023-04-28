const express = require('express');
const app = express();
const router = require('./route');
const cors = require('cors');

app.use(cors({
    origin:'*'
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/',router);
app.use('/',(req,res)=>{
    res.status(400).send('URL not found!!!')
})
module.exports  = app;