# Dialoge

i> Anstelle von Dialogen ist es oft sinnvoll, eine kleine Oberfläche in HTML zu erstellen. 

Eine oft verwendete Möglichkeit, um ohne eine GUI zu programmieren Benutzereingaben zu erhalten, ist es, dass Dialoge wie etwa `alert()` angezeigt werden. Da diese aus Sicherheitsgründen deaktiviert sind, kann hier eine alternative Implementierung durch [Bootbox.js](http://bootboxjs.com/) verwendet werden:

```js
bootbox.alert("alert() mit Bootbox");
```

![bootbox](img/bootbox.png)

[Hier sind die vielen Funktionen mit Beispielen](http://bootboxjs.com/examples.html) gut beschrieben.

w>Bootbox is `non-blocking`. Das Programm wartet folglich nicht auf die Benutzereingabe und wird einfach weiter ausgeführt. Das ist für Programmieranfänger umständlich, entspricht aber besserem Programmverhalten. 

Um den Einsteig zu erleichtern kann in den unterstützten Umgebungen folgender Workaround verwendet werden:

```javascript
async function run() {
	await alert("hi");
	var name = await prompt("Wie heißt du?");
	await alert("Du heißt " + name);
	await alert('Du bestätigst' + (await confirm("Bestätigst du?") ? '.' : ' nicht.'));
}

run();
```

w> die Schlüsselwörter `async` und `await` sind essentiell.