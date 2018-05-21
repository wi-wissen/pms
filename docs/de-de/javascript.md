# JavaScript

## Befehl

Eine Anweisung wird immer mit einem Semikolon beendet. Es wird empfohlen anschließend in einer neuen Zeile weiterzuschreiben. Dies ist aber nicht notwendig.

```javascript
start();
kara.move();
alert('Hello World!');
```

i> Ein Semikolon ohne etwas davor ist ein leerer Befehl.

Du siehst oben drei verschiedene Befehle:

* `start();` - Hier rufst du eine Funktion auf. Also ein Befehl der im Hintergrund viele weitere (komplizierte) Befehle aufruft.
* `kara.move();` - Hier rufst du eine Funktion von einem speziellen Objekt auf.
* `alert('Hello World!');` - Die Funktion `alert()` zeigt ein Popup an. Ohne genauere Erklärung wäre dieses aber leer. Daher wird `'Hello World!'` als Parameter übergeben.

## Entscheidung

Ein Rechner kann nur eine Entscheidung treffen, wenn er von einer Aussage prüfen kann, ob diese wahr oder falsch ist. Dazu muss immer eine Behauptung mit einer Tatsache verglichen werden:

```javascript
if (1==2) {
    alert("Das kann nicht sein!");
} else {
    alert("1 und 2 sind eben doch unterschiedlich.");
}
```

Du siehst, dass in `()` eine Behauptung, die auf Wahrheit, geprüft wird und dann in `{}` Anweisungen ausgeführt werden. `if` bedeutet falls und `else` sonst. Jenachdem was stimmt werden nur die Befehle aus dem `{}` Block ausgeführt. 

w> 1 und 2 werden hier mit `==` verglichen. Das wirkt vielleicht komisch und anders als in Mathe, ist aber äußerst wichtig. Warum das so ist lernst du im Abschnitt Variabeln.

Beispiele für Vergleiche:

* `1==2` – Hier prüft er ob 1 gleich 2 ist.  Das Ergebnis ist falsch (`false`)
* `1!=2` – Hier prüft er, ob 1 ungleich 2 ist. Das Ergebnis ist wahr (`true`)
* `kara.onLeaf()==true` – Hier wird gefragt, ob kara auf einem Kleeblatt steht.
* `kara.onLeaf()` – Hier wird ein Trick gemacht. Da die Funktion `kara.onLeaf()` bereits wahr oder falsch sagt, darf ausnahmsweise auf `==true` verzichtet werden.
* `!kara.onLeaf()` – Dies ist noch ausgefuchster: Das Ausrufezeichen dreht die Beheutung einfach um. Es ist also die Kurzfassung von `kara.onLeaf()!=true`

Natürlich lassen sich mehr als nur eine Behauptung prüfen:

```javascript
if (Bedingung1) {
    // wird ausgeführt, wenn Bedingung1 war ist.
} else if (Bedingung2) { //wird nur geprüft, wenn Bedingung1 nicht zutraf.
    // wird ausgeführt, wenn Bedingung2 war ist.
} else {
    //wird ausgeführt, wenn Bedingung1 und Bedingung2 nicht zutreffen.
}
```

`if` prüft eine Bedingung. `else` wird ausgeführt, wenn `if` falsch war (engl. `else` zu deutsch sonst). Möchte man noch eine weitere Alternative prüfen, so kann man beide kombinieren zu `else if` (wenn nicht, dann prüfe Folgendes…)

 `else if` kann beliebig oft geschrieben oder ganz weggelassen werden:					

```javascript
if (Bedingung1) {
    // wird ausgeführt, wenn Bedingung1 war ist.
} else {
    //wird ausgeführt, wenn Bedingung1 und Bedingung2 nicht zutreffen.
}
if (Bedingung1) {
    // wird ausgeführt, wenn Bedingung1 war ist.
} else if (Bedingung2) { //wird nur geprüft, wenn Bedingung1 nicht zutraf.
    // wird ausgeführt, wenn Bedingung2 war ist.
} else if (Bedingung3) { //wird nur geprüft, wenn Bedingung1 nicht zutraf.
    // wird ausgeführt, wenn Bedingung3 war ist.
} else {
    //wird ausgeführt, wenn Bedingung1, Bedingung1 und Bedingung3 nicht zutreffen.
}
```



## Schleife

Mit Schleifen können Befehle, die einmal geschrieben wurden, mehrmals aufgerufen werden:

```javascript
while (!kara.treeFront()) {
     kara.move();
}
```

i> Beachte die Ähnlichkeit zu Entscheidungen

Hier wird geprüft, ob kara vor einem Baum steht, wenn nicht, dann geht kara einen Schritt nach vorne. Sobald sie vor einem Baum steht hört sie auf.

```javascript
do {
     kara.move();
} while (!kara.onLeaf())
```

Hier geht kara so lange vorwärts, bis kara auf einem Kleeblatt steht. (Beachte, dass die Frage nach einem Baum vor und eine nach einem Kleeblatt nach dem Laufen gestellt werden sollte)

```javascript
for (i = 0; i < 5; i++) {
     kara.move();
}
```

Hier läuft kara genau 5-mal. Anschließend bleibt sie stehen. Was dieser Ausdruck genau bedeutet ist zu Beginn noch sehr schwer zu verstehen, merke dir, dass die anstelle der 5 eine beliebig andere Zahl schreiben könntest, wie oft etwas gemacht werden soll.



## eigene Funktion

Nicht nur kara kann Funktionen ausführen. Auch du kannst eine Funktion erstellen:

```javascript
function karaDrehtDurch() {
  kara.turnLeft();
  kara.turnLeft();
  kara.turnLeft();
  kara.turnLeft();
}

// hier kommt das Hauptprogramm hin, z.B.:
karaDrehtDurch();
```

Hier wurde die Methode `karaDrehtDurch` beschrieben und anschließend ausgeführt. Wichtig ist, dass die Methode immer über der ersten Benutzung beschrieben wird.



## Variabeln

w> Die Erklärung an dieser Stelle ist angepasst an die Sek. I, im Eigenstudium können durchaus weiterführende Erklärungen gefunden werden.

Eine Variable ist eine Art Tasche, wo ich mir Werte merken kann. Dies ist sehr praktisch, um beispielsweise Werte vom Benutzer entgegenzunehmen oder abhängig vom aktuellen Zustand eine Aktion durchführen zu können.

Hier ein Beispiel:

```javascript
var name = "";
name = prompt("Wie heißt du?");
alert("Hallo "+ name);
```

In der ersten Zeile Erkläre ich dem Rechner, dass ich gern eine Variable (Tasche) mit dem Namen `name` hätte. Diese Variable (Tasche) ist zu Beginn leer.

In der zweiten Zeile gebe ich eine Frage an den Benutzer aus. Das Ergebnis wird in die Variable (Tasche) `name` geschrieben. Das einfach Istgleichzeichen (`=`) wird hier als Zuweisung verwendet. 

i> Daher haben wir beim Vergleich immer zweimal das Istgleichzeichen (`==`) nehmen müssen.

In der dritten Zeile wird die Nachricht `Hallo` und der Inhalte der Variable (Tasche) ausgegeben.

Variablen (Taschen) können ganz verschiedene Inhalte aufnehmen. Für den Unterricht können wir uns Zeichenketten (Beispiel `„Papa Bär“`), Zahlen (Beispiel `5`) oder Wahrheitszustände (Beispiel `true`) vorstellen.



## weiterführende Dokumentationen
### Deutsch
https://wiki.selfhtml.org/wiki/JavaScript

Einsteigerfreundliche Dokumentation mit vielen Beispielen.

https://developer.mozilla.org/de/docs/Web/JavaScript

Äußerst umfangreiche und gut verständliche Dokumentation. Auch mit Tutorials.

i> Hier spicken auch die Entwickler dieser Plattform. :wink:

### Englisch

i> Beim Programmieren ist Englisch die Standartsprache. Quasi alle Bibliotheken und Sprachen sind in Englisch dokumentiert. Nur in seltenen Fällen gibt es Dokumentationen oder Bücher auf Deutsch. Aber keine Sorge: Da die meisten wie du Englisch als Zweit- oder Drittsprache lernen/gelernt haben, hat sich für Programmierer ein ganz ziemlich einfaches technisches Englisch durchgesetzt. Das verstehst du nach kurzer Gewöhnung auch sehr gut!

https://developer.mozilla.org/en-US/docs/Web/JavaScript

Wenn in der deutschen Version etwas fehlt, findest du es hier garantiert.

https://www.w3schools.com/jsref/default.asp

Viele Beispiele zum Ausprobieren. Auch viele andere Themen zum Einstieg in die Webentwicklung.