module.exports = {


    friendlyName: 'Promote',
  
  
    description: 'Promote Event with new Promotionsstatus',
  
  
    inputs: {
        promotionStatus : {
            type: 'number',
            required: true
        },
        eventId:{
            type:"number",
            required:true
        }
    },
  
  
    exits: {
    },
  
  
    fn: async function (inputs) {
        console.log(inputs.eventId);
         let eventId = inputs.eventId;
        console.log(eventId);
         let newPromotionStatus = inputs.promotionStatus;
        console.log( inputs.promotionStatus);   
         await Event.updateOne({ id: eventId }).set({promotionStatus:newPromotionStatus});
         return {id: eventId};
      }
 };
  