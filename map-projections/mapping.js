var projections = [
    {
	name: "Azimuthal Equal Area",
	projection: d3.geo.azimuthalEqualArea()
	    .scale(120)
	    .clipAngle(180 - 1e-3)
	    .precision(.1)
    }, {
	name: "Azimuthal Equidistant",
	projection: d3.geo.azimuthalEquidistant()
	    .scale(75)
	    .clipAngle(180 - 1e-3)
	    .precision(.1)
    }, {
	name: "Gnomonic",
	projection: d3.geo.gnomonic()
	    .clipAngle(60 - 1e-3)
	    .scale(130)
	    .precision(.1)
    }, {
	name: "Orthographic",
	projection: d3.geo.orthographic()
	    .clipAngle(90 - 1e-3)
	    .scale(230)
	    .precision(.1)
    }, {
	name: "Stereographic",
	projection: d3.geo.stereographic()
	    .scale(230)
	    .clipAngle(90 - 1e-3)
    }, {
	name: "Albers Equal-Area Conic",
	projection: d3.geo.albers()
	    .scale(170)
	    .center([-.6, 38.7])
	    .parallels([29.5, 45.5])
	    .precision(.1)
    }, {
	name: "Lambert Conformal Conic",
	projection: d3.geo.conicConformal()
	    .rotate([98, 0])
	    .center([0, 38])
	    .parallels([29.5, 45.5])
	    .scale(55)
	    .precision(.1)
    }, {
	name: "Equidistant Conic",
	projection: d3.geo.conicEquidistant()
	    .center([0, 35])
	    .scale(110)
	    .precision(.1)
    }, {
        name: "Aitoff",
        projection: d3.geo.aitoff()
    }, {
        name: "August",
        projection: d3.geo.august().scale(60)
    }, {
        name: "Baker",
        projection: d3.geo.baker().scale(100)
    }, {
        name: "Boggs",
        projection: d3.geo.boggs()
    }, {
        name: "Bonne",
        projection: d3.geo.bonne().scale(100)
    }, {
        name: "Bromley",
        projection: d3.geo.bromley()
    }, {
        name: "Collignon",
        projection: d3.geo.collignon().scale(93)
    }, {
        name: "Craster Parabolic",
        projection: d3.geo.craster()
    }, {
        name: "Eckert I",
        projection: d3.geo.eckert1().scale(165)
    }, {
        name: "Eckert II",
        projection: d3.geo.eckert2().scale(165)
    }, {
        name: "Eckert III",
        projection: d3.geo.eckert3().scale(180)
    }, {
        name: "Eckert IV",
        projection: d3.geo.eckert4().scale(180)
    }, {
        name: "Eckert V",
        projection: d3.geo.eckert5().scale(170)
    }, {
        name: "Eckert VI",
        projection: d3.geo.eckert6().scale(170)
    }, {
        name: "Eisenlohr",
        projection: d3.geo.eisenlohr().scale(60)
    }, {
        name: "Equirectangular (Plate Carr\xe9e)",
        projection: d3.geo.equirectangular()
    }, {
        name: "Fahey",
        projection: d3.geo.fahey().scale(120)
    }, {
        name: "Gall Stereographic",
        projection: d3.geo.cylindricalStereographic().parallel(45).scale(140)
    }, {
        name: "Goode Homolosine",
        projection: d3.geo.homolosine()
    }, {
        name: "Ginzburg IV",
        projection: d3.geo.ginzburg4().scale(120)
    }, {
        name: "Ginzburg V",
        projection: d3.geo.ginzburg5().scale(120)
    }, {
        name: "Ginzburg VI",
        projection: d3.geo.ginzburg6().scale(120)
    }, {
        name: "Ginzburg VIII",
        projection: d3.geo.ginzburg8().scale(120)
    }, {
        name: "Ginzburg IX",
        projection: d3.geo.ginzburg9().scale(120)
    }, {
        name: "Gringorten",
        projection: d3.geo.gringorten().scale(220)
    }, {
        name: "Guyou",
        projection: d3.geo.guyou().scale(150)
    }, {
        name: "Hammer",
        projection: d3.geo.hammer().scale(165)
    }, {
        name: "Hill",
        projection: d3.geo.hill().scale(120)
    }, {
        name: "Kavrayskiy VII",
        projection: d3.geo.kavrayskiy7()
    }, {
        name: "Lagrange",
        projection: d3.geo.lagrange().scale(120)
    }, {
        name: "Lambert cylindrical equal-area",
        projection: d3.geo.cylindricalEqualArea()
    }, {
        name: "Larriv\xe9e",
        projection: d3.geo.larrivee().scale(95)
    }, {
        name: "Laskowski",
        projection: d3.geo.laskowski().scale(120)
    }, {
        name: "Loximuthal",
        projection: d3.geo.loximuthal()
    }, {
        name: "Mercator",
        projection: d3.geo.mercator().scale(100)
    }, {
        name: "Miller",
        projection: d3.geo.miller().scale(100)
    }, {
        name: "McBryde\u2013Thomas Flat-Polar Parabolic",
        projection: d3.geo.mtFlatPolarParabolic()
    }, {
        name: "McBryde\u2013Thomas Flat-Polar Quartic",
        projection: d3.geo.mtFlatPolarQuartic()
    }, {
        name: "McBryde\u2013Thomas Flat-Polar Sinusoidal",
        projection: d3.geo.mtFlatPolarSinusoidal()
    }, {
        name: "Mollweide",
        projection: d3.geo.mollweide().scale(165)
    }, {
        name: "Natural Earth",
        projection: d3.geo.naturalEarth()
    }, {
        name: "Nell\u2013Hammer",
        projection: d3.geo.nellHammer()
    }, {
        name: "Polyconic",
        projection: d3.geo.polyconic().scale(100)
    }, {
        name: "Rectangular Polyconic",
        projection: d3.geo.rectangularPolyconic().scale(120)
    }, {
        name: "Robinson",
        projection: d3.geo.robinson()
    }, {
        name: "Sinusoidal",
        projection: d3.geo.sinusoidal()
    }, {
        name: "Sinu-Mollweide",
        projection: d3.geo.sinuMollweide()
    }, {
        name: "Times",
        projection: d3.geo.times().scale(140)
    }, {
        name: "Van der Grinten",
        projection: d3.geo.vanDerGrinten().scale(75)
    }, {
        name: "Van der Grinten II",
        projection: d3.geo.vanDerGrinten2().scale(75)
    }, {
        name: "Van der Grinten III",
        projection: d3.geo.vanDerGrinten3().scale(75)
    }, {
        name: "Van der Grinten IV",
        projection: d3.geo.vanDerGrinten4().scale(120)
    }, {
        name: "Wagner IV",
        projection: d3.geo.wagner4()
    }, {
        name: "Wagner VI",
        projection: d3.geo.wagner6()
    }, {
        name: "Wagner VII",
        projection: d3.geo.wagner7()
    }, {
        name: "Winkel Tripel",
        projection: d3.geo.winkel3()
    }];

function ossilating(v0, delta)
{
    // return a result that is v0 - delta,
    // however, when v0 when delta is greater than v0...
    d = delta;
    if (d<0)
	d = -delta;
    di = Math.floor(d/v0);
    d = d%v0;
    if (di%2 == 0) {
	return d
    }
    else {
	return v0 - d
    }
}


!function() {
    var show_tissot = true;
    var show_land = true;
    var show_gedymin = false;

    function e() {
        if (!s) {
            var e = Math.floor(Math.random() * h);
            P.property("selectedIndex", u = e + (e >= u)), a(l[u])
        }
    }
    function o() {
        clearInterval(j), a(l[this.selectedIndex]), t(w) // add t(w)
    }

    function n(e, o, n) {
        e.rotate([0, 0, 0]), o.rotate([0, 0, 0]);
        var a = 0, r = d3.geo.projection(function(n, t) {
            n*=180 / Math.PI, t*=180 / Math.PI;
            var r = e([n, t]), i = o([n, t]);
            return [(1 - a) * r[0] + a * i[0], (1 - a)*-r[1] + a*-i[1]]
        }).rotate(n)
	    .scale(1)
	    .translate([i / 2, c / 2])
	    .clipExtent(e.clipExtent()),
	    l = d3.geo.path().projection(r).context(v);
        return function() {
            return function(e) {
                a = e, t(l)
            }
        }
    }
    function a(e) {
        s|=2,
	b.transition()
	    .duration(750)
	    .tween("path", n(f, f = e.projection, g = d.slice()))
	    .each("end", function() {
		s&=-3, m = Date.now()
            }), w.projection(f)
    }

    function t(e) {
        v.clearRect(0, 0, i, c),

	k && (	
	      v.lineWidth = .5 * r,    // graticule
	      v.strokeStyle = "#999",
	      v.beginPath(),
	      e(y),
	      v.stroke(),
	      v.lineWidth = 1.2 * r,    // frame
	      v.strokeStyle = "#000",
	      v.beginPath(),
	      e({
		  type: "Sphere"
              }), v.stroke()
	),

	k && show_land && (
	    v.strokeStyle = "#555", // coast lines
	    v.lineWidth = .5 * r,
	    v.beginPath(),
	    e(k),
	    v.fill(),
	    v.stroke(),
	    v.beginPath(),
	    e(I),
	    v.stroke()
	),
	
	k && show_tissot && (
	    v.strokeStyle = "#f99", // tissot indicatrices
	    v.lineWidth = 2.5 * r,
	    v.beginPath(),
	    e(T),
	    v.stroke()
	),

	k && show_gedymin && (
	      v.strokeStyle = "#99f", // gedymin figures
	      v.lineWidth = 2.5 * r,
	      v.beginPath(),
	      e(G),
	      v.stroke()
	)

    }
    
    var r = window.devicePixelRatio || 1,
	i = 960 * r,
	c = 500 * r,
	l = projections,
	g = [ - 71, 42, 0],
	d = g.slice(),
	s = 0,
	p = [.01, -.002], // rotation velocity
	m = Date.now(),
	j = setInterval(e, 5e3),
	u = 0,
	h = l.length - 1,
	f = l[u].projection;
    
    l.forEach(function(e) {
        e.projection.translate([i / 2, c / 2])
	    .scale(e.projection.scale() * r)
	    .clipExtent([[2 * r, 2 * r], [i - 2 * r, c - 2 * r]])
    }),

    d3.select("#pause").on("click", function() {
        (s^=4) || (m = Date.now(), g = d.slice())
    });

    var k, I, y = d3.geo.graticule().step([15,15])(),  // ncxiao
	b = d3.select("#map").append("canvas").attr("width", i).attr("height", c).style("width", i / r + "px").style("height", c / r + "px").call(d3.behavior.drag().origin(function() {
            return {
		x: d[0],
		y: - d[1]
            }
	}).on("dragstart", function() {
            s|=1
	}).on("drag", function() {
            d[0] = d3.event.x, d[1] =- d3.event.y, f.rotate(d), t(w)
	}).on("dragend", function() {
            s&=-2, m = Date.now(), g = d.slice()
	})),
	v = b.node().getContext("2d");

    v.fillStyle = "#f9f9f9", v.strokeStyle = "#000";
    var w = d3.geo.path().projection(f).context(v),
	P = d3.select("#projection-menu").on("change", o);

    P.selectAll("option").data(l).enter().append("option").text(function(e) {
        return e.name
    }),

    d3.timer(function() {
        if (!s) {
            var e = Date.now() - m; // time elapsed
            d[0] = g[0] + p[0] * e;
	    d[1] = g[1] + p[1] * e;
	    //d[1] = ossilating(g[1], p[1] * e);
	    f.rotate(d),
	    t(w)
        }
    }),

    d3.json("world-110m.geojson", function(e, o) {
        k = topojson.feature(o, o.objects.land),
	I = topojson.mesh(o, o.objects.countries, function(e, o) {
            return e !== o
        })
    }),
    d3.json("tissot.topojson", function(e, o) {
        T = topojson.feature(o, o.objects.tissot)
    }),
    d3.json("gedymin.topojson", function(e, o) {
        G = topojson.feature(o, o.objects.gedymin)
    }),

    d3.select("#tissot").on("change", function() {
	show_tissot = !show_tissot;
	t(w)
    }),
    d3.select("#gedymin").on("change", function() {
	show_gedymin = !show_gedymin;
	t(w)
    }),
    d3.select("#land").on("change", function() {
	show_land = !show_land;
	t(w)
    })

}();
