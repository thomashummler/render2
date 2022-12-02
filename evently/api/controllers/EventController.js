/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const redactPasswords = require("sails-mysql/lib/private/redact-passwords");
const Sails = require("sails/lib/app/Sails");


module.exports = {

  create: async function (req, res) {
    sails.log.debug("Create new event....");
    let params = req.allParams();
    if (!params.name || params.name == "") {
      sails.log.debug("Validation error....");
      res.view("/");
    } else {
      sails.log.debug("Create new event....");
      let event = await Event.create(req.allParams());
      res.redirect("/");
    }
  },
  find: async function (req, res) {
    sails.log.debug("List all Events....")
    let events;
    if (req.query.q && req.query.q.length > 0) {
      events = await Event.find({
        name: {
          'contains': req.query.q
        }
      })
    } else {
      events = await Event.find();
    }
    res.view ('pages/event/overview_events', { events: events } );
  },


  findOne: async function (req, res) {
    sails.log.debug("List single event....");
    let event = await Event.findOne({ id: req.params.id });
    res.view("pages/event/show_event", { event: event });
  },

  editOne: async function (req, res) {
    sails.log.debug("Edit single meal....")
    let event = await Event.findOne({ id: req.params.id });
    res.view('pages/event/edit_events', { event: event });
  },

  updateOne: async function (req, res) {
    sails.log.debug("Update single event....");
    let event = await Event.updateOne({ id: req.params.id }).set(req.body);
    res.redirect("/event");
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy single event....");
    await Event.destroyOne({ id: req.params.id });
    res.redirect("/event");
  },

  step2: async function (req, res) {
    let eventValues = {};
    eventValues.name = req.body.name; 
    eventValues.beschreibung = req.body.beschreibung;
    eventValues.stadt = req.body.stadt; 
    eventValues.plz = req.body.plz; 
    eventValues.straße = req.body.straße;
    eventValues.hausnummer = req.body.hausnummer;
    eventValues.date = req.body.date;
    req.session.event = eventValues;
    res.view('pages/event/checkup', {"event": req.session.event});
  },

  commit: async function (req, res) {
    let eventValues = req.session.event 
    eventValues.customer = req.session.userId;
    let event = await Event.create(eventValues).fetch();
    
    req.session.event = null;

    res.redirect('/');
  },
};
