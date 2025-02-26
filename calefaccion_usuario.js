var cont_err = 0;
var timer_repeat;
datos_correctos = new Array;
function Inicializar() {
    unidades();
    getAlarmas();
    traducir();
    periodicamente();
}
function periodicamente() {
    clearTimeout(timer_repeat);
    funcionalidades();
    timer_repeat = setTimeout("periodicamente()", 10000);
}
function unidades() {
    var cadena = "idOperacion=2006";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("unidades()", 141);
            return;
        } else if (datos2 == 0) {
            unidad_temp = parseInt(datos_correctos[0].replace("utemp=", ""), 16);
            unidad_pres = parseInt(datos_correctos[1].replace("upres=", ""), 16);
            cont_err = 0;
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("unidades()", 141);
        return;
    });
}
function funcionalidades() {
    var cadena = "idOperacion=2101";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("funcionalidades()", 141);
            return;
        } else if (datos2 == 0) {
            hgfi = parseInt(datos_correctos[6].replace("HGFI=", ""), 16);
            if (hgfi > 32768) {
                hgfi = hgfi - 65536;
            } else {
                hgfi = hgfi;
            }
            hcfi = parseInt(datos_correctos[5].replace("HCFI=", ""), 16);
            if (hcfi > 32768) {
                hcfi = hcfi - 65536;
            } else {
                hcfi = hcfi;
            }
            haf = parseInt(datos_correctos[12].replace("HAF=", ""), 16);
            if (haf > 32768) {
                haf = haf - 65536;
            } else {
                haf = haf;
            }
            htfi = parseInt(datos_correctos[13].replace("HTF=", ""), 16);
            if (htfi > 32768) {
                htfi = htfi - 65536;
            } else {
                htfi = htfi;
            }
            if (haf & 0x0002 || haf & 0x0004) {
                document.getElementById('tabla_inercia').style.display = "inline-table";
            }
            if (hcfi & 0x0001 || hcfi & 0x0002 || hcfi & 0x0008 || hcfi & 0x0010 || hcfi & 0x0040 || hcfi & 0x0080 || hcfi & 0x0200 || hcfi & 0x0400 || hcfi & 0x1000 || hcfi & 0x2000) {
                document.getElementById('tabla_grupos').style.display = "inline-table";
            }
            if (hcfi & 0x0001 || hcfi & 0x0002) {
                document.getElementById('zona1_th').hidden = false;
            }
            if (hcfi & 0x0008 || hcfi & 0x0010) {
                document.getElementById('zona2_th').hidden = false;
            }
            if (hcfi & 0x0040 || hcfi & 0x0080) {
                document.getElementById('zona3_th').hidden = false;
            }
            if (hcfi & 0x0200 || hcfi & 0x0400) {
                document.getElementById('zona4_th').hidden = false;
            }
            if (hcfi & 0x1000 || hcfi & 0x2000) {
                document.getElementById('zona5_th').hidden = false;
            }
            if (htfi & 0x0001 || htfi & 0x0002 || htfi & 0x0004 || htfi & 0x0008 || htfi & 0x0010 || htfi & 0x0020 || htfi & 0x0040 || htfi & 0x0080 || htfi & 0x0100 || htfi & 0x0200) {
                document.getElementById('tabla_terminales').style.display = "inline-table";
                document.getElementById('tabla_terminales1').style.display = "inline-table";
            }
            if (htfi & 0x0001 || htfi & 0x0020) {
                document.getElementById('gd1').hidden = false;
                document.getElementById('gd1_1').hidden = false;
            }
            if (htfi & 0x0002 || htfi & 0x0040) {
                document.getElementById('gd2').hidden = false;
                document.getElementById('gd2_1').hidden = false;
            }
            if (htfi & 0x0004 || htfi & 0x0080) {
                document.getElementById('gd3').hidden = false;
                document.getElementById('gd3_1').hidden = false;
            }
            if (htfi & 0x0008 || htfi & 0x0100) {
                document.getElementById('gd4').hidden = false;
                document.getElementById('gd4_1').hidden = false;
            }
            if (htfi & 0x0010 || htfi & 0x0200) {
                document.getElementById('gd5').hidden = false;
                document.getElementById('gd5_1').hidden = false;
            }
            if (hgfi & 0x0002 || hgfi & 0x0008 || hgfi & 0x0004) {
                document.getElementById('tabla_apoyos').style.display = "inline-table";
            }
            if (hgfi & 0x0002) {
                document.getElementById('calef1').hidden = false;
            }
            if (hgfi & 0x0008) {
                document.getElementById('calef2').hidden = false;
            }
            if (hgfi & 0x0004) {
                document.getElementById('calef3').hidden = false;
            }
            if (hgfi & 0x0010) {
                document.getElementById('tabla_comfo').style.display = "inline";
            }
            if (hgfi & 0x0001) {
                document.getElementById('div_izquierda').style.display = "inline";
                document.getElementById('div_noconfig').style.display = "none";
            } else {
                document.getElementById('div_noconfig').style.display = "inline";
                document.getElementById('div_izquierda').style.display = "none";
            }
            cont_err = 0;
            actualizarpagina();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("funcionalidades()", 141);
        return;
    });
}
function traducir() {
    document.getElementById('txtcabecera_calefaccion').innerHTML = calefaccion.tcabecera_calefaccion;
    document.getElementById('txtcalefaccion').innerHTML = calefaccion.tcalefaccion;
    document.getElementById('txtdeshab').innerHTML = comunes.tdeshab;
    document.getElementById('txthab').innerHTML = comunes.thab;
    document.getElementById('txttemp_corte_calef').innerHTML = test.ttemp_corte_calef;
    document.getElementById('txtcabecera_inercia').innerHTML = hc1.tiner1;
    document.getElementById('txttemp_inercia').innerHTML = info.tconsigna_pool;
    document.getElementById('txtoffset_inercia').innerHTML = info.toffset;
    document.getElementById('txtcabecera_grupos_cale').innerHTML = nuevas.theat_groups;
    document.getElementById('txtz1a').innerHTML = hc1.tgd1_1;
    document.getElementById('txtz2a').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a').innerHTML = hc1.tgd3;
    document.getElementById('txtz4a').innerHTML = hc1.tgd4;
    document.getElementById('txtz5a').innerHTML = hc1.tgd5;
    for (i = 0; i < 5; i++) {
        nivel1 = "nivel1_" + i;
        document.getElementById(nivel1).innerHTML = egw24.selec_nivel + " " + "-2";
    }
    for (i = 0; i < 5; i++) {
        nivel2 = "nivel2_" + i;
        document.getElementById(nivel2).innerHTML = egw24.selec_nivel + " " + "-1";
    }
    for (i = 0; i < 5; i++) {
        nivel3 = "nivel3_" + i;
        document.getElementById(nivel3).innerHTML = egw24.selec_nivel + " " + "0";
    }
    for (i = 0; i < 5; i++) {
        nivel4 = "nivel4_" + i;
        document.getElementById(nivel4).innerHTML = egw24.selec_nivel + " " + "+1";
    }
    for (i = 0; i < 5; i++) {
        nivel5 = "nivel5_" + i;
        document.getElementById(nivel5).innerHTML = egw24.selec_nivel + " " + "+2";
    }
    document.getElementById('txtcabecera_terminales_interiores').innerHTML = test.tcabecera_terminales_interiores;
    document.getElementById("txtgd1").innerHTML = "Z1";
    document.getElementById("txtgd2").innerHTML = "Z2";
    document.getElementById("txtgd3").innerHTML = "Z3";
    document.getElementById("txtgd4").innerHTML = "Z4";
    document.getElementById("txtgd5").innerHTML = "Z5";
    document.getElementById("txton_off").innerHTML = "On/Off";
    for (i = 0; i < 5; i++) {
        si = "txton" + i;
        no = "txtoff" + i;
        document.getElementById(si).innerHTML = "On";
        document.getElementById(no).innerHTML = "Off";
    }
    document.getElementById('txtcabecera_terminales_auto').innerHTML = egw24.control_terminales;
    document.getElementById("txthabilitar_terminales").innerHTML = calefaccion.tcalefaccion;
    document.getElementById("txtgd1_1").innerHTML = "Z1";
    document.getElementById("txtgd2_1").innerHTML = "Z2";
    document.getElementById("txtgd3_1").innerHTML = "Z3";
    document.getElementById("txtgd4_1").innerHTML = "Z4";
    document.getElementById("txtgd5_1").innerHTML = "Z5";
    document.getElementById("txttmin").innerHTML = installer.ttemp_min_pozos;
    document.getElementById("txttmax").innerHTML = installer.tt_max_pozo;
    document.getElementById('txtcabecera_sistema_auxiliar').innerHTML = acsleg.tcabecera_sistema_auxiliar;
    document.getElementById('txtemergencia').innerHTML = nuevas.temergencia;
    document.getElementById('txtapoyo').innerHTML = selectmenu.tapoyo;
    document.getElementById('txtaux1').innerHTML = nuevas.tresist_int;
    document.getElementById('txtaux2').innerHTML = nuevas.tresist_ine;
    document.getElementById('txtaux3').innerHTML = nuevas.tcaldera;
    for (i = 1; i < 8; i++) {
        si = "txtsi" + i;
        no = "txtno" + i;
        document.getElementById(si).innerHTML = comunes.thab;
        document.getElementById(no).innerHTML = comunes.tdeshab;
    }
    document.getElementById('txtcabecera_comfo').innerHTML = egw24.comfofond;
    document.getElementById('txtprecalentamiento').innerHTML = egw24.precalentamiento;
    if (unidad_temp == 0) {
        for (i = 0; i < 9; i++) {
            units = "txttemp" + i;
            document.getElementById(units).innerHTML = "&deg;C";
        }
        document.getElementById("txtt_con").innerHTML = info.tconsigna_pool + " " + "&deg;C";
        document.getElementById("txtdt").innerHTML = info.toffset + " " + "&deg;C";
        document.getElementById("txttmin").innerHTML = installer.ttemp_min_pozos + " " + "&deg;C";
        document.getElementById("txttmax").innerHTML = installer.tt_max_pozo + " " + "&deg;C";
    } else if (unidad_temp == 1) {
        for (i = 0; i < 9; i++) {
            units = "txttemp" + i;
            document.getElementById(units).innerHTML = "&deg;F";
        }
        document.getElementById("txtt_con").innerHTML = info.tconsigna_pool + " " + "&deg;F";
        document.getElementById("txtdt").innerHTML = info.toffset + " " + "&deg;F";
        document.getElementById("txttmin").innerHTML = installer.ttemp_min_pozos + " " + "&deg;F";
        document.getElementById("txttmax").innerHTML = installer.tt_max_pozo + " " + "&deg;F";
    }
    document.getElementById('icon1').innerHTML = on_off.ton_off;
    document.getElementById('icon2').innerHTML = egw24.programacion;
    document.getElementById('icon3').innerHTML = selectmenu.tcalefaccion;
    document.getElementById('icon4').innerHTML = selectmenu.tfrio_pasivo;
    document.getElementById('icon5').innerHTML = selectmenu.tacs_legionela;
    document.getElementById('icon6').innerHTML = selectmenu.tpiscina;
    document.getElementById('icon7').innerHTML = nuevas_paginas.icono_emanager;
    document.getElementById('icon8').innerHTML = selectmenu.tinformacion;
    document.getElementById('icon9').innerHTML = selectmenu.talarma;
    document.getElementById('installer').innerHTML = nuevas_paginas.instalador;
    document.getElementById('user').innerHTML = nuevas_paginas.usuario;
    document.getElementById('versiones').innerHTML = info.tajuste;
    document.getElementById('txtcabecera_noconfig').innerHTML = calefaccion.tcabecera_calefaccion;
    document.getElementById('txtnoservicio').innerHTML = no_disponible;
    document.getElementById('titulo_web').innerHTML = version_easynet;
}
function actualizarpagina() {
    var cadena = "idOperacion=2108";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina()", 141);
            return;
        } else if (datos2 == 0) {
            ecu = (datos_correctos[12].replace("ECU=", ""));
            document.getElementById("en_calef").value = ecu;
            cont_err = 0;
            actualizarpagina1();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina()", 141);
        return;
    });
}
function actualizarpagina1() {
    var cadena = "idOperacion=2107";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina1()", 141);
            return;
        } else if (datos2 == 0) {
            tcc = parseInt(datos_correctos[5].replace("TCC=", ""), 16);
            if (tcc > 32768) {
                tcc = (tcc - 65536) / 10;
            } else {
                tcc = tcc / 10;
            }
            if (unidad_temp == 0) {
                document.getElementById("temp_corte").value = tcc.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("temp_corte").value = ((tcc * 1.8) + 32).toFixed(1);
            }
            cont_err = 0;
            actualizarpagina2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina1()", 141);
        return;
    });
}
function actualizarpagina2() {
    var cadena = "idOperacion=2106";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina2()", 141);
            return;
        } else if (datos2 == 0) {
            tsic = parseInt(datos_correctos[0].replace("TSIC=", ""), 16);
            if (tsic > 32768) {
                tsic = (tsic - 65536) / 10;
            } else {
                tsic = tsic / 10;
            }
            oic = parseInt(datos_correctos[25].replace("OIC=", ""), 16);
            if (oic > 32768) {
                oic = (oic - 65536) / 10;
            } else {
                oic = oic / 10;
            }
            ocz1 = parseInt(datos_correctos[20].replace("OCZ1=", ""), 16);
            if (ocz1 > 32768) {
                ocz1 = ocz1 - 65536;
            } else {
                ocz1 = ocz1;
            }
            ocz2 = parseInt(datos_correctos[21].replace("OCZ2=", ""), 16);
            if (ocz2 > 32768) {
                ocz2 = ocz2 - 65536;
            } else {
                ocz2 = ocz2;
            }
            ocz3 = parseInt(datos_correctos[22].replace("OCZ3=", ""), 16);
            if (ocz3 > 32768) {
                ocz3 = ocz3 - 65536;
            } else {
                ocz3 = ocz3;
            }
            ocz4 = parseInt(datos_correctos[23].replace("OCZ4=", ""), 16);
            if (ocz4 > 32768) {
                ocz4 = ocz4 - 65536;
            } else {
                ocz4 = ocz4;
            }
            ocz5 = parseInt(datos_correctos[24].replace("OCZ5=", ""), 16);
            if (ocz5 > 32768) {
                ocz5 = ocz5 - 65536;
            } else {
                ocz5 = ocz5;
            }
            hrtsb1 = parseInt(datos_correctos[9].replace("HRTSB1=", ""), 16);
            if (hrtsb1 > 32768) {
                hrtsb1 = (hrtsb1 - 65536) / 10;
            } else {
                hrtsb1 = hrtsb1 / 10;
            }
            hrtsb2 = parseInt(datos_correctos[10].replace("HRTSB2=", ""), 16);
            if (hrtsb2 > 32768) {
                hrtsb2 = (hrtsb2 - 65536) / 10;
            } else {
                hrtsb2 = hrtsb2 / 10;
            }
            hrtsb3 = parseInt(datos_correctos[11].replace("HRTSB3=", ""), 16);
            if (hrtsb3 > 32768) {
                hrtsb3 = (hrtsb3 - 65536) / 10;
            } else {
                hrtsb3 = hrtsb3 / 10;
            }
            hrtsb4 = parseInt(datos_correctos[12].replace("HRTSB4=", ""), 16);
            if (hrtsb4 > 32768) {
                hrtsb4 = (hrtsb4 - 65536) / 10;
            } else {
                hrtsb4 = hrtsb4 / 10;
            }
            hrtsb5 = parseInt(datos_correctos[13].replace("HRTSB5=", ""), 16);
            if (hrtsb5 > 32768) {
                hrtsb5 = (hrtsb5 - 65536) / 10;
            } else {
                hrtsb5 = hrtsb5 / 10;
            }
            hrtsm1 = parseInt(datos_correctos[14].replace("HRTSM1=", ""), 16);
            if (hrtsm1 > 32768) {
                hrtsm1 = (hrtsm1 - 65536) / 10;
            } else {
                hrtsm1 = hrtsm1 / 10;
            }
            hrtsm2 = parseInt(datos_correctos[15].replace("HRTSM2=", ""), 16);
            if (hrtsm2 > 32768) {
                hrtsm2 = (hrtsm2 - 65536) / 10;
            } else {
                hrtsm2 = hrtsm2 / 10;
            }
            hrtsm3 = parseInt(datos_correctos[16].replace("HRTSM3=", ""), 16);
            if (hrtsm3 > 32768) {
                hrtsm3 = (hrtsm3 - 65536) / 10;
            } else {
                hrtsm3 = hrtsm3 / 10;
            }
            hrtsm4 = parseInt(datos_correctos[17].replace("HRTSM4=", ""), 16);
            if (hrtsm4 > 32768) {
                hrtsm4 = (hrtsm4 - 65536) / 10;
            } else {
                hrtsm4 = hrtsm4 / 10;
            }
            hrtsm5 = parseInt(datos_correctos[18].replace("HRTSM5=", ""), 16);
            if (hrtsm5 > 32768) {
                hrtsm5 = (hrtsm5 - 65536) / 10;
            } else {
                hrtsm5 = hrtsm5 / 10;
            }
            if (unidad_temp == 0) {
                document.getElementById("temp_inercia").value = tsic.toFixed(1);
                document.getElementById("offset_ine").value = oic.toFixed(1);
                document.getElementById("cc_dg1_1").value = hrtsb1.toFixed(1);
                document.getElementById("cc_dg2_1").value = hrtsb2.toFixed(1);
                document.getElementById("cc_dg3_1").value = hrtsb3.toFixed(1);
                document.getElementById("cc_dg4_1").value = hrtsb4.toFixed(1);
                document.getElementById("cc_dg5_1").value = hrtsb5.toFixed(1);
                document.getElementById("dtc_dg1_1").value = hrtsm1.toFixed(1);
                document.getElementById("dtc_dg2_1").value = hrtsm2.toFixed(1);
                document.getElementById("dtc_dg3_1").value = hrtsm3.toFixed(1);
                document.getElementById("dtc_dg4_1").value = hrtsm4.toFixed(1);
                document.getElementById("dtc_dg5_1").value = hrtsm5.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("temp_inercia").value = ((tsic * 1.8) + 32).toFixed(1);
                document.getElementById("offset_ine").value = (oic * 1.8).toFixed(1);
                document.getElementById("cc_dg1_1").value = ((hrtsb1 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg2_1").value = ((hrtsb2 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg3_1").value = ((hrtsb3 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg4_1").value = ((hrtsb4 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg5_1").value = ((hrtsb5 * 1.8) + 32).toFixed(1);
                document.getElementById("dtc_dg1_1").value = ((hrtsm1 * 1.8) + 32).toFixed(1);
                document.getElementById("dtc_dg2_1").value = ((hrtsm2 * 1.8) + 32).toFixed(1);
                document.getElementById("dtc_dg3_1").value = ((hrtsm3 * 1.8) + 32).toFixed(1);
                document.getElementById("dtc_dg4_1").value = ((hrtsm4 * 1.8) + 32).toFixed(1);
                document.getElementById("dtc_dg5_1").value = ((hrtsm5 * 1.8) + 32).toFixed(1);
            }
            document.getElementById("grupo1").value = ocz1;
            document.getElementById("grupo2").value = ocz2;
            document.getElementById("grupo3").value = ocz3;
            document.getElementById("grupo4").value = ocz4;
            document.getElementById("grupo5").value = ocz5;
            cont_err = 0;
            actualizarpagina3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina2()", 141);
        return;
    });
}
function actualizarpagina3() {
    var cadena = "idOperacion=2128";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina3()", 141);
            return;
        } else if (datos2 == 0) {
            tsz1 = parseInt(datos_correctos[0].replace("TSZ1=", ""), 16);
            if (tsz1 > 32768) {
                tsz1 = (tsz1 - 65536) / 10;
            } else {
                tsz1 = tsz1 / 10;
            }
            tsz2 = parseInt(datos_correctos[1].replace("TSZ2=", ""), 16);
            if (tsz2 > 32768) {
                tsz2 = (tsz2 - 65536) / 10;
            } else {
                tsz2 = tsz2 / 10;
            }
            tsz3 = parseInt(datos_correctos[2].replace("TSZ3=", ""), 16);
            if (tsz3 > 32768) {
                tsz3 = (tsz3 - 65536) / 10;
            } else {
                tsz3 = tsz3 / 10;
            }
            tsz4 = parseInt(datos_correctos[3].replace("TSZ4=", ""), 16);
            if (tsz4 > 32768) {
                tsz4 = (tsz4 - 65536) / 10;
            } else {
                tsz4 = tsz4 / 10;
            }
            tsz5 = parseInt(datos_correctos[4].replace("TSZ5=", ""), 16);
            if (tsz5 > 32768) {
                tsz5 = (tsz5 - 65536) / 10;
            } else {
                tsz5 = tsz5 / 10;
            }
            goti1 = parseInt(datos_correctos[5].replace("GOTI1=", ""), 16);
            if (goti1 > 32768) {
                goti1 = goti1 - 65536;
            } else {
                goti1 = goti1;
            }
            goti2 = parseInt(datos_correctos[6].replace("GOTI2=", ""), 16);
            if (goti2 > 32768) {
                goti2 = goti2 - 65536;
            } else {
                goti2 = goti2;
            }
            goti3 = parseInt(datos_correctos[7].replace("GOTI3=", ""), 16);
            if (goti3 > 32768) {
                goti3 = goti3 - 65536;
            } else {
                goti3 = goti3;
            }
            goti4 = parseInt(datos_correctos[8].replace("GOTI4=", ""), 16);
            if (goti4 > 32768) {
                goti4 = goti4 - 65536;
            } else {
                goti4 = goti4;
            }
            goti5 = parseInt(datos_correctos[9].replace("GOTI5=", ""), 16);
            if (goti5 > 32768) {
                goti5 = goti5 - 65536;
            } else {
                goti5 = goti5;
            }
            if (unidad_temp == 0) {
                document.getElementById("cc_dg1").value = tsz1.toFixed(1);
                document.getElementById("cc_dg2").value = tsz2.toFixed(1);
                document.getElementById("cc_dg3").value = tsz3.toFixed(1);
                document.getElementById("cc_dg4").value = tsz4.toFixed(1);
                document.getElementById("cc_dg5").value = tsz5.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("cc_dg1").value = ((tsz1 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg2").value = ((tsz2 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg3").value = ((tsz3 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg4").value = ((tsz4 * 1.8) + 32).toFixed(1);
                document.getElementById("cc_dg5").value = ((tsz5 * 1.8) + 32).toFixed(1);
            }
            document.getElementById("en_t1").value = goti1;
            document.getElementById("en_t2").value = goti2;
            document.getElementById("en_t3").value = goti3;
            document.getElementById("en_t4").value = goti4;
            document.getElementById("en_t5").value = goti5;
            cont_err = 0;
            actualizarpagina4();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina3()", 141);
        return;
    });
}
function actualizarpagina4() {
    var cadena = "idOperacion=2129";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina4()", 141);
            return;
        } else if (datos2 == 0) {
            ocoz1 = parseInt(datos_correctos[0].replace("OCOZ1=", ""), 16);
            if (ocoz1 > 32768) {
                ocoz1 = (ocoz1 - 65536) / 10;
            } else {
                ocoz1 = ocoz1 / 10;
            }
            ocoz2 = parseInt(datos_correctos[1].replace("OCOZ2=", ""), 16);
            if (ocoz2 > 32768) {
                ocoz2 = (ocoz2 - 65536) / 10;
            } else {
                ocoz2 = ocoz2 / 10;
            }
            ocoz3 = parseInt(datos_correctos[2].replace("OCOZ3=", ""), 16);
            if (ocoz3 > 32768) {
                ocoz3 = (ocoz3 - 65536) / 10;
            } else {
                ocoz3 = ocoz3 / 10;
            }
            ocoz4 = parseInt(datos_correctos[3].replace("OCOZ4=", ""), 16);
            if (ocoz4 > 32768) {
                ocoz4 = (ocoz4 - 65536) / 10;
            } else {
                ocoz4 = ocoz4 / 10;
            }
            ocoz5 = parseInt(datos_correctos[4].replace("OCOZ5=", ""), 16);
            if (ocoz5 > 32768) {
                ocoz5 = (ocoz5 - 65536) / 10;
            } else {
                ocoz5 = ocoz5 / 10;
            }
            eca = (datos_correctos[21].replace("ECA=", ""));
            if (unidad_temp == 0) {
                document.getElementById("dtc_dg1").value = ocoz1.toFixed(1);
                document.getElementById("dtc_dg2").value = ocoz2.toFixed(1);
                document.getElementById("dtc_dg3").value = ocoz3.toFixed(1);
                document.getElementById("dtc_dg4").value = ocoz4.toFixed(1);
                document.getElementById("dtc_dg5").value = ocoz5.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("dtc_dg1").value = (ocoz1 * 1.8).toFixed(1);
                document.getElementById("dtc_dg2").value = (ocoz2 * 1.8).toFixed(1);
                document.getElementById("dtc_dg3").value = (ocoz3 * 1.8).toFixed(1);
                document.getElementById("dtc_dg4").value = (ocoz4 * 1.8).toFixed(1);
                document.getElementById("dtc_dg5").value = (ocoz5 * 1.8).toFixed(1);
            }
            document.getElementById("hab_terminales").value = eca;
            cont_err = 0;
            actualizarpagina5();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina4()", 141);
        return;
    });
}
function actualizarpagina5() {
    var cadena = "idOperacion=2123";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina5()", 141);
            return;
        } else if (datos2 == 0) {
            ehdreu = (datos_correctos[16].replace("EHDREU=", ""));
            ehdrsu = (datos_correctos[18].replace("EHDRSU=", ""));
            ehireu = (datos_correctos[19].replace("EHIREU=", ""));
            ehirsu = (datos_correctos[21].replace("EHIRSU=", ""));
            ehbeu = (datos_correctos[13].replace("EHBEU=", ""));
            ehbsu = (datos_correctos[14].replace("EHBSU=", ""));
            document.getElementById("emerg_1").value = ehdreu;
            document.getElementById("aux_1").value = ehdrsu;
            document.getElementById("emerg_2").value = ehireu;
            document.getElementById("aux_2").value = ehirsu;
            document.getElementById("emerg_3").value = ehbeu;
            document.getElementById("aux_3").value = ehbsu;
            cont_err = 0;
            actualizarpagina6();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina5()", 141);
        return;
    });
}
function actualizarpagina6() {
    var cadena = "idOperacion=2133";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        var datos = data.split("\n");
        var datos_correctos = eliminarErrores(datos);
        var datos2 = datos_correctos[datos_correctos.length - 1];
        if (datos2 != 0) {
            cont_err++;
            if (cont_err >= 4) {
                cont_err = 0;
                alert(mensaje_reconexion);
            }
            setTimeout("actualizarpagina6()", 141);
            return;
        } else if (datos2 == 0) {
            hbtsp = parseInt(datos_correctos[16].replace("HBTSP=", ""), 16);
            if (hbtsp > 32768) {
                hbtsp = (hbtsp - 65536) / 10;
            } else {
                hbtsp = hbtsp / 10;
            }
            if (unidad_temp == 0) {
                document.getElementById("temp_inercia").innerHTML = hbtsp.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("temp_inercia").innerHTML = ((hbtsp * 1.8) + 32).toFixed(1);
            }
            document.getElementById('div_visible').style.display = "inline";
            cont_err = 0;
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("actualizarpagina6()", 141);
        return;
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
