/* ******************************************************
 *
 *   Interactive mapping using d3.js, dc.js, and leaflet
 *
 *   Author:   Ningchuan Xiao
 *   Contact:  ncxiao@gmail.com
 *   Revision: 2015-2017
 *
 * ******************************************************* */

var osmMapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
});

// create an OpenStreetMap BW tile layer
var osmBW = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});

// create a layer based on Stamen TonerLite
var Stamen_TonerLite = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 7
});

// CartoDB_DarkMatter
var nightmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd'
});

var baseMaps = {
    "OpenStreetMap B/W": osmBW,
    "OpenStreetMap": osmMapnik,
    "Stamen Toner Lite": Stamen_TonerLite,
    "Night Map": nightmap
};

var map = L.map('map', {
    zoomControl: false,
    attributionControl: false
});

map.setView([38, -115], 4);
map.addLayer(osmMapnik, true);

L.control.attribution({
    prefix: '<a href="mailto:ncxiao@gmail.com?Subject=twitter%20map" target="_top">Ningchuan Xiao</a>'}).addTo(map);


// Can add an overlay map for boundaries...

var overlaygrp = new L.LayerGroup();
var statesmap = null;
d3.json("./data/us48statesbnd.geojson", function(error, data) {
    statesmap = L.geoJson(data, {
        style: function (feature) {
            edgeColor = "#898989";
            fillColor = "none";
            return {color: edgeColor,
                fillColor: fillColor,
                opacity: 1,
                weight: 1
            };
        }
    });

    var overlayMaps = { "States": statesmap };
    var layersControl = new L.Control.Layers(baseMaps, overlayMaps);
    map.addControl(layersControl)

});



//////////////////////////////////////////////
//
// Legend window
//
/////////////////////////////////////////////

// var legend = L.control({ position: 'bottomright' });
//
// legend.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'legend');
//     this.update();
//     return this._div;
// };
//
// legend.update = function (props) {
//     if (!props)
// 	   this._div.innerHTML = '';
//     else
// 	   this._div.innerHTML = props;
// };
//
// legend.addTo(map);

// use variable name and grades (intervals) to draw the legend box
function update_legend_content(varname, gr) {
    var heading = varname;
    if (friendly_names[varname] != null)
	heading = friendly_names[varname];
    var adminLegend = "<div class=\"legendbox\" id=\"choroLegend\" align=\"left\">";
    // "<div class=\"legendbox\" id=\"choroLegend\"><h4>" + heading + "</h4>";
    for (var i = 0; i<gr.length-1; i++) {
    	adminLegend += '<i style="background:' + colors[i] + '"></i>' +
            formatNumber(Math.round(gr[i+1])) + ' &ndash; ' +
            formatNumber(Math.round(gr[i])) + '<br/>';
    }
    adminLegend += "</div>";
    document.getElementById("legendx").innerHTML = adminLegend;
    // legend.update(adminLegend);
    // document.getElementById("choroLegend").style.display = "block";
}

//////////////////////////////////////////////
//
// Info window
//
/////////////////////////////////////////////

var infoBox = L.control({ position: 'bottomright' });

infoBox.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

infoBox.update = function (props) {
    this._div.innerHTML = (props ? props : 'Mouse on feature to query');
};

map.addControl(infoBox);
// map.removeControl(infoBox);

//////////////////////////////////////////////
//
// GeoJSON layer
//
/////////////////////////////////////////////

var uscnty;
var grades = [100, 30, 15, 0];
var colors = [ '#e34a33', '#fdbb84', '#fee8c8' ];

// Data used for crossfilter
var alldata = null;
var dim1 = null;
var dim2 = null;
var chart1 = null;
var chart2 = null;

var current_mapping_var = 'MINORITYPC';
var chart1_var = "MEDHSINC";
var chart2_var = "MINORITYPC";

var friendly_names = {
    "MINORITYPC": "Minority Percent",
    "MEDHSINC": "Median Household Income ($)",
    "ASIANOPULA": "Asian Population",
    "ASIANPCT": "Asian Population (%)",
    "POPULATION": "Total Population",
    "WHITEOPULA": "White Population",
    "COLLEGEDUC": "College Education (%)",
    "SOMECOL": "Some College Education (%)",
    "HIGHSCH": "High School Education (%)",
    "POVERTPCT": "Below Poverty (%)"
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

// call-back function to update map after histogram filtering
var onFilt = function(chart, filter) {
    p = dim1.top(Infinity);
    for (i=0; i<alldata.features.length; i++)
	alldata.features[i].properties["d3show01"] = 0;
    p.forEach( function(d, i) {
        d.properties.d3show01 = 1;
    });
    uscnty.clearLayers();
    uscnty = make_layer(alldata);
    uscnty.addTo(map);
};

function getColorx(val, grades, colors) {
    for (i=1; i<grades.length; i++)
	if (val >= grades[i])
	    return colors[i-1];
    return '#ffffff';
}

function getClassx(val, grades) {
    for (i=1; i<grades.length; i++)
	if (val>=grades[i])
	    return i-1;
    return 0;
}

function make_layer(d) {
    layer = L.geoJson(d, {
    	filter: function(feature, layer) {                        ////////// FILTER!
            return feature.properties.d3show01;
    	},
    	style: function (feature) {
    	    edgeColor = "#ababab";
    	    fillColor = getColorx(feature.properties[current_mapping_var], grades, colors);
    	    return {color: edgeColor,
    		    fillColor: fillColor,
    		    opacity: 1,
    		    fillOpacity: 0.90,
    		    weight: 0.3
            };
    	},
    	onEachFeature: onEachAdminFeature
    });
    return layer;
}

d3.json("./data/us48counties_attributes2.geojson", function(error, data) {
    function get_var_grades(varname) {
    	var vals = [];
    	for (i=0; i<n; i++) {
    	    vals.push(data.features[i].properties[varname]);
    	}
    	vals.sort(function(a, b) {
    	    return a - b;
    	});
    	minx = vals[0];
    	maxx = vals.slice(-1)[0];
    	if (minx>0 && minx<1)
    	    minx = 0;
    	grades = [maxx, d3.quantile(vals, 0.67), d3.quantile(vals, 0.33), minx];
    }

    function update_chart(dimdata, ch, varname) {
        max0 = dimdata.top(1)[0].properties[varname];
        min0 = dimdata.bottom(1)[0].properties[varname];
        step = (max0 - min0)/60
    	ch.dimension(dimdata)
    	    .group(dimdata.group(function(d) {
                return Math.floor(d / step) * step + 1; // +1 -- the trick to include max in histogram
    	    }))
            // .group(group)
    	    // .x(d3.scale.linear().domain(d3.extent(dimdata, function(d) { return d; })))
            .x(d3.scale.linear().domain([min0, max0]))
    	    .height(180)
    	    .margins({top: 10, right: 20, bottom: 40, left: 40})
    	    .colorAccessor(function(d) { return getClassx(d.key, grades); })
     	    .elasticX(true)
    	    .elasticY(true)
    	    .xUnits(function(){return 45;})
                .on("filtered", onFilt);
    	if (varname == current_mapping_var)
    	    ch.colors(d3.scale.linear().range(colors))
    	else
    	    ch.colors('darkgrey')
    }

    function on_change_mapping_var() {
    	var prev_mapping_var = current_mapping_var;
    	current_mapping_var = d3.select(this).property("value");
    	get_var_grades(current_mapping_var);

    	uscnty.clearLayers();
    	uscnty = make_layer(alldata);
    	uscnty.addTo(map);

    	update_legend_content(current_mapping_var, grades);

    	if (current_mapping_var == chart1_var && prev_mapping_var != chart1_var) {
    	    chart1.colors(d3.scale.linear().range(colors)).render();
    	}
    	else if (current_mapping_var!=chart1_var && prev_mapping_var==chart1_var) {
    	    chart1.colors('darkgrey').render();
    	}

    	if (current_mapping_var == chart2_var && prev_mapping_var != chart2_var) {
    	    chart2.colors(d3.scale.linear().range(colors)).render();
    	}
    	else if (current_mapping_var!=chart2_var && prev_mapping_var==chart2_var) {
    	    chart2.colors('darkgrey').render();
    	}
    }

    function on_change_chart1_var() {
    	chart1_var = d3.select(this).property("value");
    	var xdata = crossfilter(alldata.features);
    	dim1 = xdata.dimension(function (d) { return d.properties[chart1_var]; });
    	dim2 = xdata.dimension(function (d) { return d.properties[chart2_var]; });
    	update_chart(dim1, chart1, chart1_var);
    	update_chart(dim2, chart2, chart2_var);
    	chart1.render()
    	chart2.render()
    }

    function on_change_chart2_var() {
    	chart2_var = d3.select(this).property("value");
    	var xdata = crossfilter(alldata.features);
    	dim1 = xdata.dimension(function (d) { return d.properties[chart1_var]; });
    	dim2 = xdata.dimension(function (d) { return d.properties[chart2_var]; });
    	update_chart(dim1, chart1, chart1_var);
    	update_chart(dim2, chart2, chart2_var);
    	chart1.render()
    	chart2.render()
    }

    // before anything, add a new member to json for feature visibility
    var n = data.features.length;
    for (i=0; i<n; i++) {
        data.features[i].properties["d3show01"] = 1;
    }

    alldata = data;
    get_var_grades(current_mapping_var);

    // Get the attribute names in the json file
    var objectKeys = $.map(data.features[0].properties, function(value, key) {
    	if (isNaN(value) != true && key != 'd3show01' && key != 'GEO_ID')
    	    return key;
    });
    //alert(objectKeys);

    function create_dropdown_list(id, varname, call_back) {
    	var ddl = d3.select(id).
        	on("change", call_back).
        	selectAll("option").
        	data(objectKeys).enter().append("option").
                attr("value", function(d) {return d;}).
        	property("selected", function(d){
                return d == varname;
        	}).
        	text(function(d) {
        	    if (friendly_names[d]!=null)
                    return friendly_names[d];
        	    else
        		    return d;
        	});
    	return ddl;
    }

    var P = create_dropdown_list("#mapping-vars", current_mapping_var, on_change_mapping_var);
    var P1 = create_dropdown_list("#chart1-vars", chart1_var, on_change_chart1_var);
    var P2 = create_dropdown_list("#chart2-vars", chart2_var, on_change_chart2_var);

    uscnty = make_layer(alldata);
    uscnty.addTo(map);

    // update a legend div
    get_var_grades(current_mapping_var);
    update_legend_content(current_mapping_var, grades);

    // crossfilter and construct histograms/barcharts
    var xdata = crossfilter(data.features);
    dim1 = xdata.dimension(function (d) { return d.properties[chart1_var]; });
    dim2 = xdata.dimension(function (d) { return d.properties[chart2_var]; });

    chart1 = dc.barChart("#graphs");
    chart1.yAxis().ticks(6);

    // alert(chart1.selectAll('.axis'));
        // .style({'stroke': 'Red', 'fill': 'none', 'stroke-width': '3px'});

    update_chart(dim1, chart1, chart1_var)

    // chart1.xAxis().tickFormat(function (d) { // last
    //     return d/1000;
    // });

    chart2 = dc.barChart("#graphs2")
    chart2.yAxis().ticks(6);

    update_chart(dim2, chart2, chart2_var)

    dc.renderAll();
});

function onEachAdminFeature(feature, layer) {
    layer.on({
    	mouseover: function(e) {
    	    var layer = e.target;
    	    layer.setStyle({
        		weight: 5,
        		color: '#999',
        		fillOpacity: 0.7
    	    });
    	    if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
    	    }
    	    feature = layer.feature;
    	    var popupContent = "<h4>" + feature.properties.Geography + "</h4>" +
    		"<table class='info'>" +
    		"<tr><td>Total population</td><td class='num'>" +
            formatNumber(feature.properties.POPULATION) +
            "</td></tr>" + "<tr><td>White</td><td class='num'>" + formatNumber(feature.properties.WHITEOPULA) +
            // "</td></tr>" + "<tr><td>Asian</td><td class='num'>" + formatNumber(feature.properties.ASIANOPULA) + "</td></tr>" +
    		"<tr><td>Minority percent</td><td class='num'>" +
            feature.properties.MINORITYPC + "</td></tr>" +
    		// "<tr><td>Highschool graduates</td><td class='num'>" + feature.properties.HIGHSCH + "</td></tr>" +
    		"<tr><td>College degree percent</td><td class='num'>" +
            feature.properties.COLLEGEDUC +
            "</td></tr>" + "<tr><td>Median Household Income</td><td class='num'>" +
            formatNumber(feature.properties.MEDHSINC) + "</td></tr>" +
    		"</table>";
    	    infoBox.update(popupContent);
    	},
        mouseout: function(e) {
    	    uscnty.resetStyle(e.target);
    	},
    	click: function(e) {
    	    // TODO if needed: click
    	}
    });
}

/////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $("#toggle").click(function() {
    	if ($("#form").is(":visible")) {
    	    $("#toggle").html("+"); // html("&#8773;");
    	    $("#toggle").css('left', '1px');
    	}
    	else {
    	    $("#toggle").html("&times;");
    	    $("#toggle").css('left', '-11px');
    	}
    	$("#form").toggle("fast");
    });
});

$('#hideinfo').change(function () {
    var hide_status = $(this). prop("checked");
    if (hide_status == true)
        map.removeControl(infoBox);
    else
        map.addControl(infoBox);
 });
