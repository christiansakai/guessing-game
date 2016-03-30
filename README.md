# Guessing Game
This is a small game made entirely using JavaScript, HTML & CSS.

# Rules
* When a game begins, there should be a random number generated between 0-99.
* The user has an input field where they can submit a guess.
* After the user submits a guess, it will be indicated whether their guess is 'hot' or 'cold' and if they need to guess higher or lower.
* The user can only guess for 5 times. When they run out of guesses or when they win let them know the game is over.
* The user can only put an integer between 1-100.
* The user cannot repeat the same guess number.
* User guess history will be indicated on the right side column.
* Game over will also be indicated via animation.
* User can check answer in your browser console for debugging purposes.
* Can reset the game without reloading.

# Requirements
## Libraries
* [Twitter Bootstrap](http://getbootstrap.com/)
* [jQuery](http://jquery.com/)


## TESTEM

testem -f filename


## Architecture
#### Model & Controller
Using a class constructor named `App`.  Put all the data and game logic inside `App` class.

####View
Using an object named `dom`.  Put all the DOM related data and function inside this object.
All DOM primitive type will have this syntax `dom['input']`, while all DOM function will use this syntax `dom.giveHint`.

#Etc
Made jQuery custom functions to make DOM object visible, invisible or toggle between visibilities.

## TODO


append change to html and testing, and probaby test on $.fn.init
