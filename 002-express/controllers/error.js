exports.get404 = (req,res,next) => {
    // Since we are using path in the ejs files, and 404 has not path, you
    // must define `path: 'Error'` in the object.
    res.status(404).render('404', {pageTitle: "Page Not Found", path: 'Error'});
};