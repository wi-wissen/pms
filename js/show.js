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
    world: 1,
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

    //restore data from sessionStorage if exists
    if(sessionStorage.getItem(data.t)) data.editor_code.setValue(sessionStorage.getItem(data.t));

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

        var langTools = ace.require("ace/ext/language_tools");
        langTools.setCompleters([]);

        //backup data to sessionStorage
        sessionStorage.setItem(data.t, data.editor_code.getValue());
    });      
    
    

   editor.commands.addCommand({
    name: "beautifyCommand1",
    bindKey: { win: "Ctrl-B", mac: "Command-Option-B" },
    exec: function () {
        if (data.enviroments[data.n].acemode == "javascript") {
            data.editor_code.setValue(js_beautify(data.editor_code.getValue()));
            console.log("beautified");
        }
        else {
            console.log("Sorry language is not supported");
        }
    }
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
                data.n = parseInt(i);
            }
        }

        setupEditor();

        if (data.autoplay) {
            var lightbox = lity(data.video);
        }

        run(true);

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
            sessionStorage.removeItem(data.t); //clear session backup
            data.world = 0;
            setupEditor();
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
            run();
        },
        reset: function () {
            run(true);
        }
    },
    updated () {
		$(this.$refs.select).selectpicker('refresh')
	},
    computed: {
        setupWorld: function () {
            return this.enviroments[this.n].codeoninitialrun;
        },
        worlds: function () {
            var a = [];
            var  _editor_code = "";
            if (data.enviroments[data.n].worldkeyword) {
                var re = new RegExp("(\/\/|#)[ ]?start\n(([\\s\\S]*)\n(\/\/|#)[ ]?stop|([\\s\\S]*))", "im");
                var result = re.exec(data.code);
                if (result == null) {
                    _editor_code = _editor_code + data.editor_code.getValue();
                } else {
                    _editor_code = _editor_code + data.code.replace(result[0], data.editor_code.getValue());
                }

                var n = _editor_code.split(data.enviroments[data.n].worldkeyword).length - 4; //remove 3 for def, setting index and index
        
                for (i = 0; i < n; i++) {
                    a.push(i + 1);
                }
            } 
            return a;
        }
    },
    watch: {
        world: function () {
            run(true);
        }
      }
})

function run(initial) {
    initial = initial || false;
    var css = "";
    var code = "";
    var _editor_code = "";

    //show only wanted parts of code
    var re = new RegExp("(\/\/|#)[ ]?start\n(([\\s\\S]*)\n(\/\/|#)[ ]?stop|([\\s\\S]*))", "im");
    var result = re.exec(data.code);
    console.log('result');
    console.log(result);

    //add initial code if this is the first run
    if (initial) _editor_code = data.enviroments[data.n].codeoninitialrun;

    //rebuild code if some parts are hidden
    if (result == null) {
        _editor_code = _editor_code + data.editor_code.getValue();
    } else {
        _editor_code = _editor_code + data.code.replace(result[0], data.editor_code.getValue());
    }
    
    //set world variable if it is used in this enviroment
    if (data.enviroments[data.n].worldkeyword) _editor_code = _editor_code.replace(data.enviroments[data.n].worldkeyword  + "N", data.world - 1);


    for (var i in data.enviroments[data.n].cssfiles) {
        css = css + "<link href='" + data.enviroments[data.n].cssfiles[i] + "' rel='stylesheet'>";
    }
    css = css + "<style>" + data.css + "</style>";

    for (var i in data.enviroments[data.n].codefiles) {
        code = code + "<script src='" + data.enviroments[data.n].codefiles[i] + "'></script>";
    }
    code = code + "<script type='" + data.enviroments[data.n].type + "'>" + _editor_code + "</script>";
    for (var i in data.enviroments[data.n].codefilesafter) {
        code = code + "<script src='" + data.enviroments[data.n].codefilesafter[i] + "'></script>";
    }

    data.iframehtml = "<!DOCTYPE html><html><head><meta charset='utf-8'>"
        + "<!-- created:" + new Date() + " -->"
        + css + "</head><body>"
        + data.html + code + "</body></html>";
    console.log(data.iframehtml);
}