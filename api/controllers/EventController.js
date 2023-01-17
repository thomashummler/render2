/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { event } = require("grunt");
const redactPasswords = require("sails-mysql/lib/private/redact-passwords");
const Sails = require("sails/lib/app/Sails");

module.exports = {
  updatePromotion: async function (req, res) {
    let event = await Event.updateOne({ id: req.params.id }).set(req.body);
    events = await Event.find({
      owner: {
        contains: req.me.id,
      },
    });
    events.sort((x, y) => y.promotionStatus - x.promotionStatus);
    res.view("pages/event/overview_own_events", { events: events });
  },

  findEventsByCategory: async function (req, res) {
    let events;
    let params = req.allParams();
    events = await Event.find({
      category: params.category,
      private: "false",
    });
    events;
    res.view("pages/event/overview_events", { events: events });
  },

  findOwnEvents: async function (req, res) {
    sails.log.debug("List all Events....");
    let events;
    events = await Event.find({
      owner: {
        contains: req.me.id,
      },
    });
    events;
    res.view("pages/event/overview_own_events", { events: events });
  },

  create: async function (req, res) {

    sails.log.debug("Create Event....")
    req.session.name = req.body.name;
    req.session.beschreibung = req.body.beschreibung;
    req.session.stadt = req.body.stadt;
    req.session.straße = req.body.straße,
    req.session.plz = req.body.plz,
    req.session.hausnummer = req.body.hausnummer,
    req.session.date = req.body.date,
      res.view('pages/event/overview_createEvents', {
        eventname: req.param("name"), eventbeschreibung: req.param("beschreibung"),
        eventstadt: req.param("stadt"), eventhausnummer: req.param("hausnummer"), eventstraße: req.param("stadt"), eventplz: req.param("plz"), eventdate: req.param("date")
      })
  },




  createWithImage: async function (req, res) {


    let params = {
      dirname: require("path").resolve(
        sails.config.appPath,
        "assets/images/events/"
      ),
    };

    let callback = async function (err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      } else {
        sails.log("Uploaded!");
      }
      let fname = require("path").basename(uploadedFiles[0].fd);


      let privat;
      privat = req.body.private;
      if (privat == "on") {
        privat = true;
      } else {
        privat = false;
      }
      await Event.create({
        name: req.session.name,
        beschreibung: req.session.beschreibung,
        stadt: req.session.stadt,
        straße: req.session.straße,
        plz: req.session.plz,
        hausnummer: req.session.hausnummer,
        date: req.session.date,
        private: privat,
        owner: req.me.id,
        category: req.body.category,
        image: fname,

      });
    };
    await req.file("image").upload(params, callback);



    await req.file("image").upload(params, callback);
    return res.redirect("/event");
  },
  
  findall:async function(req,res){

   let events = await Event.find({
        private: false,
      });
      return events;
  },

  find: async function (req, res) {
    sails.log.debug("List all Events....");
    let events;
    if (req.query.name && req.query.name.length > 0) {
      events = await Event.find({
        name: {
          contains: req.query.name,
        },
        private: false,
      });
    } else {
      events = await Event.find({
        private: false,
      });
    }
    events.sort((x, y) => y.promotionStatus - x.promotionStatus);
    events;
    res.view("pages/event/overview_events", { events: events });
  },

  findOne: async function (req, res) {
    sails.log.debug("List single event....");
    let event = await Event.findOne({ id: req.params.id });
    if (req.me.id == event.owner) {
      res.view("pages/event/show_event", { event: event });
    } else {
      res.view("pages/event/show_eventDetail_without_buttons", {
        event: event,
      });
    }
  },

  findPromotionPage: async function (req, res) {
    sails.log.debug("finding Promotion Site with Event");
    let event = await Event.findOne({ id: req.params.id });
    if (req.me.id == event.owner) {
      res.view("pages/event/event_promotion_overview", { event: event });
    } else {
      res.redirect("/event");
    }
  },

  editOne: async function (req, res) {
    sails.log.debug("Edit single Event....");
    let event = await Event.findOne({ id: req.params.id });
    res.view("pages/event/edit_events", { event: event });
  },

  updateOne: async function (req, res) {
    sails.log.debug("Update single Event....");
    let event = await Event.updateOne({ id: req.params.id }).set(req.body);
    res.redirect("/event");
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy single Event....");
    await Event.destroyOne({ id: req.params.id });
    res.redirect("/event");
  },
};
