const express = require('express');
const app = express();


const middleware1 = (req, res, next) => {
    console.log('Middleware 1 called');
    next();
};


const middleware2 = (req, res, next) => {
    console.log('Middleware 2 called');
    next();
};

app.use(middleware1);
app.use(middleware2);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
