const mongoose = require('mongoose');
var checkout       = require('./models/checkout');


// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/contact', function(req, res) {
        res.render('contact.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/category', function(req, res) {
        res.render('category.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });
    app.get('/checkout', function(req, res) {
        res.render('checkout.ejs', {
          user : req.user
        });
        // load the index.ejs file
    });

    // app.get('/checkout', isLoggedIn, function(req, res) {
    //     res.render('checkout.ejs' ,{
    //       user : req.user
    //     }); // load the index.ejs file
    // });

    app.get('/single-product', isLoggedIn, function(req, res) {
        res.render('single-product' ,{
          user : req.user
        }); // load the index.ejs file
    });


    app.get('/cart', isLoggedIn, function(req, res) {
        res.render('cart.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/booklogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('booklogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.post('/car/login', passport.authenticate('local-login', {
            successRedirect : '/checkout', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
      // FACEBOOK ROUTES =====================
      // =====================================
      // route for facebook authentication and login
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
      }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/',
              failureRedirect : '/login',
              failureFlash : true // allow flash messages
          }));

          // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        // send to google to do the authentication
        // profile gets us their basic information including their name
        // email gets their emails
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
                passport.authenticate('google', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                    }));





        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/checkout', function(req, res) {


      var newcheckout = new checkout();
      newcheckout.meals = req.body.meals;
      newcheckout.firstName = req.body.firstName;
      newcheckout.lastName = req.body.lastName;
      newcheckout.phonenumber = req.body.phonenumber;
      newcheckout.email = req.body.email;
      newcheckout.country = req.body.country;
      newcheckout.address = req.body.address;
      newcheckout.zip = req.body.zip;

      newcheckout.save( function(err,newcheckout){
   if (err) {
     res.redirect('/checkout') ;
     console.log(err);
   }else{
     res.redirect('/checkout') ;
     console.log("Document save");
   }
 });
          });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
