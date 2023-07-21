$('#btnMostrarUnidades').click(function () {

    //Muestro todas las unidades
    if ($('#btnMostrarUnidades').hasClass("muestraunidades")) {
        limpiarVehiculos();
        $('#lblTextUnidad').text("Ocultar");
        jQuery('.maquinaria').each(async function () {
            var $obj = $(this);
            var data = $obj.data();
            if ($obj.hasClass("btn-dark")) {
                $obj.removeClass("btn-dark");
                $obj.addClass("btn-success");
                await pintarMaquinas(data.idmaquina);
            }
        });
    }
    //Oculto todas las unidades
    else {
        $('#lblTextUnidad').text("Mostrar");
        jQuery('.maquinaria').each(function () {
            var $obj = $(this);
            var data = $obj.data();
            if ($obj.hasClass("btn-success")) {
                $obj.removeClass("btn-success");
                $obj.addClass("btn-dark");
                despintarMaquinas(data.idmaquina);
            }
        });
    }
    $("#btnMostrarUnidades").toggleClass("muestraunidades");
    //mostrarDataResumenUnidades();
});

$(".maquinaria").click(async function () {
    var $obj = $(this);
    var data = $obj.data();
    if ($obj.hasClass("btn-dark")) {
        $obj.removeClass("btn-dark");
        $obj.addClass("btn-success");
        await pintarMaquinas(data.idmaquina);
    }
    else if ($obj.hasClass("btn-success")) {
        $obj.removeClass("btn-success");
        $obj.addClass("btn-dark");
        despintarMaquinas(data.idmaquina);
    }
});

$("#btnlimpiarPlaca").click(function () {
    if ($("#iPlaca").val() != "") {
        mapL.eachLayer(function (layer) {
            if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("geometry") && layer.feature.geometry.hasOwnProperty("datos")) {
                var jsonDatos = layer.feature.geometry.datos;
                if (jsonDatos.placa_base == $("#iPlaca").val())
                    mapL.removeLayer(layer);
            }
        });
        $("#iPlaca").val("");
        sidebar.close();
        mapaPosInicial();
    }
});

function mostrarDataResumenUnidades() {
    return new Promise((resolve, reject) => {

        var idEmergencia = 0;
        let idProgramaReplace = getSelectedProgs();

        if ($("#idEmergencia").val() != null)
            idEmergencia = $("#idEmergencia").val();
        var pUbigeos = "&pUbigeo=" + getSelectedUbigeos();
        
        jQuery('.maquinaria').each(function () {
            var $obj = $(this);
            $obj.children()[0].innerHTML = 0;
        });

        $.ajax({
            type: "GET",
            url: document.getElementById("endpointC4I").value + "api/Mapa/GetCantUnidadesTipo/" + idEmergencia + idProgramaReplace + pUbigeos,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: function (response) {
                if (response.IdOperacion == "true") {
                    var table1 = response.RptaLista;
                    table1.forEach(function (k, obj2) {
                        jQuery('.maquinaria').each(function () {
                            var $obj = $(this),
                                data = $obj.data();
                            if (data.idmaquina == k.idTipoUnidad) {
                                $obj.children()[0].innerHTML = k.total;
                            }
                        });
                    });
                }
                pintarGrafico(idEmergencia, pUbigeos.replace('&pUbigeo=', ''));
                resolve();
            },
            error: function (err) {
                reject(err);
            },
            timeout: 5000
        });
    });
};

async function pintarShapeEmer(data) {
    var capaShape = L.featureGroup();
    capaShape.addTo(mapL);
    var sEmergencia = L.geoJSON(JSON.parse(data), {
        style: {
            fillColor: "#ff7800",
            fillOpacity: 0.9,
            weight: 1,
            opacity: 1,
            color: "#666666"
        },
        pointToLayer: markerEmergenciaSOS
    });
    sEmergencia.addTo(mapL);
    mapL.fitBounds(sEmergencia.getBounds());
    mapL.setZoom(8);

    jQuery('.maquinaria').each(function () {
        var $obj = $(this);
        var data = $obj.data();
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-dark");
            despintarMaquinas(data.idmaquina);
        }
    });
    //.click a cada unidad
    jQuery('.maquinaria').each(function () {
        $(this).click();
    });
};

function pintarShape(data) {
    var capaShape = L.featureGroup();
    capaShape.addTo(mapL);
    //console.log(data)
    function customMarker(feature, latlng) {
        var urlIcono = "../img/unidades/iconos/" + feature.datos.url_ico;
        var iconsvg2 = L.icon({
            iconUrl: urlIcono,
            iconSize: [40, 40],
            iconAnchor: [16, 42],
            popupAnchor: [0, -42]
        });
        return L.marker(latlng, {
            icon: iconsvg2
        });
    }
    L.geoJSON(JSON.parse(data), {
        style: {
            fillColor: "#ff7800",
            fillOpacity: 0.9,
            weight: 1,
            opacity: 1,
            color: "#666666"
        },
        pointToLayer: customMarker
    }).addTo(mapL).on('click', mostrarDatos);
};

function limpiarVehiculos() {
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("geometry") && layer.feature.geometry.hasOwnProperty("datos")
            && layer.feature.geometry.datos.hasOwnProperty("placa_base")) {
            mapL.removeLayer(layer);
        }
    });
    jQuery('.maquinaria').each(function () {
        var $obj = $(this);
        var data = $obj.data();
        if ($obj.hasClass("btn-success")) {
            $obj.removeClass("btn-success");
            $obj.addClass("btn-dark");
        }
    });

}

function markerEmergenciaSOS(feature, latlng) {
    return L.marker(latlng, {
        icon: L.icon({
            iconUrl: '../img/EmergenciaSOS.png',
            iconSize: [42, 42],
            iconAnchor: [16, 42],
            popupAnchor: [0, -42]
        })
    });
};

async function mostrarDatos(e) {
    if (e.layer.hasOwnProperty("feature") && e.layer.feature.hasOwnProperty("geometry") && e.layer.feature.geometry.hasOwnProperty("datos")) {
        var jsonDatos = e.layer.feature.geometry.datos;
        await buscarUnidad(jsonDatos.idUnidad);
    }
}

function buscarUnidad(idUnidad) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: document.getElementById("endpointC4I").value + "api/Mantenimiento/GetUnidadMapa/" + idUnidad,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: async function (response) {

                if (response.IdOperacion == "true") {
                    if (response.RptaLista.length > 0) {
                        let table1 = response.RptaLista[0];
                        var obj = JSON.parse(table1.coordenadas);
                        $("#spPlacaBase").text(table1.placa_base);
                        $("#spEstado").text(table1.descripcionestado);
                        $("#spSubEstado").text(table1.subestado);
                        $("#spSituacion").text(table1.subestado);
                        $("#spPersonasBeneficiadas").text(table1.personasBeneficiadas);
                        $("#spViviendasBeneficiadas").text(table1.viviendasBeneficiadas);
                        $("#spDescripcionEmergencia").text(table1.descripcion_emergencia);
                        $("#hd_codDptoEmergencia").val(table1.coddpto);
                        $("#spTipoUnidad").text(table1.descripcion_tipoUnidad);
                        $("#spPrograma").text(table1.descripcion_programa);

                        $("#dVelocidad").text(table1.velocidad + ' km/h');
                        $("#dRumbo").text(table1.rumbo + '°');

                        if (table1.fechaHora != null || table1.fechaHora != "") {
                            var fechaHora = moment(table1.fechaHora).format("DD/MM/YYYY HH:mm")
                            $("#spFechaHora").text(fechaHora);
                        }
                        else
                            $("#spFechaHora").text('');

                        if (obj != null) {
                            $("#spCoordenadasLat").text(obj.coordinates[1]);
                            $("#spCoordenadasLong").text(obj.coordinates[0]);
                            await consultarUbigeo(obj.coordinates[1], obj.coordinates[0]);
                        }

                        carruselImagenes(idUnidad);

                        sidebar.open('informacionunidad');
                    }
                }
                resolve();
            },
            error: function (err) {
                reject(err);
                console.log(err);
                esperaTermino();
            },
            timeout: 10000
        });
    });
}

function pintarMaquinas(id) {
    return new Promise((resolve, reject) => {
        let idProgramaReplace = getSelectedProgs();
        var pUbigeos = getSelectedUbigeos();
        var url = $("#endpointC4I").val() + 'api/Mapa/GetUnidadesTipo/' + $("#idEmergencia").val() + '/' + pUbigeos + '/' + id + idProgramaReplace;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: function (response) {
                if (response.IdOperacion == "true") {
                    var array = response.RptaLista;

                    array.forEach(function (obj) {
                        pintarShape(obj.coordenadas);
                    });
                } else {
                    console.debug(estado.xidError)
                }
                resolve();
            },
            error: function (err) {
                reject(err);
            },
            timeout: 5000
        });
    });
};

function despintarMaquinas(id) {
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("geometry") && layer.feature.geometry.hasOwnProperty("datos")) {
            var jsonDatos = layer.feature.geometry.datos;
            if (jsonDatos.idTipoUnidad == id)
                mapL.removeLayer(layer);
        }
    });
}



var inter = 0;
function refrescarUbicacion() {
    mostrarDataResumenUnidades();
    jQuery('.maquinaria').each(async function () {
        var $obj = $(this);
        if ($obj.hasClass("btn-success")) {
            var data = $obj.data();
            despintarMaquinas(data.idmaquina);
            await pintarMaquinas(data.idmaquina);
        }
    });
}

//var interval = setInterval(function () {
//    inter++;
//    let fechaSplit = $('#dFechaIni').val();
//    var now = new Date();
//    var y = now.getFullYear();
//    var m = now.getMonth() + 1;
//    var d = now.getDate();
//    m = m < 10 ? "0" + m : m;
//    d = d < 10 ? "0" + d : d;

//    var flagupd = 0;
//    jQuery('.maquinaria').each(function () {
//        var $obj = $(this);
//        if ($obj.hasClass("btn-success")) {
//            flagupd = 1;
//            return false;
//        }
//    });

//    //if ($('#dFechaIni').val() == (d + "/" + m + "/" + y) && flagupd == 1)
//    //    refrescarUbicacion();

//    console.log("Exec -- " + inter + " update flag -- " + flagupd);

//}, 60000);




//#region Mosquitto
var mqtt;
var reconnectTimeout = 2000;
var host = "qac4i.vivienda.gob.pe";
var port = 9002;

function onConnect() {
    //console.log("Connected");
    mqtt.subscribe("test");
}

function MQTTconnect() {


    mqtt = new Paho.MQTT.Client(host, port, "Client");
    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
        userName: "Client",
        password: "Client123#$%&",
        onFailure: onFailure,

    };

    //console.log("Connected to " + host + " " + port);


    function onFailure(message) {
        //console.log("Failed");
        setTimeout(MQTTconnect, reconnectTimeout);
    }

    function onMessageArrived(r_message) {

        var jsonObj = $.parseJSON(r_message.payloadString);


        jsonObj.forEach(function (obj) {
            despintarMaquina(obj);
        });

        var out_msg = "Message received " + r_message.payloadString + "<br>";
        out_msg = out_msg + "Message received Topic " + r_message.destinationName;
        //console.log(out_msg);
    }
    function onConnectionLost() {
        //console.log("connection lost");
        connected_flag = 0;
        setTimeout(MQTTconnect, reconnectTimeout);
    }
    function onConnected(recon, url) {
        console.log(" in onConnected " + reconn);
    }
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnected = onConnected;
    mqtt.connect(options);

}
//MQTTconnect();

function despintarMaquina(obj) {

    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("geometry") && layer.feature.geometry.hasOwnProperty("datos")) {
            var jsonDatos = layer.feature.geometry.datos;
            if (jsonDatos.idUnidad == obj.idUnidad) {
                mapL.removeLayer(layer);
                pintarShape(obj.coordenadas)
            }

        }
    });
}

//#endregion