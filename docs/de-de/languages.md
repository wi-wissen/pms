# Unterstütze Programmiersprachen

Alle unterstützten Programmiersprachen werden im Browser ausgeführt. Das bedeutet, dass letztendlich immer JavaScriptcode ausgeführt wird. Dieser befindet sich immer innerhalb eines IFrames welcher durch den Parameter sind Box geschützt ist. 

Es gelten aus Sicherheitsgründen immer folgende Einschränkungen:

* Wird als eigene Webseite behandelt, die auf keinen anderen Tab (auch nicht den eigenen) zugreifen kann
* Kann keine Formulare absenden
* Kann keine Browserplugins laden
* Kann nicht automatisch Videos o.ä. abspielen
* Kann keine Popups öffnen (auch kein `alert()`)

Einige Einschränkungen können in den vorgebenen Umgebungen sicher verwendet werden.

## JavaScript

Hier wird JavaScript in der unterstützten Version des jeweiligen Webbrowsers ausgeführt. In der Regel ist bei halbwegs aktuellen Browsern kein Unterschied zu erkennen

## CoffeeScript

[CoffeeSkript](http://coffeescript.org/) ist eine Programmiersprache, welche eine vereinfachte Syntax für JavaScript bietet. Kaffeeskript wird zur Laufzeit in JavaScript  übersetzt.

## TypeScript

[TypeScript](https://www.typescriptlang.org/) wurde von Microsoft entwickelt. Zusätzlich zu JavaScript ermöglicht es etwa die [Typisierung oder Namespace](https://en.wikipedia.org/wiki/TypeScript). Dies kann aus pädagogischen Gründen sehr sinnvoll sein.

Normalerweise wird TypeScript einmalig übersetzt und anschließend dann als JavaScript ausgeführt. Diese Aufgabe wird hier direkt im Browser durchgeführt. Davon wird im Produktivbetrieb aus Performancegründen abgeraten.

## Python

Im Webbrowser kann kein Python ausgeführt werden. Aus diesem Grunde wird hier die Implementierung [Skulpt](http://www.skulpt.org/) für Python verwendet. Hier wurden die wichtigsten Befehle von Pfeifen implementiert.