var data = {
    enviroments: [],
    n: 0,
    enviroment: "",
    lang: "",
    editor_html: null,
    editor_css: null,
    editor_code: null,
    iframehtml: ""
}

function setupEditor () {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        fontSize: 14,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
    })
    var EditSession = ace.require("ace/edit_session").EditSession;
    data.editor_html = new EditSession("", "ace/mode/html");
    data.editor_css = new EditSession("", "ace/mode/css");
    data.editor_code = new EditSession("", "ace/mode/" + data.enviroments[data.n].acemode);
    console.log(data.lang.toLowerCase());
    editor.setSession(data.editor_code);
}

function fillEditor () {
    for (var i in data.enviroments) {
        if (data.enviroments[i].lang == data.lang && 
            data.enviroments[i].name == data.enviroment) {
                data.editor_html.setValue(data.enviroments[i].html);
                data.editor_css.setValue(data.enviroments[i].css);
                data.editor_code.setValue(data.enviroments[i].code);
            }
    }


    var editor = ace.edit("editor");
    editor.setSession(data.editor_code);

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
            fillEditor();

            var n = 0;
            for (var i in data.enviroments) {
                if (data.enviroments[i].lang == data.lang && 
                    data.enviroments[i].name == data.enviroment) {
                        this.n = i;
                    }
            }
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
        },
        editcss: function () {
            var editor = ace.edit("editor");
            editor.setSession(this.editor_css);
        },
        editcode: function () {
            var editor = ace.edit("editor");
            editor.setSession(this.editor_code);
        }
    },
    created: function () {
        setupEditor();
    }
})

new Vue({
    el: '#playgroundarea',
    data: data,
    methods: {
        play: function () {
            var css = "";
            var code = "";

            for (var i in data.enviroments[this.n].cssfiles) {
                css = css + "<link href='" + data.enviroments[this.n].cssfiles[i] + "' rel='stylesheet'>";
            }
            css = css + "<style>" + data.editor_css.getValue() + "</style>";

            for (var i in data.enviroments[this.n].codefiles) {
                code = code + "<script src='" + data.enviroments[this.n].codefiles[i] + "'></script>";
            }
            code =  code + "<script type='" + data.enviroments[this.n].type + "'>" + data.editor_code.getValue() + "</script>";
            for (var i in data.enviroments[this.n].codefilesafter) {
                code = code + "<script src='" + data.enviroments[this.n].codefilesafter[i] + "'></script>";
            }


            this.iframehtml = "<!DOCTYPE html><html><head><meta charset='utf-8'>" 
            + css + "</head><body>"
            + data.editor_html.getValue() + code + "</body></html>";
            console.log(this.iframehtml);
        }
    }
})
