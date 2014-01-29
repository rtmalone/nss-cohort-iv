/* global Animal: false */

(function (){

  'use strict';

  window.animalFactory = function(){
    var animals = [];
    var animal;
    var photos;

    photos = [];
    photos[0] = 'url(http://www.hdpaperwall.com/wp-content/uploads/2013/11/dachshund-dog-in-the-grass-photo.jpg)';
    animal = new Animal('Poptart', 5, 'Male', 'Black', 'Nervous', photos, 'Dog');
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://wallalay.com/wp-content/uploads/2013/11/Best-Dog-Wallpaper-51.jpg)';
    animal = new Animal('Fido', 3, 'Male', 'Brown', 'Happy', photos, 'Dog');
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://static.ddmcdn.com/gif/bigfoot.jpg)';
    animal = new Animal('Harry', 17, 'Male', 'wookie-ish', 'hungry', photos, 'Ape');
    animals.push(animal);
    
    photos = [];
    photos[0] = 'url(http://static4.wikia.nocookie.net/__cb20140111163521/fantendo/images/7/7c/Sonicthehedgehog.png)';
    photos[1] = 'url(http://www.nintendo-insider.com/wp-content/uploads/2011/12/Sonic_39.png)';
    animal = new Animal('Sonic', 8, 'Male', 'blue', 'speedy; loves rings', photos, 'Hedgehog');
    animals.push(animal);

    return animals;
  };

})();
