var Initium = Initium || {};

Initium.HBody = function (x, y, mass, radius) {
    var self = this;

    //position x on screen(in world)
    self.x = x;
    //position y on screen(in world)
    self.y = y;
    //mass of object
    self.mass = mass;
    //
    self.radius = radius;
};

Initium.Star = function (x, y, mass, radius, maxPlanetaryInfluence) {
    var self = this;

    self.orbitals = [];

    var maxInfluence = maxPlanetaryInfluence;

    //position x on screen(in world)
    self.x = x;
    //position y on screen(in world)
    self.y = y;
    //mass of object
    self.mass = mass;
    self.radius = radius;

    self.addOrbital = function (distance, mass, radius, color, label, modifier) {
        modifier = modifier || 1;
        distance = distance / modifier;
        var planetX = self.x - distance;

        var planet = new Initium.Planet(planetX, self.y, mass, radius);
        //var time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance * modifier), 3))) / ((self.mass + mass) * Initium.Math.gravitationalConstant));
        var time = Math.sqrt((4 * Math.pow(Math.PI, 2) * (Math.pow((distance), 3))) / ((self.mass + mass) * Initium.Math.gravitationalConstant));
        var v = (2 * Math.PI * (distance)) / time;
        //var v = (2 * Math.PI * (distance * modifier)) / time;

        planet.velocity = {forceX: 0, forceY: v};
        planet.color = color;
        planet.label = label || 'unknown';
        planet.modifier = modifier;

        self.orbitals.push(planet);
    };

    self.update = function () {
        jQuery.each(self.orbitals,
            function (idx, orbital) {
                if (orbital.nr > orbital.modifier + 2) {
                    orbital.nr = 1;
                }

                if (orbital.nr === 1) {

                    var grav = Initium.Math.calcGravity(self, orbital);
                    Initium.Math.calcForce(grav, self, orbital);

                    orbital.x = orbital.x + orbital.velocity.forceX;
                    orbital.y = orbital.y + orbital.velocity.forceY;
                }

                if (orbital.modifier > 1) {
                    orbital.nr++;
                }
            }
        );

    };

    self.render = function () {
        Initium.Renderer.drawCircle(Initium.Main.context, self.y, self.x, self.radius);

        Initium.Renderer.drawOrbit(Initium.Main.context, self.y, self.x, (778 / 3));

        jQuery.each(self.orbitals,
            function (idx, orbital) {
                orbital.render();
            }
        );
    };
};

Initium.Planet = Initium.HBody = function (x, y, mass, radius, distance) {
    var self = this;

    self.nr = 1;
    self.modifier = 1;
    self.year = 0;

    self.velocity = {forceX: 0, forceY: 0};

    //position x on screen(in world)
    self.x = x;
    //position y on screen(in world)
    self.y = y;
    //mass of object
    self.mass = mass;
    //
    self.radius = radius;

    self.render = function () {
        Initium.Renderer.drawCircle(Initium.Main.context, self.y, self.x, self.radius, self.color);
        //Initium.Main.context.drawImage(Initium.Image.planets, 0, 0, 20, 20, self.y - self.radius, self.x - self.radius, self.radius * 2, self.radius * 2);
    }
};
