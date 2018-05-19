var data = {
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
        if (vm.c != null && vm.c != "create" && vm.c != "") {
            console.log("it's a fork!");
            axios.get('/api1/c/' + vm.c + '.json')
                .then(function (response) {
                    vm.list = response.data.list;
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
                list: data.list
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
