parasails.registerPage("promote", {
    data: {
        Promotion: 0
    },
    methods: {
        find: function () {
            let origin = window.location.origin
            let url = new URL(origin + '/eventall')
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })

        },
    }
})