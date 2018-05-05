# Konsole

Die Konsolenausgabe aus dem Programm wird wie gewohnt im jeweiligen Browser innerhalb der Entwicklerwerkzeuge ausgegeben. Das ist oft nicht der gewünschte Ausgabeort.

Die Konsole kann auch leicht im Programmfenster ausgegeben werden: 
```js
(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
        } else {
            logger.innerHTML += arguments[i] + '<br />';
        }
      }
    }
})();
```

```html
<pre id='log'></pre>
```
Hiermit wird die Funktion `console.log` einfach neu definiert und überschreibt damit die ursprüngliche Funktion.