const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./config/dbConnection')
const cors = require('cors');
const path = require('path');

connectDb();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use(express.static("public"));

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname,'/client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/client/build/index.html'));
});





app.use("/api/landlord", require("./routes/landlordRoutes"));
app.use('/api/property', require("./routes/propertyRoutes"));
app.use('/api/request', require("./routes/requestRoutes"));
app.use('/api/tenant', require("./routes/tenantRoutes"));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})