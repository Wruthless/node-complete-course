const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

// serving static file
app.use(express.static(path.join(__dirname, 'public')));


// Will automatically consider routes in admin and shop
// Adding /admin as a filter. Only url starting with 'admin'
// will go into the adminRoutes route.
// This is why in `admin.js` there is not '/admin' in front of the
// the paths. This is called a "path filter"
app.use('/admin',adminRoutes);     // changed to adminData.routes after app.js change
app.use(shopRoutes);

// 404
app.use(errorController.get404);
app.listen(3000);