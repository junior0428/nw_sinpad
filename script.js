var marcadores = L.layerGroup();

var mapL = L.map('map', {
    center: [-7.732765062729807, -72.03735351562501],
    zoom: 6,
    layers: [marcadores],
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});

var marker = L.marker([-11.732765062729807, -77.03735351562501]).addTo(mapL).bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var circle = L.circle([-11.732765062729807, -77.03735351562501], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50000
}).addTo(mapL);




// BaseMaps
var tiles = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20
}).addTo(marcadores);

var tiles2 = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    maxZoom: 20
});

var tiles3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20
});

// Servicios web

var layer = L.tileLayer.betterWms("https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?", {
    layers: 'c4i:fc_limite_dpto',
    format: 'image/png',
    transparent: true
}).addTo(mapL);

var basemaps = {
    Departamento: L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:fc_limite_dpto',
        transparent: true,
        format: 'image/png'
    }),
    'Hidro Laguna': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartobase_fc_hidro_laguna',
        transparent: true,
        format: 'image/png'
    }),
    'Aerodromos': L.tileLayer.wms('http://geoserver.indeci.gob.pe:8080/geoserver/VisorGRD_des/ows?', {
        layers: "VisorGRD_des:aerodromo_dic18",
        transparent: true,
        format: 'image/png'
    }),
    'Almacenes': L.tileLayer.wms('https://geosinpad.indeci.gob.pe/indeci/services/Respuesta_2023/Almacenes/MapServer/WMSServer?', {
        layers: "0",
        transparent: true,
        format: 'image/png32'
    }),
    'weather': L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
    })

};

const baseLayers = {
    'Google Maps': marcadores,
    'Google Earth': tiles2,
    'Street Maps': tiles3
};

L.control.layers(baseLayers, basemaps).addTo(mapL);


