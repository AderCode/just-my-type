const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, "../client");

app.use(express.static(publicPath));

app.listen(process.env.PORT);
