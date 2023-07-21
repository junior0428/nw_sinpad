

var markerIcon = L.Icon.extend({
    options: {
        iconSize: [35, 35], // size of the icon
        iconAnchor: [17.5, 35],   // point of the icon which will correspond to marker's location
        popupAnchor: [0.5, -40] // point from which the popup should open relative to the iconAnchor
    }
});


///

function geojsonStylePre(feature) {
    var gejso = {
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.4,
        fillColor: getColorPre(feature.properties.viv_ppi_ni)
    }
    return gejso;
};

function highlightFeaturePre(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlightPre(e) {
    var layer = e.target;
    layer.setStyle(geojsonStylePre(layer.feature));
}

function getColorPre(g) {
    return g == "bajo" ? '#1EF330' :
        g == "medio" ? '#FFFB00' :
            g == "alto" ? '#FFB300' :
                g == "muy alto" ? '#FF0000' : '#1EBEF3';
}

function onEachFeaturePre(feature, layer) {
    layer.on('click', function (e) {
        let popupContent = '<p><b>Nivel riesgo inundaciones: ' + feature.properties.viv_ppi_ni.toUpperCase() + '</b>'
            + '<br>Ubicación: ' + feature.properties.nom_dep + '-' + feature.properties.nom_prov + '-' + feature.properties.nom_dist
            //+ '<br>Área Referencial: ' + (feature.properties.area_referencial__m2_ == null ? '' : feature.properties.area_referencial__m2_)
            //+ '<br>Volumen Referencial: ' + (feature.properties.volumen_referencial_a_evacuar__ == null ? '' : feature.properties.volumen_referencial_a_evacuar__)
            + '</p>';
        layer.bindPopup(popupContent);
    });
    layer.on({
        mouseover: highlightFeaturePre,
        mouseout: resetHighlightPre
    });
}

function pintarshapeprecipitaciones() {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:cartoexterna_inundaciones_precipitacion&outputFormat=application/json";

    $(".loader").fadeIn("fast");
    var flagRem = 0;
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id") && layer.feature.id.indexOf("cartoexterna_inundaciones_precipitacion") >= 0) {
            mapL.removeLayer(layer)
            flagRem = 1;
        }
    });

    if (flagRem == 0) {
        $.getJSON(wfs_url).then((res) => {
            var layer = L.geoJson(res, {
                onEachFeature: onEachFeaturePre,
                style: geojsonStylePre,
            }).addTo(mapL);
            //mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else {
        //mapL.setView([-8.754794702435618, -70.15869140625001], 6);
        $(".loader").fadeOut("fast");
    }
}

///

function geojsonStyleNiv(feature) {
    var gejso = {
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.4,
        fillColor: getColorNiv(feature.properties.niv_riesgo)
    }
    return gejso;
};

function highlightFeatureNiv(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlightNiv(e) {
    var layer = e.target;
    layer.setStyle(geojsonStyleNiv(layer.feature));
}

function getColorNiv(g) {
    return g == "B" ? '#1EF330' :
        g == "M" ? '#FFFB00' :
            g == "A" ? '#FFB300' :
                g == "MA" ? '#FF0000' : '#1EBEF3';
}

function getNombreNiv(g) {
    return g == "B" ? 'BAJO' :
        g == "M" ? 'MEDIO' :
            g == "A" ? 'ALTO' :
                g == "MA" ? 'MUY ALTO' : '';
}

function onEachFeatureNiv(feature, layer) {
    layer.on('click', function (e) {
        let popupContent = '<p><b>Nivel riesgo: ' + getNombreNiv(feature.properties.niv_riesgo) + ' (' + feature.properties.niv_riesgo + ') </b>'
            + '<br>Ubicación: ' + feature.properties.departam + ' - ' + feature.properties.provincia + ' - ' + feature.properties.distrito
            + '<br>Total Viviendas: ' + (feature.properties.total_viv == null ? '' : feature.properties.total_viv)
            + '<br>Población Total: ' + (feature.properties.pobtotal == null ? '' : feature.properties.pobtotal)
            + '<br>Nivel Suceptibilidad: ' + (feature.properties.niv_riesgo == null ? '' : getNombreNiv(feature.properties.niv_suscep))
            + '<br>Nivel Vulnerabilidad: ' + (feature.properties.niv_riesgo == null ? '' : getNombreNiv(feature.properties.niv_vuln))
            + '<br>Nivel Riesgo: ' + (feature.properties.niv_riesgo == null ? '' : getNombreNiv(feature.properties.niv_riesgo))
            + '</p>';
        layer.bindPopup(popupContent);
    });
    layer.on({
        mouseover: highlightFeatureNiv,
        mouseout: resetHighlightNiv
    });
}

function pintarshapenivelriesgo() {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:cartoexterna_fc_cene_nivels_riesgo&outputFormat=application/json";

    $(".loader").fadeIn("fast");
    var flagRem = 0;
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id") && layer.feature.id.indexOf("cartoexterna_fc_cene_nivels_riesgo") >= 0) {
            mapL.removeLayer(layer)
            flagRem = 1;
        }
    });

    if (flagRem == 0) {
        $.getJSON(wfs_url).then((res) => {
            var layer = L.geoJson(res, {
                onEachFeature: onEachFeatureNiv,
                style: geojsonStyleNiv,
            }).addTo(mapL);
            //mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else {
        //mapL.setView([-8.754794702435618, -70.15869140625001], 6);
        $(".loader").fadeOut("fast");
    }
}

///

function geojsonStyleInu(feature) {
    var gejso = {
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.4,
        fillColor: getColorInu(feature.properties.nriesg_in)
    }
    return gejso;
};

function highlightFeatureInu(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlightInu(e) {
    var layer = e.target;
    layer.setStyle(geojsonStyleInu(layer.feature));
}

function getColorInu(g) {
    return g == "B" ? '#1EF330' :
        g == "M" ? '#FFFB00' :
            g == "A" ? '#FFB300' :
                g == "MA" ? '#FF0000' : '#1EBEF3';
}

function getNombreInu(g) {
    return g == "B" ? 'BAJO' :
        g == "M" ? 'MEDIO' :
            g == "A" ? 'ALTO' :
                g == "MA" ? 'MUY ALTO' : '';
}

function onEachFeatureInu(feature, layer) {
    layer.on('click', function (e) {
        let popupContent = '<p><b>Nivel Riesgo Inundación: ' + getNombreNiv(feature.properties.nriesg_in) + ' (' + feature.properties.nriesg_in + ') </b>'
            + '<br>Ubicación: ' + feature.properties.nombdep + '-' + feature.properties.nombprov + '-' + feature.properties.nombdist
            + '<br>Total Viviendas: ' + (feature.properties.viviend == null ? '' : feature.properties.viviend)
            + '<br>Población Total: ' + (feature.properties.poblacio == null ? '' : feature.properties.poblacio)
            + '</p>';
        layer.bindPopup(popupContent);
    });
    layer.on({
        mouseover: highlightFeatureInu,
        mouseout: resetHighlightInu
    });
}

function pintarshaperiesgoinundacion() {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:ogei_riesgo_de_inundacion_a_nivel_distrital&outputFormat=application/json";

    $(".loader").fadeIn("fast");
    var flagRem = 0;
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id") && layer.feature.id.indexOf("ogei_riesgo_de_inundacion_a_nivel_distrital") >= 0) {
            mapL.removeLayer(layer)
            flagRem = 1;
        }
    });

    if (flagRem == 0) {
        $.getJSON(wfs_url).then((res) => {
            var layer = L.geoJson(res, {
                onEachFeature: onEachFeatureInu,
                style: geojsonStyleInu,
            }).addTo(mapL);
            //mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else {
        //mapL.setView([-8.754794702435618, -70.15869140625001], 6);
        $(".loader").fadeOut("fast");
    }
}

///

function geojsonStylelimRiesgo(feature) {
    var gejso = {
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.4,
        fillColor: getColorlimRiesgo(feature.properties.NIVEL)
    }
    return gejso;
};

function highlightFeaturelimRiesgo(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlightlimRiesgo(e) {
    var layer = e.target;
    layer.setStyle(geojsonStylelimRiesgo(layer.feature));
}

function getColorlimRiesgo(g) {
    return g == 1 ? '#4ce600' :
        g == 2 ? '#ffff00' :
            g == 3 ? '#ffaa00' :
                g == 4 ? '#ff0000' : '#e1e1e1';
}

function getNombrelimRiesgo(g) {
    return g == 1 ? 'BAJO' :
        g == 2 ? 'MEDIO' :
            g == 3 ? 'ALTO' :
                g == 4 ? 'MUY ALTO' : '';
}

function onEachFeaturelimRiesgo(feature, layer) {
    layer.on('click', function (e) {
        let popupContent = '<p><b>Ubicación: ' + feature.properties.NOMBDEP + ' - ' + feature.properties.NOMBPROV + ' - ' + feature.properties.NOMBDIST + '</b>'
            + '<br>Nivel Riesgo: ' + getNombrelimRiesgo(feature.properties.NIVEL)
            + '</p>';
        layer.bindPopup(popupContent);
    });
    layer.on({
        mouseover: highlightFeaturelimRiesgo,
        mouseout: resetHighlightlimRiesgo
    });
}

function pintarshapelimRiesgo() {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:LIMA_DISTRITOS_CON_MAYOR_RIESGO&outputFormat=application/json";

    $(".loader").fadeIn("fast");
    var flagRem = 0;
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id") && layer.feature.id.indexOf("LIMA_DISTRITOS_CON_MAYOR_RIESGO") >= 0) {
            mapL.removeLayer(layer)
            flagRem = 1;
        }
    });
    if (flagRem == 0) {
        $.getJSON(wfs_url).then((res) => {
            var layer = L.geoJson(res, {
                onEachFeature: onEachFeaturelimRiesgo,
                style: geojsonStylelimRiesgo,
            }).addTo(mapL);
            $(".loader").fadeOut("fast");
        });
    }
    else {
        $(".loader").fadeOut("fast");
    }
};

//#region Ubigeos

function geojsonStyleUbigeo(feature) {
    var gejso = {
        color: "#364261",
        weight: 3,
        opacity: 1,
        fillOpacity: 0,
        fillColor: getColorPre(feature.properties.viv_ppi_ni)
    }
    return gejso;
};

async function pintarLimiteDepto(idUbigeo) {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:fc_limite_dpto&outputFormat=application/json";

    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id")  
            && (layer.feature.id.indexOf("fc_limite_dpto") >= 0 || layer.feature.id.indexOf("fc_limite_prov") >= 0 || layer.feature.id.indexOf("fc_limite_dist") >= 0)) {
            mapL.removeLayer(layer);
        }
    });

    if (idUbigeo != '00' && idUbigeo != '' && idUbigeo != null) {
        $.getJSON(wfs_url).then((res) => {
            var filtrado = { "type": "FeatureCollection", "features": [] };
            res.features.forEach(function (data, index) {
                if (data.properties.id_dpto == idUbigeo)
                    filtrado.features.push(data);
            });
            var layer = L.geoJson(filtrado, {
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(feature.properties["nom_dep"], { sticky: true });
                },
                style: geojsonStyleUbigeo,
            });
            layer.addTo(mapL);
            mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else
        $(".loader").fadeOut("fast");
}

async function pintarLimiteProv(idUbigeo) {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:fc_limite_prov&outputFormat=application/json";

    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id")
            && (layer.feature.id.indexOf("fc_limite_dpto") >= 0 || layer.feature.id.indexOf("fc_limite_prov") >= 0 || layer.feature.id.indexOf("fc_limite_dist") >= 0)) {
            mapL.removeLayer(layer);
        }
    });

    if (idUbigeo != '00' && idUbigeo != '' && idUbigeo != null) {
        $.getJSON(wfs_url).then((res) => {
            var filtrado = { "type": "FeatureCollection", "features": [] };
            res.features.forEach(function (data, index) {
                if (data.properties.id_dep == idUbigeo)
                    filtrado.features.push(data);
            });
            var layer = L.geoJson(filtrado, {
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(feature.properties["nom_prov"], { sticky: true });
                },
                style: geojsonStyleUbigeo,
            });
            layer.addTo(mapL).on('click', pintarDistritos);
            mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else
        $(".loader").fadeOut("fast");
}

function pintarDistritos(e) {
    if (e.layer.hasOwnProperty("feature") && e.layer.feature.hasOwnProperty("properties") && e.layer.feature.properties.hasOwnProperty("id_prov")) {
        var idProv = e.layer.feature.properties.id_prov;
        $('#idProvincia').val(idProv.substring(2, 4));
        filtrarProvincia();
    }
}


async function pintarLimiteDist(idUbigeo) {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:fc_limite_dist&outputFormat=application/json";

    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id")
            && (layer.feature.id.indexOf("fc_limite_dpto") >= 0 || layer.feature.id.indexOf("fc_limite_prov") >= 0 || layer.feature.id.indexOf("fc_limite_dist") >= 0)) {
            mapL.removeLayer(layer);
        }
    });

    if (idUbigeo != '0000' && idUbigeo != '' && idUbigeo != null) {
        $.getJSON(wfs_url).then((res) => {
            var filtrado = { "type": "FeatureCollection", "features": [] };
            res.features.forEach(function (data, index) {
                if (idUbigeo.length == 4 && data.properties.id_prov == idUbigeo)
                    filtrado.features.push(data);
                else if (idUbigeo.length == 6 && data.properties.id_dist == idUbigeo)
                    filtrado.features.push(data);
            });
            var layer = L.geoJson(filtrado, {
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(feature.properties["nom_dist"], { sticky: true });
                },
                style: geojsonStyleUbigeo,
            });
            layer.addTo(mapL).on('click', pintarDistritoUnico);
            mapL.fitBounds(layer.getBounds());
            $(".loader").fadeOut("fast");
        });
    }
    else
        $(".loader").fadeOut("fast");
}

function pintarDistritoUnico(e) {
    if (e.layer.hasOwnProperty("feature") && e.layer.feature.hasOwnProperty("properties") && e.layer.feature.properties.hasOwnProperty("id_dist")) {
        var idDist = e.layer.feature.properties.id_dist;
        $('#idDistrito').val(idDist.substring(4, 6));
        filtrarDistrito();
    }
}

//#endregion

/// Puntos Generico

function onEachFeaturePunto(feature, layer, dataFeat) {
    if (dataFeat.length > 0) {
        layer.on('click', function (e) {
            let popupContent = '<p><b style="font-size: 15px;">DATOS</b>';
            dataFeat.forEach(function (o) {
                popupContent += '<br><b>' + o.labelFeat + '</b>: ' + feature.properties[o.vFeat]
            });
            popupContent += '</p>';

            layer.bindPopup(popupContent);
        });
    }
}

function pintarshapePuntosSinApagado(nombre_capa, nombre_funcion, dataFeat, icono = "fas fa-exclamation-triangle fa-lg", nomcolor = "#F4CD36") {
    var wfs_url = "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:" + nombre_capa + "&outputFormat=application/json";
    $.getJSON(wfs_url).then((res) => {
        var layer = L.geoJson(res, {
            onEachFeature: function (feature, layer) {
                nombre_funcion(feature, layer, dataFeat)
            },
            pointToLayer: function (feature, latlng) {
                var iconsvg = L.divIcon({
                    className: '',
                    iconSize: [35, 35],
                    iconAnchor: [17.5, 35],
                    popupAnchor: [0.5, -20],
                    html: '<div class="pulse_"></div><div class="div-icon-total" style="top: 0px; left: 0px; border:3px solid white; background:' + nomcolor +'"><i class="' + icono + '"></i></div>'
                });
                return L.marker(latlng, {
                    icon: iconsvg
                });
            }
        }).addTo(mapL);
    });
}


/// Linea genérico

function geojsonStyleLinea(nomColor = "#DE2415") {
    var gejso = {
        color: nomColor,
        weight: 5,
        opacity: 0.8
    }
    return gejso;
};

function highlightFeatureLinea(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 9,
        opacity: 1
    });
    layer.bringToFront();
}

function resetHighlightLinea(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        opacity: 0.9
    });
}

function onEachFeatureLinea(feature, layer, dataFeat) {
    if (dataFeat.length > 0) {
        layer.on('click', function (e) {
            let popupContent = '<p><b style="font-size: 15px;">DATOS</b>';
            dataFeat.forEach(function (o) {
                popupContent += '<br><b>' + o.labelFeat + '</b>: ' + feature.properties[o.vFeat]
            });
            popupContent += '</p>';

            layer.bindPopup(popupContent);
        });
    }
    layer.on({
        mouseover: highlightFeatureLinea,
        mouseout: resetHighlightLinea
    });
}

function pintarshapeLineaSinApagado(nombreCapa, nombreFuncion, dataFeat, nomColor = "#DE2415") {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:" + nombreCapa + "&outputFormat=application/json";
    console.log(wfs_url)
    $.getJSON(wfs_url).then((res) => {
        var layer = L.geoJson(res, {
            onEachFeature: function(feature, layer) {
                nombreFuncion(feature, layer, dataFeat)
            },
            style: geojsonStyleLinea(nomColor)
        }).addTo(mapL);
    });
}

/// Polígono genérico


function geojsonStylePoligono(nomColor = "#1EBEF3") {
    var gejso = {
        fillColor: nomColor,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.2,
    }
    return gejso;
};

function highlightFeaturePoligono(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlightPoligono(e) {
    var layer = e.target;
    layer.setStyle({
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.2,
    });
}

function onEachFeaturePoligono(feature, layer, dataFeat) {
    if (dataFeat.length > 0) {
        layer.on('click', function (e) {
            let popupContent = '<p><b style="font-size: 15px;">DATOS</b>';
            dataFeat.forEach(function (o) {
                popupContent += '<br><b>' + o.labelFeat + '</b>: ' + feature.properties[o.vFeat]
            });
            popupContent += '</p>';

            layer.bindPopup(popupContent);
        });
    }
    layer.on({
        mouseover: highlightFeaturePoligono,
        mouseout: resetHighlightPoligono
    });
}

function pintarshapePoligonoSinApagado(nombreCapa, nombreFuncion, dataFeat, nomColor = "#1EBEF3") {
    var wfs_url =
        "https://geoc4i.vivienda.gob.pe/geoserver/c4i/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=c4i:" + nombreCapa + "&outputFormat=application/json";
    $.getJSON(wfs_url).then((res) => {
        var layer = L.geoJson(res, {
            onEachFeature: function (feature, layer) {
                nombreFuncion(feature, layer, dataFeat)
            },
            style: geojsonStylePoligono(nomColor),
        }).addTo(mapL);
        $(".loader").fadeOut("fast");
    });
    
};

/////////////Pintar varias capas
function pintarmultishapes(element, xidCapa) {
    var $obj = $(element),
        jsonDatos = getDataCapa(xidCapa);
    $(".loader").fadeIn("fast");
    var flagRem = 0;
    if ($obj.hasClass("btn-light-gradient")) {
        $obj.removeClass("btn-light-gradient");
        $obj.addClass("btn-success");
    }
    else if ($obj.hasClass("btn-success")) {
        $obj.removeClass("btn-success");
        $obj.addClass("btn-light-gradient");
        flagRem = 1;
    }

    jsonDatos.forEach(function (o) {
        if (flagRem == 0) {
            if (o.sEstilo == 'punto') {
                pintarshapePuntosSinApagado(o.sNomCapa, eval(o.oneachfeature), o.dataFeature, o.sIcono, o.sColor);
            }
            else if (o.sEstilo == 'linea') {
                pintarshapeLineaSinApagado(o.sNomCapa, eval(o.oneachfeature), o.dataFeature, o.sColor);
            }
            else if (o.sEstilo == 'poligono') {
                pintarshapePoligonoSinApagado(o.sNomCapa, eval(o.oneachfeature), o.dataFeature, o.sColor);
            }
        }
        else {
            mapL.eachLayer(function (layer) {
                if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id") && layer.feature.id.indexOf(o.sNomCapa) >= 0) {
                    mapL.removeLayer(layer);
                }
            });
        }
        
    });

    $(".loader").fadeOut("fast");
    
}

function getDataCapa(xidCapa) {
    var jsonCapa = [];
    switch (xidCapa) {
        case 1:
            jsonCapa = [{ "sNomCapa": "ana_ejec_porcontrata", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "ana_ejec_porcontrata_segmento", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 2:
            jsonCapa = [{ "sNomCapa": "ancash_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 3:
            jsonCapa = [{ "sNomCapa": "ancash_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor":"#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 4:
            jsonCapa = [{ "sNomCapa": "ica_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 5:
            jsonCapa = [{ "sNomCapa": "ica_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor":"#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 6:
            jsonCapa = [{ "sNomCapa": "la_libertad_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 7:
            jsonCapa = [{ "sNomCapa": "la_libertad_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor":"#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 8:
            jsonCapa = [{ "sNomCapa": "lambayeque_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 9:
            jsonCapa = [{ "sNomCapa": "lambayeque_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor":"#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 10:
            jsonCapa = [{ "sNomCapa": "lima_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 11:
            jsonCapa = [{ "sNomCapa": "lima_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor":"#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 12:
            jsonCapa = [{ "sNomCapa": "piura_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 13:
            jsonCapa = [{ "sNomCapa": "piura_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor": "#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }] }];
            break;
        case 14:
            jsonCapa = [{ "sNomCapa": "tumbes_intervencion_atencion_preventiva_fen_pnc", "sEstilo": "linea", "sColor":"#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }];
            break;
        case 15:
            jsonCapa = [{ "sNomCapa": "tumbes_punto_prev_reparencompren_maq_pnc", "sEstilo": "linea", "sColor": "#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }] }];
            break;
        case 16:
            jsonCapa = [{ "sNomCapa": "ana_ejec_maq_adq_segmento_pto", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#0C71F5", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }] }, { "sNomCapa": "ana_ejec_maq_adq_segmento_segmento", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 17:
            jsonCapa = [{ "sNomCapa": "ancash_eje_porcontratar_pto_ana","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "ancash_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 18:
            jsonCapa = [{ "sNomCapa": "la_libertad_eje_porcontratar_pto_ana", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "la_libertad_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 19:
            jsonCapa = [{ "sNomCapa": "la_libertad_eje_maq_adq_pto_ana", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#0C71F5", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }] }, { "sNomCapa": "la_libertad_eje_maq_adq_segmennto_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 20:
            jsonCapa = [{ "sNomCapa": "lambayeque_eje_porcontratar_pto_ana", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "lambayeque_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 21:
            jsonCapa = [{ "sNomCapa": "lima_eje_porcontratar_pto_ana","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "lima_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 22:
            jsonCapa = [{ "sNomCapa": "lima_eje_maq_adq_pto_ana", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#0C71F5", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }] }, { "sNomCapa": "lima_eje_maq_adq_pto_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 23:
            jsonCapa = [{ "sNomCapa": "piura_eje_porcontratar_pto_ana","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "piura_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 24:
            jsonCapa = [{ "sNomCapa": "tumbes_eje_porcontratar_pto_ana","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "tumbes_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 25:
            jsonCapa = [{ "sNomCapa": "ica_eje_porcontratar_pto_ana","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DEPARTAMEN", "labelFeat": "Departamento" }, { "vFeat": "PROVINCIA", "labelFeat": "Provincia" }, { "vFeat": "DISTRITO", "labelFeat": "Distrito" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "RIO_QDA", "labelFeat": "Río - Quebrada" }, { "vFeat": "DESCRIP", "labelFeat": "Descripción" }] }, { "sNomCapa": "ica_eje_porcontratar_segmento_ana", "sEstilo": "linea", "sColor":"#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 26:
            jsonCapa = [{ "sNomCapa": "pnsu_intervenciones","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 27:
            jsonCapa = [{ "sNomCapa": "ancash_intervenciones_pnsu", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 28:
            jsonCapa = [{ "sNomCapa": "cajamarca_intervenciones_pnsu", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 29:
            jsonCapa = [{ "sNomCapa": "huanuco_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 30:
            jsonCapa = [{ "sNomCapa": "ica_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 31:
            jsonCapa = [{ "sNomCapa": "lambayeque_intervenciones_pnsu", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 32:
            jsonCapa = [{ "sNomCapa": "loreto_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 33:
            jsonCapa = [{ "sNomCapa": "moquegua_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 34:
            jsonCapa = [{ "sNomCapa": "puno_intervencion_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 35:
            jsonCapa = [{ "sNomCapa": "san_martin_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 36:
            jsonCapa = [{ "sNomCapa": "tacna_intervenciones_pnsu","sEstilo": "punto", "sIcono":"fas fa-exclamation-triangle fa-lg", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CUI", "labelFeat": "CUI" }, { "vFeat": "NOMBRE DEL", "labelFeat": "Nombre Proyecto" }, { "vFeat": "MONTO DE I", "labelFeat": "Monto de inversión" }, { "vFeat": "ESTADO", "labelFeat": "Estado" }] }];
            break;
        case 37:
            jsonCapa = [{ "sNomCapa": "lima_intervencion_preinv_paslc", "sEstilo": "poligono", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "CodUnico", "labelFeat": "CUI" }, { "vFeat": "NombrePI", "labelFeat": "Nombre Proyecto" }, { "vFeat": "Inversion", "labelFeat": "Monto de inversión" }, { "vFeat": "NivEstu", "labelFeat": "Fase" }] }, { "sNomCapa": "lima_intervencion_exptec_paslc", "sEstilo": "poligono", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "CodUnico", "labelFeat": "CUI" }, { "vFeat": "NombrePI", "labelFeat": "Nombre Proyecto" }, { "vFeat": "Inversion", "labelFeat": "Monto de inversión" }, { "vFeat": "NivEstu", "labelFeat": "Fase" }] }, { "sNomCapa": "lima_intervencion_obra_paslc", "sEstilo": "poligono", "sColor":"#F4CD36", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "CodUnico", "labelFeat": "CUI" }, { "vFeat": "NombrePI", "labelFeat": "Nombre Proyecto" }, { "vFeat": "Inversion", "labelFeat": "Monto de inversión" }, { "vFeat": "NivEstu", "labelFeat": "Fase" }] }];
            break;
        case 38:
            jsonCapa = [{ "sNomCapa": "pnc_intervencion_adicional", "sEstilo": "linea", "sColor": "#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "MES", "labelFeat": "Estado / Mes" }, { "vFeat": "TIPO", "labelFeat": "Tipo" }] }];
            break;
        case 39:
            jsonCapa = [{ "sNomCapa": "pnc_intervencion_programado", "sEstilo": "linea", "sColor": "#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "DESCRIP", "labelFeat": "Descripción" }, { "vFeat": "ESTADO", "labelFeat": "Estado / Mes" }, { "vFeat": "TIPO", "labelFeat": "Tipo" }] }];
            break;
        case 40:
            jsonCapa = [{ "sNomCapa": "piura_puente_construccion_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }, { "vFeat": "NOMB INTER", "labelFeat": "Intervención" }] }, { "sNomCapa": "lambayeque_puente_construccion_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }, { "vFeat": "NOMB INTER", "labelFeat": "Intervención" }] }];
            break;
        case 41:
            jsonCapa = [{ "sNomCapa": "pvd_puente_modulares_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#50B166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 42:
            jsonCapa = [{ "sNomCapa": "pvd_puente_loza_por_colapsar_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 43:
            jsonCapa = [{ "sNomCapa": "ancash_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 44:
            jsonCapa = [{ "sNomCapa": "ayacucho_puente_modular_pvd_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 45:
            jsonCapa = [{ "sNomCapa": "ayacucho_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 46:
            jsonCapa = [{ "sNomCapa": "cajamarca_puente_modular_pvd_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 47:
            jsonCapa = [{ "sNomCapa": "cajamarca_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 48:
            jsonCapa = [{ "sNomCapa": "lambayeque_puente_modular_pvd_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 49:
            jsonCapa = [{ "sNomCapa": "lambayeque_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 50:
            jsonCapa = [{ "sNomCapa": "huanuco_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 51:
            jsonCapa = [{ "sNomCapa": "la_libertad_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 52:
            jsonCapa = [{ "sNomCapa": "moquegua_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 53:
            jsonCapa = [{ "sNomCapa": "piura_puente_modular_pvd_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 54:
            jsonCapa = [{ "sNomCapa": "piura_puente_loza_porcolapsar_mtc_pvd", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "SITUACION", "labelFeat": "Situación" }, { "vFeat": "TIPO_VIA", "labelFeat": "Tipo Vía" }] }];
            break;
        case 55:
            jsonCapa = [{ "sNomCapa": "La_Libertad_punto_zona_inundable_gore_libertad", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "DESC", "labelFeat": "Nombre" }] }];
            break;
        case 56:
            jsonCapa = [{ "sNomCapa": "La_Libertad_puntos_criticos_lluvia_gore_libertad", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 57:
            jsonCapa = [{ "sNomCapa": "lambayeque_puente_construccion_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }, { "vFeat": "NOMB INTER", "labelFeat": "Intervención" }] }];
            break;
        case 58:
            jsonCapa = [{ "sNomCapa": "ChiclayoColectores2", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 59:
            jsonCapa = [{ "sNomCapa": "ChiclayoDrenes2", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 60:
            jsonCapa = [{ "sNomCapa": "chiclayoAcequias2", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Departamento" }] }];
            break;
        case 61:
            jsonCapa = [{ "sNomCapa": "lambayeque_modelo_cuencas_ciegas", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [] }];
            break;
        case 62:
            jsonCapa = [{ "sNomCapa": "lima_acequias", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "NOMDEP", "labelFeat": "Departamento" }, { "vFeat": "NOMPROV", "labelFeat": "Provincia" }, { "vFeat": "NOMDIST", "labelFeat": "Distrito" }, { "vFeat": "NOMBRE", "labelFeat": "Nombre" }] }];
            break;
        case 63:
            jsonCapa = [{ "sNomCapa": "limite_lima_metropolitana", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 64:
            jsonCapa = [{ "sNomCapa": "Lima_quebradas_activa_yaku", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 65:
            jsonCapa = [{ "sNomCapa": "lima_rios", "sEstilo": "linea", "sColor": "#0C71F5", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "NOMDEP", "labelFeat": "Departamento" }, { "vFeat": "NOMPROV", "labelFeat": "Provincia" }, { "vFeat": "NOMDIST", "labelFeat": "Distrito" }, { "vFeat": "NOMBRE", "labelFeat": "Nombre" }] }];
            break;
        case 66:
            jsonCapa = [{ "sNomCapa": "lima_quebradas", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "NOMDEP", "labelFeat": "Departamento" }, { "vFeat": "NOMPROV", "labelFeat": "Provincia" }, { "vFeat": "NOMDIST", "labelFeat": "Distrito" }, { "vFeat": "NOMBRE", "labelFeat": "Nombre" }] }];
            break;
        case 67:
            jsonCapa = [{ "sNomCapa": "amazonas_listado_establecimiento_salud_RENIPRESS", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 68:
            jsonCapa = [{ "sNomCapa": "ancash_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 69:
            jsonCapa = [{ "sNomCapa": "apurimac_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 70:
            jsonCapa = [{ "sNomCapa": "arequipa_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 71:
            jsonCapa = [{ "sNomCapa": "ayacucho_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 72:
            jsonCapa = [{ "sNomCapa": "cajamarca_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 73:
            jsonCapa = [{ "sNomCapa": "lambayeque_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 74:
            jsonCapa = [{ "sNomCapa": "cusco_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 75:
            jsonCapa = [{ "sNomCapa": "huancavelica_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 76:
            jsonCapa = [{ "sNomCapa": "huanuco_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 77:
            jsonCapa = [{ "sNomCapa": "ica_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 78:
            jsonCapa = [{ "sNomCapa": "junin_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 79:
            jsonCapa = [{ "sNomCapa": "la_libertad_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 80:
            jsonCapa = [{ "sNomCapa": "lima_callao_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }, { "sNomCapa": "lima_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 81:
            jsonCapa = [{ "sNomCapa": "loreto_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 82:
            jsonCapa = [{ "sNomCapa": "madre_dios_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 83:
            jsonCapa = [{ "sNomCapa": "moquegua_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 84:
            jsonCapa = [{ "sNomCapa": "pasco_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 85:
            jsonCapa = [{ "sNomCapa": "piura_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 86:
            jsonCapa = [{ "sNomCapa": "puno_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 87:
            jsonCapa = [{ "sNomCapa": "san_martin_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 88:
            jsonCapa = [{ "sNomCapa": "tacna_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 89:
            jsonCapa = [{ "sNomCapa": "tumbes_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 90:
            jsonCapa = [{ "sNomCapa": "ucayali_listado_establecimiento_salud_renipress", "sEstilo": "punto", "sIcono": "fas fa-medkit", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "CODIGO_UNI", "labelFeat": "Código Único" }, { "vFeat": "INSTITUCIO", "labelFeat": "Institución" }, { "vFeat": "NOMBRE_DEL", "labelFeat": "Nombre Establecimiento" }, { "vFeat": "CLASIFICAC", "labelFeat": "Clasificación" }, { "vFeat": "CATEGORIA", "labelFeat": "Categoría" }, { "vFeat": "CAMAS", "labelFeat": "N° Cama" }, { "vFeat": "HORARIO", "labelFeat": "Horario Atención" }, { "vFeat": "DIRECTOR_M", "labelFeat": "Director" }, { "vFeat": "TELEFONO", "labelFeat": "Teléfono" }] }];
            break;
        case 91:
            jsonCapa = [{ "sNomCapa": "ogei_fc_afectacion_gore_piura", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "nombre_de_cuenca_ciega", "labelFeat": "Nombre Cuenca" }, { "vFeat": "field", "labelFeat": "Referencia" }, { "vFeat": "area_referencial__m2_", "labelFeat": "Área Referencial" }, { "vFeat": "volumen_referencial_a_evacuar__", "labelFeat": "Volumen Referencial" }] }, { "sNomCapa": "piura_paita_cuencas_ciegas", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }] }];
            break;
        case 92:
            jsonCapa = [{ "sNomCapa": "Piura_InfraestructuraExistente2", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Canal" }] }];
            break;
        case 93:
            jsonCapa = [{ "sNomCapa": "Piura_Compuertas", "sEstilo": "punto", "sIcono": "fas fa-torii-gate", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Compuerta" }] }];
            break;
        case 94:
            jsonCapa = [{ "sNomCapa": "Piura_Diques", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Dique" }] }];
            break;
        case 95:
            jsonCapa = [{ "sNomCapa": "Piura_Drenes", "sEstilo": "linea", "sColor": "#50b166", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Dren" }] }];
            break;
        case 96:
            jsonCapa = [{ "sNomCapa": "Piura_InfraestructuraExistente1", "sEstilo": "punto", "sIcono": "fas fa-water", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Presa" }] }];
            break;
        case 97:
            jsonCapa =[{ "sNomCapa": "piura_puente_construccion_mtc", "sEstilo": "punto", "sIcono": "fa-solid fa-bridge fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }, { "vFeat": "NOMB INTER", "labelFeat": "Intervención" }] }]
            break;
        case 98:
            jsonCapa = [{ "sNomCapa": "piura_modelo_cuencas_ciegas_gore", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [] }, { "sNomCapa": "piura_cuenta_ciegas_identificada_gore", "sEstilo": "poligono", "sColor": "#50b166", "oneachfeature": "onEachFeaturePoligono", "dataFeature": [{ "vFeat": "DESCRIPT", "labelFeat": "Descripción" }] }];
            break;
        case 99:
            jsonCapa = [{ "sNomCapa": "ogei_fc_drenes_hidro", "sEstilo": "linea", "sColor": "#F4CD36", "oneachfeature": "onEachFeatureLinea", "dataFeature": [{ "vFeat": "region", "labelFeat": "Región" }, { "vFeat": "provincia", "labelFeat": "Provincia" }, { "vFeat": "nombres", "labelFeat": "Nombre" }] }];
            break;
        case 100:
            jsonCapa = [{ "sNomCapa": "ogei_fc_emergencias_hidricas", "sEstilo": "punto", "sIcono": "fas fa-water", "sColor": "#DE2415", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "evento", "labelFeat": "Evento" }, { "vFeat": "descripcion", "labelFeat": "Descripción" }, { "vFeat": "estado", "labelFeat": "Estado" }, { "vFeat": "ubicación_politica", "labelFeat": "Ubicación" }] }];
            break;
        case 101:
            jsonCapa = [{ "sNomCapa": "ogei_fc_estaciones_de_bombeo_piura_emergencia", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "estación", "labelFeat": "Estación" }] }];
            break;
        case 102:
            jsonCapa = [{ "sNomCapa": "osdn_fc_emer_locals_cac", "sEstilo": "punto", "sIcono": "fas fa-building fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "oficina", "labelFeat": "Oficina" }, { "vFeat": "sede", "labelFeat": "Sede" }, { "vFeat": "direccion", "labelFeat": "Dirección" }, { "vFeat": "telefono", "labelFeat": "Teléfono" }] }];
            break;
        case 103:
            jsonCapa = [{ "sNomCapa": "dgppvu_fc_mtv_nodo", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "direccion", "labelFeat": "Dirección" }, { "vFeat": "cantidad", "labelFeat": "Cantidad" }] }];
            break;
        case 104:
            jsonCapa = [{ "sNomCapa": "pnc_fc_nodo_ubo1", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#50b166", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "ubo", "labelFeat": "UBO" }, { "vFeat": "instalacion", "labelFeat": "Instalación" }, { "vFeat": "direccion", "labelFeat": "Dirección" }] }];
            break;
        case 105:
            jsonCapa = [{ "sNomCapa": "arcc_punto_proy_programados", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "arcc_segmento_proy_programados", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 106:
            jsonCapa = [{ "sNomCapa": "ancash_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "ancash_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 107:
            jsonCapa = [{ "sNomCapa": "ica_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "ica_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 108:
            jsonCapa = [{ "sNomCapa": "la_libertad_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "la_libertad_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 109:
            jsonCapa = [{ "sNomCapa": "lambayeque_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "lambayeque_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 110:
            jsonCapa = [{ "sNomCapa": "lima_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "lima_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 111:
            jsonCapa = [{ "sNomCapa": "piura_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "piura_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        case 112:
            jsonCapa = [{ "sNomCapa": "tumbes_punto_proy_programados_arcc", "sEstilo": "punto", "sIcono": "fas fa-exclamation-triangle fa-lg", "sColor": "#F4CD36", "oneachfeature": "onEachFeaturePunto", "dataFeature": [{ "vFeat": "PUNTO", "labelFeat": "Punto" }, { "vFeat": "SECTOR", "labelFeat": "Sector" }, { "vFeat": "DESCRIPCI", "labelFeat": "Descripción" }, { "vFeat": "UND", "labelFeat": "Unidad" }, { "vFeat": "CANT", "labelFeat": "Cantidad" }, { "vFeat": "CUENCA", "labelFeat": "Cuenca" }, { "vFeat": "presup", "labelFeat": "Presupuesto" }] }, { "sNomCapa": "tumbes_segmento_proy_programados_arcc", "sEstilo": "linea", "sColor": "#DE2415", "oneachfeature": "onEachFeatureLinea", "dataFeature": [] }];
            break;
        default:
            jsonCapa = [];
    }

    return jsonCapa;
}