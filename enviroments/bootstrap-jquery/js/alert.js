//https://github.com/makeusabrew/bootbox/issues/95
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function genericWrapper(fn, options) {
    return new Promise(function (resolve) {
        return fn(__assign({}, options, { callback: function (confirmed) { return resolve(confirmed); } }));
    });
}
var wrappedConfirm = function (options) { return genericWrapper(bootbox.confirm, options); };
var wrappedPrompt = function (options) { return genericWrapper(bootbox.prompt, options); };

function wrappedAlert(message) {
    return new Promise(function (resolve) {
        return bootbox.alert(message, function () { return resolve(true); });
    });
}

async function prompt(title) {
    const prompted = await wrappedPrompt({title : title});
    return prompted;
}

async function confirm(message) {
    const confirmed = await wrappedConfirm({message : message });
    return confirmed;
}

async function alert(message) {
    await wrappedAlert(message);
}