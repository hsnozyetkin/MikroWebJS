const express = require("express")
const app = express()

// Axios Header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// Include
var productsRouter = require('./routes/products');
var customerRouter = require('./routes/customers');
var projectRouter = require('./routes/project');
var ordersRouter = require('./routes/orders');



// Router İşlemleri
app.use("/product", productsRouter)
app.use("/customer", customerRouter)
app.use("/project", projectRouter)
app.use("/order", ordersRouter)

module.exports = {
  path: "/api",
  handler: app
}
