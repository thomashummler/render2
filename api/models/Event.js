// api/models/Event.js
module.exports = {
  attributes: {
    name: { type: "string", columnType: "varchar(120)",maxLength: 120, required: true },
    beschreibung: { type: "string", columnType: "varchar(1240)",maxLength: 1240,required: false },
    stadt: { type: "string", columnType: "varchar(120)",maxLength: 120, required: false },
    straße: { type: "string", columnType: "varchar(120)",maxLength: 120, required: false },
    plz: { type: "number", required: true, required: false},
    hausnummer: { type: "number", required: false },
    likesanzahl: { type: "number", required: false },
    date: { type: "string", required: false },
    image: { type: "string", columnType: "varchar(128)", required:false},
    private: { type: "boolean",defaultsTo: false },
    category: {
      type: "string",
      columnType: "varchar(80)",
      isIn: ["Sport", "Musik", "Kultur", "Weiteres"],
      required:false
    },
    owner: {
      type: "string",
      columnType: "varchar(128)",
      unique: false,
      required:true
    },
    promotionStatus: {
      type: "number",
      isIn: [0, 1, 2, 3],
      defaultsTo: 0,
    },
  },
};
