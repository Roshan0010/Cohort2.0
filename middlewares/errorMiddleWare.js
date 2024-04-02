const express = require('express');
const app = express();

let errorCount = 0;

//  always remember to use normal  middleware prior and erro middleware to next after the 
//  routes



// Route for retrieving user
app.get('/user', function(req, res, next) {
    try {
        throw new Error("User not found");
    } catch (err) {
        next(err);
    }
});

// Route for creating user
app.post('/user', function(req, res) {
    res.status(200).json({ msg: 'Created dummy user' });
});

// Route for retrieving error count
app.get('/errorCount', function(req, res) {
    res.status(200).json({ errorCount });
});
app.use((err, req, res, next) => {
    console.log("hero");
    errorCount++;
    next(err);
});

// Middleware for handling errors
app.use((err, req, res, next) => {
    console.log("herez");
    res.status(404).send("Something wrong happened");
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
