function alert(message) { 
    bootbox.alert(message);
} 

function prompt(message) { 
    bootbox.prompt(message, function(result){ return result; })
} 

function confirm(message) { 
    bootbox.confirm(message, function(result){ return result; })
} 