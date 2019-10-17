const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Model
const Pokemon = require('./models/pokemon-model');
const Machine = require('./models/machine-model');
const Component = require('./models/component-model');
const Vendor = require('./models/vendor-model');

//Routes
const formRoutes = require('./routes/form-routes');
const machineRoutes = require('./routes/machine-routes');
const componentRoutes = require('./routes/component-routes');
const vendorRoutes = require('./routes/vendor-routes');
const listRoutes = require('./routes/list-routes');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// static file
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    ()=>{console.log('connected to mongodb');},
    err =>{console.log(err);}
);

// Setup routes
app.use('/form', formRoutes);
app.use('/machine', machineRoutes);
app.use('/component', componentRoutes);
app.use('/vendor', vendorRoutes);
// For test (poulate)
app.use('/list', listRoutes);

app.get('/',(req, res)=>{
    res.render('./page/hoemPage'); 
});

// Not found
app.get('*',(req,res)=>{
    res.render('./components/notFound');
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listening on port 3000!')
});