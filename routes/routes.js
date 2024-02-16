const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// Image upload (if i add this)
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});

router.post('/add', (req, res) => {
 

    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        department: req.body.department,
        startDate: req.body.startDate,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary,
    });

    user.save().then((e) => {
        req.session.message = {
            type: 'success',
            message: 'User Added Successfully!'
        };
        redirect("/");
    }).catch((e) => {
        console.error('Save Error.', e);
        res.json({
            message: e.message, 
            type: 'danger'
        });
    })
})

/* Insert an user into database route
router.post('/add', async (req, res) => {
    try {
        const user = new User({
            fName: req.body.fName,
            lName: req.body.lName,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary,
        });
        await user.save();
        req.session.message = {
            type: 'success',
            message: "User added successfully!"
        };
        res.redirect('/');
    } catch (err) {
        console.error("Error saving user:", err); // Log the error
        req.session.message = {
            type: 'danger',
            message: `Error saving user. Please try again later. ${console.log(req.body.startDate)}`
        };
        res.redirect('/');
    }
});
*/


// Gets all users
router.get("/", (req, res) =>{
    res.render("index", {title: "Home Page"});
})

router.get("/add", (req, res) =>{
    res.render('add_users', {title: "Add Users"});
})

module.exports = router;
