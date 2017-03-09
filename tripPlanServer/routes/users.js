var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');

router.get('/city', (req, res)=> {
  let city = req.query.name
  User.find({city: {"$in" : [city]}})
    .exec((err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  });

router.get('/', (req, res, next) => {
  User.find({})
    .exec((err, Users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Users);
    });
});



/* GET a single User. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById(req.params.id, (err, Users) => {
      if (err) {
        return res.send(err);
      }

      return res.json(Users);
    });
});

/* EDIT a User. */
router.put('/:id', (req, res) => {
  console.log("hi");
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

console.log(req.params.id)

  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
    age: req.body.age,
    interests: req.body.interests,
    description: req.body.description,
    locations: req.body.locations,
    languages: req.body.languages

  }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'User updated successfully'
    });
  });
})

/* DELETE a User */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'User has been removed!'
    });
  });
});

//



// router.post('/', upload.single('file'), function(req, res) {
//   const user = new User({
//     username: req.body.username,
//     name: req.body.name,
//     password: req.body.password,
//     role: req.body.role,
//     age: req.body.age,
//     interests: req.body.interests,
//     description: req.body.description,
//     locations: req.body.locations,
//     languages: req.body.languages,
//     image: `/images/${req.file.filename}`,
//
//   });
//
//   user.save((err) => {
//     if (err) {
//       return res.send(err);
//     }
//
//     return res.json({
//       message: 'New User created!',
//       user: user
//     });
//   });
// });



module.exports = router;
