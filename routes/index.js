const passport = require('passport');

const router = require('express').Router();
router.use('/', require('./swagger'));
// router.use('/', require('./home'));
router.use('/movies', require('./movies'));
router.use('/stores', require('./stores'));

// Client and Employee
router.use('/client', require('./client'));
router.use('/employee', require('./employee'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
