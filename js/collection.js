var data = {
    name: "",
    landingpage: "",
    list: [],
    task: "",
    c: ""      
}

var vm = new Vue({
    data: data,
    created() {
        let vm = this;
        //is it a fork?
        vm.c = window.location.href.split("/").pop();
        if (vm.c != null && vm.c != "createcollection" && vm.c != "") {
            console.log("it's a fork!");
            axios.get('/api1/c/' + vm.c + '.json')
                .then(function (response) {
                    vm.list = response.data.list;
                    vm.name = response.data.name;
                    vm.landingpage = response.data.landingpage;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})

new Vue({
    el: "#app",
    data: data,
    methods: {
        add: function () {
            if (this.task != "") {
                //get token
                var regex = /([a-zA-Z0-9]+)$/g;
                var match = regex.exec(this.task);
                this.list.push({ name: match[0] });
                this.task = "";
            }
        }
    }
});

new Vue({
    el: '#navbar',
    data: data,
    methods: {
        resetinput: function () {
            location.reload(); 
        },
        publish: function () {
            axios.post('/api1/c', {
                list: data.list,
                landingpage: data.landingpage,
                name: data.name
            })
                .then(function (response) {
                    bootbox.alert('Your Collection is now published: <a href="/c/' + response.data.key + '">' + response.data.key + '</a>');
                })
                .catch(function (error) {
                    bootbox.alert("error: " + error);
                });
        }
    }
})
