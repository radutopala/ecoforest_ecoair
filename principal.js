datos_correctos_mod = new Array;
digitals = new Array;
integers = new Array;
analogs = new Array;
datos_correctos_mod = new Array;
var timer_repeat;
var cont_err = 0;
var remoto_val;
var var_u = 0;
var state;
var comp_reloj = 120;
var fecha = 0;
function Inicializar() {
    swLoad();
    getVariablescgi();
    traducir();
    getHora();
}
function getAlarmas() {
    var cadena = "idOperacion=1079";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        cont_ga = 0;
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        if (datos_correctos[1] == "0") {
            document.getElementById("mensaje_alarma").innerHTML = datos_correctos[0].split("=")[1];
        }
        parseResults();
    }).fail(function () {
        cont_ga++;
        if (cont_ga >= 4) {
            alert(comunes.mensaje_reconexion);
            cont_ga = 0;
        } else {
            setTimeout("getAlarmas()", 103);
        }
        return;
    });
}
function traducir() {
    document.getElementById('pie_wifi').innerHTML = nuevas_paginas.modo_conexion;
    document.getElementById('pie_instalador').innerHTML = nuevas_paginas.instalador;
    document.getElementById('pie_usuario').innerHTML = nuevas_paginas.usuario;
    document.getElementById('pie_estado').innerHTML = on_off.testado;
    document.getElementById('pie_temperatura').innerHTML = nuevas_paginas.produc_termica_mensual;
    document.getElementById('pie_spf').innerHTML = nuevas_paginas.spf_mensual;
    document.getElementById('pie_programa').innerHTML = on_off.tprograma;
    document.getElementById('pie_modo').innerHTML = nuevas_paginas.modo_operacion;
}
function getVariablescgi() {
    di_1();
}
function di_1() {
    var reg_ini = 21;
    var num_reg = 100;
    var digital_ini = Number(reg_ini);
    var cadena = "idOperacion=2001&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("di_1()", 141);
            return;
        } else {
            digitals[21] = datos_correctos[0 + 2];
            digitals[22] = datos_correctos[1 + 2];
            digitals[29] = datos_correctos[8 + 2];
            digitals[30] = datos_correctos[9 + 2];
            digitals[31] = datos_correctos[10 + 2];
            digitals[33] = datos_correctos[12 + 2];
            digitals[83] = datos_correctos[62 + 2];
            digitals[84] = datos_correctos[63 + 2];
            digitals[85] = datos_correctos[64 + 2];
            digitals[88] = datos_correctos[67 + 2];
            digitals[93] = datos_correctos[72 + 2];
            digitals[105] = datos_correctos[84 + 2];
            digitals[106] = datos_correctos[85 + 2];
            digitals[107] = datos_correctos[86 + 2];
            digitals[108] = datos_correctos[87 + 2];
            digitals[109] = datos_correctos[88 + 2];
            digitals[120] = datos_correctos[99 + 2];
            cont_err = 0;
            di_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("di_1()", 141);
        return;
    });
}
function di_2() {
    var reg_ini = 206;
    var num_reg = 46;
    var digital_ini = Number(reg_ini);
    var cadena = "idOperacion=2001&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("di_2()", 141);
            return;
        } else {
            digitals[206] = datos_correctos[0 + 2];
            digitals[230] = datos_correctos[24 + 2];
            digitals[231] = datos_correctos[25 + 2];
            digitals[251] = datos_correctos[45 + 2];
            cont_err = 0;
            en_1();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("di_2()", 141);
        return;
    });
}
function en_1() {
    var reg_ini = 5062;
    var num_reg = 40;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_1()", 141);
            return;
        } else {
            for (var i = 0; i < 2; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            datos_correctos_mod[18] = parseInt(datos_correctos[18 + 2], 16);
            if (datos_correctos_mod[18] > 32768) {
                integers[79] = datos_correctos_mod[18] - 65536;
            } else {
                integers[79] = datos_correctos_mod[18];
            }
            for (var i = 22; i < 27; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            for (var i = 34; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_1()", 141);
        return;
    });
}
function en_2() {
    var reg_ini = 5129;
    var num_reg = 10;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_2()", 141);
            return;
        } else {
            for (var i = 0; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_2()", 141);
        return;
    });
}
function en_3() {
    var reg_ini = 5221;
    var num_reg = 36;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: true,
    }).done(function (data) {
        var datos2 = data.split("\n");
        var datos3 = datos2[0].split("=");
        var datos = datos2[1].split("&");
        var datos_correctos = eliminarErrores(datos);
        if (datos3[1] < 0 || datos2[2] < 0) {
            var error_men_0 = 1;
        } else {
            var tst1 = datos_correctos[1].split("=");
            var err1 = isNaN(tst1[1]);
        }
        if (error_men_0 == 1 || err1 == true || tst1[2] != undefined) {
            error_men_0 = 0;
            err1 = false;
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("en_3()", 141);
            return;
        } else {
            for (var i = 0; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_3()", 141);
        return;
    });
    getAlarmas();
}
function parseResults() {
    prod_enero = integers[220] + integers[232];
    prod_febrero = integers[221] + integers[233];
    prod_marzo = integers[222] + integers[234];
    prod_abril = integers[223] + integers[235];
    prod_mayo = integers[224] + integers[236];
    prod_junio = integers[225] + integers[237];
    prod_julio = integers[226] + integers[238];
    prod_agosto = integers[227] + integers[239];
    prod_septiembre = integers[228] + integers[240];
    prod_octubre = integers[229] + integers[241];
    prod_noviembre = integers[230] + integers[242];
    prod_diciembre = integers[231] + integers[243];
    electrica_enero = integers[244];
    electrica_febrero = integers[245];
    electrica_marzo = integers[246];
    electrica_abril = integers[247];
    electrica_mayo = integers[248];
    electrica_junio = integers[249];
    electrica_julio = integers[250];
    electrica_agosto = integers[251];
    electrica_septiembre = integers[252];
    electrica_octubre = integers[253];
    electrica_noviembre = integers[254];
    electrica_diciembre = integers[255];
    if (electrica_enero == 0) {
        spf_enero = 0;
    } else {
        spf_enero = prod_enero / electrica_enero;
    }
    if (electrica_febrero == 0) {
        spf_febrero = 0;
    } else {
        spf_febrero = prod_febrero / electrica_febrero;
    }
    if (electrica_marzo == 0) {
        spf_marzo = 0;
    } else {
        spf_marzo = prod_marzo / electrica_marzo;
    }
    if (electrica_abril == 0) {
        spf_abril = 0;
    } else {
        spf_abril = prod_abril / electrica_abril;
    }
    if (electrica_mayo == 0) {
        spf_mayo = 0;
    } else {
        spf_mayo = prod_mayo / electrica_mayo;
    }
    if (electrica_junio == 0) {
        spf_junio = 0;
    } else {
        spf_junio = prod_junio / electrica_junio;
    }
    if (electrica_julio == 0) {
        spf_julio = 0;
    } else {
        spf_julio = prod_julio / electrica_julio;
    }
    if (electrica_agosto == 0) {
        spf_agosto = 0;
    } else {
        spf_agosto = prod_agosto / electrica_agosto;
    }
    if (electrica_septiembre == 0) {
        spf_septiembre = 0;
    } else {
        spf_septiembre = prod_septiembre / electrica_septiembre;
    }
    if (electrica_octubre == 0) {
        spf_octubre = 0;
    } else {
        spf_octubre = prod_octubre / electrica_octubre;
    }
    if (electrica_noviembre == 0) {
        spf_noviembre = 0;
    } else {
        spf_noviembre = prod_noviembre / electrica_noviembre;
    }
    if (electrica_diciembre == 0) {
        spf_diciembre = 0;
    } else {
        spf_diciembre = prod_diciembre / electrica_diciembre;
    }
    if (integers[97] == 1) {
        if (prod_enero <= 9999 && spf_enero >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_enero;
            document.getElementById('spf').innerHTML = spf_enero.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_enero > 9999 && spf_enero >= 0) {
            prod_enero_mw = prod_enero / 1000;
            document.getElementById("prod_termica").innerHTML = prod_enero_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_enero.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 2) {
        if (prod_febrero <= 9999 && spf_febrero >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_febrero;
            document.getElementById('spf').innerHTML = spf_febrero.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_febrero > 9999 && spf_febrero >= 0) {
            prod_febrero_mw = prod_febrero / 1000;
            document.getElementById("prod_termica").innerHTML = prod_febrero_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_febrero.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 3) {
        if (prod_marzo <= 9999 && spf_marzo >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_marzo;
            document.getElementById('spf').innerHTML = spf_marzo.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_marzo > 9999 && spf_marzo >= 0) {
            prod_marzo_mw = prod_marzo / 1000;
            document.getElementById("prod_termica").innerHTML = prod_marzo_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_marzo.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 4) {
        if (prod_abril <= 9999 && spf_abril >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_abril;
            document.getElementById('spf').innerHTML = spf_abril.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_abril > 9999 && spf_abril >= 0) {
            prod_abril_mw = prod_abril / 1000;
            document.getElementById("prod_termica").innerHTML = prod_abril_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_abril.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 5) {
        if (prod_mayo <= 9999 && spf_mayo >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_mayo;
            document.getElementById('spf').innerHTML = spf_mayo.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_mayo > 9999 && spf_mayo >= 0) {
            prod_mayo_mw = prod_mayo / 1000;
            document.getElementById("prod_termica").innerHTML = prod_mayo_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_mayo.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 6) {
        if (prod_junio <= 9999 && spf_junio >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_junio;
            document.getElementById('spf').innerHTML = spf_junio.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_junio > 9999 && spf_junio >= 0) {
            prod_junio_mw = prod_junio / 1000;
            document.getElementById("prod_termica").innerHTML = prod_junio_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_junio.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 7) {
        if (prod_julio <= 9999 && spf_julio >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_julio;
            document.getElementById('spf').innerHTML = spf_julio.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_julio > 9999 && spf_julio >= 0) {
            prod_julio_mw = prod_julio / 1000;
            document.getElementById("prod_termica").innerHTML = prod_julio_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_julio.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 8) {
        if (prod_agosto <= 9999 && spf_agosto >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_agosto;
            document.getElementById('spf').innerHTML = spf_agosto.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_agosto > 9999 && spf_agosto >= 0) {
            prod_agosto_mw = prod_agosto / 1000;
            document.getElementById("prod_termica").innerHTML = prod_agosto_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_agosto.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 9) {
        if (prod_septiembre <= 9999 && spf_septiembre >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_septiembre;
            document.getElementById('spf').innerHTML = spf_septiembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_septiembre > 9999 && spf_septiembre >= 0) {
            prod_septiembre_mw = prod_septiembre / 1000;
            document.getElementById("prod_termica").innerHTML = prod_septiembre_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_septiembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 10) {
        if (prod_octubre <= 9999 && spf_octubre >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_octubre;
            document.getElementById('spf').innerHTML = spf_octubre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_octubre > 9999 && spf_octubre >= 0) {
            prod_octubre_mw = prod_octubre / 1000;
            document.getElementById("prod_termica").innerHTML = prod_octubre_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_octubre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 11) {
        if (prod_noviembre <= 9999 && spf_noviembre >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_noviembre;
            document.getElementById('spf').innerHTML = spf_noviembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_noviembre > 9999 && spf_noviembre >= 0) {
            prod_noviembre_mw = prod_noviembre / 1000;
            document.getElementById("prod_termica").innerHTML = prod_noviembre_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_noviembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    } else if (integers[97] == 12) {
        if (prod_diciembre <= 9999 && spf_diciembre >= 0) {
            document.getElementById("prod_termica").innerHTML = prod_diciembre;
            document.getElementById('spf').innerHTML = spf_diciembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "kWh";
        } else if (prod_diciembre > 9999 && spf_diciembre >= 0) {
            prod_diciembre_mw = prod_diciembre / 1000;
            document.getElementById("prod_termica").innerHTML = prod_diciembre_mw.toFixed(1);
            document.getElementById('spf').innerHTML = spf_diciembre.toFixed(1);
            document.getElementById("prod_unidades").innerHTML = "MWh";
        }
    }
    remoto_val = digitals[93];
    if (integers[62] == 2) {
        if (digitals[206] == 1) {
            document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
        } else {
            document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
        }
        document.getElementById("extra_auto").hidden = false;
        document.getElementById("extra_remoto").hidden = true;
    } else if (integers[62] == 1) {
        document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
        document.getElementById("extra_remoto").hidden = true;
        document.getElementById("extra_auto").hidden = true;
    } else if (integers[62] == 0) {
        document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
        document.getElementById("extra_remoto").hidden = true;
        document.getElementById("extra_auto").hidden = true;
    } else if (integers[62] == 3) {
        document.getElementById("epoca").src = "../../../imagesnew/epoca_mixto.png";
        document.getElementById("extra_remoto").hidden = true;
        document.getElementById("extra_auto").hidden = true;
    } else if (integers[62] == 4) {
        if (digitals[206] == 1) {
            document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
        } else {
            document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
        }
        document.getElementById("extra_remoto").hidden = false;
        document.getElementById("extra_auto").hidden = true;
    }
    if (integers[86] == 0 && integers[85] != 3 && integers[87] == 0 && integers[84] == 0) {
        document.getElementById("pie_modo").style.display = "none";
    } else {
        document.getElementById("pie_modo").style.display = "inline";
    }
    clock();
    m1();
    m2();
    m3();
    m4();
    if (integers[79] == 1) {
        document.getElementById("icono_onoff").src = "../../../imagesnew/on.png";
    } else if (integers[79] == 0) {
        document.getElementById("icono_onoff").src = "../../../imagesnew/off.png";
    } else if (integers[79] == 2) {
        document.getElementById("icono_onoff").src = "../../../imagesnew/emergencia.png";
    }
    if (integers[128] == 2) {
        document.getElementById('alarma').style.display = "inline";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_alarm.png";
    } else if (integers[128] == 3) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_supervisor.png";
    } else if (integers[128] == 4) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_bus.png";
    } else if (integers[128] == 5) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_calendario.png";
    } else if (integers[128] == 6) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_remoto.png";
    } else if (integers[128] == 7) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_teclado.png";
    } else if (integers[128] == 8) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/icono_tarifa.png";
    } else if (integers[128] == 10) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/nocturno.png";
    } else if (integers[128] == 11) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/off_evu.png";
    } else if (integers[128] == 12) {
        document.getElementById('alarma').style.display = "inline";
        document.getElementById('msg').style.display = "inline";
    } else if (integers[128] == 13) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/teclado_emergencia.png";
    } else if (integers[128] == 16) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/icono_sg1.png";
    } else if (integers[128] == 17) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/icono_sg2.png";
    } else if (integers[128] == 18) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/icono_sg3.png";
    } else if (integers[128] == 19) {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "inline";
        document.getElementById('msg').src = "../../../imagesnew/icono_sg4.png";
    } else {
        document.getElementById('alarma').style.display = "none";
        document.getElementById('msg').style.display = "none";
    }
    document.getElementById("main").style.display = "inline";
    timer_repeat = setTimeout("getVariablescgi()", 4500);
}
function clock() {
    if (integers[99] < 10) {
        hora = "0" + integers[99];
    } else if (integers[99] >= 10) {
        hora = integers[99];
    }
    if (integers[100] < 10) {
        minuto = "0" + integers[100];
    } else if (integers[100] >= 10) {
        minuto = integers[100];
    }
    document.getElementById('hourDiv').innerHTML = (hora + ":" + minuto);
    if (integers[96] < 10) {
        dia = "0" + integers[96];
    } else if (integers[96] >= 10) {
        dia = integers[96];
    }
    if (integers[97] < 10) {
        mes = "0" + integers[97];
    } else if (integers[97] >= 10) {
        mes = integers[97];
    }
    if (integers[98] < 10) {
        anno = "0" + integers[98];
    } else if (integers[98] >= 10) {
        anno = integers[98];
    }
    document.getElementById('dateDiv').innerHTML = (dia + "/" + mes + "/20" + anno);
    var yyyy = "20" + anno;
    fecha = Date.UTC(yyyy, mes - 1, dia, hora, minuto) / 1000;
}
function redirige_alarmas() {
    window.location = "alarma.html"
}
var a;
var b;
var d;
var e;
var f;
var valor;
function set_reg(a, b, valor, f, e, d) {
    if (valor < e || valor > d) {
        alert(txtlimits);
    } else {
        if (a == 3) {
            var valore = valor;
            if (valor < 0) {
                valor = 65536 - Math.abs(valor);
            } else {
                valor = Number(valor);
            }
            valor = valor.toString(16);
            if (valor.length < 4) {
                if (valor.length == 3) {
                    valor = "0" + valor;
                } else if (valor.length == 2) {
                    valor = "00" + valor;
                } else if (valor.length == 1) {
                    valor = "000" + valor;
                } else {
                    valor = "0000";
                }
            }
            b = Number(b) + 5001;
            var cadena = "idOperacion=2012&dir=" + b + "&num=" + f + "&" + valor;
            $.ajax({
                type: "POST",
                url: "../../../../recepcion_datos_4.cgi",
                data: cadena,
                async: true,
            }).done(function (data) {
                var datos1 = data.split("\n");
                var datos2 = datos1[0].split("=");
                if (datos2[1] == 0 && datos1[1] == 0) {
                    if (valore == 2) {
                        if (digitals[206] == 1) {
                            document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
                        } else {
                            document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
                        }
                        document.getElementById("extra_auto").hidden = false;
                        document.getElementById("extra_remoto").hidden = true;
                    } else if (valore == 1) {
                        document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
                        document.getElementById("extra_remoto").hidden = true;
                        document.getElementById("extra_auto").hidden = true;
                    } else if (valore == 0) {
                        document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
                        document.getElementById("extra_remoto").hidden = true;
                        document.getElementById("extra_auto").hidden = true;
                    } else if (valore == 3) {
                        document.getElementById("epoca").src = "../../../imagesnew/epoca_mixto.png";
                        document.getElementById("extra_remoto").hidden = true;
                        document.getElementById("extra_auto").hidden = true;
                    } else if (valore == 4) {
                        if (digitals[206] == 1) {
                            document.getElementById("epoca").src = "../../../imagesnew/epoca_verano.png";
                        } else {
                            document.getElementById("epoca").src = "../../../imagesnew/epoca_invierno.png";
                        }
                        document.getElementById("extra_remoto").hidden = false;
                        document.getElementById("extra_auto").hidden = true;
                    }
                    sh_n();
                    alert(guardok);
                } else {
                    alert(mensaje_reintentar);
                }
            }).fail(function () {
                alert(mensaje_reintentar);
            });
        }
    }
}
function m1() {
    if (integers[86] == 1 || integers[87] == 1 || integers[86] == 2 || integers[87] == 2 || integers[85] == 3) {
        document.getElementById("modo1").style.display = "inline";
        if (integers[86] == 1 || integers[87] == 1) {
            document.getElementById("modo1").src = "../../../imagesnew/acs_home.png";
        } else if (integers[86] == 2 || integers[87] == 2) {
            document.getElementById("modo1").src = "../../../imagesnew/legionela_home.png";
        } else if (integers[85] == 3) {
            document.getElementById("modo1").src = "../../../imagesnew/desescarche_home.png";
        }
    } else {
        document.getElementById("modo1").style.display = "none";
    }
}
function m2() {
    if (integers[86] == 3 || integers[86] == 10 || integers[87] == 3 || integers[86] == 4 || integers[86] == 11 || integers[86] == 3 || integers[86] == 6 || integers[86] == 8) {
        document.getElementById("modo2").style.display = "inline";
        if (integers[86] == 3 || integers[86] == 10 || integers[87] == 4 || integers[86] == 6) {
            document.getElementById("modo2").src = "../../../imagesnew/calefaccion_directa_home.png";
        } else if (integers[86] == 4 || integers[86] == 11 || integers[87] == 3) {
            document.getElementById("modo2").src = "../../../imagesnew/calefaccion_inercia_home.png";
        } else if (integers[86] == 8) {
            document.getElementById("modo2").src = "../../../imagesnew/epoca_anticongelamiento.png";
        }
    } else {
        document.getElementById("modo2").style.display = "none";
    }
}
function m3() {
    if (integers[84] == 3 || integers[84] == 2) {
        document.getElementById("modo3").style.display = "inline";
        if (integers[84] == 3) {
            document.getElementById("modo3").src = "../../../imagesnew/refrigeracion_directa_home.png";
        } else if (integers[84] == 2) {
            document.getElementById("modo3").src = "../../../imagesnew/refrigeracion_inercia_home.png";
        }
    } else {
        document.getElementById("modo3").style.display = "none";
    }
}
function m4() {
    if (integers[86] == 5 || integers[86] == 9 || integers[87] == 5) {
        document.getElementById("modo4").style.display = "inline";
        if (integers[86] == 5 || integers[86] == 9 || integers[87] == 5) {
            document.getElementById("modo4").src = "../../../imagesnew/piscina_home.png";
        }
    } else {
        document.getElementById("modo4").style.display = "none";
    }
}
var cont_gh = 0;
function getHora() {
    var cadena = "idOperacion=1094";
    if (fecha != 0) {
        $.ajax({
            type: "POST",
            url: "../../../../recepcion_datos_4.cgi",
            data: cadena,
            async: false,
        }).done(function (data) {
            cont_gh = 0;
            var datos = data.split("\n");
            var datos_correctos = eliminarErrores(datos);
            comparaReloj(datos_correctos);
        }).fail(function () {
            cont_gh++;
            if (cont_gh >= 3) {
                alert(comunes.mensaje_reconexion);
                cont_gh = 0;
            } else {
                setTimeout("getHora()", 2103);
            }
        });
    } else
        setTimeout("getHora()", 2103);
}
function comparaReloj(datos) {
    var longitud = datos.length;
    longitud = longitud - 1;
    if (datos[longitud] == 0) {
        var string = datos[0].split("=");
        var d = new Date();
        var templocal = fecha;
        var tempext = datos[0].split("=")[1];
        var tempdif = templocal - tempext;
        if (tempdif < -comp_reloj || tempdif > comp_reloj) {
            setHora();
        }
    } else
        setTimeout("getHora()", 5103);
}
function setHora() {
    var d = new Date();
    var temp = parseInt(fecha);
    var cadena = "idOperacion=1095&int_rx=" + temp;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var longitud = datos.length;
        if (datos[longitud - 1] != 0)
            getHora();
    }).fail(function () {
        setTimeout("setHora()", 5107);
    });
}
function eliminarErrores(string) {
    var j = 0;
    var temp = new Array();
    for (var i = 0; i < string.length - 1; i++) {
        if (string[i].indexOf("error") < 0) {
            temp[j] = string[i];
            j++;
        }
    }
    temp[j] = string[i];
    return temp;
}
