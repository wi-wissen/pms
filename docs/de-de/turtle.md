# Turtle-Grafik

[Turtle-Grafik](https://de.wikipedia.org/wiki/Turtle-Grafik) ist sicher eins der bekanntesten Einsteigsprojekte, um mit Lernenden einen Roboter oder Scholdkröte einen Stift über eine Zeichenfläche bewegen zu lassen.

In diesem Fall würde die [Implementierung von Prof. Dannenberg](http://cmuems.com/2015c/deliverables/turtle-graphics/) auf Basis von P5 verwendet.

Es werden folgende Befehle unterstützt:

```js
var turtle = new Turtle(x, y); // make a turtle at x, y, facing right, pen down
turtle.left(d);                // turn left by d degrees
turtle.right(d)                // turn right by d degrees
turtle.forward(p);             // move forward by p pixels
turtle.back(p);                // move back by p pixels
turtle.penDown();              // pen down
turtle.penUp();                // pen up
turtle.goto(x, y);             // go straight to this location
turtle.setColor(color);        // set the drawing color
turtle.setColor(color(r,g,b)); // can be used to set color with r, g, b, values
turtle.setWeight(w)            // set the line width to w
turtle.face(d);                // turn to this absolute direction in degrees
turtle.angleTo(x, y);          // what is the angle from my heading to location x, y?
turtle.turnToward(x, y, d);    // turn by d degrees toward location x, y
turtle.distanceTo(x, y);       // how far is it to location x, y?
```

