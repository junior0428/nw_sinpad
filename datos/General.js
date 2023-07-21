"use strict";
var userId = "";
var user = document.getElementById("hdUser");
if (user) {
    userId = user.value;
}
$(document).on("keydown", function (e) {
    // Chrome & Firefox || Internet Explorer
    if (e.which === 8 && !$(e.target).is("input[type='text']:not([readonly]), input[type='password']:not([readonly]), input[type='email']:not([readonly]), input[type='number']:not([readonly]), textarea")) {
        e.preventDefault();
    }
});

//CONFIGURACION DEL DOMINIO
var urlDominio = window.location.host.substring(0, 9);
var RouteConfig = "/";
if (urlDominio == "localhost") {
    RouteConfig = "/";
}
else {
    RouteConfig = window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1) + 1)
}

function Codificar(clave) {
    var encode = "";
    encode = btoa(clave);
    return encode;
}
var tituloAlerta = "SISTEMA";
// libreria para adicionar funcionalidad a todo el proyecto.

// adicionar o mover a este archivo las funciones o procedimientos que seran utilizados en todo el proyecto

// PARA ADICIONAR FUNCIONALIDAD AL INTERNET EXPLORER

// PARA CONVERTIR A FECHAS Y ORDENAR EN LAS GRIDS
if (!String.prototype.toDateTime) {
    String.prototype.toDateTime = function (format) {
        var normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
        var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
        var formatItems = normalizedFormat.split('-');
        var dateItems = normalized.split('-');

        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var hourIndex = formatItems.indexOf("hh");
        var minutesIndex = formatItems.indexOf("ii");
        var secondsIndex = formatItems.indexOf("ss");

        var today = new Date();

        for (var item = dateItems.length; item < formatItems.length; item++) { dateItems.push(0); }//completa el array

        var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
        var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
        var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

        var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
        var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
        var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

        return new Date(year, month, day, hour, minute, second);
    };
}
// PARA LOS COMBOS RECURSIVOS - EVITA EL ERROR - se comento esta funcion esta en string.js
//if (!String.prototype.startsWith) {
//    String.prototype.startsWith = function (str) {
//        return !this.indexOf(str);
//    };
//}
// PARA LOS TEXTOS - EVITA EL ERROR
if (!String.prototype.isNumeric) {
    String.prototype.isNumeric = function () {
        let n = this;
        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    };
}
// PARA LOS TEXTOS converir a decimal - EVITA EL ERROR
if (!String.prototype.toDecimal) {
    String.prototype.toDecimal = function () {
        let num = this;
        num = parseFloat(num.replace(/[^0-9\.\-]/g, ''));
        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(num) || num === 0) {
            return parseFloat(0).toFixed(2);
        } else {
            return num;
        }
    };
}
// PARA LOS TEXTOS - EVITA EL ERROR
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
// PARA LOS TEXTOS - EVITA EL ERROR
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0, targetLength);
        }
    };
}
// REPITE EL CARACTER LA VECES QUE SE INDICA - EVITA ERROR DE IE
if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (; ;) {
            if ((count & 1) == 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            str += str;
        }
        return rpt;
    }
}
//CONVERTIR NUMERO CON FORMATO A decimal
if (!String.prototype.parseFloat) {
    String.prototype.parseFloat = function () {
        //el separador de miles es ","
        return parseFloat(this.replace(/[^0-9\.]/g, ''));
    };
}
//CONVERTIR NUMERO CON FORMATO A entero
if (!String.prototype.parseInt) {
    String.prototype.parseInt = function () {
        //el separador de miles es ","
        return parseInt(this.replace(/[^0-9\.]/g, ''));
    };
}


//FORMATO PARA FECHAS YYYYMMDD
if (!Date.prototype.yyyymmdd) {
    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]); // padding
    };
}
//FORMATO PARA FECHAS DDMMYYYY
if (!Date.prototype.ddmmyyyy) {
    Date.prototype.ddmmyyyy = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
    };
}
//FORMATO PARA FECHAS DDMMYYYYHHMMSS
if (!Date.prototype.ddmmyyyyhhmmss) {
    Date.prototype.ddmmyyyyhhmmss = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        var hh = this.getHours().toString();
        var mn = this.getMinutes().toString();
        var ss = this.getSeconds().toString();
        return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy + ' ' + (hh[1] ? hh : "0" + hh[0]) + ':' + (mn[1] ? mn : "0" + mn[0]) + ':' + (ss[1] ? ss : "0" + ss[0]);
    };
}
//FORMATO PARA FECHAS periodo
if (!Date.prototype.periodo) {
    Date.prototype.periodo = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        //var dd = this.getDate().toString();
        return yyyy + (mm[1] ? mm : "0" + mm[0]); // padding
    };
}
//FORMATO PARA FECHAS periodo tiempo yyyymmddhhmnss
if (!Date.prototype.periodotiempo) {
    Date.prototype.periodotiempo = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        var hh = this.getHours().toString();
        var mn = this.getMinutes().toString();
        var ss = this.getSeconds().toString();
        return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]) + (hh[1] ? hh : "0" + hh[0]) + (mn[1] ? mn : "0" + mn[0]) + (ss[1] ? ss : "0" + ss[0]);
    };
}
//valida fecha
if (!Date.prototype.isDate) {
    Date.prototype.isDate = function () {
        return (this !== "Invalid Date" && !isNaN(this)) ? true : false;
    };
}
//adiciona dias a la fecha
if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
}

//REDONDEO DE NUMEROS
if (!Number.prototype.round) {
    Number.prototype.round = function (p) {
        p = p || 10;
        return parseFloat(this.toFixed(p));
    };
}


//ELIMINAR UN ARRAY POR PK
if (!Array.prototype.removeItem) {
    Array.prototype.removeItem = function (posPk, itemPk) {
        for (var i = 0; i < this.length; i++) {
            var listaPk = '';
            for (var pos = 0; pos < posPk.length; pos++) {
                listaPk += this[i][pos];
                if (pos !== posPk.length - 1) { listaPk += '|'; }
            }

            if (listaPk === itemPk) {
                for (var i2 = i; i2 < this.length - 1; i2++) {
                    this[i2] = this[i2 + 1];
                }
                this.length = this.length - 1;
                return;
            }
        }
    };
}
//busca el primer indice en una lista
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        },
        configurable: true,
        writable: true
    });
}
// PARA LOS METODOS FIND 
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                k++;
            }
            return undefined;
        },
        configurable: true,
        writable: true
    });
}
// para los array entries
(function () {
    function ArrayIterator(array, kind) {
        this._array = array;
        this._kind = kind;
        this._nextIndex = 0;
    }

    ArrayIterator.prototype.next = function () {
        var currentIndex = this._nextIndex;

        // Are we done?
        if (currentIndex >= this._array.length) {
            return { 'value': undefined, 'done': true };
        }

        // Get ready for next time
        this._nextIndex++;

        // Iterating keys?
        if (this._kind === 'key') {
            return { 'value': currentIndex, 'done': false };
        }

        // Iterating values?
        if (this._kind === 'value') {
            return { 'value': this._array[currentIndex], 'done': false };
        }

        // Iterating entries?
        if (this._kind === 'key+value') {
            return { 'value': [currentIndex, this._array[currentIndex]], 'done': false };
        }
    };

    if (!Array.prototype.keys) {
        Array.prototype.keys = function () {
            return new ArrayIterator(this, 'key');
        };
    }

    if (!Array.prototype.values) {
        Array.prototype.values = function () {
            return new ArrayIterator(this, 'value');
        };
    }

    if (!Array.prototype.entries) {
        Array.prototype.entries = function () {
            return new ArrayIterator(this, 'key+value');
        };
    }
}());


//FUNCION PARA DAR FORMATO A NUMEROS
/*
 **** ejemplo de llamada ****
formatNumber.new(123456779.18, "$") // retorna "$123.456.779,18"
formatNumber.new(123456779.18) // retorna "123.456.779,18"
formatNumber.new(123456779) // retorna "$123.456.779"
*/

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num, dec) {
        num += '';
        num = parseFloat(num.replace(/[^0-9\.\-]/g, '')); // elimino cualquier cosa que no sea numero o punto

        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(num) || num === 0)
            return parseFloat(0).toFixed(dec);

        // formateo los decimales
        num = num.toFixed(dec);

        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, decimales, simbol) {
        this.simbol = simbol || ''; //por si la variable no fue pasada
        this.decimales = decimales || 0; // por si la variable no fue fue pasada
        return this.formatear(num, decimales);
    }
};
function gbi(id) {
    return document.getElementById(id);
}
/* funcion para llenar los combos */
function llenarCombo(lista, idCombo, primerItem, selecDefault, posicionDefault, verCodigo, incluirBuscador) {

    if (incluirBuscador !== undefined) {
        if (incluirBuscador == true) {
            $("#" + idCombo).select2({ theme: "classic" });
        }
    }

    if (verCodigo === null || verCodigo === undefined) { verCodigo = false; }
    if (selecDefault === null || selecDefault === undefined) { selecDefault = "N"; posicionDefault = 0; }
    if (primerItem === null || primerItem === undefined) { primerItem = "SELECCIONE"; }
    var contenido = "";
    var nRegistros = lista.length;
    //solo se mostrara si hay mas de un registro
    //if (nRegistros > 1) {
    if (primerItem !== '' && primerItem.toLowerCase() !== 'none') contenido = "<option value=''>" + primerItem.toUpperCase() + "</option>";
    //}
    var vDefault = '';
    var nCampos;
    var campos;
    if (lista.length > 0) {
        //if (lista[0].trim() !== "") {
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("▲");
            contenido += "<option value='" + campos[0].toUpperCase() + "'";// + seleccion;
            if (nRegistros === 1) { contenido += " SELECTED "; }
            if (nRegistros > 0 && selecDefault === "S") {
                if (campos[posicionDefault] === "S") { vDefault = campos[0]; contenido += " SELECTED "; }
            }
            if (verCodigo === false) { contenido += ">" + campos[1] + "</option>"; }
            if (verCodigo === true) { contenido += ">" + String.format("{0} - {1}", campos[0], campos[1]) + "</option>"; }

        }
        //}
    }
    var cbo = document.getElementById(idCombo);
    cbo.setAttribute('default', vDefault);
    if (cbo !== null) cbo.innerHTML = contenido;
}
function llenarComboPersonalizado(lista, idCombo, primerItem, selecDefault, posicionDefault, verCodigo, verTodos, ordenarDescripcion, incluirBuscador) {
    if (incluirBuscador !== undefined) {
        if (incluirBuscador == true) {
            $("#" + idCombo).select2({ theme: "classic" });
        }
    }
    if (verCodigo === null || verCodigo === undefined) { verCodigo = true; }
    if (selecDefault === null || selecDefault === undefined) { selecDefault = "N"; posicionDefault = 0; }
    if (primerItem === null || primerItem === undefined) { primerItem = "SELECCIONE"; }
    if (verTodos === null || verTodos === undefined) { verTodos = false; }
    if (verTodos === true) primerItem = "TODOS";
    if (ordenarDescripcion === null || ordenarDescripcion === undefined) { ordenarDescripcion = false; }
    var contenido = "";
    var nRegistros = lista.length;
    //solo se mostrara si hay mas de un registro
    //if (nRegistros > 1) {
    if (primerItem !== null && primerItem !== "") contenido = "<option value=''>" + primerItem.toUpperCase() + "</option>";
    if (ordenarDescripcion === true) {
        lista.sort(function (a, b) {
            if (a.split("▲")[1] > b.split("▲")[1]) {
                return 1;
            }
            if (a.split("▲")[1] < b.split("▲")[1]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }

    var nCampos;
    var campos;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("▲");
        contenido += "<option value='" + campos[0].toUpperCase() + "'";// + seleccion;
        //if (nRegistros === 1) { contenido += " SELECTED "; } // Comentado cuando es un solo registro no se posiciona en "SELECCIONE"
        if (nRegistros > 1 && selecDefault === "S") {
            if (campos[posicionDefault] === "S") { contenido += " SELECTED "; }
        }
        if (verCodigo === false) { contenido += ">" + campos[1] + "</option>"; }
        if (verCodigo === true) { contenido += ">" + String.format("{0} - {1}", campos[0], campos[1]) + "</option>"; }

    }
    var cbo = document.getElementById(idCombo);
    if (cbo !== null) cbo.innerHTML = contenido;
}
function llenarComboAsociado(objOrigen, objDestino, listaItems, posFiltro, verSeleccion, verCodigo) {
    if (verCodigo === null || verCodigo === undefined) { verCodigo = false; }
    var seleccion = " SELECTED ";
    var contenido = "<option value=''>SELECCIONE</option>";
    if (verSeleccion !== undefined && verSeleccion === false) { contenido = ""; }
    var reg = listaItems.length;
    var campos;
    var cboOrigen = document.getElementById(objOrigen);
    var cboDestino = document.getElementById(objDestino);
    var idFiltro = cboOrigen.value;
    if (reg !== 1) { seleccion = ""; }
    if (idFiltro === "") {
        //cboDestino.innerHTML = contenido;
        contenido = "<option value=''>SELECCIONE</option>";
    }
    else {
        for (let j = 0; j < reg; j++) {
            campos = listaItems[j].split("▲");
            //if (campos[posFiltro] === idFiltro) {
            if (campos[posFiltro].startsWith(idFiltro)) {
                contenido += "<option value='" + campos[0].toUpperCase() + "'" + seleccion + ">";
                if (verCodigo === false) { contenido += campos[1] + "</option>"; }
                if (verCodigo === true) { contenido += String.format("{0} - {1}", campos[0], campos[1]) + "</option>"; }
                seleccion = "";
            }
        }
    }
    if (cboDestino !== null) cboDestino.innerHTML = contenido;
}
function llenarComboMultiple(lista, idCombo, primerItem) {
    var contenido = "";
    var nRegistros = lista.length;
    var nCampos;
    var campos;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("▲");
        contenido += "<option value='|" + campos[0] + "|'>" + campos[1] + "</option>";
    }
    var cbo = document.getElementById(idCombo);
    if (cbo !== null) cbo.innerHTML = contenido;
    $('#' + idCombo).multiselect('rebuild');
}
/*llenar combo filtrado*/
/* lista = Lista de Items
 * idCombo = Objeto que se carga
 * primerItem = inserta primer item con valor especifico
 * selecID = posicion del arreglo
 * selecValor = valor a seleccionar
 * filtro99 = posicion del arreglo
 * valor99 = valor del arreglo a filtrar
 */
function llenarComboFiltrado(lista, idCombo, primerItem, selecID, selecValor, filtro01, valor01, filtro02, valor02, filtro03, valor03, filtro04, valor04) {
    var contenido = "";
    var nRegistros = lista.length;
    //solo se mostrara si hay mas de un registro
    if (nRegistros > 1) {
        if (primerItem !== undefined && primerItem !== null) contenido = "<option value=''>" + primerItem + "</option>";
    }
    var seleccion = "";
    var campos;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("▲");
        if (campos[selecID] === selecValor) { seleccion = " SELECTED "; } else { seleccion = ""; }
        if (filtro01 !== undefined && filtro02 !== undefined && filtro03 !== undefined && filtro04 !== undefined) {
            if (campos[filtro01] === valor01 && campos[filtro02] === valor02 && campos[filtro03] === valor03 && campos[filtro04] === valor04) {
                contenido += "<option value='" + campos[0] + "'" + seleccion + ">" + campos[1] + "</option>";
            }
        }
        else if (filtro01 !== undefined && filtro02 !== undefined && filtro03 !== undefined && filtro04 === undefined) {
            if (campos[filtro01] === valor01 && campos[filtro02] === valor02 && campos[filtro03] === valor03) {
                contenido += "<option value='" + campos[0] + "'" + seleccion + ">" + campos[1] + "</option>";
            }
        }
        else if (filtro01 !== undefined && filtro02 !== undefined && filtro03 === undefined && filtro04 === undefined) {
            if (campos[filtro01] === valor01 && campos[filtro02] === valor02) {
                contenido += "<option value='" + campos[0] + "'" + seleccion + ">" + campos[1] + "</option>";
            }
        }
        else if (filtro01 !== undefined && filtro02 === undefined && filtro03 === undefined && filtro04 === undefined) {
            if (campos[filtro01] === valor01) {
                contenido += "<option value='" + campos[0] + "'" + seleccion + ">" + campos[1] + "</option>";
            }
        }
        else {
            contenido += "<option value='" + campos[0] + "'" + seleccion + ">" + campos[1] + "</option>";
        }
    }
    var cbo = document.getElementById(idCombo);
    if (contenido === "") { contenido = "<option value=''>NO REGISTRA</option>"; }
    if (cbo !== null) cbo.innerHTML = contenido;

}
/* llenar combo jerarquico */
function llenarComboJerarquico(lista, idCombo, primerItem, posicionKey, valorKey, posCodigo, posDescripcion) {
    var contenido = "";
    var nRegistros = lista.length;
    //solo se mostrara si hay mas de un registro
    if (nRegistros > 1) {
        if (primerItem !== null) contenido = "<option value=''>" + primerItem.toUpperCase() + "</option>";
    }

    //var nCampos;
    var campos;
    var mseparacion;
    var seleccion = "";
    //var listaFiltro = [];
    if (nRegistros === 1) { seleccion = " SELECTED "; }
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("▲");
        mseparacion = "";

        if (campos[posicionKey] === valorKey) {
            contenido += "<option value='" + campos[posCodigo].toUpperCase() + "'" + seleccion + ">" + '» ' + campos[posDescripcion].toString() + "</option>";
            contenido += filtrarListaJerarquico(lista, posicionKey, campos[posCodigo].toString(), mseparacion, posCodigo, posDescripcion);
        }
    }
    var cbo = document.getElementById(idCombo);
    if (cbo !== null) {
        cbo.setAttribute('style', 'font-family:Consolas;');
        cbo.innerHTML = contenido;
    }
}

function filtrarListaJerarquico(listaOrigen, posicionKey, valorKey, mseparacion, posCodigo, posDescripcion) {
    var nroReg = listaOrigen.length;
    var separacionDefault = '&nbsp&nbsp';
    var campos; mseparacion = mseparacion + separacionDefault; // '─';
    var contenidoAdd = ""; var nroItems = 0; var itemAdd = 0;

    //cargamos la cantidad de registros para las imagenes
    for (var icont = 0; icont < listaOrigen.length; icont++) {
        campos = listaOrigen[icont].split('▲');
        if (campos[posCodigo].toString() !== valorKey) {
            if (campos[posicionKey] === valorKey) {
                nroItems++;
            }
        }
    }

    //cargamos el contenido
    for (var iReg = 0; iReg < nroReg; iReg++) {
        campos = listaOrigen[iReg].split('▲');

        if (campos[posCodigo].toString() !== valorKey) {
            if (campos[posicionKey] === valorKey) {
                itemAdd++;
                if (itemAdd === nroItems) {
                    contenidoAdd += "<option value='" + campos[posCodigo].toUpperCase() + "'>" + mseparacion + '└── ' + campos[posDescripcion].toString() + "</option>";
                    contenidoAdd += filtrarListaJerarquico(listaOrigen, posicionKey, campos[posCodigo].toString(), mseparacion + separacionDefault, posCodigo, posDescripcion);
                }
                else {
                    contenidoAdd += "<option value='" + campos[posCodigo].toUpperCase() + "'>" + mseparacion + '├── ' + campos[posDescripcion].toString() + "</option>";
                    contenidoAdd += filtrarListaJerarquico(listaOrigen, posicionKey, campos[posCodigo].toString(), mseparacion + '│' + '&nbsp', posCodigo, posDescripcion);
                }
            }
        }

    }
    return contenidoAdd;
}

function obtenerTextoCombo(combo) {
    var m_combo = document.getElementById(combo);
    var selected = m_combo.options[m_combo.selectedIndex].text;
    return selected;
}
/* llenar combos con json */
function llenarComboJson(listaJson, idCombo, primerItem, selecID, SelecValor, verCodigo) {
    try {
        var $select = $('#' + idCombo);
        if (primerItem != '' && primerItem != null && primerItem != undefined && primerItem != 'none') {
            $select.append('<option value="">' + primerItem + '</option>');
        }

        $.each(listaJson, function (key, data) {
            if (verCodigo == true) {
                $select.append('<option value=' + data[selecID] + '>' + data[selecID] + ' - ' + data[SelecValor] + '</option>');
            } else {
                $select.append('<option value=' + data[selecID] + '>' + data[SelecValor] + '</option>');
            }
        });
    } catch (e) {
        errorCliente(e);
    }
}
/* funciones para ordenar las tablas*/
//function ascendente(a, b) {
//    x = a[orden];
//    y = b[orden];
//    return x === y ? 0 : parseInt(x > y ? 1 : -1);
//}
//function descendente(a, b) {
//    var x = a[orden];
//    var y = b[orden];
//    return x === y ? 0 : parseInt(x < y ? 1 : -1);
//}
/* funcion para limpiar los links de ordenamiento */
function limpiarSpans() {
    var spans = document.getElementsByClassName("span");
    //var spans = document.getElementsByName("spn");
    if (spans !== null && spans.length > 0) {
        var nSpans = spans.length;
        var span;
        for (var i = 0; i < nSpans; i++) {
            span = spans[i];
            span.textContent = "";
        }
    }
}

function fieldNumber(objeto) {
    var valorCampo;
    var evento_key = window.event.keyCode;
    var numPosPunto = 0;
    var strParteEntera = "";
    var strParteDecimal = "";
    var NUM_DECIMALES = 2;
    switch (evento_key) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 46:
            break;
        default:
            //objeto.keyUp = 0;
            window.event.keyCode = 0;
            //this.event.keyCode = 0;
            return false;
    }
    valorCampo = objeto.value;
    if (evento_key === 46)
        if (valorCampo.indexOf(".") !== -1) {
            window.event.keyCode = 0;
            return false;
        }
    /* Sólo puede teclear el número de decimales indicado en NUM_DECIMALES */
    if ((numPosPunto = valorCampo.indexOf(".")) !== -1) {
        strParteEntera = valorCampo.substr(0, parseInt(numPosPunto - 1));
        strParteDecimal = valorCampo.substr(parseInt(numPosPunto + 1), valorCampo.length);
        if (strParteDecimal.length > parseInt(NUM_DECIMALES - 1)) {
            window.event.keyCode = 0;
            return false;
        }
    }
    return true;
}

function validaNum(n, mini, maxi, objvar) {
    n = parseInt(n);
    if (n < mini || n > maxi) {
        //objvar.focus();
        alert("El valor debe ser entre " + mini + " - " + maxi);
    }
}

function limpiarInputInDiv(divName) {
    try {
        for (var i = 0; i < divName.children.length; i++) {
            if (divName.children[i].tagName === "INPUT" ||
                divName.children[i].tagName === "TEXTAREA" ||
                divName.children[i].tagName === "SELECT") {
                divName.children[i].value = ''
            } else {
                limpiarInputInDiv(divName.children[i]);
            }
            //divName.children[i].tagName === "INPUT" ? divName.children[i].value = '' : limpiarInputInDiv(divName.children[i]);
        }
    } catch (e) {
        errorCliente(e);
    }
}

/* funcion limpia validaciones */
function limpiaValidarTexto(id) {
    var textbox = document.getElementById(id); var miClase = "";
    miClase = textbox.parentNode.parentNode.getAttribute("class");
    miClase = miClase.replace("has-error", "");
    textbox.parentNode.parentNode.setAttribute("class", miClase);
    textbox.title = "";
}
function limpiaValidarCombo(id) {
    var combo = document.getElementById(id); var miClase = "";
    miClase = combo.parentNode.parentNode.getAttribute("class");
    miClase = miClase.replace("has-error", "");
    combo.parentNode.parentNode.setAttribute("class", miClase);
    combo.title = "";
}
function limpiaValidarTextoAutocompletar(id) {
    var textbox = document.getElementById(id); var miClase = "";
    miClase = textbox.parentNode.parentNode.parentNode.getAttribute("class");
    miClase = miClase.replace("has-error", "");
    textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase);
    textbox.title = "";
}
function validarControl(id) {
    var textbox = document.getElementById(id);
    let labels;
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        textbox.style.border = "1px solid red";
        labels = document.getElementsByTagName("LABEL");
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor === id) {
                labels[i].style.color = "red";
                break;
            }
        }
        //textbox.labels[0].style.color = "red";
        textbox.focus();
        return true;
    } else {
        textbox.style.border = "";
        labels = document.getElementsByTagName("LABEL");
        for (var j = 0; j < labels.length; j++) {
            if (labels[j].htmlFor === id) {
                labels[j].style.color = "";
                break;
            }
        }
        //textbox.labels[0].style.color = "";
        return false;
    }
}
/* funcion para validar textbox*/
function validarTexto(id, mensaje) {
    let textbox = document.getElementById(id);

    let miClase = "";
    if (textbox.parentNode.classList.contains("input-group")) {
        miClase = textbox.parentNode.parentNode.parentNode.getAttribute("class");
    } else {
        miClase = textbox.parentNode.parentNode.getAttribute("class");
    }
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase.trim() + " has-error"; }
        if (textbox.parentNode.classList.contains("input-group")) {
            textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase);
        } else {
            textbox.parentNode.parentNode.setAttribute("class", miClase);
        }

        //textbox.title = motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'bottom');
        //textbox.setAttribute('title', 'Ayuda');
        textbox.setAttribute('data-title', 'Obligatorio');
        textbox.setAttribute('data-content', mensaje === undefined ? "Ingrese Dato." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        //textbox.focus();
        //textbox.select();
        //textbox.click();
        return true;
    } else {
        $('#' + id).popover('dispose');
        miClase = miClase.replace("has-error", "");
        if (textbox.parentNode.classList.contains("input-group")) {
            textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase.trim());
        } else {
            textbox.parentNode.parentNode.setAttribute("class", miClase.trim());
        }
        //textbox.title = "";
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('title');
        //textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        return false;
    }
}
function validarTextoMonto(id, mensaje) {
    let textbox = document.getElementById(id);
    let miClase = textbox.parentNode.parentNode.getAttribute("class");
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = motivo === undefined ? "Ingrese Monto." : motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'auto bottom');
        textbox.setAttribute('data-title', 'Ayuda');
        textbox.setAttribute('data-content', mensaje === undefined ? "Ingrese Monto." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        textbox.focus();
        textbox.select();
        return true;
    } else if (isNaN(textbox.value) || parseFloat(textbox.value) <= 0) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'auto bottom');
        textbox.setAttribute('data-title', 'Ayuda');
        textbox.setAttribute('data-content', mensaje === undefined ? "Monto Incorrecto." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        textbox.focus();
        textbox.select();
        return true;
    } else {
        $('#' + id).popover('dispose');
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.parentNode.setAttribute("class", miClase.trim());
        //textbox.title = "";
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        return false;
    }
}
function validarTextoAutocompletar(id, mensaje) {
    let textbox = document.getElementById(id);
    let miClase = textbox.parentNode.parentNode.parentNode.getAttribute("class");
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'auto bottom');
        textbox.setAttribute('data-title', 'Ayuda');
        textbox.setAttribute('data-content', mensaje === undefined ? "Ingrese Dato." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        textbox.focus();
        textbox.select();
        return true;
    } else {
        $('#' + id).popover('destroy');
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase.trim());
        //textbox.title = "";
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        return false;
    }
}
function validarTextoEnLista(id, mensaje, listaBusqueda, separador, posicion) {
    let textbox = document.getElementById(id);
    let miClase = textbox.parentNode.parentNode.getAttribute("class");
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'auto bottom');
        textbox.setAttribute('data-title', 'Ayuda');
        textbox.setAttribute('data-content', mensaje === undefined ? "Ingrese Dato." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        textbox.focus();
        textbox.select();
        return true;
    } else {//cuando ya existe el dato ingresado
        if (listaBusqueda !== "") {
            for (var item = 0; item < listaBusqueda.length; item++) {
                var itemReg = listaBusqueda[item].split(separador);
                if (itemReg[posicion] === textbox.value) {
                    if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
                    textbox.parentNode.parentNode.setAttribute("class", miClase);
                    //textbox.title = motivo;
                    textbox.setAttribute('data-toggle', 'popover');
                    textbox.setAttribute('data-placement', 'auto bottom');
                    textbox.setAttribute('data-title', 'Ayuda');
                    textbox.setAttribute('data-content', mensaje === undefined ? "Dato ya Existe." : mensaje);
                    textbox.setAttribute('data-trigger', 'hover');
                    $('#' + id).popover();
                    textbox.focus();
                    textbox.select();
                    return true;
                }
            }
        }

        $('#' + id).popover('destroy');
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = "";
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        return false;
    }
}
function ValidarEmail(valor) {
    let response = false;
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
        response = false;
    } else {
        response = true;
    }
    return response;
}

function validarTextoLongitud(id, mensaje, lng) {
    let textbox = document.getElementById(id);
    let miClase = textbox.parentNode.parentNode.getAttribute("class");
    if (textbox.value === null || textbox.value.length < lng || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = motivo;
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'auto bottom');
        textbox.setAttribute('data-title', 'Obligatorio');
        textbox.setAttribute('data-content', mensaje === undefined ? "Dato no cumple con la longitud." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        textbox.focus();
        textbox.select();
        return true;
    } else {
        $('#' + id).popover('dispose');
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        //textbox.title = "";
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        return false;
    }
}

/* funcion para validar combobox*/
function validarCombo(id, mensaje) {
    let combo = document.getElementById(id);
    let miClase = combo.parentNode.parentNode.getAttribute("class").trim();
    if (combo.value === null || combo.value === 0 || combo.value === "") {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        combo.parentNode.parentNode.setAttribute("class", miClase);
        combo.setAttribute('data-toggle', 'popover');
        combo.setAttribute('data-placement', 'bottom');
        combo.setAttribute('data-title', 'Obligatorio');
        combo.setAttribute('data-content', mensaje === undefined ? "Seleccione Opción." : mensaje);
        combo.setAttribute('data-trigger', 'hover');
        $('#' + id).popover("enable");//crea el pop
        combo.focus();
        combo.click();
        return true;
    } else {
        $('#' + id).popover('dispose');//destruye el pop
        miClase = miClase.replace("has-error", "").trim();
        combo.parentNode.parentNode.setAttribute("class", miClase);
        combo.removeAttribute('data-toggle');
        combo.removeAttribute('data-placement');
        combo.removeAttribute('data-title');
        combo.removeAttribute('data-content');
        combo.removeAttribute('data-trigger');
        return false;
    }
}
/* funcion para validar combobox select2*/
function validarComboBuscador(id, mensaje) {
    let combo = document.getElementById(id);
    let miClase = combo.parentNode.parentNode.getAttribute("class");
    let spanHijo = document.getElementById("select2-" + id + "-container");
    if (combo.value === null || combo.value === 0 || combo.value === "") {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        combo.parentNode.parentNode.setAttribute("class", miClase);
        spanHijo.parentNode.style.borderColor = "#a94442";
        return true;
    } else {
        miClase = miClase.replace("has-error", "");
        combo.parentNode.parentNode.setAttribute("class", miClase);
        spanHijo.parentNode.style.borderColor = "#aaaaaa";
        return false;
    }
}
function MarcadorErrorInput(id, indicador, mensaje) {
    var textbox = document.getElementById(id);
    var miClase = "";

    if (textbox.parentNode.classList.contains("input-group")) {
        miClase = textbox.parentNode.parentNode.parentNode.getAttribute("class");
    } else {
        miClase = textbox.parentNode.parentNode.getAttribute("class");
    }

    if (indicador) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }

        if (textbox.parentNode.classList.contains("input-group")) {
            textbox.parentNode.parentNode.parentNode.parentNode.setAttribute("class", miClase);
        } else {
            textbox.parentNode.parentNode.setAttribute("class", miClase);
        }

        textbox.parentNode.parentNode.setAttribute("class", miClase);
        textbox.setAttribute('data-toggle', 'popover');
        textbox.setAttribute('data-placement', 'bottom');
        //textbox.setAttribute('data-title', 'Ayuda');
        textbox.setAttribute('data-title', 'Obligatorio');
        textbox.setAttribute('data-content', mensaje === undefined ? "Ingrese Dato." : mensaje);
        textbox.setAttribute('data-trigger', 'hover');
        $('#' + id).popover();
        //$('#' + id).popover("enable");
        //textbox.focus();
        return true;
    } else {
        miClase = miClase.replace("has-error", "");
        if (textbox.parentNode.classList.contains("input-group")) {
            textbox.parentNode.parentNode.parentNode.setAttribute("class", miClase);
        } else {
            textbox.parentNode.parentNode.setAttribute("class", miClase);
        }
        textbox.removeAttribute('data-toggle');
        textbox.removeAttribute('data-placement');
        textbox.removeAttribute('data-title');
        textbox.removeAttribute('data-content');
        textbox.removeAttribute('data-trigger');
        $('#' + id).popover('dispose');
        return false;
    }
}
function MarcadorErrorInputBuscardor(id, indicador) {
    var textbox = document.getElementById(id); var miClase = "";
    miClase = textbox.parentNode.parentNode.getAttribute("class");
    let spanHijo = document.getElementById("select2-" + id + "-container");
    if (indicador) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        spanHijo.parentNode.style.borderColor = "#a94442";
        return true;
    } else {
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.parentNode.setAttribute("class", miClase);
        spanHijo.parentNode.style.borderColor = "#aaaaaa";
        return false;
    }
}
/**
 * Valida el ingreso de un numero entero, si no es asi retorna cero 
 * @param numero
 * @param mini
 * @param maxi
 * @param objvar
 */

/*
* valida que solo se ingresen numeros
*/
//function validarSoloNumeros(evt, objvar) {
//    var theEvent = evt || window.event;
//    var key = theEvent.keyCode || theEvent.which;
//    //Tecla Retroceso para borrar = 8
//    //Tecla Tab para avanzar = 9
//    //Tecla Punto para decimales = 46
//    //if (key === 8 || key === 9 || key === 46) {
//    if (key === 8 || key === 9) { return true; }
//    key = String.fromCharCode(key);
//    var regex = /[0-9]/;
//    if (!regex.test(key)) {
//        theEvent.returnValue = false;
//        if (theEvent.preventDefault) theEvent.preventDefault();
//    }
//}


function validarSoloNumeros(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    //Tecla Retroceso para borrar = 8
    //Tecla Tab para avanzar = 9
    //Tecla Punto para decimales = 46
    //if (key === 8 || key === 9 || key === 46) {
    if (key === 8 || key === 9) { return true; }
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }

}

function validarSoloDecimales(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key === 8 || key === 9) { return true; }
    var regex = /[0-9.]/;
    if (objControl.value.indexOf(".") !== -1) {
        regex = /[0123456789]/;//cambio la expresion regular para que solo ingrese numeros
    }

    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validarSoloLetras(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[A-Za-z\s]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
function validarSoloFechas(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9\/]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validarSoloLetrasNumeros(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[A-Za-z0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
function validarSinCaracteresEspeciales(evt, objControl, mini, maxi, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[A-Za-z0-9._-]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validarAlfaNumericos(evt, objvar) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    //Tecla Retroceso para borrar = 8
    //Tecla Tab para avanzar = 9
    //Tecla Punto para decimales = 46
    if (key === 8 || key === 9) {
        return true;
    }

    key = String.fromCharCode(key);
    var regex = /[A-Za-z0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


function validaEntero(numero, mini, maxi, objvar) {
    numero = parseFloat(numero);
    if (isNaN(numero)) { numero = 0; }//si no es numero lo cambia a cero
    if (numero < mini) {
        numero = Math.abs(numero);//convierte a positivo
    } else if (numero > maxi) {
        numero = Math.abs(maxi);//coloca el numero maximo
    }
    objvar.value = parseInt(numero);
}
///**
// * valida el ingreso de un numero decimal, si no es asi devuelve cero
// * @param numero
// * @param mini
// * @param maxi
// * @param objvar
// */
function validaDecimal(numero, mini, maxi, objvar) {
    numero = parseFloat(numero);
    if (isNaN(numero)) { numero = 0; }//si no es numero lo cambia a cero
    if (numero < mini) {
        numero = Math.abs(numero);//convierte a positivo
    } else if (numero > maxi) {
        numero = Math.abs(maxi);//coloca el numero maximo
    }
    objvar.value = parseFloat(numero).toFixed(2);
}

function validaPeriodo(numero, mini, maxi, objvar) {
    try {
        let vnumero = parseFloat(numero);
        if (isNaN(vnumero)) { numero = ""; }//si no es numero lo cambia a vacio
        if (numero.length !== 6) { numero = ""; } // si no cumple con la cantidad lo vuelve vacio
        else {//var xxx = numero.substr(4, 2);
            //para el año
            var m_dt = new Date(); var m_year = m_dt.getFullYear();
            if (numero.substr(0, 4) > 0) { m_year = numero.substr(0, 4); } //valida el año

            //para el mes
            if (numero.substr(4, 2) < 1) { numero = m_year.toString() + '01'; } //valida el mes
            if (numero.substr(4, 2) > 12) { numero = m_year.toString() + '12'; } //valida el mes
        }
        objvar.value = numero;
    } catch (e) {
        errorCliente(e);
    }
}

/* funcion para cambiar el texto de checkbox de Estado */
function cambiarEstado(thecheckbox, thelabel) {
    try {
        var checkboxvar = document.getElementById(thecheckbox);
        var labelvar = document.getElementById(thelabel);
        if (!checkboxvar.checked) {
            labelvar.className = "form-control text-uppercase";
            if (thelabel.indexOf('Flag') !== -1) { labelvar.value = "NO"; }
            else if (thelabel.indexOf('Default') !== -1) { labelvar.value = "NO"; }
            else if (thelabel.indexOf('Activo') !== -1) { labelvar.value = "INACTIVO"; }
            else { labelvar.value = "INACTIVO"; }
        }
        else {
            labelvar.className = "form-control text-uppercase";
            if (thelabel.indexOf('Flag') !== -1) { labelvar.value = "SI"; }
            else if (thelabel.indexOf('Default') !== -1) { labelvar.value = "SI"; }
            else if (thelabel.indexOf('Activo') !== -1) { labelvar.value = "ACTIVO"; }
            else { labelvar.value = "ACTIVO"; }
        }
    } catch (e) {
        errorCliente(e);
    }
}

/* funcion para visualizar los controles */
function cambiarDisplay(thecheckbox, thecontrol) {
    try {
        var checkboxvar = document.getElementById(thecheckbox);
        var controlvar = document.getElementById(thecontrol);
        if (!checkboxvar.checked) {
            controlvar.style.display = 'none';
        }
        else {
            controlvar.style.display = 'inline';
        }
    } catch (e) {
        errorCliente(e);
    }
}
/* funcion para devolver la variable de session*/
function GetUserName(id) {
    try {
        var respuesta;
        switch (id) {
            case 1: //codigo de usuario
                respuesta = sessionStorage.getItem("UsuarioID");
                break;
            case 2://alias de usuario
                respuesta = sessionStorage.getItem("UsuarioAlias");
                break;
            case 3://codigo de persona
                respuesta = sessionStorage.getItem("Persona_ID");
                break;
            case 4://CorreoElectronico
                respuesta = sessionStorage.getItem("CorreoElectronico");
                break;
        }
        return respuesta;
    } catch (e) {
        errorCliente(e);
    }
}
//function configurarDobleClick() {
//    //quitar
//}
/* funcion para ocultar DIV */
function visibilidadDiv(id, ver) {
    try {
        let div = document.getElementById(id);
        if (ver === false) {
            div.style.display = 'none';
        } else {
            div.style.display = 'block'; //"inline";
        }
    } catch (e) {
        errorCliente(e);
    }
}

function disabledDiv(id, dis) {
    try {
        let div = document.getElementById(id);
        if (dis === false) {
            div.classList.remove("disable-div");
        } else {
            div.classList.add("disable-div");
        }
    } catch (e) {
        errorCliente(e);
    }
}
/* manejo del spiner*/
(function ($) {
    $('.spinner .btn:first-of-type').on('click', function () {
        if ($('.spinner input').val() === "") { $('.spinner input').val(0); }
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });

    $('.spinner .btn:last-of-type').on('click', function () {
        if ($('.spinner input').val() === "") { $('.spinner input').val(0); }
        if ($('.spinner input').val() > 0) {
            $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
        } else {
            $('.spinner input').val(0);
        }
    });
})(jQuery);
/**
 * exporta a pdf desde matriz
 * @param {any} orientation orientacion y tamaño de pagina
 * @param {any} titulo titulo de reporte
 * @param {any} cabeceras cabeceras de columnas
 * @param {any} miMatriz matriz bidimencional
 * @param {any} posiciones array de posiciones que se mostraran, si no se envia, se mostraran todos
 * @param {any} formatos array de formato de columnas, si no se envia todos seran texto
 *                      C = codigo --> texto
 *                      T = texto --> texto
 *                      D = decimal --> numerico decimal
 *                      E = entero --> numerico entero
 *                      F = fecha --> fecha dd/MM/yyyy
 */
function exportarPDF(orientation, titulo, cabeceras, miMatriz, posiciones, formatos, nombreAchivo) {
    try {
        /* valiaciones */
        if (posiciones === undefined || posiciones === null || posiciones === '') {
            posiciones = [];
            for (var ipc = 0; ipc < cabeceras.length; ipc++) { posiciones.push(ipc); }
        }

        if (formatos === undefined || formatos === null || formatos === '') {
            formatos = [];
            for (var ifc = 0; ifc < cabeceras.length; ifc++) { formatos.push(''); }
        } else {
            for (var ifv = formatos.length; ifv < cabeceras.length; ifc++) {
                formatos.push('');
            }
        }

        let page = orientation.split('-');
        let pageOrientacion = page[0];//orientacion de pagina
        let pageSize = page.length > 1 ? page[1] : 'a4'; //tamaño de pagina
        //cabeceras
        var columns = [];
        for (var cb = 0; cb < cabeceras.length; cb++) {
            if (posiciones.indexOf(cb) !== -1) {
                columns.push(cabeceras[cb]);
            }
        }
        //formatos
        //var formats = [];
        //for (var cf = 0; cf < formatos.length; cf++) {
        //    if (posiciones.indexOf(cf) !== -1) {
        //        formats.push(formatos[cf]);
        //    }
        //}
        //datos
        var data = [];
        for (var i = 0; i < miMatriz.length; i++) {
            var colReg = [];
            for (var ic = 0; ic < miMatriz[i].length; ic++) {
                if (posiciones.indexOf(ic) !== -1) {
                    switch (formatos[ic]) {
                        case "C":
                        case "T":
                            colReg.push(miMatriz[i][ic].toString());
                            break;
                        case "F": /* Fecha - los 10 primeros digitos */
                            colReg.push(miMatriz[i][ic].toString().substring(0, 10));
                            break;
                        case "E": /* Enteros - parte entera del numero */
                        case "E-success": /* success */
                        case "E-danger": /* success */
                        case "E-warning": /* success */
                        case "E-info": /* success */
                            colReg.push(parseFloat(miMatriz[i][ic]).toFixed(0));
                            break;
                        case "D":
                        case "DF":
                        case "DF-success": /* success */
                        case "DF-danger": /* danger */
                        case "DF-warning": /* warning */
                        case "DF-info": /* info */
                            colReg.push(parseFloat(miMatriz[i][ic]).toFixed(2));
                            break;
                        default:
                            colReg.push(miMatriz[i][ic].toString());
                            break;
                    }
                }
            }
            data[i] = colReg;
        }
        var doc = new jsPDF(pageOrientacion, 'pt', pageSize);
        doc.text(titulo, 40, 50);
        doc.autoTable(columns, data, {
            startY: 60,
            margin: { horizontal: 7 },
            bodyStyles: { valign: 'top' },
            styles: { fontSize: 8, overflow: 'linebreak', columnWidth: 'wrap' },
            columnStyles: { text: { columnWidth: 'auto' } }
            //bodyStyles: { overflow: 'linebreak', columnWidth: 'nowrap', valign: 'top' }
            //headerStyles: { columnWidth: 'auto', overflow: 'linebreak' },
            //columnStyles: { text: { columnWidth: 'auto', overflow: 'linebreak' } },
            //bodyStyles: { text: { columnWidth: 'nowrap', overflow: 'linebreak' } }
            //bodyStyles: { overflow: 'linebreak', columnWidth: 'nowrap', valign: 'top' }
        });
        if (nombreAchivo == undefined) {
            nombreAchivo = "tabla";
        }

        doc.save(nombreAchivo + ".pdf");
    } catch (e) {
        errorCliente(e);
    }
}

function armarTablaReporte() {
    try {
        var cadena = "";
        cadena += "<table id='tbDatosCompletos'>";
        cadena += "<thead style='width:500px;'>";
        nCampos = cabeceras.length;
        cadena += "<tr style='height:30px;'>";
        for (var ic = 0; ic < nCampos; ic++) {
            cadena += "<th class='center'>";
            cadena += cabeceras[ic];
            cadena += "</th>";
        }
        cadena += "</tr></thead>";
        cadena += "<tbody id='tbTabla'>";
        var nRegistros = matriz.length;
        for (var i = 0; i < nRegistros; i++) {
            if (i < nRegistros) {
                cadena += "<tr class=''>";
                for (var j = 0; j < nCampos; j++) {
                    if (posiciones.indexOf(j) !== -1) {
                        cadena += "<td>";
                        cadena += matriz[i][j];
                        cadena += "</td>";
                    }
                }
                cadena += "</tr>";
            }
            else break;
        }
        cadena += "</tbody></table>";
        return cadena;
    } catch (e) {
        errorCliente(e);
    }
}

/**
 * exporta a excel desde matriz
 * @param {any} cabeceras array de cabeceras
 * @param {any} miMatriz matriz bidimencional
 * @param {any} posiciones array de posiciones que se mostraran, si no se envia, se mostraran todos
 * @param {any} formatos array de formato de columnas, si no se envia todos seran texto
 *                      C = codigo --> texto
 *                      T = texto --> texto
 *                      D = decimal --> numerico decimal
 *                      E = entero --> numerico entero
 *                      F = fecha --> fecha dd/MM/yyyy
 */
function exportarXLS(cabeceras, miMatriz, posiciones, formatos) {
    try {
        /* valiaciones */
        if (posiciones === undefined || posiciones === null || posiciones === '') {
            posiciones = [];
            for (var ipc = 0; ipc < cabeceras.length; ipc++) { posiciones.push(ipc); }
        }

        if (formatos === undefined || formatos === null || formatos === '') {
            formatos = [];
            for (var ifc = 0; ifc < cabeceras.length; ifc++) { formatos.push(''); }
        } else {
            for (var ifv = formatos.length; ifv < cabeceras.length; ifc++) {
                formatos.push('');
            }
        }
        //cabeceras
        var columns = [];
        for (var cb = 0; cb < cabeceras.length; cb++) {
            if (posiciones.indexOf(cb) !== -1) {
                columns.push(cabeceras[cb]);
            }
        }
        //formatos
        var formats = [];
        for (var cf = 0; cf < formatos.length; cf++) {
            if (posiciones.indexOf(cf) !== -1) {
                formats.push(formatos[cf]);
            }
        }
        //datos
        var data = [];
        for (var i = 0; i < miMatriz.length; i++) {
            var colReg = [];
            for (var ic = 0; ic < miMatriz[i].length; ic++) {
                if (posiciones.indexOf(ic) !== -1) {
                    colReg.push(miMatriz[i][ic]);
                }
            }
            data[i] = colReg;
        }

        var tab_text = "<table cellspacing='0' style='font-size:11pt;font-family: Calibri;border:1px solid #ddd;' x:str>";
        var nCampos = columns.length;
        tab_text += "<tr>";
        for (var ic = 0; ic < nCampos; ic++) {
            tab_text += "<td style='padding: 2px 5px 2px 5px;text-align:center;border-left:1px solid #ddd;color:#fff;background-color:#00796B;'>";
            tab_text += columns[ic];
            tab_text += "</td>";
        }
        tab_text += "</tr>";
        //var nRegistros = data.length;
        nCampos = data[0].length;
        for (var i = 0; i < data.length; i++) {
            tab_text += "<tr>";
            for (var j = 0; j < data[i].length; j++) {
                tab_text += '<td style="padding: 2px 5px 2px 5px;border:1px solid #ddd;';
                switch (formats[j]) {
                    case "T":
                    case "C":
                        tab_text += 'mso-number-format:\'\@\'">';
                        break;
                    case "D":
                    case "DF":
                    case "DF-success":
                    case "DF-danger":
                    case "DF-warning":
                    case "DF-info":
                        tab_text += 'mso-number-format:\'0\.00\'">';
                        break;
                    case "E":
                    case "E-success":
                    case "E-warning":
                    case "E-danger":
                    case "E-info":
                        tab_text += 'mso-number-format:\'0\'">';
                        break;
                    case "F":
                        tab_text += 'mso-number-format:\'dd\/MM\/yyyy\'">';
                        break;
                    case "":
                        //sin formato y es decimal
                        if (data[i][j].indexOf(".") !== -1 && !isNaN(parseFloat(data[i][j]))) {
                            tab_text += 'mso-number-format:\'0\.0000\'">';
                        } else {
                            tab_text += 'mso-number-format:\'\@\'">';
                        }
                        break;
                    default:
                        tab_text += 'mso-number-format:\'\@\'">';
                        break;
                }

                tab_text += data[i][j];
                tab_text += "</td>";
            }
            tab_text += "</tr>";
        }

        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // removes input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");


        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            var txtArea1 = window.open("txt/html");// se puede mejorar
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            var sa = txtArea1.document.execCommand("SaveAs", true, "Download-file.xls");
        }
        else {             //other browser not tested on IE 11
            //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
            var sa = window.open('data:application/vnd.ms-excel;base64,' + $.base64.encode(tab_text));
        }
        return sa;
    } catch (e) {
        errorCliente(e);
    }
}

/* manejo de imagenes */
/* verifica si existe una url */
function existeUrl(url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status !== 404;
    } catch (e) {
        errorCliente(e);
    }
}

function ImageExist(url) {
    try {
        var img = new Image();
        img.src = url;
        return img.height !== 0;
    } catch (e) {
        errorCliente(e);
    }
}

function imprimir(contenido) {
    try {
        var iframe = document.createElement('iframe');
        iframe.onload = function () {
            var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
            doc.getElementsByTagName('body')[0].innerHTML = contenido;

            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
        document.getElementsByTagName('body')[0].appendChild(iframe);
        iframe.style.display = "none";

    } catch (e) {
        errorCliente(e);
    }
}
///**
// * /retorna el valor seleccionado en el combo
// * @param combo = objeto select del cual quieres el valor selected
// */
function getSelected(combo) {
    try {
        var _comboOption = String.format("#{0} option", combo);
        var _itemSelected = "";
        var options = $(_comboOption);
        for (var opt = 0; opt < options.length; opt++) {
            if (options[opt].selected === true) {
                _itemSelected = options[opt].value;
            }
        }
        return _itemSelected;
    } catch (e) {
        errorCliente(e);
    }
}

function getDefault(combo) {
    try {
        var _comboOption = String.format("#{0} option", combo);
        var _obj = document.getElementById(combo);
        var _itemDefault = _obj.getAttribute('default');
        var options = $(_comboOption);
        for (var opt = 0; opt < options.length; opt++) {
            if (options[opt].value === _itemDefault) {
                return options[opt].value;
            }
        }
        return _itemDefault;
    } catch (e) {
        errorCliente(e);
    }
}

///**
// * /funcion configura autocompletar en controles
// * @param textDato = textbox donde el usuario escribe lo que busca
// * @param textCodigo = textbox donde se visualizara el codigo del texto seleccionado
// * @param listaDatos = lista de datos que se mostrara en la lista
// *                     los datos de ingreso debera ser: codigo, descripcion
// *                     el caracter separador de columna debera ser: '▲'
// *        ejemplo = "[001▲luz][002▲agua][003▲telefono][004▲cable]"
// * @version 1.0  
// * @author miguel angel ramón arrieta
// */
function configurarAutocompletar(textDato, textCodigo, listaDatos, ocultarCodigo) {
    try {
        /* FORMATO DESTINO*/
        /* { title: descripcion, value: descripcion, id: codigo } */
        var arrayDatos = [];
        for (var i = 0; i < listaDatos.length; i++) {
            if (listaDatos[i] !== "") {
                arrayDatos[i] = { title: listaDatos[i].split('▲')[1].toString(), value: listaDatos[i].split('▲')[1].toString(), id: listaDatos[i].split('▲')[0].toString() };
            }
        }
        /* CONFIGURACION Y ASIGNACION */
        if (ocultarCodigo === true) { document.getElementById(textCodigo).setAttribute('class', 'hidden'); }
        document.getElementById(textCodigo).setAttribute('readonly', 'true');
        document.getElementById(textDato).removeAttribute('readonly');
        textDato = String.format("{0}{1}", '#', textDato);
        textCodigo = String.format("{0}{1}", '#', textCodigo);
        $(textDato).autocomplete({
            source: [{
                data: arrayDatos
            }],
            visibleLimit: 10
        }).on('selected.xdsoft', function (e, datum) {
            $(textCodigo).val(datum.id);
        }).on('change.xdsoft', function (e) {
            $(textCodigo).val("");
            for (var r2 = 0; r2 < arrayDatos.length; r2++) {
                if (arrayDatos[r2].title.toLowerCase() === $(textDato).val().toLowerCase()) {
                    $(textCodigo).val(arrayDatos[r2].id);
                }
            }
        });
    } catch (e) {
        errorCliente(e);
    }
}

///**
// * actualiza los link con valores de direcionamiento utilizado para los reportes 
// * @param objLink = nombre del objeto link que recibira el valor de href
// * @param accion = accion en el controlador
// * @param controlador = nombre del controlador
// * @param par01 = nombre del parametro 01
// * @param val01 = valor del parametro 01
// * @param par02 = nombre del paramentro 02
// * @param val02 = valor del parametro 02
// * @param par03
// * @param val03
// * @param par04
// * @param val04
// * @param par05
// * @param val05
// * @param par06
// * @param val06
// */
function updateParametros(objLink, accion, controlador, par01, val01, par02, val02, par03, val03, par04, val04, par05, val05, par06, val06) {
    try {
        var url = String.format("/{0}/{1}", controlador, accion);
        if (par06 !== undefined && par06 !== null) {
            url += String.format("?{0}={1}&{2}={3}&{4}={5}&{6}={7}&{8}={9}&{10}={11}", par01, val01, par02, val02, par03, val03, par04, val04, par05, val05, par06, val06);
        }
        else if (par05 !== undefined && par05 !== null) {
            url += String.format("?{0}={1}&{2}={3}&{4}={5}&{6}={7}&{8}={9}", par01, val01, par02, val02, par03, val03, par04, val04, par05, val05);
        }
        else if (par04 !== undefined && par04 !== null) {
            url += String.format("?{0}={1}&{2}={3}&{4}={5}&{6}={7}", par01, val01, par02, val02, par03, val03, par04, val04);
        }
        else if (par03 !== undefined && par03 !== null) {
            url += String.format("?{0}={1}&{2}={3}&{4}={5}", par01, val01, par02, val02, par03, val03);
        }
        else if (par02 !== undefined && par02 !== null) {
            url += String.format("?{0}={1}&{2}={3}", par01, val01, par02, val02);
        }
        else if (par01 !== undefined && par01 !== null) {
            url += String.format("?{0}={1}", par01, val01);
        }

        var meLink = document.getElementById(objLink);
        meLink.setAttribute('href', url);
    } catch (e) {
        errorCliente(e);
    }
}

// Configuracion de controles fecha
function configuraDateTime(objFecha) {
    try {
        var nombreFecha = '#' + objFecha;
        $(function () {
            $(nombreFecha).datetimepicker({
                format: 'L', locale: 'es-PE',
                keepOpen: false, showTodayButton: true,
                ignoreReadonly: true, tooltips: {
                    today: 'Ir a Fecha Actual',
                    selectMonth: 'Selecione Mes',
                    prevMonth: 'Mes Anterior',
                    nextMonth: 'Mes Siguiente'
                }
            });
        });
    } catch (e) {
        errorCliente(e);
    }
}

function configurarFechaFinInicio(objFecha1, objFecha2) {
    try {
        $(function () {
            $("#" + objFecha1).datepicker({ dateFormat: 'dd-mm-yy' });
            $("#" + objFecha2).datepicker({ dateFormat: 'dd-mm-yy' });
            var date = new Date();
            document.getElementById(objFecha2).value = date.ddmmyyyy().replace(/\//gi, '-');
            document.getElementById(objFecha1).value = "01" + date.ddmmyyyy().replace(/\//gi, '-').substring(2, 10);
        });
    } catch (e) {
        errorCliente(e);
    }
}

function configuraDateTimeRango(objFecha1, objFecha2) {
    try {
        var nombreFecha1 = '#' + objFecha1;
        var nombreFecha2 = '#' + objFecha2;
        $(function () {
            $(nombreFecha1).datetimepicker({
                format: 'L', locale: 'es-PE',
                keepOpen: false, showTodayButton: true,
                ignoreReadonly: true, tooltips: {
                    today: 'Ir a Fecha Actual',
                    selectMonth: 'Selecione Mes',
                    prevMonth: 'Mes Anterior',
                    nextMonth: 'Mes Siguiente'
                }
            });

            $(nombreFecha2).datetimepicker({
                format: 'L', locale: 'es-PE',
                keepOpen: false, showTodayButton: true,
                ignoreReadonly: true, tooltips: {
                    today: 'Ir a Fecha Actual',
                    selectMonth: 'Selecione Mes',
                    prevMonth: 'Mes Anterior',
                    nextMonth: 'Mes Siguiente'
                }
            });

            $(nombreFecha1).on("dp.change", function (e) {
                $(nombreFecha2).data("DateTimePicker").minDate(e.date);
            });

            $(nombreFecha2).on("dp.change", function (e) {
                $(nombreFecha1).data("DateTimePicker").maxDate(e.date);
            });

        });
    } catch (e) {
        errorCliente(e);
    }
}

/**
 * envia peticion al servidor por get, recibe los parametros como argumentos
 * @param {any} url url del servidor
 * @param {any} metodo metodo o funcion que obtendra la respuesta del servidor
 */
function enviarServidorGetGeneral(url, metodo) {
    try {
        esperaInicio();//se adiciono para bloquear cuando se realiza una llamada al servidor
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("get", url);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                metodo(xhr.responseText);
            }
            else if (xhr.status === 404) {
                mostrarRespuesta('Error', "Página no encontrada", 'error');
                esperaTermino();
            }
            else if (xhr.status === 500) {
                mostrarRespuesta('Error', "Error interno del servidor", 'error');
                esperaTermino();
            }
        };
        xhr.send();
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * Envia petición al servidor por Get, recibe los parámetros como argumentos
 * @param {any} url Url del servidor
 */
function enviarServidorGetGeneralV2(url) {
    try {
        return new Promise((resolve, reject) => {
            //esperaInicio();//se adiciono para bloquear cuando se realiza una llamada al servidor
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.open("get", url);
            xhr.onreadystatechange = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    resolve(xhr.responseText);
                }
                else if (xhr.status === 404 && xhr.readyState === 4) {
                    reject(new Error("Página no encontrada"));
                    //esperaTermino();
                }
                else if (xhr.status === 500 && xhr.readyState === 4) {
                    reject(new Error("Error interno del servidor"));
                    //esperaTermino();
                }
            };
            xhr.send();

        });
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * envia peticion al servidor por post, recibe los parametros como argumentos
 * @param {any} url url del servidor
 * @param {any} metodo metodo o funcion que obtendra la respuesta del servidor
 * @param {any} tipoContenido tipo de contenido de los parametros 'json' or '', default ''
 */
function enviarServidorPostGeneral(url, metodo, tipoContenido) {
    try {
        //esperaInicio();//se adiciono para bloquear cuando se realiza una llamada al servidor
        if (tipoContenido === undefined || tipoContenido === null) { tipoContenido = ''; }
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("post", url);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                metodo(xhr.responseText);
            }
            else if (xhr.status === 404) {
                mostrarRespuesta('Error', "Página " + url + ", no encontrada", 'error');
            }
            else if (xhr.status === 500) {
                mostrarRespuesta('Error', "Error interno del servidor", 'error');
            }
        };
        var frm;
        // compatible con todos los exploradores
        var args = Array.prototype.slice.call(arguments);
        if (tipoContenido === "json") {
            frm = JSON.stringify(args[3][1]);
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        else {
            frm = new FormData(); //Html5   
            if (args.length > 0) {
                args.forEach(function (element, index) {
                    if (index > 2) {
                        if (element !== undefined) {
                            frm.append(element[0], element[1]);
                        }
                    }
                });
            }
        }
        xhr.send(frm);
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * Envia petición al servidor por Post con promesas, recibe los parámetros como argumentos
 * @param {any} area area del servidor
 * @param {any} controlador controlador del servidor
 * @param {any} accion accion del servidor
 * @param {any} tipoContenido Tipo de contenido de los parámetros 'json' or '', default ''
 */
function enviarServidorPostGeneralV2(area, controlador, accion, tipoContenido) {
    try {
        return new Promise((resolve, reject) => {
            if (tipoContenido === undefined || tipoContenido === null) { tipoContenido = ''; }
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
                //xhr.responseType = "text";
            }
            else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var ruta;
            if (!area) {
                ruta = "/" + controlador + "/" + accion
            } else {
                ruta = "/" + area + "/" + controlador + "/" + accion
            }
            xhr.open("post", ruta);
            xhr.onreadystatechange = function () { // Carga por estado
                if (xhr.status === 200 && xhr.readyState === 4) {
                    //if (xhr.responseText.indexOf("X-UA-Compatible") != -1) {
                    //    document.getElementById("btnCerrarSesion").click();
                    //} else {
                    //    resolve(xhr.responseText);
                    //}
                    resolve(xhr.responseText);
                }
                else if (xhr.status === 404 && xhr.readyState === 4) {
                    reject(new Error("Página no encontrada"));
                }
                else if (xhr.status === 500 && xhr.readyState === 4) {
                    reject(new Error("Error interno del servidor"));
                }
            };
            var frm;
            // compatible con todos los exploradores
            var args = Array.prototype.slice.call(arguments);
            if (tipoContenido === "json") {
                frm = JSON.stringify(args[4][1]);
                xhr.setRequestHeader("Content-Type", "application/json");
            }
            else {
                frm = new FormData(); //Html5   
                if (args.length > 0) {
                    args.forEach(function (element, index) {
                        if (index > 3) {
                            if (element !== undefined) {
                                frm.append(element[0], element[1]);
                            }
                        }
                    });
                }
            }
            xhr.send(frm);
        })
    } catch (e) {
        errorCliente(e);
    }
}
function enviarServidorPostFileV2(area, controlador, accion, tipoContenido) {

    return new Promise((resolve, reject) => {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var ruta;
        if (!area) {
            ruta = "/" + controlador + "/" + accion
        } else {
            ruta = "/" + area + "/" + controlador + "/" + accion
        }
        xhr.open("post", ruta);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            if (this.status === 200) {
                //let blob = new Blob([this.response], { type: 'application/pdf' });
                let blob = new Blob([this.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
                resolve(blob);
            }
            else if (xhr.status === 404) {
                reject(new Error("Página no encontrada"));
            }
            else if (xhr.status === 500) {
                reject(new Error("Error interno del servidor"));
            }
        };
        var frm;
        var args = Array.prototype.slice.call(arguments);
        if (tipoContenido === "json") {
            frm = JSON.stringify(args[4][1]);
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        else {
            frm = new FormData(); //Html5   
            if (args.length > 0) {
                args.forEach(function (element, index) {
                    if (index > 3) {
                        frm.append(element[0], element[1]);
                    }
                });
            }
        }
        xhr.send(frm);
    })

}

/**
 * Envia petición al servidor por Post con promesas, recibe los parámetros como argumentos
 * @param {any} area area del servidor
 * @param {any} controlador controlador del servidor
 * @param {any} accion accion del servidor
 * @param {any} tipoContenido Tipo de contenido de los parámetros 'json' or '', default ''
 */
function RequestWS(type, url, data, token) {
    try {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ JsonArgumento: JSON.stringify(data) })
            })
                .then(response => {
                    if (!response.ok) {
                        reject("Error en la llamada a la API");
                    }
                    return response.json();
                })
                .then(responseData => {
                    resolve(responseData);
                })
                .catch(error => {
                    reject(error);
                });
        })
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * Envia petición al servidor por Get y Post
 * @param {url} url Url del servidor
 * @param {tipoPeticion} tipoPeticion Tipo de petición get o post
 * @param {tipoRespuesta} tipoRespuesta Tipo de respuesta text o json, por defecto es json
 * @param {data} data parametros, por defecto vacio
 */
function FetchGeneral(url, tipoPeticion, tipoRespuesta = "json", data = "", porParams = false) {
    try {
        return new Promise((resolve, reject) => {
            if (tipoPeticion.toLowerCase() == "get") {
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            reject("Error en la solicitud");
                        }
                        if (tipoRespuesta == "text")
                            return response.text()
                        if (tipoRespuesta == "json")
                            return response.json()

                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
            if (tipoPeticion.toLowerCase() == "post" && porParams == false) {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            reject("Error en la solicitud");
                        }
                        if (tipoRespuesta == "text")
                            return response.text()
                        if (tipoRespuesta == "json")
                            return response.json()
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
            if (tipoPeticion.toLowerCase() == "post" && porParams == true) {
                fetch(url, {
                    method: 'POST',
                    body: data
                })
                    .then(response => {
                        if (!response.ok) {
                            reject("Error en la solicitud");
                        }
                        if (tipoRespuesta == "text")
                            return response.text()
                        if (tipoRespuesta == "json")
                            return response.json()
                    })
                    .then(responseData => {
                        resolve(responseData);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        });
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * Envia petición al servidor por Get y Post
 * @param {lista} lista Lista Json
 * @param {idCombo} idCombo Id del combo donde se renderizará el HTML
 * @param {posicionCod} posicionCod Posición del código del dato JSON
 * @param {posicionDes} posicionDes Posición de la descripción del dato JSON
 * @param {primerItem} primerItem Valor o texto del primer item seleccionado
 * @param {verCodigo} verCodigo Ver el código
 * @param {incluyeBuscador} incluyeBuscador Incluye buscador
 */
function LlenarComboGeneral(lista, idCombo, paramCod = "", paramDes = "", primerItem = null, verCodigo = null, incluyeBuscador = false) {
    try {
        if (incluyeBuscador !== undefined) {
            if (incluyeBuscador == true) {
                $("#" + idCombo).select2({ theme: "classic" });
            }
        }

        if (primerItem === null || primerItem === undefined) { primerItem = "SELECCIONE"; }
        if (verCodigo === null || verCodigo === undefined) { verCodigo = false; }

        var contenido = "";
        var nRegistros = lista.length;

        if (primerItem !== "" && primerItem.toLowerCase() !== "none") contenido = "<option value=''>" + primerItem.toUpperCase() + "</option>";
        var vDefault = "";
        let cboCod = "";
        let cboDescripcion = "";
        if (lista.length > 0) {
            for (var i = 0; i < nRegistros; i++) {

                cboCod = lista[i][paramCod];
                cboDescripcion = lista[i][paramDes];

                contenido += "<option value='" + cboCod.toString().toUpperCase() + "'";
                if (verCodigo === false) { contenido += ">" + cboDescripcion + "</option>"; }
                if (verCodigo === true) { contenido += ">" + String.format("{0} - {1}", cboCod.toString(), cboDescripcion) + "</option>"; }

            }
        }
        var cbo = document.getElementById(idCombo);
        cbo.setAttribute('default', vDefault);
        if (cbo !== null) cbo.innerHTML = contenido;
    } catch (e) {
        errorCliente(e);
    }
}
/**
 * Envia petición al servidor por Get y Post
 * @param {idForm} lista Id del formulario a validar
 * @param {parametros} parametros Paramentros de los elementos del formulario
 */
function ValidarFormularioGeneral(idForm, parametros) {
    try {
        return new Promise((resolve, reject) => {
            var elem = idForm;

            $("div .invalid-feedback").remove();
            $("div .error").remove();

            var formParams = {
                ignoreTitle: true,
                invalidHandler: function (form, validator) {
                    if (!validator.numberOfInvalids()) {
                        return;
                    }
                },
                errorElement: "div",
                errorPlacement: function (error, element) {
                    //error.addClass("invalid-tooltip"); //Mensaje de error con fondo
                    error.addClass("invalid-feedback"); //Mensaje de error simple

                    if (element.prop("type") === "checkbox") {
                        error.insertAfter(element.parent("label"));
                    } else {
                        error.insertAfter(element);
                    }
                },
                success: function (label, element) {
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).addClass("is-invalid").removeClass("is-valid");
                    $(element).parent().find('.error').addClass("invalid-feedback");
                    //$(element).parent().find('.error').addClass("invalid-tooltip");
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).addClass("is-valid").removeClass("is-invalid");
                    $(element).parent().find('.error').removeClass("invalid-feedback");
                    //$(element).parent().find('.error').removeClass("invalid-tooltip");
                }
            }
            var fParams = Object.assign(formParams, parametros);
            resolve(elem.validate(fParams));
        })
    } catch (e) {
        errorCliente(e);
    }
}
async function ServerFetchPost(area, controlador, accion, tipoContenido) {
    try {
        let url = "";
        if (!area) url = "/" + controlador + "/" + accion;
        else url = "/" + area + "/" + controlador + "/" + accion;

        let args = Array.prototype.slice.call(arguments);

        await fetch(url, {
            method: "POST",
            body: formData
            //body: JSON.stringify({
            //    tipoDocumento: tipoDoc,
            //    numeroDocumento: numeroDocumento,
            //    numeroRecord: numeroRecord,
            //    listaServicios: listaServicio
            //})
        })

    } catch (e) {
        errorCliente(e);
    }
}

function SendServerPost(url, tipoContenido) {
    try {
        return new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments);

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({ dni: "72252641" })
            })
                .then((response) => {
                    return response.text
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });


    } catch (e) {
        errorCliente(e);
    }
}
/**
 * envia peticion al servidor por post, recibe los parametros como argumentos
 * @param {any} url url del servidor
 * @param {any} metodo metodo o funcion que obtendra la respuesta del servidor
 * @param {any} tipoContenido tipo de coontenido de los parametros 'json' or '', default ''
 */
function enviarServidorPostFile(url, metodo, tipoContenido) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", url);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        if (this.status === 200) {
            let blob = new Blob([this.response], { type: 'application/pdf' });
            metodo(blob);
        }
        else if (xhr.status === 404) {
            mostrarRespuesta('Error', "Página no encontrada", 'error');
            //esperaTermino();
        }
        else if (xhr.status === 500) {
            mostrarRespuesta('Error', "Error interno del servidor", 'error');
            //esperaTermino();
        }
    };
    var frm;
    var args = Array.prototype.slice.call(arguments);
    if (tipoContenido === "json") {
        frm = JSON.stringify(args[3][1]);
        xhr.setRequestHeader("Content-Type", "application/json");
    }
    else {
        frm = new FormData(); //Html5   
        if (args.length > 0) {
            args.forEach(function (element, index) {
                if (index > 2) {
                    frm.append(element[0], element[1]);
                }
            });
        }
    }
    xhr.send(frm);
}
function enviarServidorPostFileOffice(url, metodo, tipoContenido) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", url);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        if (this.status === 200) {
            let blob = new Blob([this.response], { type: 'application/octet-stream' });
            metodo(blob);
        }
        else if (xhr.status === 404) {
            mostrarRespuesta('Error', "Página no encontrada", 'error');
            esperaTermino();
        }
        else if (xhr.status === 500) {
            mostrarRespuesta('Error', "Error interno del servidor", 'error');
            esperaTermino();
        }
    };
    var frm;
    // compatible con todos los exploradores
    var args = Array.prototype.slice.call(arguments);
    //var args = [].slice.call(arguments);  
    if (tipoContenido === "json") {
        frm = JSON.stringify(args[3][1]);
        xhr.setRequestHeader("Content-Type", "application/json");
    }
    else {
        frm = new FormData(); //Html5   
        if (args.length > 0) {
            args.forEach(function (element, index) {
                if (index > 2) {
                    frm.append(element[0], element[1]);
                }
            });
        }
    }
    xhr.send(frm);
}
function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    //creamos un FileReader para leer el Blob
    var reader = new FileReader();
    //Definimos la función que manejará el archivo
    //una vez haya terminado de leerlo
    reader.onload = function (event) {
        //Usaremos un link para iniciar la descarga
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        //Truco: así le damos el nombre al archivo
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        //Simulamos un clic del usuario
        //no es necesario agregar el link al DOM.
        save.dispatchEvent(clicEvent);
        //Y liberamos recursos...
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    //Leemos el blob y esperamos a que dispare el evento "load"
    reader.readAsDataURL(contenidoEnBlob);
}
function errorCliente(e) {
    //console.error(e.message);
    console.error(e.stack);
    mostrarRespuesta('ERROR', 'Ocurrio un error Inesperado, Intente nuevamente.', 'error');
    esperaTermino();
    esperaTerminoPagina();
}
function esperaInicio(miMensaje) {
    document.getElementById("pkLoader").classList.remove("loaderPagina");
    document.getElementById("pkLoader").classList.add("loader");
    if (miMensaje === undefined || miMensaje === null || miMensaje === '') {
        miMensaje = 'CARGANDO';
    }
    document.getElementById("lblTextoLoader").innerText = miMensaje;
    $(".loader").fadeIn("fast");
}
function esperaTermino() {
    document.getElementById("lblTextoLoader").innerText = "";
    $(".loader").fadeOut("fast");

}
function esperaInicioPagina(miMensaje) {
    document.getElementById("pkLoader").classList.add("loaderPagina");
    if (miMensaje === undefined || miMensaje === null || miMensaje === '') {
        miMensaje = 'CARGANDO \n PÁGINA';
    }
    document.getElementById("lblTextoLoader").innerHTML = miMensaje;
    $(".loader").fadeIn("fast");
}
function esperaTerminoPagina() {
    document.getElementById("lblTextoLoader").innerHTML = "";
    $(".loaderPagina").fadeOut("fast");
}
function esperaInicioBandeja(tag = "contenedorLoader", texto = "CARGANDO") {
    document.getElementById("page-top").classList.add("bloquearClic");
    $("#" + tag).html("<div class='loadingBandeja'><img src='../Imagenes/loaderBandeja.gif'/><br/>" + texto + "</div>");
}
function esperaTerminoBandeja(tag = "contenedorLoader") {
    document.getElementById("page-top").classList.remove("bloquearClic");
    $("#" + tag).fadeIn();
}
function Confirmacion(titulo, mensaje, tipo, textoBotonConfirmar, textoBotonCancelar, funcionRespuesta, closeConfirmacion) {
    $('.sweet-alert').removeClass('swal-success');
    $('.sweet-alert').removeClass('swal-warning');
    $('.sweet-alert').removeClass('swal-danger');
    $('.sweet-alert').removeClass('swal-info');
    if (textoBotonConfirmar.length == 0) { textoBotonConfirmar = "Aceptar"; }
    if (textoBotonCancelar.length == 0) { textoBotonCancelar = "Cancelar"; }
    if (closeConfirmacion == undefined) { closeConfirmacion = true; }
    swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        showCancelButton: true,
        confirmButtonText: textoBotonConfirmar,
        confirmButtonClass: "btn btn-lg btn-" + tipo + "",
        cancelButtonText: textoBotonCancelar,
        cancelButtonClass: "btn btn-lg btn-default",
        containerClass: "swal-" + tipo,
        closeOnConfirm: closeConfirmacion,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                funcionRespuesta(true);
            } else {
                funcionRespuesta(false);
            }
        });
}
function ConfirmacionV2(titulo, mensaje, tipo, textoBotonConfirmar, textoBotonCancelar, closeConfirmacion) {
    return new Promise((resolve, reject) => {
        $('.sweet-alert').removeClass('swal-success');
        $('.sweet-alert').removeClass('swal-warning');
        $('.sweet-alert').removeClass('swal-danger');
        $('.sweet-alert').removeClass('swal-info');
        if (textoBotonConfirmar.length == 0) { textoBotonConfirmar = "Aceptar"; }
        if (textoBotonCancelar.length == 0) { textoBotonCancelar = "Cancelar"; }
        if (closeConfirmacion == undefined) { closeConfirmacion = true; }
        swal({
            title: titulo,
            text: mensaje,
            type: tipo,
            showCancelButton: true,
            confirmButtonText: textoBotonConfirmar,
            confirmButtonClass: "btn btn-lg btn-" + tipo + "",
            cancelButtonText: textoBotonCancelar,
            cancelButtonClass: "btn btn-lg btn-secondary",
            containerClass: "swal-" + tipo,
            closeOnConfirm: closeConfirmacion,
            closeOnCancel: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    })
}

/**
 * muestra motivo popup en pantalla
 * @param {any} _titulo titulo de la pantalla
 * @param {any} _mensaje motivo que se mostrara
 * @param {any} _tipo tipo de motivo
 */
function mostrarRespuesta(_titulo, _mensaje, _tipo) {
    var _icono = ""; var _boton = ""; var _class = ""
    if (_tipo === 'true') { _icono = "success"; _boton = "btn btn-lg btn-success"; _class = "swal-success"; }
    else if (_tipo === 'false') { _icono = "warning"; _boton = "btn btn-lg btn-warning"; _class = "swal-warning"; }
    else if (_tipo === 'error') { _icono = "error"; _boton = "btn btn-lg btn-danger"; _class = "swal-danger"; }
    else if (_tipo === 'info') { _icono = "info"; _boton = "btn btn-lg btn-info"; _class = "swal-info"; }

    /* quitar clase anterior */
    $('.sweet-alert').removeClass('swal-success');
    $('.sweet-alert').removeClass('swal-warning');
    $('.sweet-alert').removeClass('swal-danger');
    $('.sweet-alert').removeClass('swal-info');

    swal({
        title: _titulo,
        text: _mensaje,
        type: _icono,
        confirmButtonClass: _boton,
        cancelButtonClass: "btn btn-lg btn-default",
        containerClass: _class
    });
}
function mostrarRespuestaV2(_titulo, _mensaje, _tipo) {
    setTimeout(function () {
        var _icono = ""; var _boton = ""; var _class = ""
        if (_tipo === 'true') { _icono = "success"; _boton = "btn btn-lg btn-success"; _class = "swal-success"; }
        else if (_tipo === 'false') { _icono = "warning"; _boton = "btn btn-lg btn-warning"; _class = "swal-warning"; }
        else if (_tipo === 'error') { _icono = "error"; _boton = "btn btn-lg btn-danger"; _class = "swal-danger"; }
        else if (_tipo === 'info') { _icono = "info"; _boton = "btn btn-lg btn-info"; _class = "swal-info"; }

        /* quitar clase anterior */
        $('.sweet-alert').removeClass('swal-success');
        $('.sweet-alert').removeClass('swal-warning');
        $('.sweet-alert').removeClass('swal-danger');
        $('.sweet-alert').removeClass('swal-info');

        swal({
            title: _titulo,
            text: _mensaje,
            type: _icono,
            confirmButtonClass: _boton,
            cancelButtonClass: "btn btn-lg btn-default",
            containerClass: _class
        });
    }, 100);
}

function SerializarArray(array, simbolo) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += array[i] + simbolo;
    }
    var respuesta = result.slice(0, -1);
    return respuesta;
}
function TextoLoader(texto) {
    document.getElementById("lblTextoLoader").innerHTML = texto;
}
function AlertaToastr(tipo, title, mensaje, tiempo, closebuton, progressbar, duplicar, posicion) {
    toastr.options = {
        "closeButton": closebuton,
        "progressBar": progressbar,
        "positionClass": "toast-" + posicion,
        "preventDuplicates": duplicar,
        "hideEasing": "linear",
        "timeOut": tiempo
    };
    Command: toastr[tipo](mensaje, title);
}

function ValidarNumeroTamanio(tag, num1, num2, isNumber = true) {
    $("#" + tag).bind('keypress', function (event) {
        if (this.value.length > (num2 - num1))
            return;

        if (isNumber) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.CharCode ? event.which : event.CharCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        }
    });
}
function ModalDraggable(idTag) {
    $("#" + idTag).draggable({
        handle: ".modal-header"
    });
}

//Para evitar que el scroll se pierda al abrir un modal sobre otro
//$(".modal").on("hidden.bs.modal", function (e) {
//    $("body").addClass("modal-open");
//});


// Hack to enable multiple modals by making sure the .modal-open class
// is set to the <body> when there is at least one modal open left
$("body").on("hidden.bs.modal", function () {
    if ($(".modal.in").length > 0) {
        $("body").addClass("modal-open");
    }
});

function filterFloat(evt, input) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 0) {
            return true;
        } else if (key == 46) {
            if (filter(tempValue) === false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
function filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }

}

// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}


// String.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var dataLenguajeTable = {
    sProcessing: "Procesando...",
    sLengthMenu: "Mostrar _MENU_",
    sZeroRecords: "No se encontraron resultados",
    sEmptyTable: "Ningún dato disponible en esta tabla",
    sInfo: "Mostrando _START_ a _END_ de _TOTAL_ Registros",
    sInfoEmpty: "Mostrando 0 to 0 of 0 Registros",
    sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
    sInfoPostFix: "",
    sSearch: "Buscar:",
    sUrl: "",
    sInfoThousands: ",",
    sLoadingRecords: "Cargando...",
    decimal: ".",
    thousands: ",",
    oPaginate: {
        sFirst: "<i class='fa fa-fast-backward'></i>",
        sLast: "<i class='fa fa-fast-forward'></i>",
        sNext: "<i class='fa fa-forward'></i>",
        sPrevious: "<i class='fa fa-backward'></i>"
    },
    oAria: {
        sSortAscending: ": Activar para ordenar la columna de manera ascendente",
        sSortDescending: ": Activar para ordenar la columna de manera descendente"
    }
};
var dataLenguajeTablePE = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "<i class='fa fa-fast-backward'></i>",
        "last": "<i class='fa fa-fast-forward'></i>",
        "next": "<i class='fa fa-forward'></i>",
        "previous": "<i class='fa fa-backward'></i>"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este motivo o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %d filas al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir",
        "renameState": "Cambiar nombre",
        "updateState": "Actualizar",
        "createState": "Crear Estado",
        "removeAllStates": "Remover Estados",
        "removeState": "Remover",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ".",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "notEmpty": "No Vacio",
                "not": "Diferente de"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con",
                "not": "Diferente de",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza con",
                "notEndsWith": "No termina con"
            },
            "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d",
        "showMessage": "Mostrar Todo",
        "collapseMessage": "Colapsar Todo"
    },
    "select": {
        "cells": {
            "1": "1 celda seleccionada",
            "_": "%d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ",",
    "datetime": {
        "previous": "Anterior",
        "next": "Proximo",
        "hours": "Horas",
        "minutes": "Minutos",
        "seconds": "Segundos",
        "unknown": "-",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "title": "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar Registro",
            "submit": "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title": "Múltiples Valores",
            "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "name": "Nombre:",
            "order": "Clasificación",
            "paging": "Paginación",
            "search": "Busqueda",
            "select": "Seleccionar",
            "columns": {
                "search": "Búsqueda de Columna",
                "visible": "Visibilidad de Columna"
            },
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "emptyError": "El nombre no puede estar vacio",
        "removeConfirm": "¿Seguro que quiere eliminar este %s?",
        "removeError": "Error al eliminar el registro",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "renameButton": "Cambiar Nombre",
        "renameLabel": "Nuevo nombre para %s",
        "duplicateError": "Ya existe un Estado con este nombre.",
        "emptyStates": "No hay Estados guardados",
        "removeTitle": "Remover Estado",
        "renameTitle": "Cambiar Nombre Estado"
    }
};


$("#btnCerrarSesion").click(function () {
    window.location = "../Account/LogOff";
});


/* MANTENER EL MENU ACTIVO */
var menuSelect = localStorage.getItem("menuSelect");
if (menuSelect != null) {
    let menus = document.getElementsByClassName("claseClic");
    for (var i = 0; i < menus.length; i++) {
        let menu = menus[i];
        if (menu.dataset.seleccionado == menuSelect) {
            menu.classList.add("active");
        } else {
            menu.classList.remove("active");
        }
    }
}

$('.claseClic').click(function () {
    let menu = $(this);
    localStorage.setItem("menuSelect", menu[0].dataset.seleccionado);
});

//#region
hideChat(0);
$('#prime').click(function () {
    toggleFab();
});
//Toggle chat and links
function toggleFab() {
    $('.prime').toggleClass('zmdi-comment-outline');
    $('.prime').toggleClass('zmdi-close');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');

}
$('#chat_first_screen').click(function (e) {
    hideChat(1);
});
$('#chat_second_screen').click(function (e) {
    hideChat(2);
});
$('#chat_third_screen').click(function (e) {
    hideChat(3);
});
$('#chat_fourth_screen').click(function (e) {
    hideChat(4);
});
$('#chat_fullscreen_loader').click(function (e) {
    $('.fullscreen').toggleClass('zmdi-window-maximize');
    $('.fullscreen').toggleClass('zmdi-window-restore');
    $('.chat').toggleClass('chat_fullscreen');
    $('.fab').toggleClass('is-hide');
    $('.header_img').toggleClass('change_img');
    $('.img_container').toggleClass('change_img');
    $('.chat_header').toggleClass('chat_header2');
    $('.fab_field').toggleClass('fab_field2');
    $('.chat_converse').toggleClass('chat_converse2');
    //$('#chat_converse').css('display', 'none');
    // $('#chat_body').css('display', 'none');
    // $('#chat_form').css('display', 'none');
    // $('.chat_login').css('display', 'none');
    // $('#chat_fullscreen').css('display', 'block');
});
function hideChat(hide) {
    switch (hide) {
        case 0:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'block');
            $('.chat_fullscreen_loader').css('display', 'none');
            $('#chat_fullscreen').css('display', 'none');
            break;
        case 1:
            $('#chat_converse').css('display', 'block');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 2:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'block');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 3:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'block');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
        case 4:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            $('#chat_fullscreen').css('display', 'block');
            break;
    }
}
//#endregion



function soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
};
function numeroConDecimales(evt, txt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
        //Check if the text already contains the . character
        if (txt.value.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;
    }
    return true;

};

function soloLetras(e) {
    var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
        especiales = [8, 37, 39, 46],
        tecla_especial = false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }

};

function ValidarEmail2(valor) {
    let response = false;
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailRegex.test(valor)) {
        response = true;
    }
    return response;
}
function ValidarCombo(id, mensaje) {
    var combo = document.getElementById(id);
    var miClase = "";
    miClase = combo.parentNode.getAttribute("class");
    if (combo.value === null || combo.value === 0 || combo.value === "") {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        combo.parentNode.parentNode.setAttribute("class", miClase);
        combo.title = mensaje;
        combo.focus();
        combo.click();
        return true;
    } else {
        miClase = miClase.replace("has-error", "");
        combo.parentNode.parentNode.setAttribute("class", miClase);
        combo.title = "";
        return false;
    }
}
function ValidarTexto(id, mensaje) {
    var textbox = document.getElementById(id);
    var miClase = "";
    miClase = textbox.parentNode.getAttribute("class");
    //miClase = textbox.parentNode.parentNode.getAttribute("class");
    if (textbox.value === null || textbox.value.length === 0 || /^\s+$/.test(textbox.value)) {
        if (miClase.indexOf("has-error") === -1) { miClase = miClase + " has-error"; }
        textbox.parentNode.setAttribute("class", miClase);
        //textbox.parentNode.parentNode.setAttribute("class", miClase);
        textbox.title = mensaje;
        textbox.focus();
        textbox.select();
        textbox.click();
        return true;
    } else {
        miClase = miClase.replace("has-error", "");
        textbox.parentNode.setAttribute("class", miClase);
        //textbox.parentNode.parentNode.setAttribute("class", miClase);
        textbox.title = "";
        return false;
    }
}
// VALIDAR CAMPO NUMERICO CON 2 DECIMALES
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown"].indexOf(e.type) >= 0) {

                    this.classList.remove("input-error");
                    this.setCustomValidity("");

                } else if (["focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                    if (this.value.trim() == 0) this.value = 0;
                    this.value = parseFloat(this.value).toFixed(2);
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}