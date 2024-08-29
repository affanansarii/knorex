const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost:27017/userManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error(err));