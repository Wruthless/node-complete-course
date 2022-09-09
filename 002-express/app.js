const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

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
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);