const express = require('express');
const app = express();

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`API server now on port ${PORT}!`));