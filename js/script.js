// Map initialization 
var map = L.map('map').setView([53.20139, 5.80859], 12);



/*==============================================
            TILE LAYER and WMS
================================================*/
//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);
// map.addLayer(osm)

// water color 
var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});
// watercolor.addTo(map)

// dark map 
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});
// dark.addTo(map)

// google street 
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleStreets.addTo(map);

//google satellite
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleSat.addTo(map)

var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'geoapp:admin',
    format: 'image/png',
    transparent: true,
    attribution: "wms test"
});



//Marker
var myIcon = L.icon({
    iconUrl: 'img/Star-icon.png',
    iconSize: [40, 40],
});

//Add a marker to show where you clicked.
map.on('click',function(e){
    lat = e.latlng.lat;
    lon = e.latlng.lng;

    //Popup
     theMarker = L.marker([lat,lon], {icon: myIcon}).addTo(map). bindPopup(
        "<h2>John Doe</h2> <h3>beschrijving</h3> <p>Ik voel me sterk verbonden met de Friese geschiedenis, met de geschiedenis die dicht bij mij ligt. Soms letterlijk onder mijn voeten, terwijl ik door de landerijen loopen nieuwe scherven vind voor mijn verzameling archeologische vondsten. Het idee dat anderen al generaties lang voor mij op dezelfde grondliepen, met al hunellendeen leven, werkt troostend en verbindend. Het relativeert en inspireert.</p>");     
});

console.log(singleMarker.toGeoJSON())

/*==============================================
            GEOJSON
================================================*/
var pointData = L.geoJSON(pointJson).addTo(map)
var lineData = L.geoJSON(lineJson).addTo(map)
var polygonData = L.geoJSON(polygonJson, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
    },
    style: {
        fillColor: 'red',
        fillOpacity: 1,
        color: '#c0c0c0',
    }
}).addTo(map);



/*==============================================
                LAYER CONTROL
================================================*/
var baseMaps = {
    "OSM": osm,
    "Water color map": watercolor,
    'Dark': dark,
    'Google Street': googleStreets,
    "Google Satellite": googleSat,
};
var overlayMaps = {
    "First Marker": singleMarker,
    'Second Marker': secondMarker,
    'Point Data': pointData,
    'Line Data': lineData,
    'Polygon Data': polygonData,
    'wms': wms
};
// map.removeLayer(singleMarker)

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);


/*==============================================
                LEAFLET EVENTS
================================================*/
map.on('mouseover', function () {
    console.log('your mouse is over the map')
})

map.on('mousemove', function (e) {
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
    console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})


/*==============================================
                STYLE CUSTOMIZATION
================================================*/

