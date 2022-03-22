const express = require('express');
const app = express();
const port = 3000
const fs = require('fs');
const userRoutes = require('./routes/user');
const location = require('./routes/location.js');

app.use(express.json());

app.use('/todo', location);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log('Contoh server berjalan di port ', port);
})

// GET localhost:3000/location/getcities?provinceName=dki jakarta
// GET localhost:3000/location/getcitiesNameByWordCount?count=2
// GET localhost:3000/location/getprovinceByCityName?cityName=Jakarta Barat