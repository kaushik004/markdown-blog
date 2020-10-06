const express = require('express');
const articleRouter = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, () => console.log(`Server is runnig on port: ${PORT}.`));