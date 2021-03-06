var data = {
    task: "",
    enviroments: [],
    n: 0,
    enviroment: "",
    lang: "",
    autoplay: false,
    video: "",
    description: "",
    editor_html: null,
    editor_css: null,
    editor_code: null,
    html: "",
    css: "",
    code: "",
    enviroment_preset: "",
    lang_preset: "",
    iframehtml: "",
    world: 1,
    activeeditor: "code",
    customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block']
    ],
    editorTaskToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link']
    ],
    editorTaskOptions: {
        placeholder: 'taskname',
        theme: 'bubble'
    }
}

function setupEditor() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        fontSize: 14,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        showPrintMargin: false
    })
    var EditSession = ace.require("ace/edit_session").EditSession;
    data.editor_html = new EditSession("", "ace/mode/html");
    data.editor_css = new EditSession("", "ace/mode/css");
    for (var i in data.enviroments) {
        if (data.enviroments[i].lang == data.lang) {
            data.editor_code = new EditSession("", "ace/mode/" + data.enviroments[i].acemode);
            console.log(data.enviroments[i].acemode);
        }
    }
    //data.editor_code = new EditSession("", "ace/mode/" + data.enviroments[data.n].acemode);
    editor.setSession(data.editor_code);

    // editor.renderer.lineHeight should be 17, but is in this moment 0 :-(
    var height = 17 * editor.getSession().getDocument().getLength() + "px";
    document.getElementById("editor").style.height = height;
    editor.resize();

    editor.on("change", function () {
        var editor = ace.edit("editor");                   // the editor object
        var editorDiv = document.getElementById("editor");     // its container
        var doc = editor.getSession().getDocument();
        var lineHeight = editor.renderer.lineHeight;

        editorDiv.style.height = lineHeight * doc.getLength() + "px";
        editor.resize();
    });

    editor.commands.addCommand({
        name: "beautifyCommand1",
        bindKey: { win: "Ctrl-B", mac: "Command-Option-B" },
        exec: function () {
            if (data.enviroments[data.n].acemode == "javascript" && data.activeeditor == "code") {
                data.editor_code.setValue(js_beautify(data.editor_code.getValue()));
                console.log("beautified");
            }
            else if (data.activeeditor == "html") {
                data.editor_html.setValue(html_beautify(data.editor_html.getValue()));
                console.log("beautified");
            }
            else if (data.activeeditor == "css") {
                data.editor_css.setValue(css_beautify(data.editor_css.getValue()));
                console.log("beautified");
            }
            else {
                console.log("Sorry language is not supported");
            }
        }
    });
}

function fillEditor() {
    if (data.enviroment == data.enviroment_preset
        && data.lang == data.lang_preset) {
        data.editor_html.setValue(data.html);
        data.editor_css.setValue(data.css);
        data.editor_code.setValue(data.code);
    } else {
        data.editor_html.setValue(data.enviroments[data.n].html);
        data.editor_css.setValue(data.enviroments[data.n].css);
        data.editor_code.setValue(data.enviroments[data.n].code);
    }

    var editor = ace.edit("editor");
    editor.setSession(data.editor_code);
    editor.getSession().setUndoManager(new ace.UndoManager());

    // editor.renderer.lineHeight should be 17, but is in this moment 0 :-(
    var height = 17 * editor.getSession().getDocument().getLength() + "px";
    document.getElementById("editor").style.height = height;
    editor.resize();

    console.log("new setting filled in");
}

var vm = new Vue({
    data: data,
    created() {
        let vm = this;
        axios.get('/settings.json')
            .then(function (response) {
                console.log(response);
                a = [];
                for (var i in response.data.enviroments) {
                    vm.enviroments.push(response.data.enviroments[i]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        //is it a fork?
        var url = new URL(location);
        //var t = url.searchParams.get("t");
        var t = window.location.href.split("/").pop();
        if (t != null && t != "new" && t != "") {
            console.log("it's a fork!");
            axios.get('/api1/t/' + t + '.json')
                .then(function (response) {
                    //console.log(response);

                    vm.lang = response.data.lang;
                    vm.enviroment = response.data.enviroment;
                    vm.task = response.data.task;
                    vm.autoplay = response.data.autoplay;
                    vm.video = response.data.video;
                    vm.description = response.data.description;

                    for (i = 0; i < vm.enviroments.length; ++i) {
                        if (vm.enviroments[i].lang == vm.lang &&
                            vm.enviroments[i].name == vm.enviroment) {
                            vm.n = parseInt(i);
                        }
                    }

                    setupEditor();

                    vm.html = response.data.html;
                    vm.css = response.data.css;
                    vm.code = response.data.code;
                    vm.lang_preset = vm.lang;
                    vm.enviroment_preset = vm.enviroment;

                    //get data from sessionStorage if exists
                    if (sessionStorage.getItem(t)) vm.code = sessionStorage.getItem(t);

                    var editor = ace.edit("editor");
                    editor.setSession(vm.editor_code);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})

new Vue({
    el: '#navbar',
    data: data,
    methods: {
        resetinput: function () {
            fillEditor();
            task = "";
            video = "";
        },
        publish: function () {
            axios.post('/api1/t', {
                lang: data.lang,
                enviroment: data.enviroment,
                task: data.task == undefined ? "" : data.task,
                autoplay: data.autoplay,
                video: data.video == undefined ? "" : data.video,
                description: data.description == undefined ? "" : data.description,
                html: data.editor_html.getValue(),
                css: data.editor_css.getValue(),
                code: data.editor_code.getValue()
            })
                .then(function (response) {
                    bootbox.alert('Your Task is now published: <a href="/t/' + response.data.key + '">' + response.data.key + '</a>');
                })
                .catch(function (error) {
                    bootbox.alert("error: " + error);
                });
        }
    }
})

new Vue({
    el: '#lang',
    data: data,
    computed: {
        uniqueLangs: function () {
            var filtered_array = [];
            for (var i = 0; i < this.enviroments.length; i++) {
                if (filtered_array.indexOf(this.enviroments[i].lang) === -1) {
                    filtered_array.push(this.enviroments[i].lang)
                }
            }
            return filtered_array;
        }
    },
    watch: {
        lang: function (newLang, oldLang) {
            setupEditor();
        }
    }
})

new Vue({
    el: '#name',
    data: data,
    computed: {
        count: function () {
            var n = 0;
            for (var i = 0; i < this.enviroments.length; i++) {
                if (this.enviroments[i].lang == this.lang) {
                    n = n + 1;
                }
            }
            return n;
        }
    },
    watch: {
        enviroment: function (newEnviroment, oldEnviroment) {
            var n = 0;
            for (var i in data.enviroments) {
                if (data.enviroments[i].lang == data.lang &&
                    data.enviroments[i].name == data.enviroment) {
                    this.n = i;
                }
            }

            fillEditor();
        }
    }
})

new Vue({
    el: '#editorarea',
    data: data,
    methods: {
        edithtml: function () {
            var editor = ace.edit("editor");
            editor.setSession(this.editor_html);
            this.activeeditor = "html";
        },
        editcss: function () {
            var editor = ace.edit("editor");
            editor.setSession(this.editor_css);
            this.activeeditor = "css";
        },
        editcode: function () {
            var editor = ace.edit("editor");
            editor.setSession(this.editor_code);
            this.activeeditor = "code";
        }
    },
    created: function () {
        setupEditor();
    },
})

new Vue({
    el: '#resourcearea',
    data: data
})

new Vue({
    el: '#task',
    data: data
})

new Vue({
    el: '#playgroundarea',
    data: data,
    methods: {
        play: function () {
            run();
        }
    },
    updated() {
        $(this.$refs.select).selectpicker('refresh')
    },
    computed: {
        worlds: function () {
            var a = [];
            var _editor_code = "";
            if (typeof data.enviroments[data.n] !== 'undefined' && data.editor_code !== null) {
                console.log(data.editor_code.getValue().split(data.enviroments[data.n].worldkeyword));
                if (data.enviroments[data.n].worldkeyword) {
                    var n = data.editor_code.getValue().split(data.enviroments[data.n].worldkeyword).length - 4; //remove 3 for def, setting index and index

                    for (i = 0; i < n; i++) {
                        a.push(i + 1);
                    }
                }
            }

            return a;
        }
    },
    watch: {
        world: function () {
            run();
        }
    }
})

function run() {
    var css = "";
            var code = "";

            var _editor_code = data.editor_code.getValue();
            if (data.enviroments[data.n].worldkeyword) _editor_code = _editor_code.replace(data.enviroments[data.n].worldkeyword + "N", data.world - 1);

            for (var i in data.enviroments[data.n].cssfiles) {
                css = css + "<link href='" + data.enviroments[data.n].cssfiles[i] + "' rel='stylesheet'>";
            }
            css = css + "<style>" + data.editor_css.getValue() + "</style>";

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
                + data.editor_html.getValue() + code + "</body></html>";
            console.log(data.iframehtml);
}
