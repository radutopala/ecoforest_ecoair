var cont_err = 0;
var timer_repeat;
datos_correctos = new Array;
function Inicializar() {
    unidades();
    traducir();
    getAlarmas();
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
            funcionalidades();
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
    var cadena = "idOperacion=2100";
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
            dpf = parseInt(datos_correctos[7].replace("DPF=", ""), 16);
            if (dpf & 0x0001) {
                document.getElementById('trconsigna_htr').hidden = false;
            }
            cont_err = 0;
            funcionalidades2();
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
function funcionalidades2() {
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
            setTimeout("funcionalidades2()", 141);
            return;
        } else if (datos2 == 0) {
            dgfi = parseInt(datos_correctos[3].replace("DGFI=", ""), 16);
            if (dgfi > 32768) {
                dgfi = dgfi - 65536;
            } else {
                dgfi = dgfi;
            }
            rcfi = parseInt(datos_correctos[10].replace("RCFI=", ""), 16);
            if (rcfi > 32768) {
                rcfi = rcfi - 65536;
            } else {
                rcfi = rcfi;
            }
            dcfi = parseInt(datos_correctos[2].replace("DCFI=", ""), 16);
            if (dcfi > 32768) {
                dcfi = dcfi - 65536;
            } else {
                dcfi = dcfi;
            }
            if (dcfi & 0x0001 || dcfi & 0x0002) {
                document.getElementById("tabla_recirculacion").style.display = "inline-table";
            }
            if (dcfi & 0x0001) {
                document.getElementById('trconsigna_recirc').hidden = false;
                document.getElementById('trdt_recirc').hidden = false;
            }
            if (rcfi & 0x0002) {
                document.getElementById('trcontrol_remoto').hidden = false;
            }
            if (dgfi & 0x0080) {
                document.getElementById('tabla_legionela').style.display = "inline-table";
            }
            if (dgfi & 0x0002 || dgfi & 0x0008 || dgfi & 0x0004) {
                document.getElementById('tabla_apoyos').style.display = "inline-table";
            }
            if (dgfi & 0x0002) {
                document.getElementById('calef1').hidden = false;
            }
            if (dgfi & 0x0008) {
                document.getElementById('calef2').hidden = false;
            }
            if (dgfi & 0x0004) {
                document.getElementById('calef3').hidden = false;
            }
            if (dgfi & 0x0001) {
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
        setTimeout("funcionalidades2()", 141);
        return;
    });
}
function traducir() {
    document.getElementById('txtcabecera_acs').innerHTML = acsleg.tcabecera_acs;
    document.getElementById('txtestado_acs').innerHTML = on_off.testado;
    document.getElementById('txtcontrol_remoto').innerHTML = mf3.trem_con;
    document.getElementById('txttemperatura_consigna').innerHTML = acsleg.tfijar_temp_acs;
    document.getElementById('txtdt_inicio').innerHTML = info.toffset;
    document.getElementById('txtconsigna_htr').innerHTML = nuevas.tconsigna_htr;
    document.getElementById('txtcabecera_legionela').innerHTML = acsleg.tcabecera_legionela;
    document.getElementById('txten_legionela').innerHTML = on_off.testado;
    document.getElementById('txthora').innerHTML = acsleg.thora;
    document.getElementById('txtlunes').innerHTML = fecha.tlunes;
    document.getElementById('txtmartes').innerHTML = fecha.tmartes;
    document.getElementById('txtmiercoles').innerHTML = fecha.tmiercoles;
    document.getElementById('txtjueves').innerHTML = fecha.tjueves;
    document.getElementById('txtviernes').innerHTML = fecha.tviernes;
    document.getElementById('txtsabado').innerHTML = fecha.tsabado;
    document.getElementById('txtdomingo').innerHTML = fecha.tdomingo;
    document.getElementById('txtcabecera_recirculacion_acs').innerHTML = dhw.txtcabecera_recirculacion_acs;
    document.getElementById('txt_hab_ret_acs').innerHTML = on_off.testado;
    document.getElementById('txtdt_recirc').innerHTML = info.toffset;
    document.getElementById('txtconsigna_recirc').innerHTML = acsleg.tfijar_temp_acs;
    document.getElementById('txtcabecera_sistema_auxiliar').innerHTML = acsleg.tcabecera_sistema_auxiliar;
    document.getElementById('txtemergencia').innerHTML = nuevas.temergencia;
    document.getElementById('txtapoyo').innerHTML = selectmenu.tapoyo;
    document.getElementById('txtaux1').innerHTML = nuevas.tresist_int;
    document.getElementById('txtaux2').innerHTML = nuevas.tresist_acs;
    document.getElementById('txtaux3').innerHTML = nuevas.tcaldera;
    for (var i = 1; i < 8; i++) {
        si = "txtsi" + i;
        no = "txtno" + i;
        document.getElementById(si).innerHTML = comunes.tsi;
        document.getElementById(no).innerHTML = comunes.tno;
    }
    for (i = 0; i < 10; i++) {
        deshab = "txtdeshab" + i;
        hab = "txthab" + i;
        document.getElementById(deshab).innerHTML = comunes.tdeshab;
        document.getElementById(hab).innerHTML = comunes.thab;
    }
    if (unidad_temp == 0) {
        for (i = 0; i < 5; i++) {
            units = "txttemp" + i;
            document.getElementById(units).innerHTML = "&deg;C";
        }
    } else if (unidad_temp == 1) {
        for (i = 0; i < 5; i++) {
            units = "txttemp" + i;
            document.getElementById(units).innerHTML = "&deg;F";
        }
    }
    document.getElementById('icon1').innerHTML = on_off.ton_off;
    document.getElementById('icon2').innerHTML = selectmenu.tcalendario;
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
    document.getElementById('txtcabecera_noconfig').innerHTML = acsleg.tcabecera_acs;
    document.getElementById('txtnoservicio').innerHTML = no_disponible;
    document.getElementById('titulo_web').innerHTML = version_easynet;
}
function actualizarpagina() {
    var cadena = "idOperacion=2103";
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
            as = parseInt(datos_correctos[4].replace("AS=", ""), 16);
            if (as > 32768) {
                as = (as - 65536) / 10;
            } else {
                as = as / 10;
            }
            ao = parseInt(datos_correctos[3].replace("AO=", ""), 16);
            if (ao > 32768) {
                ao = (ao - 65536) / 10;
            } else {
                ao = ao / 10;
            }
            atsh = parseInt(datos_correctos[2].replace("ATSH=", ""), 16);
            if (atsh > 32768) {
                atsh = (atsh - 65536) / 10;
            } else {
                atsh = atsh / 10;
            }
            ahl = parseInt(datos_correctos[6].replace("AHL=", ""), 16);
            if (ahl > 32768) {
                ahl = ahl - 65536;
            } else {
                ahl = ahl;
            }
            aml = parseInt(datos_correctos[8].replace("AML=", ""), 16);
            if (aml > 32768) {
                aml = aml - 65536;
            } else {
                aml = aml;
            }
            ro = parseInt(datos_correctos[9].replace("RO=", ""), 16);
            if (ro > 32768) {
                ro = (ro - 65536) / 10;
            } else {
                ro = ro / 10;
            }
            rc = parseInt(datos_correctos[10].replace("RC=", ""), 16);
            if (rc > 32768) {
                rc = (rc - 65536) / 10;
            } else {
                rc = rc / 10;
            }
            document.getElementById("sel_hora").value = ahl;
            document.getElementById("sel_minute").value = aml;
            if (unidad_temp == 0) {
                document.getElementById("temperatura_consigna").value = as.toFixed(1);
                document.getElementById("dt_acs").value = ao.toFixed(1);
                document.getElementById("consigna_htr").value = atsh.toFixed(1);
                document.getElementById("consigna_recirc").value = rc.toFixed(1);
                document.getElementById("dt_recirc").value = ro.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("temperatura_consigna").value = ((as * 1.8) + 32).toFixed(1);
                document.getElementById("dt_acs").value = (ao * 1.8).toFixed(1);
                document.getElementById("consigna_htr").value = ((atsh * 1.8) + 32).toFixed(1);
                document.getElementById("consigna_recirc").value = ((rc * 1.8) + 32).toFixed(1);
                document.getElementById("dt_recirc").value = (ro * 1.8).toFixed(1);
            }
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
    var cadena = "idOperacion=2104";
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
            aeu = parseInt(datos_correctos[3].replace("AEU=", ""));
            aeiu = parseInt(datos_correctos[4].replace("AEIU=", ""));
            le = parseInt(datos_correctos[6].replace("LE=", ""));
            ll = parseInt(datos_correctos[8].replace("LL=", ""));
            lm = parseInt(datos_correctos[9].replace("LM=", ""));
            lmi = parseInt(datos_correctos[10].replace("LMI=", ""));
            lj = parseInt(datos_correctos[7].replace("LJ=", ""));
            lv = parseInt(datos_correctos[12].replace("LV=", ""));
            ls = parseInt(datos_correctos[11].replace("LS=", ""));
            ld = parseInt(datos_correctos[5].replace("LD=", ""));
            reu = parseInt(datos_correctos[14].replace("REU=", ""));
            document.getElementById("en_acs").value = aeu;
            document.getElementById("en_acs_remoto").value = aeiu;
            document.getElementById("en_legionela").value = le;
            document.getElementById("lunes").value = ll;
            document.getElementById("martes").value = lm;
            document.getElementById("miercoles").value = lmi;
            document.getElementById("jueves").value = lj;
            document.getElementById("viernes").value = lv;
            document.getElementById("sabado").value = ls;
            document.getElementById("domingo").value = ld;
            document.getElementById("en_acs_1").value = reu;
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
            setTimeout("actualizarpagina2()", 141);
            return;
        } else if (datos2 == 0) {
            eddreu = (datos_correctos[7].replace("EDDREU=", ""));
            eddrsu = (datos_correctos[9].replace("EDDRSU=", ""));
            edireu = (datos_correctos[10].replace("EDIREU=", ""));
            edirsu = (datos_correctos[12].replace("EDIRSU=", ""));
            edbeu = (datos_correctos[4].replace("EDBEU=", ""));
            edbsu = (datos_correctos[5].replace("EDBSU=", ""));
            document.getElementById("emerg_1").value = eddreu;
            document.getElementById("aux_1").value = eddrsu;
            document.getElementById("emerg_2").value = edireu;
            document.getElementById("aux_2").value = edirsu;
            document.getElementById("emerg_3").value = edbeu;
            document.getElementById("aux_3").value = edbsu;
            document.getElementById('div_visible').style.display = "inline";
            cont_err = 0;
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
