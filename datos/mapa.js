var marcadores = L.layerGroup();

var mapL = L.map('mapid', {
    center: [-7.732765062729807, -72.03735351562501],
    zoom: 6,
    layers: [marcadores],
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});

var tiles = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20
}).addTo(marcadores);

var tiles2 = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    maxZoom: 20
});

var tiles3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20
});

var basemaps = {
    Departamento: L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:fc_limite_dpto',
        transparent: true,
        format: 'image/png'
    }),
    Provincia: L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:fc_limite_prov',
        transparent: true,
        format: 'image/png'
    }),
    Distrito: L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:fc_limite_dist',
        transparent: true,
        format: 'image/png'
    }),
    'Hidro Laguna': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartobase_fc_hidro_laguna',
        transparent: true,
        format: 'image/png'
    }),
    'Hidro Rio': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartobase_fc_hidro_rio',
        transparent: true,
        format: 'image/png'
    }),
    'Cenepred': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartoexterna_fc_peligros_inundacion_cenepred',
        transparent: true,
        format: 'image/png'
    }),
    'Georeferencia Comp.': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:pnsr_georreferenciacion_componentes_unicos',
        transparent: true,
        format: 'image/png'
    }),
    'Pueblos': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:dgppvu_form_pueblos',
        transparent: true,
        format: 'image/png'
    }),
    'Manzanas': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:dgppvu_form_manzanas',
        transparent: true,
        format: 'image/png'
    }),
    'Cofopri': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:dgppvu_form_cofopri',
        transparent: true,
        format: 'image/png'
    }),
    'Ríos Principales': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartobase_fc_hidro_riosprinc',
        transparent: true,
        format: 'image/png'
    }),
    'Niveles Riesgo': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartoexterna_fc_cene_nivels_riesgo',
        transparent: true,
        format: 'image/png'
    }),
    'Precipitación Inundaciones': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:cartoexterna_inundaciones_precipitacion',
        transparent: true,
        format: 'image/png'
    }),
    'Riesgo Inundación Distrital': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:ogei_riesgo_de_inundacion_a_nivel_distrital',
        transparent: true,
        format: 'image/png'
    }),
    'LIM Distritos Mayor': L.tileLayer.wms('https://geoc4i.vivienda.gob.pe/geoserver/c4i/wms?', {
        layers: 'c4i:LIMA_DISTRITOS_CON_MAYOR_RIESGO',
        transparent: true,
        format: 'image/png'
    })
};

const baseLayers = {
    'Google Maps': marcadores,
    'Google Earth': tiles2,
    'Street Maps': tiles3
};

L.control.layers(baseLayers, basemaps).addTo(mapL);

$('.leaflet-control-layers').hide();
$('.leaflet-control-zoom').hide();
$('.leaflet-control-zoom-in').hide();
$('.leaflet-control-zoom-out').hide();


$('#btnGoogleMaps').click(function () {
    $("#mapid").show();
    $('.leaflet-control-layers-selector')[0].click()
});

$('#btnGoogleEarth').click(function () {
    $("#mapid").show();
    $('.leaflet-control-layers-selector')[1].click()
});

$('#btnStreetView').click(function () {
    $("#mapid").show();
    $('.leaflet-control-layers-selector')[2].click()
});

$('#btnZoomIn').click(function () {
    var zoomin = mapL.getZoom();
    $('.leaflet-control-zoom-in')[0].click();
});

$('#btnZoomOut').click(function () {
    var zoomin = mapL.getZoom();
    $('.leaflet-control-zoom-out')[0].click();
});

$('#btnFullScreem').click(function () {
    var zoomin = mapL.getZoom();
    $('.leaflet-control-zoom-fullscreen')[0].click();
});

$('#btnLimpiarCapas').click(function () {   
    mapL.eachLayer(function (layer) {
        mapL.removeLayer(layer);
    });
    jQuery('.maquinaria').each(function () {
        var $obj = $(this);
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-dark");
        }
    });
    if (!$('#btnMostrarUnidades').hasClass("muestraunidades")) {
        $("#btnMostrarUnidades").toggleClass("muestraunidades");
        $('#lblTextUnidad').text("Mostrar");
    }
    jQuery('.drawshape').each(function () {
        var $obj = $(this);
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-light-gradient");
        }
    });

    jQuery('.drawshapemulti').each(function () {
        var $obj = $(this);
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-light-gradient");
        }
    });

    jQuery('.drawshapesection').each(function () {
        var $obj = $(this);
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-light-gradient");
        }
    });

    jQuery('.accordion-toggle').each(function () {
        var $obj = $(this);
        if (!$obj.hasClass("collapsed")) {
            $obj.click();
        }
    });
    $('.leaflet-control-layers-selector')[0].click();
    $("#idEmergencia").val("0");

    $('#idDepartamento').val("00");
    $('#idProvincia').html('<option value="00">Seleccione</option>');
    $('#idDistrito').html('<option value="00">Seleccione</option>');
    $('#verTodos').prop('checked', false);
    mostrarDataResumenUnidades();
    sidebar.close();
    mapaPosInicial();
});

$(".drawshape").click(function () {
    var $obj = $(this);
    var data = $obj.data();
    
    if (typeof data.idshape === "undefined") {
        return;
    }
    var idShape = data.idshape;

    if ($obj.hasClass("btn-light-gradient")) {
        $obj.removeClass("btn-light-gradient");
        $obj.addClass("btn-success");
    }
    else if ($obj.hasClass("btn-success")) {
        $obj.removeClass("btn-success");
        $obj.addClass("btn-light-gradient");
    }

    switch (idShape) {
        case 14:
            pintarshapenivelriesgo();
            break;
        case 15:
            pintarshapeprecipitaciones();
            break;
        case 16:
            pintarshaperiesgoinundacion();
            break;
        case 17:
            pintarshapelimRiesgo();
            break;
        default:
            $('.leaflet-control-layers-selector')[idShape].click();
    }

});

$(".drawshapesection").click(function () {
    var $obj = $(this);
    $(".loader").fadeIn("fast");
    if ($obj.hasClass("btn-light-gradient")) {
        $obj.removeClass("btn-light-gradient");
        $obj.addClass("btn-success");
    }
    else if ($obj.hasClass("btn-success")) {
        $obj.removeClass("btn-success");
        $obj.addClass("btn-light-gradient");
    }
    var arrApagar = [];
    var arrMostrar = [];

    jQuery('.drawshapesection').each(function () {
        var $objIter = $(this),
            data = $objIter.data(),
            idShape = data.idshape;
        if ($objIter.hasClass("btn-success")) 
            arrMostrar.push(idShape);
        else if ($objIter.hasClass("btn-light-gradient"))
            arrApagar.push(idShape);
    });

    if (arrMostrar.length > 0) {
        var flagExist = 0;
        mapL.eachLayer(function (layer) {
            if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("id")
                && (layer.feature.id.indexOf("piura_caseta_bombeo_dm_mvcs") >= 0
                    || layer.feature.id.indexOf("piura_linea_impulsion_dm_mvcs") >= 0
                    || layer.feature.id.indexOf("piura_pozo_tormenta_dm_mvcs") >= 0)) {
                flagExist = 1;
            }
        });
        if (flagExist == 0) {
            pintarshapePuntosSinApagado('piura_caseta_bombeo_dm_mvcs', onEachFeaturePunto, [{ 'vFeat': 'Name', 'labelFeat': 'Nombre' }, { 'vFeat': 'descriptio', 'labelFeat': 'Descripción' }]);
            pintarshapeLineaSinApagado('piura_linea_impulsion_dm_mvcs', onEachFeatureLinea, [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }]);
            pintarshapePoligonoSinApagado('piura_pozo_tormenta_dm_mvcs', onEachFeaturePoligono, [{ "vFeat": "Name", "labelFeat": "Nombre" }, { "vFeat": "descriptio", "labelFeat": "Descripción" }]);
        }
    }
    else if (arrMostrar.length == 0) {
        mapL.eachLayer(function (layer) {
            if (layer.hasOwnProperty("feature")
                && layer.feature.hasOwnProperty("id")
                && (layer.feature.id.indexOf("piura_caseta_bombeo_dm_mvcs") >= 0
                    || layer.feature.id.indexOf("piura_linea_impulsion_dm_mvcs") >= 0
                    || layer.feature.id.indexOf("piura_pozo_tormenta_dm_mvcs") >= 0))
                mapL.removeLayer(layer)
        });
    }

    setTimeout(
        function () {
            mapL.eachLayer(function (layer) {
                if (layer.hasOwnProperty("feature")
                    && layer.feature.hasOwnProperty("id")
                    && (layer.feature.id.indexOf("piura_caseta_bombeo_dm_mvcs") >= 0)
                    && layer.feature.hasOwnProperty("properties")
                    && layer.feature.properties.hasOwnProperty("ID_CASETA")
                ) {
                    //console.log(layer.feature.id);
                    if (jQuery.inArray(layer.feature.properties.ID_CASETA, arrApagar) != -1)
                        layer.setOpacity(0);
                    else if (jQuery.inArray(layer.feature.properties.ID_CASETA, arrMostrar) != -1)
                        layer.setOpacity(1);
                }
                else if(layer.hasOwnProperty("feature")
                    && layer.feature.hasOwnProperty("id")
                    && (layer.feature.id.indexOf("piura_linea_impulsion_dm_mvcs") >= 0 || layer.feature.id.indexOf("piura_pozo_tormenta_dm_mvcs") >= 0)
                    && layer.feature.hasOwnProperty("properties")
                    && layer.feature.properties.hasOwnProperty("ID_CASETA")
                ) {
                    //console.log(layer.feature.id);
                    if (jQuery.inArray(layer.feature.properties.ID_CASETA, arrApagar) != -1)
                        layer.setStyle({ opacity: 0, fillOpacity: 0.0 });
                    else if (jQuery.inArray(layer.feature.properties.ID_CASETA, arrMostrar) != -1)
                        layer.setStyle({ opacity: 1, fillOpacity: 0.2 });
                }
            });

            $(".loader").fadeOut("fast");
        }, 100);
    

});

function mapaPosInicial() {
    mapL.setView([-7.732765062729807, -72.03735351562501], 6);
}