var express     = require('express');
var router      = express.Router();
const mongoose  = require('mongoose');
const User      = require('../model/user');
const Request   = require("../model/request");

//Get all requests
router.get('/', function(req, res, next) {
  Request.find({}, (err, request) => {
      if (err) {
        return res.send(err);
      }
      return res.json(request);
    });
});


router.post('/', (req, res, next) => {

 const startDate = req.body.startDate;
 const endDate = req.body.endDate;
 const city = req.body.city;
 const traveler = req.body.traveler;
 const expert = req.body.expert;
 const whoIsTravelling = req.body.whoIsTravelling;
 const mainInterests = req.body.mainInterests;
 const mustKnows = req.body.mustKnows;

  var newRequest = new Request({
     startDate,
     endDate,
     city,
     traveler,
     expert,
     whoIsTravelling,
     mainInterests,
     mustKnows,
  });

  newRequest.save((err, request) => {
    if (err) {
      res.status(400).json({ message: err });

    } else {
      User.findByIdAndUpdate({_id: traveler},{$push: { bookings: request._id }}, (err) => {
        if (err) {
          console.log("GOT AN ERROR1");
          next(err);
        } else {  User.findByIdAndUpdate({_id: expert},{$push: { bookings: request._id }}, (err) => {
          if (err) {
            console.log("GOT AN ERROR2");
            next(err);
          } else {
            Request
            .findOne({_id: request._id})
            .populate("traveler")
            .populate("expert")
            .exec((err, requesting) => {
              if (err) {
                next(err);
                return;
              }
              res.status(200).json(requesting);
            });}
          });
        }
      });
    }
  });

});

router.get('/booked'), (req, res, next) => {
  console.log(req)
       User
      .findOne({_id: req.user._id})
      .populate("bookings")
      .exec((err, users) => {
        if (err) {
          next(err);
          return;
          }

          Request
          .find({traveler: req.user._id})
          .populate("expert")
          .populate("traveler")
          .exec((err, booking) => {
            if (err) {
              next(err);
              return;
            }

            Request
            .find({traveler: req.user._id})
            .populate("expert")
            .populate("traveler")
            .exec((err, expert) => {
              if (err) {
                next(err);
                return;
              }
            res.json(users, booking,expert);
          });
      });
    });
}


router.get('/:requestId', (req, res, next) => {
  let requestId = req.params.requestId;

  Request.findById(requestId, (err, booking) => {
    console.log("REQUEST:",booking);
    if(!mongoose.Types.ObjectId.isValid(req.params.requestId)) {
      return res.status(400).json({ message: 'Specified id is not valid' });
    }
    return res.json(booking);
    });

});


module.exports = router;
