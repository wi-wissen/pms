function outf(text) { 
    var mypre = document; 
    mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

var prog = document.getElementsByTagName("script")[4].textContent;
var mypre = document;
mypre.innerHTML = '';
Sk.pre = "output";
Sk.configure({ output: outf, read: builtinRead });
(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, prog, true);
});
myPromise.then(function (mod) {
    console.log('success');
},
    function (err) {
        console.log(err.toString());
    }); 