const express = require('express');
const path = require('path');
const mongoose =require('mongoose');
const articleRouter = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [
        {
            title: 'Article One',
            created_at: new Date(),
            description: 'This is article one'
        },
        {
            title: 'Article Two',
            created_at: new Date(),
            description: 'This is article two'
        },
        {
            title: 'Article Three',
            created_at: new Date(),
            description: 'This is article three'
        }
    ]
    res.render('articles/index', {articles});
})

app.listen(PORT, () => console.log(`Server is runnig on port: ${PORT}.`));