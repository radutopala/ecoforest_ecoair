datos_correctos = new Array;
var timer_repeat;
var cont_err = 0;
var remoto_val;
var var_u = 0;
var state;
var comp_reloj = 120;
var fecha = 0;
function Inicializar() {
    swLoad();
    unidades();
    traducir();
    getHora();
    getAlarmas();
    periodicamente();
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
function periodicamente() {
    clearTimeout(timer_repeat);
    actualizarpagina();
    timer_repeat = setTimeout("periodicamente()", 10000);
}
function traducir() {
    document.getElementById('number_1').innerHTML = "1";
    document.getElementById('number_2').innerHTML = "2";
    document.getElementById('number_3').innerHTML = "3";
    document.getElementById('number_4').innerHTML = "4";
    document.getElementById('number_5').innerHTML = "5";
    document.getElementById('txtestado').innerHTML = nuevas_paginas.testado_min;
    document.getElementById('modo_operacion').innerHTML = nuevas_paginas.modo_operacion1;
    document.getElementById('potencias_inst').innerHTML = info.tenergia_mes_anno;
    document.getElementById('unidades_cop').innerHTML = "COP";
    document.getElementById('unidades_eer').innerHTML = "EER";
    document.getElementById('unidades_pf').innerHTML = "PF";
    document.getElementById('demandas_produccion').innerHTML = nuevas_paginas.demandas_prod;
    document.getElementById('demandas_consumo').innerHTML = nuevas_paginas.demandas_consumo;
    document.getElementById('txton_off_odus').innerHTML = "ON/OFF ODUs";
    document.getElementById('txtestado_odu1').innerHTML = "ODU 1";
    document.getElementById('txtestado_odu2').innerHTML = "ODU 2";
    document.getElementById('txtestado_odu3').innerHTML = "ODU 3";
    document.getElementById('txtestado_odu4').innerHTML = "ODU 4";
    document.getElementById('txtestado_odu5').innerHTML = "ODU 5";
    document.getElementById('txtestado_odu6').innerHTML = "ODU 6";
    document.getElementById('txtcabecera_caldera').innerHTML = act_man_comp.txtcabecera_caldera;
    document.getElementById('txtestado_caldera').innerHTML = on_off.testado;
    document.getElementById('txttemperatura_r_caldera').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtregulacion_caldera').innerHTML = info.treg_cab;
    document.getElementById('txtcabecera_enfriadora').innerHTML = egw24.enfriadora;
    document.getElementById('txtestado_enfriadora').innerHTML = on_off.testado;
    document.getElementById('txttemperatura_enfriadora').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtregulacion_enfriadora').innerHTML = info.treg_cab;
    document.getElementById('txtcabecera_temp_exterior').innerHTML = info.txtcabecera_temp_exterior;
    document.getElementById('txttemp_exterior').innerHTML = reg_clima.tdiseno;
    document.getElementById('txttemp_corte').innerHTML = info.ttemp_corte;
    document.getElementById('txtfor_calefaccion').innerHTML = info.tfor_calefaccion;
    document.getElementById('txtrefrigeracion_activa').innerHTML = info.tfor_act_refrigeracion;
    document.getElementById('txtrefrigeracion_pasiva').innerHTML = info.tfor_refrigeracion;
    document.getElementById("txtcabecera_terminales_interiores").innerHTML = test.tcabecera_terminales_interiores;
    document.getElementById("txtgd1").innerHTML = "Z1";
    document.getElementById("txtgd2").innerHTML = "Z2";
    document.getElementById("txtgd3").innerHTML = "Z3";
    document.getElementById("txtgd4").innerHTML = "Z4";
    document.getElementById("txtgd5").innerHTML = "Z5";
    document.getElementById("txtt_con").innerHTML = info.tconsigna_pool;
    document.getElementById("txtt_real").innerHTML = info.ttemp_acum_acs;
    document.getElementById("txthr").innerHTML = nuevas.thr;
    document.getElementById('txtcabecera_calefaccion').innerHTML = nuevas.theat_groups;
    document.getElementById('set_cab').innerHTML = info.tconsigna_pool;
    document.getElementById('real_t_cab').innerHTML = info.ttemp_acum_acs;
    document.getElementById('reg_cab').innerHTML = info.treg_cab;
    document.getElementById('txtz1a').innerHTML = hc1.tgd1_1;
    document.getElementById('txtz2a').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a').innerHTML = hc1.tgd3;
    document.getElementById('txtz4a').innerHTML = hc1.tgd4;
    document.getElementById('txtz5a').innerHTML = hc1.tgd5;
    document.getElementById('txtcabecera_refrigeracion').innerHTML = nuevas.tcool_groups;
    document.getElementById('set_cab_1').innerHTML = info.tconsigna_pool;
    document.getElementById('real_t_cab_1').innerHTML = info.ttemp_acum_acs;
    document.getElementById('reg_cab_1').innerHTML = info.treg_cab;
    document.getElementById('txtz1a_1').innerHTML = hc1.tgd1_1;
    document.getElementById('txtz2a_1').innerHTML = hc1.tgd2;
    document.getElementById('txtz3a_1').innerHTML = hc1.tgd3;
    document.getElementById('txtz4a_1').innerHTML = hc1.tgd4;
    document.getElementById('txtz5a_1').innerHTML = hc1.tgd5;
    document.getElementById('txtinercia_heat').innerHTML = hc1.tiner1;
    document.getElementById('txtset_inercia_heat').innerHTML = info.tconsigna_pool;
    document.getElementById('txttemp_dep_heat').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset_inercia_heat').innerHTML = info.toffset;
    document.getElementById('txtinercia_cool').innerHTML = hc1.tiner2;
    document.getElementById('txtset_inercia_cool').innerHTML = info.tconsigna_pool;
    document.getElementById('txttemp_dep_cool').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset_inercia_cool').innerHTML = info.toffset;
    document.getElementById('txtacs').innerHTML = selectmenu.tacs_legionela;
    document.getElementById('txttemp_acum_acs').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtoffset').innerHTML = info.toffset;
    document.getElementById('txtconsigna_acs').innerHTML = info.tconsigna_acs;
    document.getElementById('txtrecirculacion_acs').innerHTML = dhw.txtcabecera_recirculacion_acs;
    document.getElementById('txtestado_recirculacion').innerHTML = on_off.testado;
    document.getElementById('txtreal_recirc').innerHTML = info.tconsigna_acs;
    document.getElementById('txtconsigna_recirc').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtdt_recirc').innerHTML = info.toffset;
    document.getElementById('txtpool1').innerHTML = piscina.txtcabecera_piscina;
    document.getElementById('txtestadopool').innerHTML = calefaccion.tcalefaccion;
    document.getElementById('txtimpulsion_pool').innerHTML = reg_clima.timpulsion;
    document.getElementById('txtconsigna_pool1').innerHTML = info.tconsigna_pool;
    document.getElementById('txtpool').innerHTML = piscina.txtcabecera_piscina;
    document.getElementById('txttemp_acum_pool').innerHTML = info.ttemp_acum_acs;
    document.getElementById('txtconsigna_pool').innerHTML = info.tconsigna_pool;
    document.getElementById('txtdt_pool').innerHTML = info.toffset;
    document.getElementById('txtcontrol_excedente').innerHTML = system.e_excedente_mayus;
    document.getElementById('txtestado_excedente').innerHTML = on_off.testado;
    document.getElementById('txtreal_excedente').innerHTML = comunes.real;
    document.getElementById('txtconsigna_excedente').innerHTML = comunes.consigna;
    document.getElementById('txtlimite').innerHTML = system.e_limite_consumo_mayus;
    document.getElementById('txtestado_limite').innerHTML = on_off.testado;
    document.getElementById('txtreal_limite').innerHTML = comunes.real;
    document.getElementById('txtconsigna_limite').innerHTML = comunes.consigna;
    if (unidad_temp == 0) {
        for (i = 0; i < 23; i++) {
            unitstemp = "txttemp" + i;
            document.getElementById(unitstemp).innerHTML = "&deg;C";
        }
    } else if (unidad_temp == 1) {
        for (i = 0; i < 23; i++) {
            unitstemp = "txttemp" + i;
            document.getElementById(unitstemp).innerHTML = "&deg;F";
        }
    }
    for (i = 0; i < 2; i++) {
        unitsreg = "txtreg" + i;
        document.getElementById(unitsreg).innerHTML = "%";
    }
    for (i = 0; i < 4; i++) {
        unitspot = "txtpot" + i;
        document.getElementById(unitspot).innerHTML = "kW";
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
    document.getElementById('icon_inf1').innerHTML = nuevas_paginas.tiempo_real;
    document.getElementById('icon_inf2').innerHTML = nuevas_paginas.hoy;
    document.getElementById('icon_inf3').innerHTML = egw24.contador_actual;
    document.getElementById('icon_inf4').innerHTML = egw24.contador_historico;
    document.getElementById('titulo_web').innerHTML = version_easynet;
}
function actualizarpagina() {
    var cadena = "idOperacion=2148";
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
            lg = parseInt(datos_correctos[0], 16);
            if (lg > 32768) {
                lg = lg - 65536;
            } else {
                lg = lg;
            }
            cd = parseInt(datos_correctos[3], 16);
            if (cd < 10) {
                dia = "0" + cd;
            } else if (cd >= 10) {
                dia = cd;
            }
            cmo = parseInt(datos_correctos[2], 16);
            if (cmo < 10) {
                mes = "0" + cmo;
            } else if (cmo >= 10) {
                mes = cmo;
            }
            cy = parseInt(datos_correctos[1], 16);
            if (cy < 10) {
                anno = "0" + cy;
            } else if (cy >= 10) {
                anno = cy;
            }
            ch = parseInt(datos_correctos[4], 16);
            if (ch < 10) {
                hora = "0" + ch;
            } else if (ch >= 10) {
                hora = ch;
            }
            cm = parseInt(datos_correctos[5], 16);
            if (cm < 10) {
                minuto = "0" + cm;
            } else if (cm >= 10) {
                minuto = cm;
            }
            ico1 = parseInt(datos_correctos[6], 16);
            if (ico1 > 32768) {
                ico1 = ico1 - 65536;
            } else {
                ico1 = ico1;
            }
            ic2 = parseInt(datos_correctos[7], 16);
            if (ic2 > 32768) {
                ic2 = ic2 - 65536;
            } else {
                ic2 = ic2;
            }
            ic3 = parseInt(datos_correctos[8], 16);
            if (ic3 > 32768) {
                ic3 = ic3 - 65536;
            } else {
                ic3 = ic3;
            }
            ic4 = parseInt(datos_correctos[9], 16);
            if (ic4 > 32768) {
                ic4 = ic4 - 65536;
            } else {
                ic4 = ic4;
            }
            ta = parseInt(datos_correctos[10], 16);
            if (ta > 32768) {
                ta = ta - 65536;
            } else {
                ta = ta;
            }
            fe = parseInt(datos_correctos[11], 16);
            if (fe > 32768) {
                fe = fe - 65536;
            } else {
                fe = fe;
            }
            fet = parseInt(datos_correctos[12], 16);
            if (fet > 32768) {
                fet = fet - 65536;
            } else {
                fet = fet;
            }
            fehn = parseInt(datos_correctos[13], 16);
            if (fehn > 32768) {
                fehn = fehn - 65536;
            } else {
                fehn = fehn;
            }
            fsoe = parseInt(datos_correctos[14], 16);
            if (fsoe > 32768) {
                fsoe = fsoe - 65536;
            } else {
                fsoe = fsoe;
            }
            fcc = parseInt(datos_correctos[15], 16);
            if (fcc > 32768) {
                fcc = fcc - 65536;
            } else {
                fcc = fcc;
            }
            tem = parseInt(datos_correctos[21], 16);
            if (tem > 32768) {
                tem = (tem - 65536) / 10;
            } else {
                tem = tem / 10;
            }
            trp = parseInt(datos_correctos[24], 16);
            if (trp > 32768) {
                trp = (trp - 65536) / 10;
            } else {
                trp = trp / 10;
            }
            tic = parseInt(datos_correctos[22], 16);
            if (tic > 32768) {
                tic = (tic - 65536) / 10;
            } else {
                tic = tic / 10;
            }
            tip = parseInt(datos_correctos[23], 16);
            if (tip > 32768) {
                tip = (tip - 65536) / 10;
            } else {
                tip = tip / 10;
            }
            trc = parseInt(datos_correctos[19], 16);
            if (trc > 32768) {
                trc = (trc - 65536) / 10;
            } else {
                trc = trc / 10;
            }
            pcp = parseInt(datos_correctos[20], 16);
            if (pcp > 32768) {
                pcp = (pcp - 65536) / 10;
            } else {
                pcp = pcp / 10;
            }
            pcc = parseInt(datos_correctos[18], 16);
            if (pcc > 32768) {
                pcc = (pcc - 65536) / 10;
            } else {
                pcc = pcc / 10;
            }
            dpfm = parseInt(datos_correctos[25], 16);
            if (dpfm > 32768) {
                dpfm = dpfm - 65536;
            } else {
                dpfm = dpfm;
            }
            hpfm = parseInt(datos_correctos[26], 16);
            if (hpfm > 32768) {
                hpfm = hpfm - 65536;
            } else {
                hpfm = hpfm;
            }
            cpfm = parseInt(datos_correctos[27], 16);
            if (cpfm > 32768) {
                cpfm = cpfm - 65536;
            } else {
                cpfm = cpfm;
            }
            epmrp = parseInt(datos_correctos[28], 16);
            if (epmrp > 32768) {
                epmrp = epmrp - 65536;
            } else {
                epmrp = epmrp;
            }
            ppfmode = parseInt(datos_correctos[29], 16);
            if (ppfmode > 32768) {
                ppfmode = ppfmode - 65536;
            } else {
                ppfmode = ppfmode;
            }
            htpfm = parseInt(datos_correctos[34], 16);
            if (htpfm > 32768) {
                htpfm = htpfm - 65536;
            } else {
                htpfm = htpfm;
            }
            ea3 = parseInt(datos_correctos[35], 16);
            if (ea3 > 32768) {
                ea3 = ea3 - 65536;
            } else {
                ea3 = ea3;
            }
            haf = parseInt(datos_correctos[32], 16);
            if (haf > 32768) {
                haf = haf - 65536;
            } else {
                haf = haf;
            }
            caf = parseInt(datos_correctos[33], 16);
            if (caf > 32768) {
                caf = caf - 65536;
            } else {
                caf = caf;
            }
            if (lg == 3 || lg == 4) {
                document.getElementById("modelo_bomba_ecoair").src = "../../../imagesnew/insertar_ecoair.png"
                document.getElementById('TIC_a_ecoair').style.display = "inline";
                document.getElementById('TRC_a_ecoair').style.display = "inline";
                document.getElementById('PCC_a_ecoair').style.display = "inline";
            } else if (lg == 1 || lg == 2 || lg == 5) {
                document.getElementById("modelo_bomba_ecogeo").src = "../../../imagesnew/insertar_ecogeo.png"
                document.getElementById('TRP_a').style.display = "inline";
                document.getElementById('TIC_a').style.display = "inline";
                document.getElementById('TIP_a').style.display = "inline";
                document.getElementById('TRC_a').style.display = "inline";
                document.getElementById('PCP_a').style.display = "inline";
                document.getElementById('PCC_a').style.display = "inline";
            }
            document.getElementById('hourDiv').innerHTML = (hora + ":" + minuto);
            document.getElementById('dateDiv').innerHTML = (dia + "/" + mes + "/" + "20" + anno);
            if (ico1 == 1) {
                document.getElementById("icono1").src = "../../../imagesnew/on_info.png";
            } else if (ico1 == 2) {
                document.getElementById("icono1").src = "../../../imagesnew/emergencia_info.png";
            } else if (ico1 == 3) {
                document.getElementById("icono1").src = "../../../imagesnew/off_info.png";
            }
            if (ta == 0) {
                document.getElementById("icono2").style.display = "none";
            } else if (ta == 2) {
                document.getElementById("icono2").src = "../../../imagesnew/off_supervisor1.png";
            } else if (ta == 3) {
                document.getElementById("icono2").src = "../../../imagesnew/off_calendario.png";
            }
            if (ic2 == 0) {
                document.getElementById("icono22").style.display = "none";
            } else if (ic2 == 1) {
                document.getElementById("icono22").src = "../../../imagesnew/alarma_activa.png";
            } else if (ic2 == 2) {
                document.getElementById("icono22").src = "../../../imagesnew/alarma_recurrencia.png";
            } else if (ic2 == 3) {
                document.getElementById("icono22").src = "../../../imagesnew/alarma_recurrencia.png";
            } else if (ic2 == 4) {
                document.getElementById("icono22").src = "../../../imagesnew/alarma_activa.png";
            } else if (ic2 == 5) {
                document.getElementById("icono22").src = "../../../imagesnew/alarma_bloqueo.png";
            }
            if (ic3 == 0) {
                document.getElementById("icono3").src = "../../../imagesnew/epoca_invierno.png";
            } else if (ic3 == 1) {
                document.getElementById("icono3").src = "../../../imagesnew/epoca_verano.png";
            } else if (ic3 == 2) {
                document.getElementById("icono3").src = "../../../imagesnew/epoca_mixto.png";
            }
            if (ic4 == 1) {
                document.getElementById("icono4").src = "../../../imagesnew/off_supervisor.png";
            } else if (ic4 == 2) {
                document.getElementById("icono4").src = "../../../imagesnew/epoca_auto.png";
            } else if (ic4 == 3) {
                document.getElementById("icono4").src = "../../../imagesnew/epoca_remoto_sel.png";
            }
            if (fe == 1 || fcc == 1) {
                document.getElementById("icono_info1").style.display = "inline";
                if (fe == 1) {
                    document.getElementById("icono_info1").src = "../../../imagesnew/icono_control_excedente.png";
                } else if (fcc == 1) {
                    document.getElementById("icono_info1").src = "../../../imagesnew/icono_control_consumo.png";
                }
            } else {
                document.getElementById("icono_info1").style.display = "none";
            }
            if (fet == 1) {
                document.getElementById("icono_info2").style.display = "inline";
                document.getElementById("icono_info2").src = "../../../imagesnew/icono_tarifa.png";
            } else {
                document.getElementById("icono_info2").style.display = "none";
            }
            if (fehn == 1) {
                document.getElementById("icono_info3").style.display = "inline";
                document.getElementById("icono_info3").src = "../../../imagesnew/nocturno.png";
            } else {
                document.getElementById("icono_info3").style.display = "none";
            }
            if (fsoe !== 0) {
                document.getElementById("icono_info4").style.display = "inline";
                switch (fsoe) {
                    case 1:
                        document.getElementById("icono_info4").src = "../../../imagesnew/icono_sg1.png";
                        break;
                    case 2:
                        document.getElementById("icono_info4").src = "../../../imagesnew/icono_sg2.png";
                        break;
                    case 3:
                        document.getElementById("icono_info4").src = "../../../imagesnew/icono_sg3.png";
                        break;
                    case 4:
                        document.getElementById("icono_info4").src = "../../../imagesnew/icono_sg4.png";
                        break;
                    case 5:
                        document.getElementById("icono_info4").src = "../../../imagesnew/off_evu.png";
                        break;
                    default:
                        break;
                }
            } else {
                document.getElementById("icono_info4").style.display = "none";
            }
            if (unidad_temp == 0) {
                document.getElementById("temp_exterior").innerHTML = tem.toFixed(1) + " &deg;C";
                document.getElementById("temp_exterior1").innerHTML = tem.toFixed(1);
                document.getElementById("TRP_a").innerHTML = trp.toFixed(1) + " &deg;C";
                document.getElementById("TIC_a").innerHTML = tic.toFixed(1) + " &deg;C";
                document.getElementById("TIP_a").innerHTML = tip.toFixed(1) + " &deg;C";
                document.getElementById("TRC_a").innerHTML = trc.toFixed(1) + " &deg;C";
                document.getElementById("TIC_a_ecoair").innerHTML = tic.toFixed(1) + " &deg;C";
                document.getElementById("TRC_a_ecoair").innerHTML = trc.toFixed(1) + " &deg;C";
            } else if (unidad_temp == 1) {
                document.getElementById("temp_exterior").innerHTML = ((tem * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("temp_exterior1").innerHTML = ((tem * 1.8) + 32).toFixed(1);
                document.getElementById("TRP_a").innerHTML = ((trp * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("TIC_a").innerHTML = ((tic * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("TIP_a").innerHTML = ((tip * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("TRC_a").innerHTML = ((trc * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("TIC_a_ecoair").innerHTML = ((tic * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("TRC_a_ecoair").innerHTML = ((trc * 1.8) + 32).toFixed(1) + " &deg;F";
            }
            if (unidad_pres == 0) {
                document.getElementById("PCP_a").innerHTML = pcp.toFixed(1) + " bar";
                document.getElementById("PCC_a").innerHTML = pcc.toFixed(1) + " bar";
                document.getElementById("PCC_a_ecoair").innerHTML = pcc.toFixed(1) + " bar";
            } else if (unidad_pres == 1) {
                document.getElementById("PCP_a").innerHTML = (pcp * 14.5).toFixed(0) + " psi";
                document.getElementById("PCC_a").innerHTML = (pcc * 14.5).toFixed(0) + " psi";
                document.getElementById("PCC_a_ecoair").innerHTML = (pcc * 14.5).toFixed(0) + " psi";
            }
            if (cpfm == 1 || epmrp == 1) {
                document.getElementById("modo4").style.display = "inline";
                if (cpfm == 1 && caf & 0x0001) {
                    document.getElementById("modo4").src = "../../../imagesnew/refrigeracion_directa_activa.png";
                } else if (epmrp == 1 && caf & 0x0001) {
                    document.getElementById("modo4").src = "../../../imagesnew/refrigeracion_directa_pasiva.png";
                } else if (cpfm == 1 && (caf & 0x0002 || caf & 0x0004)) {
                    document.getElementById("modo4").src = "../../../imagesnew/refrigeracion_inercia_activa.png";
                } else if (epmrp == 1 && (caf & 0x0002 || caf & 0x0004)) {
                    document.getElementById("modo4").src = "../../../imagesnew/refrigeracion_inercia_pasiva.png";
                }
            } else {
                document.getElementById("modo4").style.display = "none";
            }
            if (hpfm == 1 || hpfm == 4) {
                document.getElementById("modo3").style.display = "inline";
                if ((hpfm == 1 || hpfm == 4) && haf & 0x0001) {
                    document.getElementById("modo3").src = "../../../imagesnew/calefaccion_directa.png";
                } else if ((hpfm == 1 || hpfm == 4) && (haf & 0x0002 || haf & 0x0004)) {
                    document.getElementById("modo3").src = "../../../imagesnew/calefaccion_inercia.png";
                }
            } else {
                document.getElementById("modo3").style.display = "none";
            }
            if (dpfm == 2) {
                document.getElementById("modo2").style.display = "inline";
                document.getElementById("modo2").src = "../../../imagesnew/legionela_home.png";
            }
            if (htpfm == 1) {
                document.getElementById("modo2").style.display = "inline";
                document.getElementById("modo2").src = "../../../imagesnew/acs_htr.png";
            } else if ((dpfm == 1 || dpfm == 4) || htpfm == 1 || ea3 == 1) {
                document.getElementById("modo2").style.display = "inline";
                document.getElementById("modo2").src = "../../../imagesnew/acs.png";
            } else {
                document.getElementById("modo2").style.display = "none";
            }
            if (htpfm == 2) {
                document.getElementById("modo1").style.display = "inline";
                document.getElementById("modo1").src = "../../../imagesnew/piscina_htr.png";
            } else if (ppfmode == 1 || htpfm == 2) {
                document.getElementById("modo1").style.display = "inline";
                document.getElementById("modo1").src = "../../../imagesnew/piscina.png";
            } else {
                document.getElementById("modo1").style.display = "none";
            }
            if (hpfm == 4 || dpfm == 4 || ppfmode == 4) {
                document.getElementById("modo6").style.display = "inline";
                document.getElementById("modo6").src = "../../../imagesnew/desescarche_home.png";
            } else {
                document.getElementById("modo6").style.display = "none";
            }
            document.getElementById("consigna_impulsion1").innerHTML = tic.toFixed(1);
            if (ppfmode == 0) {
                document.getElementById("estado_pool").innerHTML = comunes.toff;
            } else if (ppfmode == 1) {
                document.getElementById("estado_pool").innerHTML = comunes.ton;
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
    var cadena = "idOperacion=2149";
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
            hui = parseInt(datos_correctos[1], 16);
            if (hui > 32768) {
                hui = hui - 65536;
            } else {
                hui = hui;
            }
            coui = parseInt(datos_correctos[2], 16);
            if (coui > 32768) {
                coui = coui - 65536;
            } else {
                coui = coui;
            }
            weci = parseInt(datos_correctos[3], 16);
            if (weci > 32768) {
                weci = weci - 65536;
            } else {
                weci = weci;
            }
            pu = parseInt(datos_correctos[0], 16);
            if (pu > 32768) {
                pu = (pu - 65536) / 10;
            } else {
                pu = pu / 10;
            }
            cici = parseInt(datos_correctos[30], 16);
            if (cici > 32768) {
                cici = (cici - 65536);
            } else {
                cici = cici;
            }
            eccop = parseInt(datos_correctos[31], 16);
            if (eccop > 32768) {
                eccop = (eccop - 65536);
            } else {
                eccop = eccop;
            }
            acbtd = parseInt(datos_correctos[4], 16);
            if (acbtd > 32768) {
                acbtd = acbtd - 65536;
            } else {
                acbtd = acbtd;
            }
            abd = parseInt(datos_correctos[5], 16);
            if (abd > 32768) {
                abd = abd - 65536;
            } else {
                abd = abd;
            }
            dtd = parseInt(datos_correctos[6], 16);
            if (dtd > 32768) {
                dtd = dtd - 65536;
            } else {
                dtd = dtd;
            }
            hbtd = parseInt(datos_correctos[7], 16);
            if (hbtd > 32768) {
                hbtd = hbtd - 65536;
            } else {
                hbtd = hbtd;
            }
            ltd = parseInt(datos_correctos[8], 16);
            if (ltd > 32768) {
                ltd = ltd - 65536;
            } else {
                ltd = ltd;
            }
            pcbtd = parseInt(datos_correctos[9], 16);
            if (pcbtd > 32768) {
                pcbtd = pcbtd - 65536;
            } else {
                pcbtd = pcbtd;
            }
            pcd = parseInt(datos_correctos[10], 16);
            if (pcd > 32768) {
                pcd = pcd - 65536;
            } else {
                pcd = pcd;
            }
            cmap = parseInt(datos_correctos[17], 16);
            cmip = parseInt(datos_correctos[18], 16);
            cdig1 = parseInt(datos_correctos[11], 16);
            if (cdig1 > 32768) {
                cdig1 = cdig1 - 65536;
            } else {
                cdig1 = cdig1;
            }
            cdig2 = parseInt(datos_correctos[12], 16);
            if (cdig2 > 32768) {
                cdig2 = cdig2 - 65536;
            } else {
                cdig2 = cdig2;
            }
            cdig3 = parseInt(datos_correctos[13], 16);
            if (cdig3 > 32768) {
                cdig3 = cdig3 - 65536;
            } else {
                cdig3 = cdig3;
            }
            cdig4 = parseInt(datos_correctos[14], 16);
            if (cdig4 > 32768) {
                cdig4 = cdig4 - 65536;
            } else {
                cdig4 = cdig4;
            }
            cdig5 = parseInt(datos_correctos[15], 16);
            if (cdig5 > 32768) {
                cdig5 = cdig5 - 65536;
            } else {
                cdig5 = cdig5;
            }
            dhac = parseInt(datos_correctos[34], 16);
            if (dhac > 32768) {
                dhac = dhac - 65536;
            } else {
                dhac = dhac;
            }
            hpdc = parseInt(datos_correctos[35], 16);
            if (hpdc > 32768) {
                hpdc = hpdc - 65536;
            } else {
                hpdc = hpdc;
            }
            if (eccop == 0) {
                consumo_inst = weci;
            } else if (eccop == 1) {
                consumo_inst = weci + cici;
            }
            if (pu == 1) {
                document.getElementById("unidades_heat").innerHTML = "W";
                document.getElementById("unidades_cool").innerHTML = "W";
                document.getElementById("unidades_elect").innerHTML = "W";
                document.getElementById("energ_util_cool").innerHTML = coui;
                document.getElementById("energ_util_heat").innerHTML = hui;
                document.getElementById("e_elect").innerHTML = consumo_inst;
            } else if (pu == 2) {
                document.getElementById("unidades_heat").innerHTML = "kW";
                document.getElementById("unidades_cool").innerHTML = "kW";
                document.getElementById("unidades_elect").innerHTML = "kW";
                document.getElementById("energ_util_heat").innerHTML = (hui / 10);
                document.getElementById("energ_util_cool").innerHTML = (coui / 10);
                document.getElementById("e_elect").innerHTML = (consumo_inst / 10);
            } else if (pu == 3) {
                document.getElementById("unidades_heat").innerHTML = "MW";
                document.getElementById("unidades_cool").innerHTML = "MW";
                document.getElementById("unidades_elect").innerHTML = "MW";
                document.getElementById("energ_util_heat").innerHTML = (hui / 10);
                document.getElementById("energ_util_cool").innerHTML = (coui / 10);
                document.getElementById("e_elect").innerHTML = (consumo_inst / 10);
            }
            if (consumo_inst == 0) {
                document.getElementById("cop_value").innerHTML = 0;
                document.getElementById("eer_value").innerHTML = 0;
                document.getElementById("pf_value").innerHTML = 0;
            } else {
                document.getElementById("cop_value").innerHTML = (hui / consumo_inst).toFixed(1);
                document.getElementById("eer_value").innerHTML = (coui / consumo_inst).toFixed(1);
                document.getElementById("pf_value").innerHTML = ((hui + coui) / consumo_inst).toFixed(1);
            }
            if (acbtd != 0 || pcbtd != 0) {
                document.getElementById("top_2").style.display = "inline";
                if (acbtd != 0 && caf & 0x0001) {
                    document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_directa.png";
                } else if (pcbtd != 0 && caf & 0x0001) {
                    document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_directa.png";
                } else if (acbtd != 0 && (caf & 0x0002 || caf & 0x0004)) {
                    document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_inercia.png";
                } else if (pcbtd != 0 && (caf & 0x0002 || caf & 0x0004)) {
                    document.getElementById("top_2").src = "../../../imagesnew/refrigeracion_inercia.png";
                }
            } else {
                document.getElementById("top_2").style.display = "none";
            }
            if (hbtd != 0) {
                document.getElementById("top_1").style.display = "inline";
                if (hbtd != 0 && haf & 0x0001) {
                    document.getElementById("top_1").src = "../../../imagesnew/calefaccion_directa.png";
                } else if (hbtd != 0 && (haf & 0x0002 || haf & 0x0004)) {
                    if (cmip == 1) {
                        document.getElementById("top_1").src = "../../../imagesnew/calefaccion_inercia_max.png";
                    } else {
                        document.getElementById("top_1").src = "../../../imagesnew/calefaccion_inercia.png";
                    }
                }
            } else {
                document.getElementById("top_1").style.display = "none";
            }
            if (dtd != 0 || ltd != 0 || dhac == 1) {
                document.getElementById("top_3").style.display = "inline";
                if (ltd != 0) {
                    document.getElementById("top_3").src = "../../../imagesnew/legionela_home.png";
                } else if (dtd != 0) {
                    if (cmap == 1) {
                        document.getElementById("top_3").src = "../../../imagesnew/acs_max.png";
                    } else {
                        document.getElementById("top_3").src = "../../../imagesnew/acs.png";
                    }
                } else if (dhac == 1) {
                    document.getElementById("top_3").src = "../../../imagesnew/acs_htr.png";
                }
            } else {
                document.getElementById("top_3").style.display = "none";
            }
            if (pcd != 0 || hpdc == 1) {
                document.getElementById("top_4").style.display = "inline";
                if (pcd != 0) {
                    document.getElementById("top_4").src = "../../../imagesnew/piscina.png";
                } else if (hpdc == 1)
                    document.getElementById("top_4").src = "../../../imagesnew/piscina_htr.png";
            } else {
                document.getElementById("top_4").style.display = "none";
            }
            if (abd != 0) {
                document.getElementById("modo8").style.display = "inline";
                document.getElementById("modo8").src = "../../../imagesnew/anticongelamiento.png";
            } else {
                document.getElementById("modo8").style.display = "none";
            }
            if (cdig1 == 0) {
                document.getElementById("number_1").style.display = "none";
                document.getElementById("zone_1").style.display = "none";
            } else {
                document.getElementById("number_1").style.display = "inline";
                document.getElementById("zone_1").style.display = "inline";
                if (cdig1 == 1) {
                    document.getElementById("zone_1").src = "../../../imagesnew/grupos_calefaccion.png";
                } else if (cdig1 == 2) {
                    document.getElementById("zone_1").src = "../../../imagesnew/grupos_refrigeracion.png";
                }
            }
            if (cdig2 == 0) {
                document.getElementById("number_2").style.display = "none";
                document.getElementById("zone_2").style.display = "none";
            } else {
                document.getElementById("number_2").style.display = "inline";
                document.getElementById("zone_2").style.display = "inline";
                if (cdig2 == 1) {
                    document.getElementById("zone_2").src = "../../../imagesnew/grupos_calefaccion.png";
                } else if (cdig2 == 2) {
                    document.getElementById("zone_2").src = "../../../imagesnew/grupos_refrigeracion.png";
                }
            }
            if (cdig3 == 0) {
                document.getElementById("number_3").style.display = "none";
                document.getElementById("zone_3").style.display = "none";
            } else {
                document.getElementById("number_3").style.display = "inline";
                document.getElementById("zone_3").style.display = "inline";
                if (cdig3 == 1) {
                    document.getElementById("zone_3").src = "../../../imagesnew/grupos_calefaccion.png";
                } else if (cdig3 == 2) {
                    document.getElementById("zone_3").src = "../../../imagesnew/grupos_refrigeracion.png";
                }
            }
            if (cdig4 == 0) {
                document.getElementById("number_4").style.display = "none";
                document.getElementById("zone_4").style.display = "none";
            } else {
                document.getElementById("number_4").style.display = "inline";
                document.getElementById("zone_4").style.display = "inline";
                if (cdig4 == 1) {
                    document.getElementById("zone_4").src = "../../../imagesnew/grupos_calefaccion.png";
                } else if (cdig4 == 2) {
                    document.getElementById("zone_4").src = "../../../imagesnew/grupos_refrigeracion.png";
                }
            }
            if (cdig5 == 0) {
                document.getElementById("number_5").style.display = "none";
                document.getElementById("zone_5").style.display = "none";
            } else {
                document.getElementById("number_5").style.display = "inline";
                document.getElementById("zone_5").style.display = "inline";
                if (cdig5 == 1) {
                    document.getElementById("zone_5").src = "../../../imagesnew/grupos_calefaccion.png";
                } else if (cdig5 == 2) {
                    document.getElementById("zone_5").src = "../../../imagesnew/grupos_refrigeracion.png";
                }
            }
            document.getElementById("carga_inicial").style.display = "inline";
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
    var cadena = "idOperacion=2150";
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
            ea2 = parseInt(datos_correctos[0], 16);
            if (ea2 > 32768) {
                ea2 = ea2 - 65536;
            } else {
                ea2 = ea2;
            }
            tica = parseInt(datos_correctos[1], 16);
            if (tica > 32768) {
                tica = (tica - 65536) / 10;
            } else {
                tica = tica / 10;
            }
            rc = parseInt(datos_correctos[2], 16);
            if (rc > 32768) {
                rc = (rc - 65536) / 10;
            } else {
                rc = rc / 10;
            }
            ea5 = parseInt(datos_correctos[3], 16);
            if (ea5 > 32768) {
                ea5 = ea5 - 65536;
            } else {
                ea5 = ea5;
            }
            acdt = parseInt(datos_correctos[4], 16);
            if (acdt > 32768) {
                acdt = (acdt - 65536) / 10;
            } else {
                acdt = acdt / 10;
            }
            rac = parseInt(datos_correctos[5], 16);
            if (rac > 32768) {
                rac = (rac - 65536) / 10;
            } else {
                rac = rac / 10;
            }
            tcc = parseInt(datos_correctos[6], 16);
            if (tcc > 32768) {
                tcc = (tcc - 65536) / 10;
            } else {
                tcc = tcc / 10;
            }
            tcfa = parseInt(datos_correctos[7], 16);
            if (tcfa > 32768) {
                tcfa = (tcfa - 65536) / 10;
            } else {
                tcfa = tcfa / 10;
            }
            tcfp = parseInt(datos_correctos[8], 16);
            if (tcfp > 32768) {
                tcfp = (tcfp - 65536) / 10;
            } else {
                tcfp = tcfp / 10;
            }
            tsz1 = parseInt(datos_correctos[9], 16);
            if (tsz1 > 32768) {
                tsz1 = (tsz1 - 65536) / 10;
            } else {
                tsz1 = tsz1 / 10;
            }
            tsz2 = parseInt(datos_correctos[10], 16);
            if (tsz2 > 32768) {
                tsz2 = (tsz2 - 65536) / 10;
            } else {
                tsz2 = tsz2 / 10;
            }
            tsz3 = parseInt(datos_correctos[11], 16);
            if (tsz3 > 32768) {
                tsz3 = (tsz3 - 65536) / 10;
            } else {
                tsz3 = tsz3 / 10;
            }
            tsz4 = parseInt(datos_correctos[12], 16);
            if (tsz4 > 32768) {
                tsz4 = (tsz4 - 65536) / 10;
            } else {
                tsz4 = tsz4 / 10;
            }
            tsz5 = parseInt(datos_correctos[13], 16);
            if (tsz5 > 32768) {
                tsz5 = (tsz5 - 65536) / 10;
            } else {
                tsz5 = tsz5 / 10;
            }
            ttz1 = parseInt(datos_correctos[14], 16);
            if (ttz1 > 32768) {
                ttz1 = (ttz1 - 65536) / 10;
            } else {
                ttz1 = ttz1 / 10;
            }
            ttz2 = parseInt(datos_correctos[15], 16);
            if (ttz2 > 32768) {
                ttz2 = (ttz2 - 65536) / 10;
            } else {
                ttz2 = ttz2 / 10;
            }
            ttz3 = parseInt(datos_correctos[16], 16);
            if (ttz3 > 32768) {
                ttz3 = (ttz3 - 65536) / 10;
            } else {
                ttz3 = ttz3 / 10;
            }
            ttz4 = parseInt(datos_correctos[17], 16);
            if (ttz4 > 32768) {
                ttz4 = (ttz4 - 65536) / 10;
            } else {
                ttz4 = ttz4 / 10;
            }
            ttz5 = parseInt(datos_correctos[18], 16);
            if (ttz5 > 32768) {
                ttz5 = (ttz5 - 65536) / 10;
            } else {
                ttz5 = ttz5 / 10;
            }
            thz1 = parseInt(datos_correctos[19], 16);
            if (thz1 > 32768) {
                thz1 = (thz1 - 65536) / 10;
            } else {
                thz1 = thz1 / 10;
            }
            thz2 = parseInt(datos_correctos[20], 16);
            if (thz2 > 32768) {
                thz2 = (thz2 - 65536) / 10;
            } else {
                thz2 = thz2 / 10;
            }
            thz3 = parseInt(datos_correctos[21], 16);
            if (thz3 > 32768) {
                thz3 = (thz3 - 65536) / 10;
            } else {
                thz3 = thz3 / 10;
            }
            thz4 = parseInt(datos_correctos[22], 16);
            if (thz4 > 32768) {
                thz4 = (thz4 - 65536) / 10;
            } else {
                thz4 = thz4 / 10;
            }
            thz5 = parseInt(datos_correctos[23], 16);
            if (thz5 > 32768) {
                thz5 = (thz5 - 65536) / 10;
            } else {
                thz5 = thz5 / 10;
            }
            scsm = parseInt(datos_correctos[24], 16);
            pb = parseInt(datos_correctos[25], 16);
            if (pb > 32768) {
                pb = (pb - 65536) / 10;
            } else {
                pb = pb / 10;
            }
            clsm = parseInt(datos_correctos[27], 16);
            scsp = parseInt(datos_correctos[26], 16);
            if (scsp > 32768) {
                scsp = (scsp - 65536) / 10;
            } else {
                scsp = scsp / 10;
            }
            clsp = parseInt(datos_correctos[28], 16);
            if (clsp > 32768) {
                clsp = (clsp - 65536) / 10;
            } else {
                clsp = clsp / 10;
            }
            dpf = parseInt(datos_correctos[32], 16);
            htrsp = parseInt(datos_correctos[20], 16);
            if (htrsp > 32768) {
                htrsp = (htrsp - 65536) / 10;
            } else {
                htrsp = htrsp / 10;
            }
            if (unidad_temp == 0) {
                document.getElementById("temperatura_caldera").innerHTML = tica.toFixed(1);
                document.getElementById("temperatura_enfriadora").innerHTML = acdt.toFixed(1);
                document.getElementById("temp_cal").innerHTML = tcc.toFixed(1);
                document.getElementById("temp_ref_act").innerHTML = tcfa.toFixed(1);
                document.getElementById("temp_ref_pas").innerHTML = tcfp.toFixed(1);
                document.getElementById("c_dg1").innerHTML = tsz1.toFixed(1) + " &deg;C";
                document.getElementById("c_dg2").innerHTML = tsz2.toFixed(1) + " &deg;C";
                document.getElementById("c_dg3").innerHTML = tsz3.toFixed(1) + " &deg;C";
                document.getElementById("c_dg4").innerHTML = tsz4.toFixed(1) + " &deg;C";
                document.getElementById("c_dg5").innerHTML = tsz5.toFixed(1) + " &deg;C";
                document.getElementById("d_dg1").innerHTML = ttz1.toFixed(1) + " &deg;C";
                document.getElementById("d_dg2").innerHTML = ttz2.toFixed(1) + " &deg;C";
                document.getElementById("d_dg3").innerHTML = ttz3.toFixed(1) + " &deg;C";
                document.getElementById("d_dg4").innerHTML = ttz4.toFixed(1) + " &deg;C";
                document.getElementById("d_dg5").innerHTML = ttz5.toFixed(1) + " &deg;C";
            } else if (unidad_temp == 1) {
                document.getElementById("temperatura_caldera").innerHTML = ((tica * 1.8) + 32).toFixed(1);
                document.getElementById("temperatura_enfriadora").innerHTML = ((acdt * 1.8) + 32).toFixed(1);
                document.getElementById("temp_cal").innerHTML = ((tcc * 1.8) + 32).toFixed(1);
                document.getElementById("temp_ref_act").innerHTML = ((tcfa * 1.8) + 32).toFixed(1);
                document.getElementById("temp_ref_pas").innerHTML = ((tcfp * 1.8) + 32).toFixed(1);
                document.getElementById("c_dg1").innerHTML = ((tsz1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("c_dg2").innerHTML = ((tsz2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("c_dg3").innerHTML = ((tsz3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("c_dg4").innerHTML = ((tsz4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("c_dg5").innerHTML = ((tsz5 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("d_dg1").innerHTML = ((ttz1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("d_dg2").innerHTML = ((ttz2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("d_dg3").innerHTML = ((ttz3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("d_dg4").innerHTML = ((ttz4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("d_dg5").innerHTML = ((ttz5 * 1.8) + 32).toFixed(1) + " &deg;F";
            }
            if (ea2 == 0) {
                document.getElementById("estado_caldera").innerHTML = comunes.toff;
            } else {
                document.getElementById("estado_caldera").innerHTML = comunes.ton;
            }
            document.getElementById("regulacion_caldera").innerHTML = rc.toFixed(1);
            if (ea5 == 0) {
                document.getElementById("estado_enfriadora").innerHTML = comunes.toff;
            } else {
                document.getElementById("estado_enfriadora").innerHTML = comunes.ton;
            }
            document.getElementById("regulacion_enfriadora").innerHTML = rac.toFixed(1);
            document.getElementById("h_dg1").innerHTML = thz1.toFixed(1);
            document.getElementById("h_dg2").innerHTML = thz2.toFixed(1);
            document.getElementById("h_dg3").innerHTML = thz3.toFixed(1);
            document.getElementById("h_dg4").innerHTML = thz4.toFixed(1);
            document.getElementById("h_dg5").innerHTML = thz5.toFixed(1);
            if (scsm == 0) {
                document.getElementById("estado_excedente").innerHTML = comunes.toff;
            } else {
                document.getElementById("estado_excedente").innerHTML = comunes.ton;
            }
            if (clsm == 0) {
                document.getElementById("estado_limite").innerHTML = comunes.toff;
            } else {
                document.getElementById("estado_limite").innerHTML = comunes.ton;
            }
            document.getElementById("real_excedente").innerHTML = pb.toFixed(1);
            document.getElementById("real_limite").innerHTML = pb.toFixed(1);
            document.getElementById("consigna_excedente").innerHTML = scsp.toFixed(1);
            document.getElementById("consigna_limite").innerHTML = clsp.toFixed(1);
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
    var cadena = "idOperacion=2151";
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
            hdtsg1 = parseInt(datos_correctos[0], 16);
            if (hdtsg1 > 32768) {
                hdtsg1 = (hdtsg1 - 65536) / 10;
            } else {
                hdtsg1 = hdtsg1 / 10;
            }
            hdtsg2 = parseInt(datos_correctos[1], 16);
            if (hdtsg2 > 32768) {
                hdtsg2 = (hdtsg2 - 65536) / 10;
            } else {
                hdtsg2 = hdtsg2 / 10;
            }
            hdtsg3 = parseInt(datos_correctos[2], 16);
            if (hdtsg3 > 32768) {
                hdtsg3 = (hdtsg3 - 65536) / 10;
            } else {
                hdtsg3 = hdtsg3 / 10;
            }
            hdtsg4 = parseInt(datos_correctos[3], 16);
            if (hdtsg4 > 32768) {
                hdtsg4 = (hdtsg4 - 65536) / 10;
            } else {
                hdtsg4 = hdtsg4 / 10;
            }
            hdtsg5 = parseInt(datos_correctos[4], 16);
            if (hdtsg5 > 32768) {
                hdtsg5 = (hdtsg5 - 65536) / 10;
            } else {
                hdtsg5 = hdtsg5 / 10;
            }
            ti1 = parseInt(datos_correctos[5], 16);
            if (ti1 > 32768) {
                ti1 = (ti1 - 65536) / 10;
            } else {
                ti1 = ti1 / 10;
            }
            ti2 = parseInt(datos_correctos[6], 16);
            if (ti2 > 32768) {
                ti2 = (ti2 - 65536) / 10;
            } else {
                ti2 = ti2 / 10;
            }
            ti3 = parseInt(datos_correctos[7], 16);
            if (ti3 > 32768) {
                ti3 = (ti3 - 65536) / 10;
            } else {
                ti3 = ti3 / 10;
            }
            ti4 = parseInt(datos_correctos[8], 16);
            if (ti4 > 32768) {
                ti4 = (ti4 - 65536) / 10;
            } else {
                ti4 = ti4 / 10;
            }
            ti5 = parseInt(datos_correctos[9], 16);
            if (ti5 > 32768) {
                ti5 = (ti5 - 65536) / 10;
            } else {
                ti5 = ti5 / 10;
            }
            rvz1 = parseInt(datos_correctos[10], 16);
            if (rvz1 > 32768) {
                rvz1 = (rvz1 - 65536) / 10;
            } else {
                rvz1 = rvz1 / 10;
            }
            rvz2 = parseInt(datos_correctos[11], 16);
            if (rvz2 > 32768) {
                rvz2 = (rvz2 - 65536) / 10;
            } else {
                rvz2 = rvz2 / 10;
            }
            rvz3 = parseInt(datos_correctos[12], 16);
            if (rvz3 > 32768) {
                rvz3 = (rvz3 - 65536) / 10;
            } else {
                rvz3 = rvz3 / 10;
            }
            rvz4 = parseInt(datos_correctos[13], 16);
            if (rvz4 > 32768) {
                rvz4 = (rvz4 - 65536) / 10;
            } else {
                rvz4 = rvz4 / 10;
            }
            rvz5 = parseInt(datos_correctos[14], 16);
            if (rvz5 > 32768) {
                rvz5 = (rvz5 - 65536) / 10;
            } else {
                rvz5 = rvz5 / 10;
            }
            cdtsg1 = parseInt(datos_correctos[15], 16);
            if (cdtsg1 > 32768) {
                cdtsg1 = (cdtsg1 - 65536) / 10;
            } else {
                cdtsg1 = cdtsg1 / 10;
            }
            cdtsg2 = parseInt(datos_correctos[16], 16);
            if (cdtsg2 > 32768) {
                cdtsg2 = (cdtsg2 - 65536) / 10;
            } else {
                cdtsg2 = cdtsg2 / 10;
            }
            cdtsg3 = parseInt(datos_correctos[17], 16);
            if (cdtsg3 > 32768) {
                cdtsg3 = (cdtsg3 - 65536) / 10;
            } else {
                cdtsg3 = cdtsg3 / 10;
            }
            cdtsg4 = parseInt(datos_correctos[18], 16);
            if (cdtsg4 > 32768) {
                cdtsg4 = (cdtsg4 - 65536) / 10;
            } else {
                cdtsg4 = cdtsg4 / 10;
            }
            cdtsg5 = parseInt(datos_correctos[19], 16);
            if (cdtsg5 > 32768) {
                cdtsg5 = (cdtsg5 - 65536) / 10;
            } else {
                cdtsg5 = cdtsg5 / 10;
            }
            ticiner = parseInt(datos_correctos[20], 16);
            if (ticiner > 32768) {
                ticiner = (ticiner - 65536) / 10;
            } else {
                ticiner = ticiner / 10;
            }
            hbtsp = parseInt(datos_correctos[21], 16);
            if (hbtsp > 32768) {
                hbtsp = (hbtsp - 65536) / 10;
            } else {
                hbtsp = hbtsp / 10;
            }
            oic = parseInt(datos_correctos[22], 16);
            if (oic > 32768) {
                oic = (oic - 65536) / 10;
            } else {
                oic = oic / 10;
            }
            tif = parseInt(datos_correctos[23], 16);
            if (tif > 32768) {
                tif = (tif - 65536) / 10;
            } else {
                tif = tif / 10;
            }
            cbtsp = parseInt(datos_correctos[24], 16);
            if (cbtsp > 32768) {
                cbtsp = (cbtsp - 65536) / 10;
            } else {
                cbtsp = cbtsp / 10;
            }
            oif = parseInt(datos_correctos[25], 16);
            if (oif > 32768) {
                oif = (oif - 65536) / 10;
            } else {
                oif = oif / 10;
            }
            dt = parseInt(datos_correctos[28], 16);
            if (dt > 32768) {
                dt = (dt - 65536) / 10;
            } else {
                dt = dt / 10;
            }
            dsm = parseInt(datos_correctos[26], 16);
            if (dsm > 32768) {
                dsm = (dsm - 65536) / 10;
            } else {
                dsm = dsm / 10;
            }
            ao = parseInt(datos_correctos[27], 16);
            if (ao > 32768) {
                ao = (ao - 65536) / 10;
            } else {
                ao = ao / 10;
            }
            dcfm = parseInt(datos_correctos[29], 16);
            if (dcfm > 32768) {
                dcfm = dcfm - 65536;
            } else {
                dcfm = dcfm;
            }
            drt = parseInt(datos_correctos[30], 16);
            if (drt > 32768) {
                drt = (drt - 65536) / 10;
            } else {
                drt = drt / 10;
            }
            rc = parseInt(datos_correctos[31], 16);
            if (rc > 32768) {
                rc = (rc - 65536) / 10;
            } else {
                rc = rc / 10;
            }
            ro = parseInt(datos_correctos[32], 16);
            if (ro > 32768) {
                ro = (ro - 65536) / 10;
            } else {
                ro = ro / 10;
            }
            ppspf = parseInt(datos_correctos[33], 16);
            if (ppspf > 32768) {
                ppspf = (ppspf - 65536) / 10;
            } else {
                ppspf = ppspf / 10;
            }
            if (unidad_temp == 0) {
                document.getElementById("set_th1").innerHTML = hdtsg1.toFixed(1) + " &deg;C";
                document.getElementById("set_th2").innerHTML = hdtsg2.toFixed(1) + " &deg;C";
                document.getElementById("set_th3").innerHTML = hdtsg3.toFixed(1) + " &deg;C";
                document.getElementById("set_th4").innerHTML = hdtsg4.toFixed(1) + " &deg;C";
                document.getElementById("set_th5").innerHTML = hdtsg5.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th1").innerHTML = ti1.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th2").innerHTML = ti2.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th3").innerHTML = ti3.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th4").innerHTML = ti4.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th5").innerHTML = ti5.toFixed(1) + " &deg;C";
                document.getElementById("set_th1_1").innerHTML = cdtsg1.toFixed(1) + " &deg;C";
                document.getElementById("set_th2_1").innerHTML = cdtsg2.toFixed(1) + " &deg;C";
                document.getElementById("set_th3_1").innerHTML = cdtsg3.toFixed(1) + " &deg;C";
                document.getElementById("set_th4_1").innerHTML = cdtsg4.toFixed(1) + " &deg;C";
                document.getElementById("set_th5_1").innerHTML = cdtsg5.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th1_1").innerHTML = ti1.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th2_1").innerHTML = ti2.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th3_1").innerHTML = ti3.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th4_1").innerHTML = ti4.toFixed(1) + " &deg;C";
                document.getElementById("real_t_th5_1").innerHTML = ti5.toFixed(1) + " &deg;C";
                document.getElementById("temp_dep_heat").innerHTML = ticiner.toFixed(1);
                document.getElementById("set_inercia_heat").innerHTML = hbtsp.toFixed(1);
                document.getElementById("offset_inercia_heat").innerHTML = oic.toFixed(1);
                document.getElementById("temp_dep_cool").innerHTML = tif.toFixed(1);
                document.getElementById("set_inercia_cool").innerHTML = cbtsp.toFixed(1);
                document.getElementById("offset_inercia_cool").innerHTML = oif.toFixed(1);
                document.getElementById("temp_acum_acs").innerHTML = dt.toFixed(1);
                document.getElementById("real_recirc").innerHTML = rc.toFixed(1);
                document.getElementById("consigna_acs").innerHTML = dsm.toFixed(1);
                document.getElementById("offset").innerHTML = ao.toFixed(1);
                document.getElementById("consigna_recirc").innerHTML = drt.toFixed(1);
                document.getElementById("dt_recirc").innerHTML = ro.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("temperatura_caldera").innerHTML = ((tica * 1.8) + 32).toFixed(1);
                document.getElementById("set_th1").innerHTML = ((hdtsg1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th2").innerHTML = ((hdtsg2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th3").innerHTML = ((hdtsg3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th4").innerHTML = ((hdtsg4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th5").innerHTML = ((hdtsg5 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th1").innerHTML = ((ti1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th2").innerHTML = ((ti2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th3").innerHTML = ((ti3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th4").innerHTML = ((ti4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th5").innerHTML = ((ti5 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th1_1").innerHTML = ((cdtsg1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th2_1").innerHTML = ((cdtsg2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th3_1").innerHTML = ((cdtsg3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th4_1").innerHTML = ((cdtsg4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("set_th5_1").innerHTML = ((cdtsg5 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th1_1").innerHTML = ((ti1 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th2_1").innerHTML = ((ti2 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th3_1").innerHTML = ((ti3 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th4_1").innerHTML = ((ti4 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("real_t_th5_1").innerHTML = ((ti5 * 1.8) + 32).toFixed(1) + " &deg;F";
                document.getElementById("temp_dep_heat").innerHTML = ((ticiner * 1.8) + 32).toFixed(1);
                document.getElementById("set_inercia_heat").innerHTML = ((hbtsp * 1.8) + 32).toFixed(1);
                document.getElementById("offset_inercia_heat").innerHTML = (oic * 1.8).toFixed(1);
                document.getElementById("temp_dep_cool").innerHTML = ((tif * 1.8) + 32).toFixed(1);
                document.getElementById("set_inercia_cool").innerHTML = ((cbtsp * 1.8) + 32).toFixed(1);
                document.getElementById("offset_inercia_cool").innerHTML = (oif * 1.8).toFixed(1);
                document.getElementById("temp_acum_acs").innerHTML = ((dt * 1.8) + 32).toFixed(1);
                document.getElementById("real_recirc").innerHTML = ((rc * 1.8) + 32).toFixed(1);
                document.getElementById("consigna_acs").innerHTML = ((dsm * 1.8) + 32).toFixed(1);
                document.getElementById("offset").innerHTML = (ao * 1.8).toFixed(1);
                document.getElementById("consigna_recirc").innerHTML = ((drt * 1.8) + 32).toFixed(1);
                document.getElementById("dt_recirc").innerHTML = (ro * 1.8).toFixed(1);
            }
            document.getElementById("reg_th1").innerHTML = rvz1.toFixed(1) + "%";
            document.getElementById("reg_th2").innerHTML = rvz2.toFixed(1) + "%";
            document.getElementById("reg_th3").innerHTML = rvz3.toFixed(1) + "%";
            document.getElementById("reg_th4").innerHTML = rvz4.toFixed(1) + "%";
            document.getElementById("reg_th5").innerHTML = rvz5.toFixed(1) + "%";
            document.getElementById("reg_th1_1").innerHTML = rvz1.toFixed(1) + "%";
            document.getElementById("reg_th2_1").innerHTML = rvz2.toFixed(1) + "%";
            document.getElementById("reg_th3_1").innerHTML = rvz3.toFixed(1) + "%";
            document.getElementById("reg_th4_1").innerHTML = rvz4.toFixed(1) + "%";
            document.getElementById("reg_th5_1").innerHTML = rvz5.toFixed(1) + "%";
            if (dcfm == 0) {
                document.getElementById("estado_recirculacion").innerHTML = comunes.toff;
                document.getElementById("modo9").style.display = "none";
            } else if (dcfm == 1) {
                document.getElementById("estado_recirculacion").innerHTML = comunes.ton;
                document.getElementById("modo9").style.display = "inline";
                document.getElementById("modo9").src = "../../../imagesnew/icono_recirculacion.png";
            }
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
    var cadena = "idOperacion=2152";
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
            tip = parseInt(datos_correctos[0], 16);
            if (tip > 32768) {
                tip = (tip - 65536) / 10;
            } else {
                tip = tip / 10;
            }
            pt = parseInt(datos_correctos[1], 16);
            if (pt > 32768) {
                pt = (pt - 65536) / 10;
            } else {
                pt = pt / 10;
            }
            ppdo = parseInt(datos_correctos[2], 16);
            if (ppdo > 32768) {
                ppdo = (ppdo - 65536) / 10;
            } else {
                ppdo = ppdo / 10;
            }
            ss1 = parseInt(datos_correctos[3], 16);
            if (ss1 > 32768) {
                ss1 = ss1 - 65536;
            } else {
                ss1 = ss1;
            }
            ss2 = parseInt(datos_correctos[4], 16);
            if (ss2 > 32768) {
                ss2 = ss2 - 65536;
            } else {
                ss2 = ss2;
            }
            ss3 = parseInt(datos_correctos[5], 16);
            if (ss3 > 32768) {
                ss3 = ss3 - 65536;
            } else {
                ss3 = ss3;
            }
            ss4 = parseInt(datos_correctos[6], 16);
            if (ss4 > 32768) {
                ss4 = ss4 - 65536;
            } else {
                ss4 = ss4;
            }
            ss5 = parseInt(datos_correctos[7], 16);
            if (ss5 > 32768) {
                ss5 = ss5 - 65536;
            } else {
                ss5 = ss5;
            }
            ss6 = parseInt(datos_correctos[8], 16);
            if (ss6 > 32768) {
                ss6 = ss6 - 65536;
            } else {
                ss6 = ss6;
            }
            es1 = parseInt(datos_correctos[9], 16);
            es2 = parseInt(datos_correctos[10], 16);
            es3 = parseInt(datos_correctos[11], 16);
            es4 = parseInt(datos_correctos[12]),
                16;
            es5 = parseInt(datos_correctos[13], 16);
            es6 = parseInt(datos_correctos[14], 16);
            hgfi = parseInt(datos_correctos[15], 16);
            if (hgfi > 32768) {
                hgfi = hgfi - 65536;
            } else {
                hgfi = hgfi;
            }
            dgfi = parseInt(datos_correctos[16], 16);
            if (dgfi > 32768) {
                dgfi = dgfi - 65536;
            } else {
                dgfi = dgfi;
            }
            pgfi = parseInt(datos_correctos[17], 16);
            if (pgfi > 32768) {
                pgfi = pgfi - 65536;
            } else {
                pgfi = pgfi;
            }
            cgfi = parseInt(datos_correctos[18], 16);
            if (cgfi > 32768) {
                cgfi = cgfi - 65536;
            } else {
                cgfi = cgfi;
            }
            htfi = parseInt(datos_correctos[19], 16);
            if (htfi > 32768) {
                htfi = htfi - 65536;
            } else {
                htfi = htfi;
            }
            hcfi = parseInt(datos_correctos[20], 16);
            if (hcfi > 32768) {
                hcfi = hcfi - 65536;
            } else {
                hcfi = hcfi;
            }
            ccfi = parseInt(datos_correctos[21], 16);
            if (ccfi > 32768) {
                ccfi = ccfi - 65536;
            } else {
                ccfi = ccfi;
            }
            dcfi = parseInt(datos_correctos[24], 16);
            if (dcfi > 32768) {
                dcfi = dcfi - 65536;
            } else {
                dcfi = dcfi;
            }
            pcf = parseInt(datos_correctos[25], 16);
            if (pcf > 32768) {
                pcf = pcf - 65536;
            } else {
                pcf = pcf;
            }
            efi = parseInt(datos_correctos[26], 16);
            if (efi > 32768) {
                efi = efi - 65536;
            } else {
                efi = efi;
            }
            hprb = parseInt(datos_correctos[27], 16);
            if (hprb > 32768) {
                hprb = hprb - 65536;
            } else {
                hprb = hprb;
            }
            at = parseInt(datos_correctos[28], 16);
            if (at > 32768) {
                at = at - 65536;
            } else {
                at = at;
            }
            aux1 = parseInt(datos_correctos[29], 16);
            if (aux1 > 32768) {
                aux1 = aux1 - 65536;
            } else {
                aux1 = aux1;
            }
            aux2 = parseInt(datos_correctos[30], 16);
            if (aux2 > 32768) {
                aux2 = aux2 - 65536;
            } else {
                aux2 = aux2;
            }
            aux3 = parseInt(datos_correctos[31], 16);
            if (aux3 > 32768) {
                aux3 = aux3 - 65536;
            } else {
                aux3 = aux3;
            }
            aux4 = parseInt(datos_correctos[32], 16);
            if (aux4 > 32768) {
                aux4 = aux4 - 65536;
            } else {
                aux4 = aux4;
            }
            aux5 = parseInt(datos_correctos[33], 16);
            if (aux5 > 32768) {
                aux5 = aux5 - 65536;
            } else {
                aux5 = aux5;
            }
            if (unidad_temp == 0) {
                document.getElementById("consigna_pool1").innerHTML = ppspf.toFixed(1);
                document.getElementById("consigna_pool").innerHTML = ppspf.toFixed(1);
                document.getElementById("temp_acum_pool").innerHTML = pt.toFixed(1);
                document.getElementById("offset_pool").innerHTML = ppdo.toFixed(1);
            } else if (unidad_temp == 1) {
                document.getElementById("consigna_pool1").innerHTML = ((ppspf * 1.8) + 32).toFixed(1);
                document.getElementById("consigna_pool").innerHTML = ((ppspf * 1.8) + 32).toFixed(1);
                document.getElementById("temp_acum_pool").innerHTML = ((pt * 1.8) + 32).toFixed(1);
                document.getElementById("offset_pool").innerHTML = (ppdo * 1.8).toFixed(1);
            }
            if (es1 == 1) {
                document.getElementById('odu1').hidden = false;
            } else {
                document.getElementById('odu1').hidden = true;
            }
            if (es2 == 1) {
                document.getElementById('odu2').hidden = false;
            } else {
                document.getElementById('odu2').hidden = true;
            }
            if (es3 == 1) {
                document.getElementById('odu3').hidden = false;
            } else {
                document.getElementById('odu3').hidden = true;
            }
            if (es4 == 1) {
                document.getElementById('odu4').hidden = false;
            } else {
                document.getElementById('odu4').hidden = true;
            }
            if (es5 == 1) {
                document.getElementById('odu5').hidden = false;
            } else {
                document.getElementById('odu5').hidden = true;
            }
            if (es6 == 1) {
                document.getElementById('odu6').hidden = false;
            } else {
                document.getElementById('odu6').hidden = true;
            }
            if (ss1 == 1) {
                document.getElementById("estado_odu1").innerHTML = comunes.ton;
            } else if (ss1 == 3) {
                document.getElementById("estado_odu1").innerHTML = comunes.toff;
            } else if (ss1 == 2) {
                document.getElementById("estado_odu1").innerHTML = nuevas.temergencia;
            }
            if (ss2 == 1) {
                document.getElementById("estado_odu2").innerHTML = comunes.ton;
            } else if (ss2 == 3) {
                document.getElementById("estado_odu2").innerHTML = comunes.toff;
            } else if (ss2 == 2) {
                document.getElementById("estado_odu2").innerHTML = nuevas.temergencia;
            }
            if (ss3 == 1) {
                document.getElementById("estado_odu3").innerHTML = comunes.ton;
            } else if (ss3 == 3) {
                document.getElementById("estado_odu3").innerHTML = comunes.toff;
            } else if (ss3 == 2) {
                document.getElementById("estado_odu3").innerHTML = nuevas.temergencia;
            }
            if (ss4 == 1) {
                document.getElementById("estado_odu4").innerHTML = comunes.ton;
            } else if (ss4 == 3) {
                document.getElementById("estado_odu4").innerHTML = comunes.toff;
            } else if (ss4 == 2) {
                document.getElementById("estado_odu4").innerHTML = nuevas.temergencia;
            }
            if (ss5 == 1) {
                document.getElementById("estado_odu5").innerHTML = comunes.ton;
            } else if (ss5 == 3) {
                document.getElementById("estado_odu5").innerHTML = comunes.toff;
            } else if (ss5 == 2) {
                document.getElementById("estado_odu5").innerHTML = nuevas.temergencia;
            }
            if (ss6 == 1) {
                document.getElementById("estado_odu6").innerHTML = comunes.ton;
            } else if (ss6 == 3) {
                document.getElementById("estado_odu6").innerHTML = comunes.toff;
            } else if (ss6 == 2) {
                document.getElementById("estado_odu6").innerHTML = nuevas.temergencia;
            }
            var sumaodus = es1 + es2 + es3 + es4 + es5 + es6;
            if (sumaodus == 1) {
                document.getElementById("numero_odus").innerHTML = "1 ODU";
            } else if (sumaodus == 2) {
                document.getElementById("numero_odus").innerHTML = "2 ODUs";
            } else if (sumaodus == 3) {
                document.getElementById("numero_odus").innerHTML = "3 ODUs";
            } else if (sumaodus == 4) {
                document.getElementById("numero_odus").innerHTML = "4 ODUs";
            } else if (sumaodus == 5) {
                document.getElementById("numero_odus").innerHTML = "5 ODUs";
            } else if (sumaodus == 6) {
                document.getElementById("numero_odus").innerHTML = "6 ODUs";
            }
            if (hgfi & 0x0004 || dgfi & 0x0004 || pgfi & 0x0004) {
                document.getElementById('div_tabla_caldera').hidden = false;
                document.getElementById('tabla_caldera').style.display = "inline-table";
            }
            if (cgfi & 0x0020 || cgfi & 0x0040) {
                document.getElementById('div_tabla_enfriadora').hidden = false;
                document.getElementById('tabla_enfriadora').style.display = "inline-table";
            }
            if (hgfi & 0x0001 || cgfi & 0x0001 || cgfi & 0x0002 || cgfi & 0x0004 || cgfi & 0x0008) {
                document.getElementById('zonas_servicios').hidden = false;
            }
            if (hgfi & 0x0001) {
                document.getElementById('zona_cal').hidden = false;
            }
            if (cgfi & 0x0001 || cgfi & 0x0002) {
                document.getElementById('zona_act_ref').hidden = false;
            }
            if (cgfi & 0x0004 || cgfi & 0x0008) {
                document.getElementById('zona_ref').hidden = false;
            }
            if (htfi & 0x0001 || htfi & 0x0002 || htfi & 0x0004 || htfi & 0x0008 || htfi & 0x0010 || htfi & 0x0020 || htfi & 0x0040 || htfi & 0x0080 || htfi & 0x0100 || htfi & 0x0200) {
                document.getElementById('div_tabla_terminales').hidden = false;
                document.getElementById('tabla_terminales').style.display = "inline-table";
            }
            if (htfi & 0x0001 || htfi & 0x0020) {
                document.getElementById('gd1').hidden = false;
            }
            if (htfi & 0x0002 || htfi & 0x0040) {
                document.getElementById('gd2').hidden = false;
            }
            if (htfi & 0x0004 || htfi & 0x0080) {
                document.getElementById('gd3').hidden = false;
            }
            if (htfi & 0x0008 || htfi & 0x0100) {
                document.getElementById('gd4').hidden = false;
            }
            if (htfi & 0x0010 || htfi & 0x0200) {
                document.getElementById('gd5').hidden = false;
            }
            if (hcfi & 0x0001 || hcfi & 0x0002 || hcfi & 0x0008 || hcfi & 0x0010 || hcfi & 0x0040 || hcfi & 0x0080 || hcfi & 0x0200 || hcfi & 0x0400 || hcfi & 0x1000 || hcfi & 0x2000) {
                document.getElementById('div_tabla_grupos_cale').hidden = false;
                document.getElementById('tabla_grupos_cale').style.display = "inline-table";
            }
            if (hcfi & 0x0001 || hcfi & 0x0002) {
                document.getElementById('zona1_th').hidden = false;
                document.getElementById('real_t_th1').hidden = true;
                document.getElementById('reg_th1').hidden = true;
            }
            if (hcfi & 0x0002) {
                document.getElementById('real_t_th1').hidden = false;
                document.getElementById('reg_th1').hidden = false;
            }
            if (hcfi & 0x0008 || hcfi & 0x0010) {
                document.getElementById('zona2_th').hidden = false;
                document.getElementById('real_t_th2').hidden = true;
                document.getElementById('reg_th2').hidden = true;
            }
            if (hcfi & 0x0010) {
                document.getElementById('real_t_th2').hidden = false;
                document.getElementById('reg_th2').hidden = false;
            }
            if (hcfi & 0x0040 || hcfi & 0x0080) {
                document.getElementById('zona3_th').hidden = false;
                document.getElementById('real_t_th3').hidden = true;
                document.getElementById('reg_th3').hidden = true;
            }
            if (hcfi & 0x0080) {
                document.getElementById('real_t_th3').hidden = false;
                document.getElementById('reg_th3').hidden = false;
            }
            if (hcfi & 0x0200 || hcfi & 0x0400) {
                document.getElementById('zona4_th').hidden = false;
                document.getElementById('real_t_th4').hidden = true;
                document.getElementById('reg_th4').hidden = true;
            }
            if (hcfi & 0x0400) {
                document.getElementById('real_t_th4').hidden = false;
                document.getElementById('reg_th4').hidden = false;
            }
            if (hcfi & 0x1000 || hcfi & 0x2000) {
                document.getElementById('zona5_th').hidden = false;
                document.getElementById('real_t_th5').hidden = true;
                document.getElementById('reg_th5').hidden = true;
            }
            if (hcfi & 0x2000) {
                document.getElementById('real_t_th5').hidden = false;
                document.getElementById('reg_th5').hidden = false;
            }
            if (ccfi & 0x0001 || ccfi & 0x0002 || ccfi & 0x0008 || ccfi & 0x0010 || ccfi & 0x0040 || ccfi & 0x0080 || ccfi & 0x0200 || ccfi & 0x0400 || ccfi & 0x1000 || ccfi & 0x2000) {
                document.getElementById('div_tabla_grupos_refri').hidden = false;
                document.getElementById('tabla_grupos_refri').style.display = "inline-table";
            }
            if (ccfi & 0x0001 || ccfi & 0x0002) {
                document.getElementById('zona1_th_1').hidden = false;
                document.getElementById('real_t_th1_1').hidden = true;
                document.getElementById('reg_th1_1').hidden = true;
            }
            if (ccfi & 0x0002) {
                document.getElementById('real_t_th1_1').hidden = false;
                document.getElementById('reg_th1_1').hidden = false;
            }
            if (ccfi & 0x0008 || ccfi & 0x0010) {
                document.getElementById('zona2_th_1').hidden = false;
                document.getElementById('real_t_th2_1').hidden = true;
                document.getElementById('reg_th2_1').hidden = true;
            }
            if (ccfi & 0x0010) {
                document.getElementById('real_t_th2_1').hidden = false;
                document.getElementById('reg_th2_1').hidden = false;
            }
            if (ccfi & 0x0040 || ccfi & 0x0080) {
                document.getElementById('zona3_th_1').hidden = false;
                document.getElementById('real_t_th3_1').hidden = true;
                document.getElementById('reg_th3_1').hidden = true;
            }
            if (ccfi & 0x0080) {
                document.getElementById('real_t_th3_1').hidden = false;
                document.getElementById('reg_th3_1').hidden = false;
            }
            if (ccfi & 0x0200 || ccfi & 0x0400) {
                document.getElementById('zona4_th_1').hidden = false;
                document.getElementById('real_t_th4_1').hidden = true;
                document.getElementById('reg_th4_1').hidden = true;
            }
            if (ccfi & 0x0400) {
                document.getElementById('real_t_th4_1').hidden = false;
                document.getElementById('reg_th4_1').hidden = false;
            }
            if (ccfi & 0x1000 || ccfi & 0x2000) {
                document.getElementById('zona5_th_1').hidden = false;
                document.getElementById('real_t_th5_1').hidden = true;
                document.getElementById('reg_th5_1').hidden = true;
            }
            if (ccfi & 0x2000) {
                document.getElementById('real_t_th5_1').hidden = false;
                document.getElementById('reg_th5_1').hidden = false;
            }
            if (haf & 0x0002 || haf & 0x0004) {
                document.getElementById('div_tabla_inercia_cale').hidden = false;
                document.getElementById('tabla_inercia_cale').style.display = "inline-table";
            }
            if (caf & 0x0002 || caf & 0x0004) {
                document.getElementById('div_tabla_inercia_refri').hidden = false;
                document.getElementById('tabla_inercia_refri').style.display = "inline-table";
            }
            if (dgfi & 0x0001) {
                document.getElementById('div_tabla_acs').hidden = false;
                document.getElementById('tabla_acs').style.display = "inline-table";
            }
            if (dcfi & 0x0001 || dcfi & 0x0002) {
                document.getElementById('div_tabla_recirculacion_acs').hidden = false;
                document.getElementById('tabla_recirculacion_acs').style.display = "inline-table";
            }
            if (dcfi & 0x0001) {
                document.getElementById('recirculacion1').hidden = false;
                document.getElementById('recirculacion2').hidden = false;
                document.getElementById('recirculacion3').hidden = false;
            }
            if (pgfi & 0x0001 && pcf & 0x0001) {
                document.getElementById('div_tabla_piscina').hidden = false;
                document.getElementById('tabla_piscina').style.display = "inline-table";
            }
            if (pgfi & 0x0001 && pcf & 0x0002) {
                document.getElementById('div_tabla_piscina1').hidden = false;
                document.getElementById('tabla_piscina1').style.display = "inline-table";
            }
            if (efi & 0x0001) {
                document.getElementById('div_tabla_excedente').hidden = false;
                document.getElementById('tabla_excedente').style.display = "inline-table";
            }
            if (efi & 0x0002) {
                document.getElementById('div_tabla_limite').hidden = false;
                document.getElementById('tabla_limite').style.display = "inline-table";
            }
            if (hprb & 0x0020) {
                document.getElementById('div_tabla_odus').hidden = false;
                document.getElementById('tabla_odus').style.display = "inline-table";
                document.getElementById('numero_odus').style.display = "inline";
                document.getElementById("modelo_bomba_ecoair").src = "../../../imagesnew/insertar_ecoair.png"
            }
            if (aux1 == 1 || aux2 == 1 || aux3 == 1 || aux4 == 1 || aux5 == 1) {
                document.getElementById("modo7").style.display = "inline";
                document.getElementById("modo7").src = "../../../imagesnew/aux_home.png";
            } else {
                document.getElementById("modo7").style.display = "none";
            }
            document.getElementById("div_izquierda_informacion_user").style.display = "inline";
            cont_err = 0;
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
    var alarma = document.getElementById("mensaje_alarma").innerHTML;
    if (alarma == "N") {
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
    } else { }
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
