# Map Projection Transitions

This page is designed to illustrate map distortion using Tissot's indicatrix
and the Gedymin faces. This web page is based on a few important
sources. First, I made some changes to Jason Davis' code of
the [map projection
transitions](https://www.jasondavies.com/maps/transition/), which has been tremendously useful. Additional projections
(mainly conic and azimuthal) were also used in this page
following [these examples](https://github.com/mbostock/d3/wiki/Geo-Projections). Second, I used Matthew
T. Perry's [Python code](http://blog.perrygeo.net/2005/12/11/tissot-indicatrix-examining-the-distortion-of-2d-maps) to create the Tissot's indicatrices in a shapefile. Third, the
shapefile for the faces were created
by [Paul B. Anderson](http://galleryofmapprojections.com/gedymin/)
who also maintained a great repository for Gedymin faces.  Fourth, the
shapefiles were converted to [GeoJSON](http://geojson.org)
in [QGIS](http://qgis.org), and then
to [TopoJSON](https://github.com/mbostock/topojson-specification) using
a tool called topojson on Mac. The indicatrices data is
available
at [here](https://github.com/gisalgs/data/blob/master/tissot.topojson)
and the faces are available
at [here](https://github.com/gisalgs/data/blob/master/gedymin.topojson). The
world countries data is from [Natural Earth](http://www.naturalearthdata.com).  The original [Projection
Transitions](http://bl.ocks.org/3711652) is made by Mike Bostock. In this version of the code,
transitions to the azimuthal projections still need further adjustment. If
anybody has a fix to that, please drop me a line.
