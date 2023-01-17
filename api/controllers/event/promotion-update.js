module.exports = {


    friendlyName: 'Promote',
  
  
    description: 'Promote Event with new Promotionsstatus',
  
  
    inputs: {
        newPromotionStatus : {
            type: 'number',
            required: true
        }
    },
  
  
    exits: {
    },
  
  
    fn: async function (inputs) {

        
         let eventId = req.session.eventId;
        console.log(eventId);
         let newPromotionStatus = inputs.promotionStatus;
        console.log( inputs.promotionStatus);
        let promotion = await Event.updateOne({ id: eventId }).set({promotionStatus: newPromotionStatus});
      }
 };
  