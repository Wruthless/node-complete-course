const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine', 'ejs');
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
    // Since we are using path in the ejs files, and 404 has not path, you
    // must define `path: 'Error'` in the object.
    res.status(404).render('404', {pageTitle: "Page Not Found", path: 'Error'});
});
app.listen(3000);