/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const redactPasswords = require("sails-mysql/lib/private/redact-passwords");
const Sails = require("sails/lib/app/Sails");


module.exports = {

  createWithImageStep1: async function (req, res) {
    sails.log.debug("Create event....")
    req.session.name = req.body.name,
    req.session.beschreibung = req.body.beschreibung,
    req.session.stadt = req.body.stadt,
    req.session.plz = req.body.plz,
    req.session.straße = req.body.straße,
    req.session.hausnummer = req.body.hausnummer,
    req.session.date= req.body.date
    res.view('pages/event/newWithImageForm2', { eventName: req.param("name") })
  },

  /**
   * Uploads an image for a meal.
   * The image is stored in the /assets/images/meals directory and the path to the image 
   * in the database table of meals. 
   */
  createWithImageStep2: async function (req, res) {
    sails.log("Upload image for meal...")
    // Define the parameters of the upload as an object
    // In this example only the path, wehre to upload the image, is set
    let params = {
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/events/')
    };

    let callback = async function (err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      } else {
        sails.log("Uploaded!")
      }
      let fname = require('path').basename(uploadedFiles[0].fd);
      await Event.create({
        "image": fname,
        "name": req.session.name,
        "beschreibung": req.session.beschreibung,
        "stadt": req.session.stadt,
        "plz": req.session.plz,
        "straße": req.session.straße,
        "hausnummer": req.session.hausnummer,
        "date": req.session.date
      })
    };

      // This funvtion is called, once all files are uploaded
      // err indicates if the upload process triggered an error and has been aborted 
      // uploaded files contains an array of the files which have been uploaded, in our case only one.
      await req.file('image').upload(params, callback);
      return res.redirect('/event');
    },

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
    if (req.query.name && req.query.name.length > 0) {
      events = await Event.find({
        name: {
          'contains': req.query.name
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
