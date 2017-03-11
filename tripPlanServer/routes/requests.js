var express     = require('express');
var router      = express.Router();
const mongoose  = require('mongoose');
const User      = require('../model/user');
const Request   = require("../model/request");


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
    const traveler = req.body.traveler;
    const expert = req.body.expert;
    const whoIsTravelling = req.body.whoIsTravelling;
    const mainInterests = req.body.mainInterests;
    const mustKnows = req.body.mustKnows;

    const newRequest = new Request({
        startDate,
        endDate,
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
            User.findByIdAndUpdate({_id: expert},{$push: { bookings: request._id }}, (err) => {
                    if (err) {
                        next(err);
                    } else {
                      User.findByIdAndUpdate({_id: traveler},{$push: { bookings: request._id }}, (err) => {
                            if (err) {
                                next(err);
                            } else {
                              Request
                              .findOne({_id: request.traveler})
                              .populate("expert")
                              .populate("traveler")
                              .exec((err, booking) => {
                                if (err) {
                                  next(err);
                                  return;
                                }
                              return res.json({booking: booking});

                              });
                            }
                          });
                        }
                  });

                }
          });

});


router.get('/:requestId', (req, res, next) => {
  let requestId = req.params.requestId;

    Request.findById(requestId, (err, request) => {
        if (err) {
          return res.send(err);
        }

        return res.json(request);
            console.log(request);
      });
  });

  //   User
  //  .findOne({_id: booking.user.id})
  //  .populate("bookings")
  //  .exec((err, users) => {
  //    if (err) {
  //      next(err);
  //      return;
  //      }
   //
  //   Request
  //     .findOne({id: requestId})
  //     .populate("expert")
  //     .populate("traveler")
  //     .exec((err, booking) => {
  //       if (err) {
  //         next(err);
  //         return;
  //       }
  //       return res.json(users, booking);
  //     });
  //   });

module.exports = router;
