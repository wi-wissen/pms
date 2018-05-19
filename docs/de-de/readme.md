# ada7.de

## Über ada7.de

Ziel dieser Plattform ist es die Lücke zwischen blockbasierten Sprachen (wie [Scratch](https://scratch.mit.edu/) und [Blockly](https://blockly-demo.appspot.com/static/demos/index.html)) und vollständigen Programmierumgebungen zu schließen. 

Dem Lernenden wird hier innerhalb eines einzelnen Browserfensters ein Editor und sein Programmierergebnis angezeigt. Dadurch ist es möglich, dass sich die Lernenden vollständig auf das Algorithmisieren und das anschließende Implementieren konzentrieren können. Es muss keine Oberfläche beherrscht werden und keine Dateien gesucht und geöffnet werden. Auch ohne Installation kann der Lernende sofort zu Hause loslegen.

Lehrkräfte können einzelne Szenarien vorbereiten, wobei sie auf vorgefertigte Umgebungen zurückgreifen können. Der Lernende erhält anschließend nur den für ihn bestimmten Ausschnitt zu sehen und zu bearbeiten.

Aktuell werden folgende Sprachen unterstützt: JavaScript, CoffeeScript, TypeSkript und Pythone. Bei der Gestaltung der Oberfläche wurde sich stark an [code.org](https://studio.code.org/hoc/1) orientiert. So ist es möglich zu einer Aufgabenstellung ein Video, Bild, IFrame oder Karte beizufügen. Dieses kann auf Wunsch sofort zu Beginn abgespielt bzw. angezeigt werden.

## Aufgaben erstellen

Es gibt zwei Möglichkeiten eine neue Aufgabe zu erstellen:

1. Auf der Startseite „Aufgabe erstellen“ auswählen.
2. Bei einer bestehenden Aufgabe im Menü „Fork“ auswählen. Hier werden sofort alle für die Aufgabe getätigten Einstellungen übernommen.

Beim Erstellen einer Aufgabe geht man wie folgt vor:

1. Es wird die Zielsprache gewählt.
2. Es wird eine für die Zielsprache zur Verfügung stehende Umgebung ausgewählt. 
3. HTML, CSS und das Programm können bereits vorbereitet werden.

Zur Aufgabenbeschreibung kann ein kurzer Text gehören und ein Video, Bild, IFrame oder Karte:

* Task kann mit einem Doppelklick auf das gewünschte Wort grundlegend Formatiert werden. Es wird empfohlen hier sparsam mit der Formatierung umzugehen.
* Die Beschreibung (Description) kann auch mit Bildern frei gestaltet werden. Bitte beachte, dass die Bilder nicht zu groß sind. Dies kann dazu führen, dass der Server den Task nicht speichert. Du kannst die Beschreibung auch zu Beginn anzeigen lassen, wenn anstelle des Links `#description` eingegeben wird.

Im Menü kann mit "Publish" die Aufgabe veröffentlicht werden. Es wird einmalig ein kurzer Link angezeigt, welcher mit den Lernenden geteilt werden kann. Das nachträgliche Ändern der Aufgaben ist zwar nicht möglich, dafür kann aber natürlich auch die eigene Aufgabe geforkt werden.



Manchmal soll der Lernende nicht den gesamten Quelltext sehen. Dafür können Teile des Quelltextes im Editor ausgeblendet werden:

```js
console.log('hi');
// start
console.log('first?');
// stop
```

oder

```coffeescript
alert = require 'alert-node'
alert 'hi'
# start
alert 'first?'
# stop
```

Es wird nur der Text zwischen Start und Stop angezeigt. Wobei das Schlüsselwort Stop weggelassen werden kann. Sobald der Lernende "Fork" auswählt oder das Programm ausführt, wird der gesamte Quelltext verwendet.



## Aufgaben lösen

​Du hast eine Aufgabe bekommen und fragst dich wie du diese lösen kannst? Die Musterlösung findest du hier leider nicht.  :stuck_out_tongue_winking_eye:

Überlege dir ein Algorithmus zur Lösung der Aufgabe. Hast du diesen, implementiert zu ihn in der vorgegebenen Programmiersprache. Anschließend kannst du dein Programm mit einem Klick auf den Knopf "Play" ausprobieren. Bist du mit deinem Ergebnis zufrieden, kannst du zur nächsten Aufgabe übergehen.



## Aufgabensammlungen erstellen

Sollen die Lernenden mehre Aufgaben erstellen, so kannst du eine Aufgabensammlung erstellt werden. Die einzelnen Aufgaben werden in der Navigationsleiste angezeigt.

Wie Aufgaben können auch Aufgabensammlungen geforkt werden. Dafür gibt es keinen Einstieg über die Oberfläche. Rufe einfach [https://ada7.de/createcollection/TOKEN](#) auf. Das kann etwa https://ada7.de/createcollection/xjmb sein.




## Mitmachen

ada7.de wurde als Open Source Plattform programmiert, damit Lehrkräfte und Lernende Aufgaben unkompliziert austauschen können. Wenn du also eine gute Aufgabe oder Aufgabensammlung erstellt hast, wäre es wirklich sehr schön, denn du diese mit uns anderen Lehrenden und Lernenden teilen würdest!

### Umgebungen

Du kannst neben den bestehenden Umgebungen neue erschaffen. Alle Umgebungen werden in der settings.json definiert:

```json
{
	"lang": "Python",
	"name": "Demo",
	"type": "text/python",
	"acemode": "python",
	"cssfiles": [
		"/enviroments/bootstrap-jquery/css/bootstrap.min.css"
	],
	"codefiles": [
		"/enviroments/bootstrap-jquery/js/jquery-3.3.1.min.js",
		"/enviroments/bootstrap-jquery/js/bootstrap.min.js",
		"/enviroments/bootstrap-jquery/js/bootbox.min.js",
		"/enviroments/bootstrap-jquery/js/alert.js"
	],
	"codefilesafter": [
		"/enviroments/python/skulpt.min.js",
		"/enviroments/python/skulpt-stdlib.js",
		"/enviroments/python/run-python.js"
	],
	"html": "<pre id='output' ></pre> <!-- If you want turtle graphics include a canvas --> <div id='mycanvas'></div> ",
	"css": "",
	"code": "import turtle \nt = turtle.Turtle() \nt.forward(100) \nprint 'Hello World'"
}
```

Es ist empfehlenswert für die neue Umgebung in dem Ordner `enviroments` einen eigenen Ordner für alle benötigten Dateien anzulegen.

| Attribut      | Bedeutung                                |
| ------------- | ---------------------------------------- |
| lang          | Sprache (wie im Dropdown zu sehen)       |
| name          | Name, wie es im Dropdown angezeigt werden soll |
| type          | Sprache für den Browser (i.d.R. `text/javascript`) |
| acemode       | Sprache für den Ace-Editor               |
| cssfile       | CSS-Dateien, die eingebunden werden sollen. |
| codefile      | JS-Dateien, die vor der Benutzereingabe eingebunden werden sollen. |
| codefileafter | JS-Dateien, die nach der Benutzereingabe eingebunden werden sollen. |
| html          | was im HTML-Editor stehen soll           |
| css           | was im Programm-Editor stehen soll       |
| code          | was im CSS-Editor stehen soll            |

### Plattform

ada7.de ist Open Source und kann somit vollständig angepasst werden. Hast du ein neues Szenario erstellt oder eine neue Funktion für den Editor hinzugefügt, wäre ein Push request bei GitHub ausgezeichnet.

