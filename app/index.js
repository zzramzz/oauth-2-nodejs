const config = require('config');

require('dotenv').config({ path: '../config/.env' })
const mongoose = require('mongoose');
const users = require('./users/routes/user_route');
const auth = require('./users/routes/login_route');
const dashboard = require('./users/routes/user_dashboard');
const logout = require('./users/routes/logout');
const express = require('express');

const app = express();

if (!config.get('secret')) {
    console.error('FATAL ERROR: jwtPrivateKey is  not defined');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("connected to mongo"))
    .catch((err) => console.log(err));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', auth);
app.use('/api/dashboard', dashboard);
app.use('/api/logout', logout);




let port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening to port : ${port}`));