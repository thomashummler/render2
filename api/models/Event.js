// api/models/Event.js
module.exports = {
    attributes: {
        name: { type: "string", columnType: "varchar(80)", required: true },
        beschreibung: { type: "string", columnType: "varchar(120)" },
        stadt: { type: "string", columnType: "varchar(80)", required: true },
        straße: { type: "string", columnType: "varchar(80)" ,required: true},
        plz: { type: "number",required: true},
        hausnummer: { type: "number",required: true},
        likesanzahl: { type: "number", required: false },
        date: { type: "string", required: true },
        image: { type: 'string', columnType: 'varchar(128)' },
        //  private: { type: "boolean", required: true },
        /*
        owner: {
            model: 'user'
        },
        category: {
            type: "string",
            isIn: ["Sport", "Musik", "Kultur", "Clubs"],
            required: false
        },
        */

    },
};