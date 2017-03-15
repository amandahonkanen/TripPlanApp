var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const Agenda = require('../model/agenda');
const upload = require('../config/multer');


router.get('/city', (req, res)=> {
  let city = req.query.name;
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

  // User.findById(req.params.id, (err, Users) => {
  //     if (err) {
  //       return res.send(err);
  //     }
  //
  //     return res.json(Users);
  //   });
  User.findOne({_id: req.params.id})
      .populate("bookings")
      .populate("agendas")
      .exec((err, users) => {
         if (err) {
           next(err);
           return;
         } else {
           res.status(200).json(users);
           return;
         }
        });
});

/* EDIT a User. */
router.put('/:id', (req, res) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  console.log("req body ", typeof req.body.city);

  let cities = req.body.city.split(",");

  console.log(cities);


  const userToUpdate = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
    age: req.body.age,
    interests: req.body.interests,
    description: req.body.description,
    city: cities,
    languages: req.body.languages
  };

  // let city = req.body.split("", ",");

  // User.updateOne({id: "req.params.id"}, { $split: [ "", "," ]});

  User.findByIdAndUpdate(req.params.id, userToUpdate, {new: true}, (err, user) => {
    if (err) {
      return res.status(500).json( {err} );
    } else {
      return res.status(200).json({
        // message: 'User updated successfully',
        user: user
      });
    }
  });
});

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


router.post('/:id', upload.single('file'), (req, res, next) => {
  var userId = req.params.id;
  console.log("userId: ", userId);

  let userToUpdate = {
    image:  `http://localhost:3000/uploads/${req.file.filename}`
  };

  console.log(userToUpdate)
  //
  // var userId = req.body._id.toString();
  // userId = mongoose.Types.ObjectId(userId)

  User.findByIdAndUpdate(userId, userToUpdate, (err, user)=>{
    if (err) {
      console.log("GOT AN ERROR");
      next(err)
    } else {

      console.log("GOT UPDATED");
      res.json(user);
    }
  });
});




module.exports = router;
