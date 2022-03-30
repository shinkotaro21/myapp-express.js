const express = require('express')
const app = express()
const port = 3000
const locationRoutes = require('./routes/location')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

app.use(express.json())

app.use('/location', locationRoutes)
app.use('/todos', todoRoutes)
app.use('/user', userRoutes)
app.use('/product', productRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// GET localhost:3000/location/getcities?provinceName=dki jakarta
// GET localhost:3000/location/getcitiesNameByWordCount?count=2
// GET localhost:3000/location/getprovinceByCityName?cityName=Jakarta Barat