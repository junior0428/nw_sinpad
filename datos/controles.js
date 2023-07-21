$("#btnBuscarPlaca").click(function () {
    let idProgramaReplace = getSelectedProgs().replace('?pPrograma=', '');
    if ($("#iPlaca").val() != "") {
        $.ajax({
            type: "GET",
            url: document.getElementById("endpointC4I").value + "api/Mantenimiento/GetUnidadUbicacionPlaca/" + $("#iPlaca").val() + "/" + idProgramaReplace,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: async function (response) {

                if (response.IdOperacion == "true") {
                    if (response.RptaLista.length > 0) {
                        var table1 = response.RptaLista[0];
                        if (table1.coordenadas.length > 0) {
                            var jsonDat = JSON.parse(table1.coordenadas);
                            $("#spPlacaBase").text(table1.placa_base);
                            $("#spEstado").text(table1.descripcionestado);
                            $("#spSubEstado").text(table1.subestado);
                            $("#spPersonasBeneficiadas").text(table1.personasBeneficiadas);
                            $("#spViviendasBeneficiadas").text(table1.viviendasBeneficiadas);
                            $("#spDescripcionEmergencia").text(table1.descripcion_emergencia);
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

                            if (jsonDat != null) {
                                $("#spCoordenadasLat").text(jsonDat.coordinates[1]);
                                $("#spCoordenadasLong").text(jsonDat.coordinates[0]);
                                await consultarUbigeo(jsonDat.coordinates[1], jsonDat.coordinates[0]);
                                pintarShape(table1.coordenadas);
                                mapL.setView(new L.LatLng(jsonDat.coordinates[1], jsonDat.coordinates[0]), 10);
                            }



                            carruselImagenesPlaca($("#iPlaca").val());


                            sidebar.open('informacionunidad');
                        }
                    }
                    else
                        AlertaToastr("error", "¡Verifique!", "No se encontro la placa", 5000, true, true, true, "top-right");
                }
            },
            error: function (err) {
                console.log(err);
                esperaTermino();
            },
            timeout: 5000
        });
        //if (!encontro) AlertaToastr("error", "¡Verifique!", "No se encontro la placa", 5000, true, true, true, "top-right");
    }
    else
        AlertaToastr("error", "¡Verifique!", "Debe ingresar la placa a buscar", 5000, true, true, true, "top-right");
});

$("#sliderImagenes").on('click', 'img.atributo', function (e) {
    // console.log($(this).attr('src'));
    var ImagenP = document.getElementById("ImagenP");
    ImagenP.style.display = "block";
    $("#ImgCentral").attr("src", $(this).attr('src'));
});

$('#idEmergencia').on('change', function () {
    var $obj = $(this);
    if (this.value > "0") {

        $('#lblTextUnidad').text("Ocultar");
        $("#btnMostrarUnidades").toggleClass("muestraunidades");

        despintarEmergencia();
        var data = $("#idEmergencia option:selected").data('shape')
            , jsonDatos = data.replace(/&/g, '"');
        pintarShapeEmer(jsonDatos);
        mostrarDataResumenUnidades();
    }
    else {
        $('#lblTextUnidad').text("Mostrar");
        $("#btnMostrarUnidades").toggleClass("muestraunidades");

        jQuery('.maquinaria').each(function () {
            var $obj = $(this);
            var data = $obj.data();
            if ($obj.hasClass("btn-success")) {
                $obj.removeClass("btn-success");
                $obj.addClass("btn-dark");
                despintarMaquinas(data.idmaquina);
            }
        });

        despintarEmergencia();
        mostrarDataResumenUnidades();
        mapaPosInicial();
    }
});

$('#cboPrograma').on('change', function () {
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature") && layer.feature.hasOwnProperty("geometry") && layer.feature.geometry.hasOwnProperty("datos")
            && layer.feature.geometry.datos.hasOwnProperty("placa_base")) {
            mapL.removeLayer(layer);
        }
    });
    jQuery('.maquinaria').each(async function () {
        var $obj = $(this);
        var data = $obj.data();
        if ($obj.hasClass("btn-success")) {
            await pintarMaquinas(data.idmaquina);
        }
    }); 
    mostrarDataResumenUnidades();
});

$('#verTodos').on('change', function () {
    if ($(this).is(':checked')) {
        //console.log(" Yes ");
        $(".loader").fadeIn("fast");
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
        $(".loader").fadeOut("fast");
    }
    else {
        //console.log(" NO ");
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
    
});

$(".horizontalslide").click(function (event) {
    var closeDirection = { direction: "left" };
    var obj = $(this).attr("id");
    var objContent = $("#" + obj + "Content");

    if (objContent.attr("id") == "busUbigeoContent" && !objContent.hasClass("slide-opened")) {
        $("#busPlacaContent").stop(true, true).hide("slide", closeDirection, 400);
        setTimeout(
            function () {
                $("#busUbigeoContent").stop(true, true).show("slide", closeDirection, 400);
                $("#btnLimpiarCapas").click();
                $("#btnlimpiarPlaca").click();
                $("#busUbigeoContent").toggleClass("slide-opened");
                $("#busPlacaContent").toggleClass("slide-opened");
                toggleColumn();
            }, 500);

    }
    else if (objContent.attr("id") == "busPlacaContent" && !objContent.hasClass("slide-opened")) {

        $("#busUbigeoContent").stop(true, true).hide("slide", closeDirection, 400);
        setTimeout(
            function () {
                $("#busPlacaContent").stop(true, true).show("slide", closeDirection, 400);
                $("#btnLimpiarCapas").click();
                $("#btnlimpiarPlaca").click();
                $("#busUbigeoContent").toggleClass("slide-opened");
                $("#busPlacaContent").toggleClass("slide-opened");
                toggleColumn();
            }, 500);
    }

});

$('#idDepartamento').on('change', function () {
    filtrarDepartamento()
});

$('#idProvincia').on('change', function () {
    filtrarProvincia();
});

$('#idDistrito').on('change', function () {
    filtrarDistrito();
});

function mostrarEmergencias() {
    //GetEmergenciasActivas
    $.ajax({
        type: "GET",
        url: document.getElementById("endpointC4I").value + "api/Emergencia/GetEmergenciasActivas",
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
        success: function (response) {

            if (response.IdOperacion == "true") {
                var table1 = response.RptaLista;
                let html = '<option value="0">Seleccione</option>';
                table1.forEach(function (k, obj2) {
                    var jsonDatos = k.shape.replace(/\"/g, '&');
                    html += '<option value="' + k.idEmergencia + '" data-shape="' + jsonDatos + '">' + k.descripcion + '</option>'
                });
                //console.log(table1);
                $("#idEmergencia").html('')
                $("#idEmergencia").append(html);
            }
        },
        error: function (err) {
            console.log(err);
            esperaTermino();
        },
        timeout: 10000
    });
};

async function mostrarProgramas() {
    try {
        const response = await FetchGeneral("/Mapa/ObtenerProgramas", "get", "text");
        if (response != "") {
            let registro = response.split("↔");
            if (registro[0].toLowerCase() == "error") { mostrarRespuesta("", registro[1], "error"); }
            if (registro[0].toLowerCase() == "true") {
                let registroJsonTipoUnidad = JSON.parse(registro[1]);
                let listaPrograma = registroJsonTipoUnidad.RptaLista;
                //LlenarComboGeneral(listaPrograma, "cboPrograma", "idPrograma", "descripcion", null, false);
                let html = '';
                listaPrograma.forEach(function (k) {
                    html += '<option value="' + k.idPrograma + '" >' + k.descripcion + '</option>'
                });
                //console.log(table1);
                $("#cboPrograma").html('')
                $("#cboPrograma").append(html);

                $('#cboPrograma').multiselect({
                    allSelectedText: 'Todos',
                    selectAllText: "Seleccionar todo",
                    nonSelectedText: "Seleccione",
                    includeSelectAllOption: true
                })
                .multiselect('selectAll', false)
                .multiselect('updateButtonText');
            }
        } else {
            mostrarRespuesta("ERROR", "No hubo respuesta, intente nuevamente.", "error");
        }
        esperaTerminoPagina();
    } catch (e) {
        errorCliente(e);
    }
}

async function selUbigeo(tipo, cod_depa, cod_prov, control) {
    let url = "";
    if (tipo == 1) {
        url = $("#endpointMAESTRAS").val() + "api/Ubigeo/GetDepartamento";
    }
    else if (tipo == 2) {
        url = $("#endpointMAESTRAS").val() + "api/Ubigeo/GetProvincia/" + ('00' + cod_depa).slice(-2);

    }
    else if (tipo == 3) {
        url = $("#endpointMAESTRAS").val() + "api/Ubigeo/GetDistrito/" + ('00' + cod_depa).slice(-2) + "/" + ('00' + cod_prov).slice(-2);

    }

    if (cod_depa == '') {
        $('#idProvincia').html('<option value="00">Seleccione</option>');
        $('#idDistrito').html('<option value="00">Seleccione</option>');
    }

    if (cod_prov == '') {
        $('#idDistrito').html('<option value="00">Seleccione</option>');
    }

    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        //headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
        success: function (response) {
            if (response.IdOperacion == "true") {
                let table1 = response.RptaLista;
                let html = '<option value="00">Seleccione</option>';
                table1.forEach(function (k, obj2) {

                    if (tipo == 1) {
                        html += '<option value="' + (k.cod_depa) + '">' + k.nom_depa + '</option>'
                    }
                    else if (tipo == 2) {
                        html += '<option value="' + (k.cod_prov) + '">' + k.nom_prov + '</option>'
                    }
                    else if (tipo == 3) {
                        if (k.cod_dist != '00')
                            html += '<option value="' + (k.cod_dist) + '">' + k.nom_dist + '</option>'
                    }

                });
                control.html('')
                control.append(html);

            } else {
                console.debug(estado.xidError)
            }
        },
        error: function (err) {
            console.log(err);
        },
        timeout: 5000
    });
};

async function filtrarDepartamento() {
    $(".loader").fadeIn("fast");
    $('#verTodos').prop('checked', false);
    limpiarVehiculos();
    $('#idProvincia').empty();
    //console.log("filtrarDepartamento: " + $('#idDepartamento').val());
    await pintarLimiteProv($('#idDepartamento').val());
    selUbigeo(2, $('#idDepartamento').val(), 0, $('#idProvincia'));
    if ($('#idDepartamento').val() == '00') {
        mapaPosInicial();
    }
    mostrarDataResumen();
    mostrarDataResumenUnidades();
}

async function filtrarProvincia() {
    $(".loader").fadeIn("fast");
    $('#verTodos').prop('checked', false);
    limpiarVehiculos();
    $('#idDistrito').empty();
    //console.log("filtrarDepartamento: " + $('#idDepartamento').val() + ":" + $('#idProvincia').val());
    if ($('#idProvincia').val() == "00")
        await pintarLimiteProv($('#idDepartamento').val());
    else
        await pintarLimiteDist($('#idDepartamento').val() + $('#idProvincia').val());
    selUbigeo(3, $('#idDepartamento').val(), $('#idProvincia').val(), $('#idDistrito'));
    mostrarDataResumen();
    mostrarDataResumenUnidades();
}

async function filtrarDistrito() {
    $(".loader").fadeIn("fast");
    $('#verTodos').prop('checked', false);
    limpiarVehiculos();
    //console.log("filtrarDepartamento: " + $('#idDepartamento').val() + ":" + $('#idProvincia').val() + ":" + $('#idDistrito').val());
    if ($('#idDistrito').val() == "00")
        await pintarLimiteDist($('#idDepartamento').val() + $('#idProvincia').val());
    else
        await pintarLimiteDist($('#idDepartamento').val() + $('#idProvincia').val() + $('#idDistrito').val());
    mostrarDataResumen();
    mostrarDataResumenUnidades();
}

function despintarEmergencia() {
    mapL.eachLayer(function (layer) {
        if (layer.hasOwnProperty("feature")
            && layer.feature.hasOwnProperty("geometry")
            && layer.feature.geometry.hasOwnProperty("datos")
            //&& layer.feature.geometry.datos.hasOwnProperty("idEmergencia")
        )
            mapL.removeLayer(layer);
    });
};

function carruselImagenesPlaca(placa) {
    $.ajax({
        type: "GET",
        url: document.getElementById("endpointC4I").value + "api/Mantenimiento/carruselImagenesPlaca/" + placa,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
        success: function (response) {

            if (response.IdOperacion == "true") {
                if (response.RptaLista.length > 0) {
                    let table1 = response.RptaLista;
                    let datos = response.RptaLista[0];
                    let fotoUnidadUbicacion = datos.fotoUnidadUbicacion
                    var sliderGeneral = document.getElementById("sliderGeneral");
                    var ImagenP = document.getElementById("ImagenP");
                    ImagenP.style.display = "none";
                    let idUnidad = datos.idUnidad;
                    if (fotoUnidadUbicacion != null) {
                        var carrusel = $("#sliderImagenes");
                        carrusel.html("");
                        table1.forEach(function (data, index) {
                            let _active = index == 0 ? "active" : "";
                            var fecha = "";

                            if (idUnidad > 0) {
                                fecha = "Registrado el : " + moment(data.fechaRegistro).format("DD/MM/YYYY");
                            }
                            else {
                                fecha = "";
                            }
                            let imagen = '<div class="carousel-item ' + _active + '"><a href="#"><img src = "data:image/png;base64,' + data.fotoUnidadUbicacion + '" class="thumb atributo"></a><br /><label class="control-label" style="font-size: 10px;"><strong>' + fecha + '</strong></label></div>'
                            carrusel.append(imagen);

                        });
                        sliderGeneral.style.display = "block";
                    }
                    else {
                        sliderGeneral.style.display = "none";
                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
            esperaTermino();
        },
        timeout: 10000
    });
}

function carruselImagenes(idUnidad) {
    $.ajax({
        type: "GET",
        url: document.getElementById("endpointC4I").value + "api/Mantenimiento/CarruselImagenes/" + idUnidad,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
        success: function (response) {

            if (response.IdOperacion == "true") {
                if (response.RptaLista.length > 0) {
                    let table1 = response.RptaLista;
                    let datos = response.RptaLista[0];
                    let fotoUnidadUbicacion = datos.fotoUnidadUbicacion
                    var sliderGeneral = document.getElementById("sliderGeneral");
                    var ImagenP = document.getElementById("ImagenP");
                    ImagenP.style.display = "none";
                    let idUnidad = datos.idUnidad;
                    if (fotoUnidadUbicacion != null) {
                        var carrusel = $("#sliderImagenes");
                        carrusel.html("");
                        table1.forEach(function (data, index) {
                            let _active = index == 0 ? "active" : "";
                            let fecha = "";
                            if (idUnidad > 0)
                                fecha = "Registrado el : " + moment(data.fechaRegistro).format("DD/MM/YYYY");
                            else
                                fecha = "";
                            let imagen = '<div class="carousel-item ' + _active + '"><a href="#"><img src = "data:image/png;base64,' + data.fotoUnidadUbicacion + '" class="atributo" style="width:150px;height:150px"></a><br /><label class="control-label" style="font-size: 10px;"><strong>' + fecha + '</strong></label></div>'
                            carrusel.append(imagen);

                        });
                        sliderGeneral.style.display = "block";
                    }
                    else {
                        sliderGeneral.style.display = "none";
                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
            esperaTermino();
        },
        timeout: 10000
    });
}

function mostrarReportes() {
    let idProgramaReplace = getSelectedProgs().replace('?pPrograma=', '');

    $.ajax({
        type: "GET",
        url: document.getElementById("endpointC4I").value + "api/Reporte/ConsultarReporte/" + idProgramaReplace,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        dataType: "json",
        headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
        success: function (response) {

            if (response.IdOperacion == "true") {
                let listaReporte = [];
                for (var i = 0; i < response.RptaLista.length; i++) {
                    let obj = {
                        descripcion: response.RptaLista[i].descripcion,
                        cantidad: response.RptaLista[i].cantidadEmergencia
                    }
                    listaReporte.push(obj);
                }

                let dataSource = listaReporte;

                const legendSettings = {
                    orientation: 'horizontal',
                    itemTextPosition: 'right',
                    horizontalAlignment: 'center',
                    verticalAlignment: 'bottom',
                    columnCount: 3,
                };
                $('#pie').dxPieChart({
                    size: {
                        width: 250,
                    },
                    palette: 'bright',
                    dataSource,
                    legend: legendSettings,
                    series: [
                        {
                            argumentField: 'descripcion',
                            valueField: 'cantidad',
                            label: {
                                visible: true,
                                connector: {
                                    visible: true,
                                    width: 1,
                                },
                            },
                        },
                    ],
                    title: '',
                    export: {
                        enabled: false,
                    }
                    //onPointClick(e) {
                    //    const point = e.target;

                    //    toggleVisibility(point);
                    //},
                    //onLegendClick(e) {
                    //    const arg = e.target;

                    //    toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
                    //},
                });

            }
        },
        error: function (err) {
            console.log(err);
            esperaTermino();
        },
        timeout: 10000
    });
};

function toggleVisibility(item) {
    if (item.isVisible()) {
        item.hide();
    } else {
        item.show();
    }
}

function mostrarDataResumen() {
    return new Promise((resolve, reject) => {

        let idProgramaReplace = getSelectedProgs();
        var pUbigeos = "";
        if (idProgramaReplace.length > 0) {
            pUbigeos = "&pUbigeo=" + getSelectedUbigeos();
        }

        $.ajax({
            type: "GET",
            url: document.getElementById("endpointC4I").value + "api/Mantenimiento/GetUnidadConsultaTotales" + idProgramaReplace + pUbigeos,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: async function (response) {
                if (response.IdOperacion == "true") {
                    var table1 = response.RptaLista[0];
                    var ArrayData = $.map(table1.valor.split(';'), Number);
                    lblUnidades.innerHTML = table1.TotalesUnidades;
                    lblAsignados.innerHTML = table1.TotalesAsignados;
                    lblIntervenciones.innerHTML = table1.TotalesIntervencion;
                    lblMantenimiento.innerHTML = ArrayData[3];
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

let chart;

async function pintarGrafico(idEmergencia, pDataUbigeos) {
    let idProgramaReplace = getSelectedProgs().replace('?pPrograma=', '');    
    let data = {
        pidEmergencia: idEmergencia,
        pPrograma: idProgramaReplace,
        pUbigeo: pDataUbigeos 
    }
    let URL = document.getElementById("endpointC4I").value + "api/Reporte/ConsultarReporteTipoMaquinaria";
    const responteWS = await RequestWS("POST", URL, data, document.getElementById("tokenC4I").value);
    var dataRep = responteWS.RptaLista;
    var dsData = [];

    var labelsChart = dataRep.map(function (e) {
        return e.ClaseUnidad;
    });
    var dataChart = dataRep.map(function (e) {
        return e.Cantidad;
    });
    var backgroundColors = dataRep.map(function (e) {
        var colors = "#0D6ABE";
        if (e.ClaseUnidad.trim() == "MAQUINARIA")
            colors = "#FFF200";
        else if (e.ClaseUnidad.trim() == "RECURSOS HUMANOS")
            colors = "#428D30";
        else if (e.ClaseUnidad.trim() == "INFRAESTRUCTURA")
            colors = "#575757";
        return colors;
    });
    Chart.register(ChartDataLabels);

    if (chart) {
        chart.destroy();
    }

    var MeSeContext = document.getElementById("MeSeStatusCanvas").getContext("2d");
    var MeSeConfig = {
        type: 'bar',
        data: {
            labels: labelsChart,
            datasets: [{
                //label: "Recursos",
                data: dataChart,
                backgroundColor: backgroundColors
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container',
                },
                legend: {
                    display: false,
                },
                datalabels: {
                    align: 'end',
                    color: 'black',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    };

    chart = new Chart(MeSeContext, MeSeConfig);
    $("#DivContenedor").show();
}

function consultarUbigeo(lat, long) {
    return new Promise((resolve, reject) => {
        var urlconsulta = document.getElementById("endpointC4I").value + "api/TRS_UNIDAD_UBICACION/ConsultarUbigeoFromLatLon?Latitud=" + lat + "&Longitud=" + long;
        $.ajax({
            type: "GET",
            url: document.getElementById("endpointC4I").value + "api/TRS_UNIDAD_UBICACION/ConsultarUbigeoFromLatLon?Latitud=" + lat + "&Longitud=" + long,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            headers: { 'Authorization': 'Bearer ' + document.getElementById("tokenC4I").value },
            success: function (response) {
                //console.log(response);
                if (response.IdOperacion == "true") {
                    if (response.RptaLista.length > 0) {
                        let table1 = response.RptaLista[0];

                        $("#spDepartamento").text(table1.DEPARTAMENTO);
                        $("#spDistrito").text(table1.DISTRITO);
                        $("#spProvincia").text(table1.PROVINCIA);

                        let situacion = "";
                        if (table1.DEPARTAMENTOID != hd_codDptoEmergencia.value) {
                            spSituacion.parentNode.parentNode.classList.remove("d-none");
                            situacion = `<span class="badge badge-pill badge-danger"><i class="fas fa-car-side fa-spin"></i > EN TRÁNSITO</span>`;
                        } else {
                            spSituacion.parentNode.parentNode.classList.add("d-none");
                        }

                        $("#spSituacion").html(situacion);
                        //var obj = JSON.parse(table1.coordenadas);
                    }
                }
                resolve();
            },
            error: function (err) {
                reject(err);
                console.log(err);
            },
            timeout: 10000
        });
    })
}

var miHeigthGlobal = '0px';
miHeigthGlobal = $("#column").height();

function toggleColumn() {
    var column = document.getElementById("column");
    let alto = $("#column").height();

    var iconDerecha = $("#iconDerecha");
    if ((alto > 20 && alto <500) || alto == "") {
        // Si la altura actual es 0 o no se ha establecido todavía, se expande la columna
        $("#column").height(miHeigthGlobal + 'px');
        $('.maquinaria').show();
        iconDerecha.removeClass("fa-chevron-down").addClass("fa-chevron-up");

    } else {
        // Si la altura actual es distinta de 0, se contrae la columna
        $("#column").height('30px');
        $('.maquinaria').hide();
        iconDerecha.removeClass("fa-chevron-up").addClass("fa-chevron-down");
    }
}
$("#btnOcultarColumna").click(function () {
    toggleColumn();
});

function getSelectedProgs() {
    var idPrograma = document.getElementById("endpointProgramas").value;
    let idProgramaReplace = idPrograma.replace(/\|/g, ',');
    var data = "";
    $("#cboPrograma").val().forEach(function (k) {
        data += (k + ",");
    });
    data = data.slice(0, -1);

    if (data.length > 0)
        data = "?pPrograma=" + data;

    return data;
}

function getSelectedUbigeos() {
    
    var data = ""
        + ($("#idDepartamento").val() == null ? "00" : $("#idDepartamento").val())
        + ($("#idProvincia").val() == null ? "00" : $("#idProvincia").val())
        + ($("#idDistrito").val() == null ? "00" : $("#idDistrito").val());
    return data;
}