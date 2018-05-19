var data = {
    task: "",
    enviroments: [],
    n: 0,
    enviroment: "",
    lang: "",
    autoplay: false,
    video: "",
    description:"",
    html: "",
    css: "",
    code: "",
    code_preset: "",
    editor_code: null,
    iframehtml: "",
    t: null,
    c: null,
    collection: [],
}

function setupEditor() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        fontSize: 14,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showPrintMargin: false
    });

    var EditSession = ace.require("ace/edit_session").EditSession;
    console.log(data.n);
    data.editor_code = null;
    data.editor_code = new EditSession(data.code, "ace/mode/" + data.enviroments[data.n].acemode);

    //show only wanted parts of code
    var re = new RegExp("(\/\/|#)[ ]?start\n(([\\s\\S]*)\n(\/\/|#)[ ]?stop|([\\s\\S]*))", "im");
    var result = re.exec(data.code);

    if (result == null) {
        data.editor_code.setValue(data.code);
    } else if (result[3] != undefined) {
        data.editor_code.setValue(result[3]);
    } else if (result[5] != undefined) {
        data.editor_code.setValue(result[5]);
    } else {
        console.log("can't parse code for showing!");
    }


    console.log(data.code);
    console.log(data.enviroments[data.n].acemode);
    console.log("editor built");

    editor.setSession(data.editor_code);

}


var vm = new Vue({
    data: data,
    created() {
        let vm = this;

        axios.get('/settings.json')
            .then(function (response) {
                //console.log(response);
                a = [];
                for (var i in response.data.enviroments) {
                    vm.enviroments.push(response.data.enviroments[i]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        //get params
        var url = window.location.href.split("/");

        var token = url.pop();
        var type = url.pop();

        if (type == "t") {
            vm.t = token;
        } else if (type == "c") {
            vm.c = token;
        }
        token = url.pop();
        type = url.pop();
        if (type == "c") {
            vm.c = token;
        }

        if (vm.c != null) {
            //load collection
            loadCollection()
        } else {
            loadTask();
        }  
    }
})

function loadCollection() {
    axios.get('/api1/c/' + data.c + '.json')
    .then(function (response) {
        console.log(response);
        //if (response.data.hasOwnProperty('error')) window.location.replace("../index.html");
        vm.collection = response.data.list;
        if (data.t == null) data.t = vm.collection[0].name;

        loadTask(data.t)
    })
    .catch(function (error) {
        console.log(error);
    });
}

function loadTask(){
    //if (data.t == null) window.location.replace("../index.html");

    axios.get('/api1/t/' + data.t + '.json')
    .then(function (response) {
        console.log(response);
        //if (response.data.hasOwnProperty('error')) window.location.replace("../index.html");

        vm.lang = response.data.lang;
        vm.enviroment = response.data.enviroment;
        vm.task = response.data.task;
        vm.autoplay = response.data.autoplay;
        vm.video = response.data.video;
        vm.description = response.data.description;
        vm.html = response.data.html;
        vm.css = response.data.css;
        vm.code = response.data.code;
        vm.code_preset = vm.code;

        for (var i in data.enviroments) {
            if (data.enviroments[i].lang == data.lang &&
                data.enviroments[i].name == data.enviroment) {
                vm.n = i;
            }
        }

        setupEditor();

        if (vm.autoplay) {
            var lightbox = lity(vm.video);
        }

    })
    .catch(function (error) {
        console.log(error);
    });
}

new Vue({
    el: '#navbar',
    data: data,
    methods: {
        resetinput: function () {
            this.editor_code.setValue(data.code_preset)
        }
    }
})

new Vue({
    el: '#editorarea',
    data: data,
})

new Vue({
    el: '#resourcearea',
    data: data,
    computed: {
        videoexists: function () {
            if (this.video == "") {
                return false;
            } else {
                return true;
            }
        }
    }
})

new Vue({
    el: '#playgroundarea',
    data: data,
    methods: {
        play: function () {

            var css = "";
            var code = "";
            var _editor_code = "";

            //show only wanted parts of code
            var re = new RegExp("(\/\/|#)[ ]?start\n(([\\s\\S]*)\n(\/\/|#)[ ]?stop|([\\s\\S]*))", "im");
            var result = re.exec(data.code);
            console.log('result');
            console.log(result);

            if (result == null) {
                _editor_code = this.editor_code.getValue();
            } else {
                _editor_code = data.code.replace(result[0], this.editor_code.getValue());
            }            

            for (var i in this.enviroments[this.n].cssfiles) {
                css = css + "<link href='" + this.enviroments[this.n].cssfiles[i] + "' rel='stylesheet'>";
            }
            css = css + "<style>" + this.css + "</style>";

            for (var i in this.enviroments[this.n].codefiles) {
                code = code + "<script src='" + this.enviroments[this.n].codefiles[i] + "'></script>";
            }
            code = code + "<script type='" + this.enviroments[this.n].type + "'>" + _editor_code + "</script>";
            for (var i in this.enviroments[this.n].codefilesafter) {
                code = code + "<script src='" + this.enviroments[this.n].codefilesafter[i] + "'></script>";
            }

            this.iframehtml = "<!DOCTYPE html><html><head><meta charset='utf-8'>"
                + "<!-- created:" + new Date() + " -->"
                + css + "</head><body>"
                + this.html + code + "</body></html>";
            console.log(this.iframehtml);
        }
    }
})

