const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/book', bookRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;