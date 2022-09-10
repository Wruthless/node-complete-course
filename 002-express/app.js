const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// 'hbs' sets the file extension you can use on the templates.
app.engine(
  'hbs',
  expressHbs.engine({
    extname: 'hbs',
    layoutDir: '/views/layouts',
    defaultLayout: 'main-layout'
}));

app.set('view engine', 'hbs');
app.set('views', 'views');
//app.set('view engine', 'pug');

// Chagned to adminData after chaing route exports in
// 'admin.js'.
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

// serving static file
app.use(express.static(path.join(__dirname, 'public')));


// Will automatically consider routes in admin and shop
// Adding /admin as a filter. Only url starting with 'admin'
// will go into the adminRoutes route.
// This is why in `admin.js` there is not '/admin' in front of the
// the paths. This is called a "path filter"
app.use('/admin',adminData.routes);     // changed to adminData.routes after app.js change
app.use(shopRoutes);

// 404
app.use((req,res,next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { // '404' the body or content for the page
        pageTitle: 'Page Not Found',
        layout: 'main-layout'       // The template/layout you are using in /views/layouts
    });
});
app.listen(3000);