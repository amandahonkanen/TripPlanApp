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

 const request            = req.body.request;
 const breakfast1         = req.body.breakfast1;
 const breakfast2         = req.body.breakfast2;
 const breakfast3         = req.body.breakfast3;
 const lunch1             = req.body.lunch1;
 const lunch2             = req.body.lunch2;
 const lunch3             = req.body.lunch3;
 const dinner1            = req.body.dinner1;
 const dinner2            = req.body.dinner2;
 const dinner3            = req.body.dinner3;
 const morningActivity1   = req.body.morningActivity1;
 const morningActivity2   = req.body.morningActivity2;
 const morningActivity3   = req.body.morningActivity3;
 const afternoonActivity1 = req.body.afternoonActivity1;
 const afternoonActivity2 = req.body.afternoonActivity2;
 const afternoonActivity3 = req.body.afternoonActivity3;
 const eveningActivity1   = req.body.eveningActivity1;
 const eveningActivity2   = req.body.eveningActivity2;
 const eveningActivity3   = req.body.eveningActivity3;


  var newAgenda = new Agenda({
    request,
    breakfast1,
    breakfast2,
    breakfast3,
    lunch1,
    lunch2,
    lunch3,
    dinner1,
    dinner2,
    dinner3,
    morningActivity1,
    morningActivity2,
    morningActivity3,
    afternoonActivity1,
    afternoonActivity2,
    afternoonActivity3,
    eveningActivity1,
    eveningActivity2,
    eveningActivity3,
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
      .findOne({_id: req.request._id})
      .populate("agenda")
      .exec((err, request) => {
        if (err) {
          next(err);
          return;
          }

          Agenda
          .find({_id: req.agenda._id})
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
