var express     = require('express');
var router      = express.Router();
const mongoose  = require('mongoose');
const User      = require('../model/user');
const Request   = require("../model/request");
const Agenda   = require("../model/agenda");

//Get all requests
router.get('/', function(req, res, next) {
  Agenda.find({}, (err, agenda) => {
      if (err) {
        return res.send(err);
      }
      return res.json(agenda);
    });
});


router.post('/', (req, res, next) => {

 const request = req.body.request;
 const breakfast = req.body.breakfast;
 const lunch = req.body.lunch;
 const dinner = req.body.dinner;
 const morningActivity = req.body.morningActivity;
 const afternoonActivity = req.body.afternoonActivity;
 const eveningActivity = req.body.eveningActivity;
 // const received = req.body.received;

  var newAgenda = new Agenda({
     request,
     breakfast,
     lunch,
     dinner,
     morningActivity,
     afternoonActivity,
     eveningActivity,
     received,
  });

  newAgenda.save((err, agenda) => {
    if (err) {
      res.status(400).json({ message: err });

    } else {
      Request.findByIdAndUpdate({_id: agenda._id },{$push: { agenda: agenda._id }}, (err) => {
        if (err) {
          console.log("GOT AN ERROR1");
          next(err);
          } else {
            Agenda
            .findOne({_id: agenda._id})
            .populate("request")
            .exec((err, agenda) => {
              if (err) {
                next(err);
                return;
              }
              res.status(200).json(agenda);
            });}
          });
        }
      });
    });


router.get('/received'), (req, res, next) => {
  console.log(req)
       Request
      .findOne({_id: request._id})
      .populate("agenda")
      .exec((err, request) => {
        if (err) {
          next(err);
          return;
          }

          Agenda
          .find({_id: agenda._id})
          .populate("request")
          .exec((err, agenda) => {
            if (err) {
              next(err);
              return;
            }
            res.json(request, agenda);
          });
      });
 }



router.get('/:agendaId', (req, res, next) => {
  let agendaId = req.params.agendaId;

  Agenda.findById(agendaId, (err, agenda) => {
    console.log("Agenda:",agenda);
    if(!mongoose.Types.ObjectId.isValid(req.params.requestId)) {
      return res.status(400).json({ message: 'Specified id is not valid' });
    }
    return res.json(agenda);
    });

});


module.exports = router;
