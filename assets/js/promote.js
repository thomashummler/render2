parasails.registerPage("promote", {
    data: {
        Promotion: 0,
        eventId: 0

    },
    methods: {

        promote: async function (eventId) {
            const formData = {
                promotionStatus: this.Promotion,
                eventId: eventId,
                _csrf: window.SAILS_LOCALS._csrf
            }
            const body = JSON.stringify(formData);
            fetch('/api/v1/event/promotionUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
        }
        /*find: function () {
            let origin = window.location.origin;
            let url = new URL(origin + '/eventall');
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.events = data;
                    data.forEach((res) => {s
                        console.log(res)
                    })
                })

            },*/
    }


})