parasails.registerPage("promote", {
    data: {
        Promotion: 0,
        eventId : 0

    },
    methods: {

        promote: function () {
            const formData = {
                promotionStatus : this.Promotion
            }
            let origin = window.location.origin;
            let url = new URL(origin + '/api/v1/event/promotionUpdate');
            const body = JSON.stringify(formData);
            console.log(body);
            const postForm =(body) => {
                return fetch('/api/v1/reservation/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });
            }
            postForm(body)
                .then(res => res.json())
                .then(data => {
                    
                    let kk = data.promotionStatus;
                    console.log("kk")
                })
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