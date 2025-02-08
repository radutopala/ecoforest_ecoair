digitals = new Array;
integers = new Array;
analogs = new Array;
datos_correctos_mod = new Array;
var cont_err = 0;
var timer_repeat;
function Inicializar() {
    document.getElementById('icono_espera').style.display = "inline";
    traducir();
    setTimeout('getVariablescgi()', 600);
}
function traducir() {
    document.getElementById("txtdemandas_activas1").innerHTML = nuevas.demandas_activas;
    document.getElementById('txtclimatizacion_a_ecoair').innerHTML = info.tclimatizacion;
    document.getElementById('txttemperatura_exterior').innerHTML = reg_clima.tdiseno;
    document.getElementById('txtcabecera_temp_exterior').innerHTML = info.txtcabecera_temp_exterior;
    document.getElementById('txttemp_exterior').innerHTML = reg_clima.tdiseno;
    document.getElementById('txttemp_corte').innerHTML = info.ttemp_corte;
    document.getElementById('txtfor_calefaccion').innerHTML = info.tfor_calefaccion;
    document.getElementById('txtinercia_heat').innerHTML = hc1.tiner1;
    document.getElementById('txtinercia_cool').innerHTML = hc1.tiner2;
    document.getElementById('txtset_inercia_heat').innerHTML = info.tconsigna_pool;
    document.getElementById('txtset_inercia_cool').innerHTML = info.tconsigna_pool;
    document.getElementById('txttemp_dep_heat').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txttemp_dep_cool').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset_inercia_heat').innerHTML = info.toffset;
    document.getElementById('txtoffset_inercia_cool').innerHTML = info.toffset;
    document.getElementById('txtcabecera_calefaccion').innerHTML = nuevas.theat_groups;
    document.getElementById('set_cab').innerHTML = info.tconsigna_pool;
    document.getElementById('real_t_cab').innerHTML = info.ttemp_acum_acs;
    document.getElementById('reg_cab').innerHTML = info.treg_cab;
    document.getElementById('txtz1a').innerHTML = hc1.tgd1_1;
    document.getElementById('txtz2a').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a').innerHTML = hc1.tgd3;
    document.getElementById('txtcabecera_refrigeracion').innerHTML = nuevas.tcool_groups;
    document.getElementById('set_cab_1').innerHTML = info.tconsigna_pool;
    document.getElementById('real_t_cab_1').innerHTML = info.ttemp_acum_acs;
    document.getElementById('reg_cab_1').innerHTML = info.treg_cab;
    document.getElementById('txtz1a').innerHTML = hc1.tgd1_1;
    document.getElementById('txtz2a').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a').innerHTML = hc1.tgd3;
    document.getElementById("txtcabecera_terminales_interiores").innerHTML = test.tcabecera_terminales_interiores;
    document.getElementById("txtgd1").innerHTML = "T1";
    document.getElementById("txtgd2").innerHTML = "T2";
    document.getElementById("txtgd3").innerHTML = "T3";
    document.getElementById("txtt_con").innerHTML = info.tconsigna_pool;
    document.getElementById("txtt_real").innerHTML = info.ttemp_acum_acs;
    document.getElementById("txthr").innerHTML = nuevas.thr;
    document.getElementById('txtacs').innerHTML = selectmenu.tacs_legionela;
    document.getElementById('txttemp_acum_acs').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset').innerHTML = info.toffset;
    document.getElementById('txtconsigna_acs').innerHTML = info.tconsigna_acs;
    document.getElementById('txtrecirculacion_acs').innerHTML = dhw.txtcabecera_recirculacion_acs;
    document.getElementById('txtestado_recirculacion').innerHTML = on_off.testado;
    document.getElementById('txtretorno_setp').innerHTML = info.tconsigna_acs;
    document.getElementById('txtretorno').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtdtretorno').innerHTML = info.toffset;
    document.getElementById('txtpool').innerHTML = piscina.txtcabecera_piscina;
    document.getElementById('txttemp_acum_pool').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtconsigna_pool').innerHTML = info.tconsigna_pool;
    document.getElementById('txtoffset_pool').innerHTML = info.toffset;
    document.getElementById('txtcabecera_bateria_tubos').innerHTML = act_man_comp.tcabecera_bateria_tubos;
    document.getElementById('txtporcentaje_ventilador').innerHTML = act_man_comp.tventilador_1;
    document.getElementById('txtdt_bateria').innerHTML = act_man_comp.tdt_bateria;
    document.getElementById('txtescarcha').innerHTML = act_man_comp.tescarcha_1;
    document.getElementById('txtenergia_instantaneo').innerHTML = info.tenergia_mes_anno;
    document.getElementById('txtenergia_util_heat_1').innerHTML = mf3.tenergia_util_heat;
    document.getElementById('txtenergia_util_cool_1').innerHTML = mf3.tenergia_util_cool;
    document.getElementById('txtenerg_elect_1').innerHTML = info.tenerg_elect;
    document.getElementById('txtcabecera_caldera').innerHTML = act_man_comp.txtcabecera_caldera;
    document.getElementById('txtestado_caldera').innerHTML = on_off.testado;
    document.getElementById('txttemperatura_r_caldera').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtregulacion_caldera').innerHTML = info.treg_cab;
    document.getElementById('txtcontadores_emanager').innerHTML = system.contadores_emanager;
    document.getElementById('txtconsumo_emanager').innerHTML = system.e_consumo_cargas;
    document.getElementById('txtinyeccion_emanager').innerHTML = system.e_inyeccion1;
    document.getElementById('txtcontrol_excedente').innerHTML = system.e_excedente_mayus;
    document.getElementById('txtestado_excedente').innerHTML = on_off.testado;
    document.getElementById('txtreal_excedente').innerHTML = comunes.real;
    document.getElementById('txtconsigna_excedente').innerHTML = comunes.consigna;
    document.getElementById('txtlimite').innerHTML = system.e_limite_consumo_mayus;
    document.getElementById('txtestado_limite').innerHTML = on_off.testado;
    document.getElementById('txtreal_limite').innerHTML = comunes.real;
    document.getElementById('txtconsigna_limite').innerHTML = comunes.consigna;
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
    document.getElementById('home').innerHTML = nuevas_paginas.home;
    document.getElementById('versiones').innerHTML = nuevas_paginas.t_versiones;
    document.getElementById('icon_inf1').innerHTML = nuevas_paginas.informacion_1;
    document.getElementById('icon_inf2').innerHTML = nuevas_paginas.informacion_2;
    document.getElementById('icon_inf3').innerHTML = nuevas_paginas.informacion_grafica;
}
function getVariablescgi() {
    clearTimeout(timer_repeat);
    di_1();
}
function di_1() {
    var reg_ini = 24;
    var num_reg = 62;
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
            digitals[24] = datos_correctos[0 + 2];
            digitals[29] = datos_correctos[5 + 2];
            digitals[35] = datos_correctos[11 + 2];
            for (var i = 18; i < 25; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 35; i < 48; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 60; i < num_reg; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
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
    var reg_ini = 251;
    var num_reg = 35;
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
            digitals[251] = datos_correctos[0 + 2];
            digitals[262] = datos_correctos[11 + 2];
            for (var i = 15; i < 17; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
            for (var i = 23; i < num_reg; i++) {
                var digital = digital_ini + i;
                digitals[digital] = datos_correctos[i + 2];
            }
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
    var reg_ini = 5002;
    var num_reg = 32;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            datos_correctos_mod[0] = parseInt(datos_correctos[0 + 2], 16);
            if (datos_correctos_mod[0] > 32768) {
                integers[1] = datos_correctos_mod[0] - 65536;
            } else {
                integers[1] = datos_correctos_mod[0];
            }
            for (var i = 6; i < 15; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            datos_correctos_mod[24] = parseInt(datos_correctos[24 + 2], 16);
            if (datos_correctos_mod[24] > 32768) {
                integers[25] = datos_correctos_mod[24] - 65536;
            } else {
                integers[25] = datos_correctos_mod[24];
            }
            datos_correctos_mod[31] = parseInt(datos_correctos[31 + 2], 16);
            if (datos_correctos_mod[31] > 32768) {
                integers[32] = datos_correctos_mod[31] - 65536;
            } else {
                integers[32] = datos_correctos_mod[31];
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
    var reg_ini = 5045;
    var num_reg = 6;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
    var reg_ini = 5089;
    var num_reg = 3;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            en_4();
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
}
function en_4() {
    var reg_ini = 5133;
    var num_reg = 29;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("en_4()", 141);
            return;
        } else {
            for (var i = 0; i < 3; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            for (var i = 6; i < 16; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            for (var i = 26; i < num_reg; i++) {
                var entero = entero_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    integers[entero] = datos_correctos_mod[i] - 65536;
                } else {
                    integers[entero] = datos_correctos_mod[i];
                }
            }
            cont_err = 0;
            en_5();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_4()", 141);
        return;
    });
}
function en_5() {
    var reg_ini = 5191;
    var num_reg = 4;
    var entero_ini = Number(reg_ini - 5001);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("en_5()", 141);
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
            an_1();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("en_5()", 141);
        return;
    });
}
function an_1() {
    var reg_ini = 1;
    var num_reg = 39;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_1()", 141);
            return;
        } else {
            for (var i = 0; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
            an_2();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_1()", 141);
        return;
    });
}
function an_2() {
    var reg_ini = 41;
    var num_reg = 26;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_2()", 141);
            return;
        } else {
            for (var i = 0; i < 4; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            datos_correctos_mod[25] = parseInt(datos_correctos[25 + 2], 16);
            if (datos_correctos_mod[25] > 32768) {
                analogs[66] = (datos_correctos_mod[25] - 65536) / 10;
            } else {
                analogs[66] = datos_correctos_mod[25] / 10;
            }
            cont_err = 0;
            an_3();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_2()", 141);
        return;
    });
}
function an_3() {
    var reg_ini = 117;
    var num_reg = 37;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_3()", 141);
            return;
        } else {
            for (var i = 0; i < 4; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 6; i < 9; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 11; i < 14; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 16; i < 22; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 34; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            cont_err = 0;
            an_4();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_3()", 141);
        return;
    });
}
function an_4() {
    var reg_ini = 161;
    var num_reg = 6;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_4()", 141);
            return;
        } else {
            for (var i = 0; i < 3; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            datos_correctos_mod[5] = parseInt(datos_correctos[5 + 2], 16);
            if (datos_correctos_mod[5] > 32768) {
                analogs[166] = (datos_correctos_mod[5] - 65536) / 10;
            } else {
                analogs[166] = datos_correctos_mod[5] / 10;
            }
            cont_err = 0;
            an_5();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_4()", 141);
        return;
    });
}
function an_5() {
    var reg_ini = 199;
    var num_reg = 25;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_5()", 141);
            return;
        } else {
            for (var i = 0; i < 2; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            datos_correctos_mod[24] = parseInt(datos_correctos[24 + 2], 16);
            if (datos_correctos_mod[24] > 32768) {
                analogs[166] = (datos_correctos_mod[24] - 65536) / 10;
            } else {
                analogs[223] = datos_correctos_mod[24] / 10;
            }
            cont_err = 0;
            an_6();
        }
    }).fail(function () {
        cont_err++;
        if (cont_err >= 4) {
            cont_err = 0;
            alert(mensaje_reconexion);
        }
        setTimeout("an_5()", 141);
        return;
    });
}
function an_6() {
    var reg_ini = 235;
    var num_reg = 7;
    var analog_ini = Number(reg_ini);
    var cadena = "idOperacion=2002&dir=" + reg_ini + "&num=" + num_reg;
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
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
            setTimeout("an_6()", 141);
            return;
        } else {
            for (var i = 0; i < 2; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
                }
            }
            for (var i = 4; i < num_reg; i++) {
                var analog = analog_ini + i;
                datos_correctos_mod[i] = parseInt(datos_correctos[i + 2], 16);
                if (datos_correctos_mod[i] > 32768) {
                    analogs[analog] = (datos_correctos_mod[i] - 65536) / 10;
                } else {
                    analogs[analog] = datos_correctos_mod[i] / 10;
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
        setTimeout("an_6()", 141);
        return;
    });
    parseResults();
}
function parseResults() {
    document.getElementById('div_izquierda_informacion').style.display = "inline";
    document.getElementById("TIC_a_ecoair").innerHTML = analogs[4] + " &deg;C";
    document.getElementById("TRC_a_ecoair").innerHTML = analogs[5] + " &deg;C";
    document.getElementById("PCC_a").innerHTML = analogs[6] + " bar";
    document.getElementById("Reg_BC_a_ecoair").innerHTML = analogs[29] + " %";
    a = analogs[4];
    b = analogs[5];
    c = Math.abs(a - b);
    d = c.toFixed(1);
    document.getElementById("saltoclima_a").innerHTML = d + " &deg;C";
    document.getElementById("temperatura_exterior_1").innerHTML = analogs[20] + " &deg;C";
    document.getElementById("porcentaje_ventilador_1").innerHTML = analogs[30] + " %";
    for (var i = 1; i < 4; i++) {
        var variab = 131 + i;
        var place = "zone_" + i;
        var image_c = "../../../imagesnew/grupos_calefaccion.png";
        var image_r = "../../../imagesnew/grupos_refrigeracion.png";
        var number_b = "number_" + i;
        if (integers[variab] == 0) {
            document.getElementById(number_b).style.display = "none"
            document.getElementById(place).style.display = "none";
        } else if (integers[variab] == 1) {
            document.getElementById(place).src = image_c;
            document.getElementById(place).style.display = "inline";
            document.getElementById(number_b).style.display = "inline";
        } else if (integers[variab] == 2) {
            document.getElementById(place).src = image_r;
            document.getElementById(place).style.display = "inline";
            document.getElementById(number_b).style.display = "inline";
        }
    }
    t1();
    t2();
    t3();
    t4();
    document.getElementById("sel_progr").style.display = "inline";
    if (digitals[42] == 1) {
        document.getElementById("tabla_calefaccion").style.display = "inline-table";
    } else {
        document.getElementById("tabla_calefaccion").style.display = "none";
    }
    if (digitals[64] == 1) {
        document.getElementById("tabla_refrigeracion").style.display = "inline-table";
    } else {
        document.getElementById("tabla_refrigeracion").style.display = "none";
    }
    if (digitals[59] == 1) {
        document.getElementById("tabla_acs").style.display = "inline-table";
    } else {
        document.getElementById("tabla_acs").style.display = "none";
    }
    if (digitals[59] == 1 && digitals[61] == 1) {
        document.getElementById("tabla_recirculación_acs").style.display = "inline-table";
    } else {
        document.getElementById("tabla_recirculación_acs").style.display = "none";
    }
    if (digitals[62] == 1) {
        document.getElementById("tabla_piscina").style.display = "inline-table";
    } else {
        document.getElementById("tabla_piscina").style.display = "none";
    }
    document.getElementById('temp_exterior').innerHTML = analogs[20];
    document.getElementById('temp_cal').innerHTML = analogs[44];
    document.getElementById('temp_ref').innerHTML = analogs[66];
    if (digitals[42] == 1) {
        document.getElementById('zona_cal').hidden = false;
    }
    if (digitals[65] == 1 || digitals[64] == 1) {
        document.getElementById('zona_ref').hidden = false;
        if (digitals[65] == 1 && digitals[64] == 1) {
            document.getElementById('txtfor_refrigeracion').innerHTML = selectmenu.tfrio_pasivo;
        } else {
            document.getElementById('txtfor_refrigeracion').innerHTML = selectmenu.tfrio_pasivo;
        }
    }
    if (digitals[42] == 1 || digitals[64] == 1 || digitals[65] == 1) {
        document.getElementById('zona1_th').hidden = false;
    }
    document.getElementById("set_inercia_heat").innerHTML = analogs[23];
    document.getElementById("temp_dep_heat").innerHTML = analogs[17];
    document.getElementById("offset_inercia_heat").innerHTML = analogs[117];
    document.getElementById("set_inercia_cool").innerHTML = analogs[24];
    document.getElementById("temp_dep_cool").innerHTML = analogs[18];
    document.getElementById("offset_inercia_cool").innerHTML = analogs[118];
    if ((integers[25] == 2 || integers[25] == 3) && digitals[42] == 1) {
        document.getElementById("heat0").hidden = false;
        document.getElementById("heat1").hidden = false;
        document.getElementById("heat2").hidden = false;
        document.getElementById("heat3").hidden = false;
    }
    if (integers[32] == 2 && (digitals[64] == 1 || digitals[65] == 1)) {
        document.getElementById("cool0").hidden = false;
        document.getElementById("cool1").hidden = false;
        document.getElementById("cool2").hidden = false;
        document.getElementById("cool3").hidden = false;
    }
    document.getElementById('set_th1').innerHTML = analogs[123] + " &deg;C";
    document.getElementById('set_th2').innerHTML = analogs[124] + " &deg;C";
    document.getElementById('set_th3').innerHTML = analogs[125] + " &deg;C";
    if (digitals[44] == 0) {
        document.getElementById('set_th1').innerHTML = "----";
        document.getElementById('real_t_th1').innerHTML = "----";
        document.getElementById('reg_th1').innerHTML = "----";
    }
    if (digitals[45] == 0) {
        document.getElementById('set_th2').innerHTML = "----";
        document.getElementById('real_t_th2').innerHTML = "----";
        document.getElementById('reg_th2').innerHTML = "----";
    }
    if (digitals[46] == 0) {
        document.getElementById('set_th3').innerHTML = "----";
        document.getElementById('real_t_th3').innerHTML = "----";
        document.getElementById('reg_th3').innerHTML = "----";
    }
    if (integers[190] == 2) {
        document.getElementById('real_t_th1').innerHTML = "----";
        document.getElementById('reg_th1').innerHTML = "----";
    }
    if (integers[191] == 2) {
        document.getElementById('real_t_th2').innerHTML = "----";
        document.getElementById('reg_th2').innerHTML = "----";
    }
    if (integers[192] == 2) {
        document.getElementById('real_t_th3').innerHTML = "----";
        document.getElementById('reg_th3').innerHTML = "----";
    }
    if (digitals[274] == 0) {
        document.getElementById('real_t_th1').innerHTML = "----";
    } else {
        document.getElementById('real_t_th1').innerHTML = analogs[21] + " &deg;C";
    }
    if (digitals[275] == 0) {
        document.getElementById('real_t_th2').innerHTML = "----";
    } else {
        document.getElementById('real_t_th2').innerHTML = analogs[13] + " &deg;C";
    }
    if (digitals[276] == 0) {
        document.getElementById('real_t_th3').innerHTML = "----";
    } else {
        document.getElementById('real_t_th3').innerHTML = analogs[14] + " &deg;C";
    }
    if (digitals[280] == 0) {
        document.getElementById('reg_th1').innerHTML = "----";
    } else {
        document.getElementById('reg_th1').innerHTML = analogs[33] + "%";
    }
    if (digitals[281] == 0) {
        document.getElementById('reg_th2').innerHTML = "----";
    } else {
        document.getElementById('reg_th2').innerHTML = analogs[31] + "%";
    }
    if (digitals[282] == 0) {
        document.getElementById('reg_th3').innerHTML = "----";
    } else {
        document.getElementById('reg_th3').innerHTML = analogs[32] + "%";
    }
    document.getElementById('set_th1_1').innerHTML = analogs[128] + " &deg;C";
    document.getElementById('set_th2_1').innerHTML = analogs[129] + " &deg;C";
    document.getElementById('set_th3_1').innerHTML = analogs[130] + " &deg;C";
    if (digitals[67] == 0) {
        document.getElementById('set_th1_1').innerHTML = "----";
        document.getElementById('real_t_th1_1').innerHTML = "----";
        document.getElementById('reg_th1_1').innerHTML = "----";
    }
    if (digitals[68] == 0) {
        document.getElementById('set_th2_1').innerHTML = "----";
        document.getElementById('real_t_th2_1').innerHTML = "----";
        document.getElementById('reg_th2_1').innerHTML = "----";
    }
    if (digitals[69] == 0) {
        document.getElementById('set_th3_1').innerHTML = "----";
        document.getElementById('real_t_th3_1').innerHTML = "----";
        document.getElementById('reg_th3_1').innerHTML = "----";
    }
    if (integers[190] == 2) {
        document.getElementById('real_t_th1_1').innerHTML = "----";
        document.getElementById('reg_th1_1').innerHTML = "----";
    }
    if (integers[191] == 2) {
        document.getElementById('real_t_th2_1').innerHTML = "----";
        document.getElementById('reg_th2_1').innerHTML = "----";
    }
    if (integers[192] == 2) {
        document.getElementById('real_t_th3_1').innerHTML = "----";
        document.getElementById('reg_th3_1').innerHTML = "----";
    }
    if (digitals[277] == 0) {
        document.getElementById('real_t_th1_1').innerHTML = "----";
    } else {
        document.getElementById('real_t_th1_1').innerHTML = analogs[21] + " &deg;C";
    }
    if (digitals[278] == 0) {
        document.getElementById('real_t_th2_1').innerHTML = "----";
    } else {
        document.getElementById('real_t_th2_1').innerHTML = analogs[13] + " &deg;C";
    }
    if (digitals[279] == 0) {
        document.getElementById('real_t_th3_1').innerHTML = "----";
    } else {
        document.getElementById('real_t_th3_1').innerHTML = analogs[14] + " &deg;C";
    }
    if (digitals[283] == 0) {
        document.getElementById('reg_th1_1').innerHTML = "----";
    } else {
        document.getElementById('reg_th1_1').innerHTML = analogs[33] + "%";
    }
    if (digitals[284] == 0) {
        document.getElementById('reg_th2_1').innerHTML = "----";
    } else {
        document.getElementById('reg_th2_1').innerHTML = analogs[31] + "%";
    }
    if (digitals[285] == 0) {
        document.getElementById('reg_th3_1').innerHTML = "----";
    } else {
        document.getElementById('reg_th3_1').innerHTML = analogs[32] + "%";
    }
    first_t();
    if (digitals[83] == 1 || digitals[84] == 1 || digitals[85] == 1) {
        document.getElementById("gd3").hidden = true;
    }
    document.getElementById("c_dg1").innerHTML = analogs[151] + " &deg;C";
    document.getElementById("c_dg2").innerHTML = analogs[152] + " &deg;C";
    document.getElementById("c_dg3").innerHTML = analogs[153] + " &deg;C";
    document.getElementById("d_dg1").innerHTML = analogs[161] + " &deg;C";
    document.getElementById("d_dg2").innerHTML = analogs[162] + " &deg;C";
    document.getElementById("d_dg3").innerHTML = analogs[163] + " &deg;C";
    document.getElementById("h_dg1").innerHTML = integers[158] + "%";
    document.getElementById("h_dg2").innerHTML = integers[159] + "%";
    document.getElementById("h_dg3").innerHTML = integers[160] + "%";
    check_gd1();
    check_gd2();
    check_gd3();
    if (integers[143] == 0) {
        document.getElementById('gd1').hidden = true;
    } else {
        document.getElementById('gd1').hidden = false;
    }
    if (integers[144] == 0) {
        document.getElementById('gd2').hidden = true;
    } else {
        document.getElementById('gd2').hidden = false;
    }
    if (integers[145] == 0) {
        document.getElementById('gd3').hidden = true;
    } else {
        document.getElementById('gd3').hidden = false;
    }
    if (integers[143] == 0 && integers[144] == 0 && integers[145] == 0) {
        document.getElementById('gd0').hidden = true;
        document.getElementById('ocultar_terminales_interiores').hidden = true;
    } else {
        document.getElementById('gd0').hidden = false;
        document.getElementById('ocultar_terminales_interiores').hidden = false;
    }
    document.getElementById("temp_acum_acs").innerHTML = analogs[11];
    document.getElementById("offset").innerHTML = analogs[41];
    document.getElementById("consigna_acs").innerHTML = analogs[38];
    document.getElementById("retorno_setp").innerHTML = analogs[42];
    document.getElementById("retorno").innerHTML = analogs[12];
    document.getElementById("dtretorno").innerHTML = analogs[43];
    if (digitals[61] == 1) {
        document.getElementById("retorno1").hidden = false;
        document.getElementById("retorno2").hidden = false;
        document.getElementById("retorno3").hidden = false;
    }
    document.getElementById("temp_acum_pool").innerHTML = analogs[19];
    document.getElementById("consigna_pool").innerHTML = analogs[119];
    document.getElementById("offset_pool").innerHTML = analogs[120];
    document.getElementById("porcentaje_ventilador").innerHTML = analogs[30];
    document.getElementById("dt_bateria").innerHTML = analogs[199];
    document.getElementById("escarcha").innerHTML = analogs[200];
    document.getElementById("energ_util_cool_1").innerHTML = analogs[134] + "kW";
    document.getElementById("energ_util_heat_1").innerHTML = analogs[133] + "kW";
    document.getElementById("eer_value_1").innerHTML = analogs[137];
    document.getElementById("cop_value_1").innerHTML = analogs[136];
    document.getElementById("e_elect_1").innerHTML = analogs[135] + "kW";
    document.getElementById("pf_value_1").innerHTML = analogs[138];
    if (digitals[262] == 1) {
        document.getElementById("consumo").innerHTML = analogs[239];
        document.getElementById("inyeccion").innerHTML = analogs[240];
        document.getElementById("contador_emanager").style.display = "inline-table";
    } else {
        document.getElementById("contador_emanager").style.display = "none";
    }
    if (digitals[262] == 1) {
        if (digitals[266] == 0) {
            document.getElementById('estado_excedente').innerHTML = comunes.toff;
        } else {
            document.getElementById('estado_excedente').innerHTML = comunes.ton;
        }
        if (digitals[267] == 0) {
            document.getElementById('estado_limite').innerHTML = comunes.toff;
        } else {
            document.getElementById('estado_limite').innerHTML = comunes.ton;
        }
        document.getElementById("real_excedente").innerHTML = analogs[241];
        document.getElementById("consigna_excedente").innerHTML = analogs[236];
        document.getElementById("real_limite").innerHTML = analogs[241];
        document.getElementById("consigna_limite").innerHTML = analogs[235];
        document.getElementById("tabla_excedente").style.display = "inline-table";
        document.getElementById("tabla_limite").style.display = "inline-table";
    } else {
        document.getElementById("tabla_excedente").style.display = "none";
        document.getElementById("tabla_limite").style.display = "none";
    }
    document.getElementById("estado_caldera").innerHTML = digitals[251];
    document.getElementById("temperatura_r_caldera").innerHTML = analogs[22];
    document.getElementById("regulacion_caldera").innerHTML = analogs[32];
    if (digitals[251] == 0) {
        document.getElementById("tabla_caldera").style.display = "none";
    } else {
        document.getElementById("tabla_caldera").style.display = "inline-table";
    }
    if (digitals[29] == 0) {
        document.getElementById('estado_caldera').innerHTML = comunes.toff;
    } else {
        document.getElementById('estado_caldera').innerHTML = comunes.ton;
    }
    if (digitals[24] == 0) {
        document.getElementById('estado_recirculacion').innerHTML = comunes.toff;
    } else {
        document.getElementById('estado_recirculacion').innerHTML = comunes.ton;
    }
    document.getElementById('icono_espera').style.display = "none";
    timer_repeat = setTimeout("getVariablescgi()", 3500);
}
function first_t() {
    if ((digitals[44] == 1 || digitals[67] == 1) && (integers[143] == 1 || integers[143] == 2)) {
        true_1 = 1;
    } else if ((digitals[45] == 1 || digitals[68] == 1) && (integers[144] == 1 || integers[144] == 2)) {
        true_1 = 1;
    } else if ((digitals[46] == 1 || digitals[69] == 1) && (integers[145] == 1 || integers[145] == 2)) {
        true_1 = 1;
    } else if ((digitals[47] == 1 || digitals[70] == 1) && (integers[146] == 1 || integers[146] == 2)) {
        true_1 = 1;
    } else if ((digitals[48] == 1 || digitals[71] == 1) && (integers[147] == 1 || integers[147] == 2)) {
        true_1 = 1;
    }
}
function t1() {
    if (integers[138] == 0) {
        document.getElementById("top_1").style.display = "none";
    } else {
        document.getElementById("top_1").style.display = "inline";
        if (integers[138] == 1) {
            document.getElementById("top_1").src = "../../../imagesnew/calefaccion_directa.png";
        } else if (integers[138] == 2) {
            document.getElementById("top_1").src = "../../../imagesnew/calefaccion_inercia.png";
        }
    }
}
function t2() {
    if (integers[139] == 0) {
        document.getElementById("top_2").style.display = "none";
    } else {
        document.getElementById("top_2").style.display = "inline";
        if (integers[139] == 1) {
            document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_directa.png";
        } else if (integers[139] == 2) {
            document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_inercia.png";
        }
    }
}
function t3() {
    if (integers[140] == 0) {
        document.getElementById("top_3").style.display = "none";
    } else {
        document.getElementById("top_3").style.display = "inline";
        if (integers[140] == 1) {
            document.getElementById("top_3").src = "../../../imagesnew/acs.png";
        }
    }
}
function t4() {
    if (integers[141] == 0) {
        document.getElementById("top_4").style.display = "none";
    } else {
        document.getElementById("top_4").style.display = "inline";
        if (integers[141] == 1) {
            document.getElementById("top_4").src = "../../../imagesnew/piscina.png";
        }
    }
}
function check_gd1() {
    if ((digitals[44] == 1 || digitals[67] == 1) && (integers[143] == 1 || integers[143] == 2)) { } else {
        document.getElementById("c_dg1").innerHTML = "---";
        document.getElementById("d_dg1").innerHTML = "---";
        document.getElementById("h_dg1").innerHTML = "---";
    }
}
function check_gd2() {
    if ((digitals[45] == 1 || digitals[68] == 1) && (integers[144] == 1 || integers[144] == 2)) { } else {
        document.getElementById("c_dg2").innerHTML = "---";
        document.getElementById("d_dg2").innerHTML = "---";
        document.getElementById("h_dg2").innerHTML = "---";
    }
}
function check_gd3() {
    if ((digitals[46] == 1 || digitals[69] == 1) && (integers[145] == 1 || integers[145] == 2)) { } else {
        document.getElementById("c_dg3").innerHTML = "---";
        document.getElementById("d_dg3").innerHTML = "---";
        document.getElementById("h_dg3").innerHTML = "---";
    }
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
