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
    collectionname: "",
    landingpage: ""
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
    editor.getSession().setUndoManager(new ace.UndoManager());

    // editor.renderer.lineHeight should be 17, but is in this moment 0 :-(
    var height = 17 * editor.getSession().getDocument().getLength() + "px";
    document.getElementById("editor").style.height = height;
    editor.resize(); 

    editor.on("change", function() {
        var editor = ace.edit("editor");                   // the editor object
        var editorDiv = document.getElementById("editor");     // its container
        var doc = editor.getSession().getDocument();
        var lineHeight = editor.renderer.lineHeight;
        
        editorDiv.style.height = lineHeight * doc.getLength() + "px";
        editor.resize();
    });   
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
        data.collection = response.data.list;
        data.collectionname = response.data.name;
        data.landingpage = response.data.landingpage;
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

        data.lang = response.data.lang;
        data.enviroment = response.data.enviroment;
        data.task = response.data.task;
        data.autoplay = response.data.autoplay;
        data.video = response.data.video;
        data.description = response.data.description;
        data.html = response.data.html;
        data.css = response.data.css;
        data.code = response.data.code;
        data.code_preset = data.code;

        for (var i in data.enviroments) {
            if (data.enviroments[i].lang == data.lang &&
                data.enviroments[i].name == data.enviroment) {
                data.n = i;
            }
        }

        setupEditor();

        if (data.autoplay) {
            var lightbox = lity(data.video);
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
    data: data
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

