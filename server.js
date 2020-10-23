const express = require('express');
const path = require('path');
const methodOverrde = require('method-override');
// importing model
const Article = require('./models/article');
const mongoose =require('mongoose');
// importing routes
const articleRouter = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

// setting view engine
app.set('view engine', 'ejs');

// using static files
app.use(express.static(path.join(__dirname, 'public')));

// for getting data from form
app.use(express.urlencoded({ extended: false }));

// method override for overriding get or post to delete or put
app.use(methodOverrde('_method'));

// home route
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({created_at: 'desc'});
    res.render('articles/index', {articles});
});

// using atricle router
app.use('/articles', articleRouter);

app.listen(PORT, () => console.log(`Server is runnig on port: ${PORT}.`));