var cont_err = 0; var timer_repeat; datos_correctos = new Array; var cero_0; var uno_1; var dos_2; var tres_3; var cuatro_4; var cinco_5; var seis_6; var siete_7; var ocho_8; function Inicializar() { traducir(); getAlarmas(); periodicamente(); }
function periodicamente() { clearTimeout(timer_repeat); funcionalidades(); timer_repeat = setTimeout("periodicamente()", 10000); }
function funcionalidades() {
    var cadena = "idOperacion=2100"; $.ajax({ type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: false, }).done(function (data) {
        var datos = data.split("\n"); var datos_correctos = eliminarErrores(datos); var datos2 = datos_correctos[datos_correctos.length - 1]; if (datos2 != 0) {
            cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
            setTimeout("funcionalidades()", 141); return;
        }
        else if (datos2 == 0) {
            lg = parseInt(datos_correctos[28].replace("LG=", ""), 16); if (lg > 32768) { lg = lg - 65536; }
            else { lg = lg; }
            cgfm = parseInt(datos_correctos[2].replace("CGFM=", ""), 16); if (cgfm > 32768) { cgfm = cgfm - 65536; }
            else { cgfm = cgfm; }
            hprb = parseInt(datos_correctos[27].replace("HPRB=", ""), 16); if (hprb > 32768) { hprb = hprb - 65536; }
            else { hprb = hprb; }
            cgfm = parseInt(datos_correctos[2].replace("CGFM=", ""), 16); if (cgfm > 32768) { cgfm = cgfm - 65536; }
            else { cgfm = cgfm; }
            if (hprb & 0x0020) { document.getElementById("tabla_hab_odus").style.display = "inline-table"; }
            if (hprb & 0x0002) { document.getElementById("tabla_hab_hp").style.display = "inline-table"; }
            if (cgfm & 0x0001 && (hprb & 0x0001 || hprb & 0x0002)) { document.getElementById("tabla_aplicaciones").style.display = "inline-table"; }
            cont_err = 0; actualizarpagina();
        }
    }).fail(function () {
        cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
        setTimeout("funcionalidades()", 141); return;
    });
}
function traducir() {
    document.getElementById('txtcabecera_modelo').innerHTML = egw24.config_idu; document.getElementById('txtcabecera_modelo1').innerHTML = egw24.config_odu; document.getElementById('txtcabecera_modelo2').innerHTML = egw24.config_hp; document.getElementById('txtmodelo_idu').innerHTML = egw24.modelo; document.getElementById('txtmodelo_odu').innerHTML = egw24.modelo; document.getElementById('txtmodelo_hp').innerHTML = egw24.modelo; document.getElementById('txtrol_idu').innerHTML = egw24.rol_equipo; document.getElementById('txtrol_odu').innerHTML = egw24.rol_equipo; document.getElementById('txtrol_hp').innerHTML = egw24.rol_equipo; document.getElementById('txtcabecera_hab_odus').innerHTML = egw24.hab_odus + " " + "ODUs"; document.getElementById('txtodu1').innerHTML = "ODU 1"; document.getElementById('txtodu2').innerHTML = "ODU 2"; document.getElementById('txtodu3').innerHTML = "ODU 3"; document.getElementById('txtodu4').innerHTML = "ODU 4"; document.getElementById('txtodu5').innerHTML = "ODU 5"; document.getElementById('txtodu6').innerHTML = "ODU 6"; document.getElementById('txthp2').innerHTML = "HP2"; document.getElementById('txthp3').innerHTML = "HP3"; document.getElementById('txtcabecera_hab_hps').innerHTML = egw24.hab_odus + " " + "HPs"; document.getElementById('txtcabecera_aplicaciones').innerHTML = egw24.aplicaciones_especiales; document.getElementById('txtservicio_refri').innerHTML = egw24.servicio_refri; document.getElementById('txtservicio_gen').innerHTML = egw24.servicio_gen; for (var i = 2; i < 12; i++) { hab = "txthab" + i; deshab = "txtdeshab" + i; document.getElementById(hab).innerHTML = comunes.thab; document.getElementById(deshab).innerHTML = comunes.tdeshab; }
    document.getElementById('icon_ins1').innerHTML = egw24.instalacion; document.getElementById('icon_ins2').innerHTML = selectmenu.tinformacion; document.getElementById('icon_ins3').innerHTML = test.tregistro_alarmas; document.getElementById('installer').innerHTML = nuevas_paginas.usuario; document.getElementById('user').innerHTML = nuevas_paginas.instalador; document.getElementById('versiones').innerHTML = info.tajuste; document.getElementById('icon_ins1_inferior_marca').innerHTML = installer.tmodelo_ecogeo; document.getElementById('icon_ins2_inferior').innerHTML = nuevas.ttipo_capt; document.getElementById('icon_ins3_inferior').innerHTML = test.tservicios; document.getElementById('icon_ins4_inferior').innerHTML = nuevas.tequip_aux; document.getElementById('icon_ins5_inferior').innerHTML = nuevas_paginas.icono_emanager; document.getElementById('icon_ins6_inferior').innerHTML = mf3.trem_con; document.getElementById('icon_ins7_inferior').innerHTML = test.tprotecciones; document.getElementById('titulo_web').innerHTML = version_easynet;
}
function actualizarpagina() {
    var cadena = "idOperacion=2125"; $.ajax({ type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: false, }).done(function (data) {
        var datos = data.split("\n"); var datos_correctos = eliminarErrores(datos); var datos2 = datos_correctos[datos_correctos.length - 1]; if (datos2 != 0) {
            cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
            setTimeout("actualizarpagina()", 141); return;
        }
        else if (datos2 == 0) {
            edidu = (datos_correctos[14].replace("EDIDU=", "")); edodu = (datos_correctos[15].replace("EDODU=", "")); circ1 = (datos_correctos[16].replace("CC1I=", "")); circ2 = (datos_correctos[17].replace("SGI=", "")); document.getElementById("circuito1").value = circ1; document.getElementById("circuito2").value = circ2; if (edidu == 1 && (lg == 3 || lg == 4)) { document.getElementById("tabla_idu").style.display = "inline-table"; }
            if (edidu == 1 && (lg == 3 || lg == 4) && hprb & 0x0001) { document.getElementById("tabla_odu").style.display = "inline-table"; }
            if (lg == 1 || lg == 2 || lg == 5) { document.getElementById("tabla_hp").style.display = "inline-table"; }
            if (edodu == 1 && (lg == 3 || lg == 4)) { document.getElementById("tabla_odu").style.display = "inline-table"; document.getElementById('ocultar_rolodu').hidden = false; }
            mmi = parseInt(datos_correctos[6].replace("MMI=", ""), 16); if (mmi > 32768) { mmi = mmi - 65536; }
            else { mmi = mmi; }
            if (mmi == 0) { cero_0 = "--"; }
            else if (mmi == 1) { cero_0 = "0"; }

            else if (mmi == 2) { cero_0 = "1"; }
            else if (mmi == 3) { cero_0 = "2"; }
            else if (mmi == 4) { cero_0 = "3"; }
            else if (mmi == 5) { cero_0 = "4"; }
            else if (mmi == 6) { cero_0 = "5"; }
            else if (mmi == 7) { cero_0 = "6"; }
            else if (mmi == 8) { cero_0 = "7"; }
            else if (mmi == 9) { cero_0 = "8"; }
            else if (mmi == 10) { cero_0 = "9"; }
            else if (mmi == 11) { cero_0 = "A"; }
            else if (mmi == 12) { cero_0 = "B"; }
            else if (mmi == 13) { cero_0 = "C"; }
            else if (mmi == 14) { cero_0 = "D"; }
            else if (mmi == 15) { cero_0 = "E"; }
            else if (mmi == 16) { cero_0 = "F"; }
            else if (mmi == 17) { cero_0 = "G"; }
            else if (mmi == 18) { cero_0 = "H"; }
            else if (mmi == 19) { cero_0 = "I"; }
            else if (mmi == 20) { cero_0 = "J"; }
            else if (mmi == 21) { cero_0 = "K"; }
            else if (mmi == 22) { cero_0 = "L"; }
            else if (mmi == 23) { cero_0 = "M"; }
            else if (mmi == 24) { cero_0 = "N"; }
            else if (mmi == 25) { cero_0 = "O"; }
            else if (mmi == 26) { cero_0 = "P"; }
            else if (mmi == 27) { cero_0 = "Q"; }
            else if (mmi == 28) { cero_0 = "R"; }
            else if (mmi == 29) { cero_0 = "S"; }
            else if (mmi == 30) { cero_0 = "T"; }
            else if (mmi == 31) { cero_0 = "U"; }
            else if (mmi == 32) { cero_0 = "V"; }
            else if (mmi == 33) { cero_0 = "W"; }
            else if (mmi == 34) { cero_0 = "X"; }
            else if (mmi == 35) { cero_0 = "Y"; }
            else if (mmi == 36) { cero_0 = "Z"; }
            cmi = parseInt(datos_correctos[7].replace("CMI=", ""), 16); if (cmi > 32768) { cmi = cmi - 65536; }
            else { cmi = cmi; }
            if (cmi == 0) { uno_1 = "--"; }
            else if (cmi == 1) { uno_1 = "0"; }
            else if (cmi == 2) { uno_1 = "1"; }
            else if (cmi == 3) { uno_1 = "2"; }
            else if (cmi == 4) { uno_1 = "3"; }
            else if (cmi == 5) { uno_1 = "4"; }
            else if (cmi == 6) { uno_1 = "5"; }
            else if (cmi == 7) { uno_1 = "6"; }
            else if (cmi == 8) { uno_1 = "7"; }
            else if (cmi == 9) { uno_1 = "8"; }
            else if (cmi == 10) { uno_1 = "9"; }
            else if (cmi == 11) { uno_1 = "A"; }
            else if (cmi == 12) { uno_1 = "B"; }
            else if (cmi == 13) { uno_1 = "C"; }
            else if (cmi == 14) { uno_1 = "D"; }
            else if (cmi == 15) { uno_1 = "E"; }
            else if (cmi == 16) { uno_1 = "F"; }
            else if (cmi == 17) { uno_1 = "G"; }
            else if (cmi == 18) { uno_1 = "H"; }
            else if (cmi == 19) { uno_1 = "I"; }
            else if (cmi == 20) { uno_1 = "J"; }
            else if (cmi == 21) { uno_1 = "K"; }
            else if (cmi == 22) { uno_1 = "L"; }
            else if (cmi == 23) { uno_1 = "M"; }
            else if (cmi == 24) { uno_1 = "N"; }
            else if (cmi == 25) { uno_1 = "O"; }
            else if (cmi == 26) { uno_1 = "P"; }
            else if (cmi == 27) { uno_1 = "Q"; }
            else if (cmi == 28) { uno_1 = "R"; }
            else if (cmi == 29) { uno_1 = "S"; }
            else if (cmi == 30) { uno_1 = "T"; }
            else if (cmi == 31) { uno_1 = "U"; }
            else if (cmi == 32) { uno_1 = "V"; }
            else if (cmi == 33) { uno_1 = "W"; }
            else if (cmi == 34) { uno_1 = "X"; }
            else if (cmi == 35) { uno_1 = "Y"; }
            else if (cmi == 36) { uno_1 = "Z"; }
            capmi = parseInt(datos_correctos[8].replace("CAPMI=", ""), 16); if (capmi > 32768) { capmi = capmi - 65536; }
            else { capmi = capmi; }
            if (capmi == 0) { dos_2 = "--"; }
            else if (capmi == 1) { dos_2 = "0"; }
            else if (capmi == 2) { dos_2 = "1"; }
            else if (capmi == 3) { dos_2 = "2"; }
            else if (capmi == 4) { dos_2 = "3"; }
            else if (capmi == 5) { dos_2 = "4"; }
            else if (capmi == 6) { dos_2 = "5"; }
            else if (capmi == 7) { dos_2 = "6"; }
            else if (capmi == 8) { dos_2 = "7"; }
            else if (capmi == 9) { dos_2 = "8"; }
            else if (capmi == 10) { dos_2 = "9"; }
            else if (capmi == 11) { dos_2 = "A"; }
            else if (capmi == 12) { dos_2 = "B"; }
            else if (capmi == 13) { dos_2 = "C"; }
            else if (capmi == 14) { dos_2 = "D"; }
            else if (capmi == 15) { dos_2 = "E"; }
            else if (capmi == 16) { dos_2 = "F"; }
            else if (capmi == 17) { dos_2 = "G"; }
            else if (capmi == 18) { dos_2 = "H"; }
            else if (capmi == 19) { dos_2 = "I"; }
            else if (capmi == 20) { dos_2 = "J"; }
            else if (capmi == 21) { dos_2 = "K"; }
            else if (capmi == 22) { dos_2 = "L"; }
            else if (capmi == 23) { dos_2 = "M"; }
            else if (capmi == 24) { dos_2 = "N"; }
            else if (capmi == 25) { dos_2 = "O"; }
            else if (capmi == 26) { dos_2 = "P"; }
            else if (capmi == 27) { dos_2 = "Q"; }
            else if (capmi == 28) { dos_2 = "R"; }
            else if (capmi == 29) { dos_2 = "S"; }
            else if (capmi == 30) { dos_2 = "T"; }
            else if (capmi == 31) { dos_2 = "U"; }
            else if (capmi == 32) { dos_2 = "V"; }
            else if (capmi == 33) { dos_2 = "W"; }
            else if (capmi == 34) { dos_2 = "X"; }
            else if (capmi == 35) { dos_2 = "Y"; }
            else if (capmi == 36) { dos_2 = "Z"; }
            emi1 = parseInt(datos_correctos[9].replace("EMI1=", ""), 16); if (emi1 > 32768) { emi1 = emi1 - 65536; }
            else { emi1 = emi1; }
            if (emi1 == 0) { tres_3 = "--"; }
            else if (emi1 == 1) { tres_3 = "0"; }
            else if (emi1 == 2) { tres_3 = "1"; }
            else if (emi1 == 3) { tres_3 = "2"; }
            else if (emi1 == 4) { tres_3 = "3"; }
            else if (emi1 == 5) { tres_3 = "4"; }
            else if (emi1 == 6) { tres_3 = "5"; }
            else if (emi1 == 7) { tres_3 = "6"; }
            else if (emi1 == 8) { tres_3 = "7"; }
            else if (emi1 == 9) { tres_3 = "8"; }
            else if (emi1 == 10) { tres_3 = "9"; }
            else if (emi1 == 11) { tres_3 = "A"; }
            else if (emi1 == 12) { tres_3 = "B"; }
            else if (emi1 == 13) { tres_3 = "C"; }
            else if (emi1 == 14) { tres_3 = "D"; }
            else if (emi1 == 15) { tres_3 = "E"; }
            else if (emi1 == 16) { tres_3 = "F"; }
            else if (emi1 == 17) { tres_3 = "G"; }
            else if (emi1 == 18) { tres_3 = "H"; }
            else if (emi1 == 19) { tres_3 = "I"; }
            else if (emi1 == 20) { tres_3 = "J"; }
            else if (emi1 == 21) { tres_3 = "K"; }
            else if (emi1 == 22) { tres_3 = "L"; }
            else if (emi1 == 23) { tres_3 = "M"; }
            else if (emi1 == 24) { tres_3 = "N"; }
            else if (emi1 == 25) { tres_3 = "O"; }
            else if (emi1 == 26) { tres_3 = "P"; }
            else if (emi1 == 27) { tres_3 = "Q"; }
            else if (emi1 == 28) { tres_3 = "R"; }
            else if (emi1 == 29) { tres_3 = "S"; }
            else if (emi1 == 30) { tres_3 = "T"; }
            else if (emi1 == 31) { tres_3 = "U"; }
            else if (emi1 == 32) { tres_3 = "V"; }
            else if (emi1 == 33) { tres_3 = "W"; }
            else if (emi1 == 34) { tres_3 = "X"; }
            else if (emi1 == 35) { tres_3 = "Y"; }
            else if (emi1 == 36) { tres_3 = "Z"; }
            emi2 = parseInt(datos_correctos[10].replace("EMI2=", ""), 16); if (emi2 > 32768) { emi2 = emi2 - 65536; }
            else { emi2 = emi2; }
            if (emi2 == 0) { cuatro_4 = "--"; }
            else if (emi2 == 1) { cuatro_4 = "0"; }
            else if (emi2 == 2) { cuatro_4 = "1"; }
            else if (emi2 == 3) { cuatro_4 = "2"; }
            else if (emi2 == 4) { cuatro_4 = "3"; }
            else if (emi2 == 5) { cuatro_4 = "4"; }
            else if (emi2 == 6) { cuatro_4 = "5"; }
            else if (emi2 == 7) { cuatro_4 = "6"; }
            else if (emi2 == 8) { cuatro_4 = "7"; }
            else if (emi2 == 9) { cuatro_4 = "8"; }
            else if (emi2 == 10) { cuatro_4 = "9"; }
            else if (emi2 == 11) { cuatro_4 = "A"; }
            else if (emi2 == 12) { cuatro_4 = "B"; }
            else if (emi2 == 13) { cuatro_4 = "C"; }
            else if (emi2 == 14) { cuatro_4 = "D"; }
            else if (emi2 == 15) { cuatro_4 = "E"; }
            else if (emi2 == 16) { cuatro_4 = "F"; }
            else if (emi2 == 17) { cuatro_4 = "G"; }
            else if (emi2 == 18) { cuatro_4 = "H"; }
            else if (emi2 == 19) { cuatro_4 = "I"; }
            else if (emi2 == 20) { cuatro_4 = "J"; }
            else if (emi2 == 21) { cuatro_4 = "K"; }
            else if (emi2 == 22) { cuatro_4 = "L"; }
            else if (emi2 == 23) { cuatro_4 = "M"; }
            else if (emi2 == 24) { cuatro_4 = "N"; }
            else if (emi2 == 25) { cuatro_4 = "O"; }
            else if (emi2 == 26) { cuatro_4 = "P"; }
            else if (emi2 == 27) { cuatro_4 = "Q"; }
            else if (emi2 == 28) { cuatro_4 = "R"; }
            else if (emi2 == 29) { cuatro_4 = "S"; }
            else if (emi2 == 30) { cuatro_4 = "T"; }
            else if (emi2 == 31) { cuatro_4 = "U"; }
            else if (emi2 == 32) { cuatro_4 = "V"; }
            else if (emi2 == 33) { cuatro_4 = "W"; }
            else if (emi2 == 34) { cuatro_4 = "X"; }
            else if (emi2 == 35) { cuatro_4 = "Y"; }
            else if (emi2 == 36) { cuatro_4 = "Z"; }
            emi3 = parseInt(datos_correctos[11].replace("EMI3=", ""), 16); if (emi3 > 32768) { emi3 = emi3 - 65536; }
            else { emi3 = emi3; }
            if (emi3 == 0) { cinco_5 = "--"; }
            else if (emi3 == 1) { cinco_5 = "0"; }
            else if (emi3 == 2) { cinco_5 = "1"; }
            else if (emi3 == 3) { cinco_5 = "2"; }
            else if (emi3 == 4) { cinco_5 = "3"; }
            else if (emi3 == 5) { cinco_5 = "4"; }
            else if (emi3 == 6) { cinco_5 = "5"; }
            else if (emi3 == 7) { cinco_5 = "6"; }
            else if (emi3 == 8) { cinco_5 = "7"; }
            else if (emi3 == 9) { cinco_5 = "8"; }
            else if (emi3 == 10) { cinco_5 = "9"; }
            else if (emi3 == 11) { cinco_5 = "A"; }
            else if (emi3 == 12) { cinco_5 = "B"; }
            else if (emi3 == 13) { cinco_5 = "C"; }
            else if (emi3 == 14) { cinco_5 = "D"; }
            else if (emi3 == 15) { cinco_5 = "E"; }
            else if (emi3 == 16) { cinco_5 = "F"; }
            else if (emi3 == 17) { cinco_5 = "G"; }
            else if (emi3 == 18) { cinco_5 = "H"; }
            else if (emi3 == 19) { cinco_5 = "I"; }
            else if (emi3 == 20) { cinco_5 = "J"; }
            else if (emi3 == 21) { cinco_5 = "K"; }
            else if (emi3 == 22) { cinco_5 = "L"; }
            else if (emi3 == 23) { cinco_5 = "M"; }
            else if (emi3 == 24) { cinco_5 = "N"; }
            else if (emi3 == 25) { cinco_5 = "O"; }
            else if (emi3 == 26) { cinco_5 = "P"; }
            else if (emi3 == 27) { cinco_5 = "Q"; }
            else if (emi3 == 28) { cinco_5 = "R"; }
            else if (emi3 == 29) { cinco_5 = "S"; }
            else if (emi3 == 30) { cinco_5 = "T"; }
            else if (emi3 == 31) { cinco_5 = "U"; }
            else if (emi3 == 32) { cinco_5 = "V"; }
            else if (emi3 == 33) { cinco_5 = "W"; }
            else if (emi3 == 34) { cinco_5 = "X"; }
            else if (emi3 == 35) { cinco_5 = "Y"; }
            else if (emi3 == 36) { cinco_5 = "Z"; }
            mbce = parseInt(datos_correctos[0].replace("MBCE=", ""), 16); if (mbce > 32768) { mbce = mbce - 65536; }
            else { mbce = mbce; }
            if (mbce == 0) { seis_6 = "--"; }
            else if (mbce == 1) { seis_6 = "0"; }
            else if (mbce == 2) { seis_6 = "1"; }
            else if (mbce == 3) { seis_6 = "2"; }
            else if (mbce == 4) { seis_6 = "3"; }
            else if (mbce == 5) { seis_6 = "4"; }
            else if (mbce == 6) { seis_6 = "5"; }
            else if (mbce == 7) { seis_6 = "6"; }
            else if (mbce == 8) { seis_6 = "7"; }
            else if (mbce == 9) { seis_6 = "8"; }
            else if (mbce == 10) { seis_6 = "9"; }
            else if (mbce == 11) { seis_6 = "A"; }
            else if (mbce == 12) { seis_6 = "B"; }
            else if (mbce == 13) { seis_6 = "C"; }
            else if (mbce == 14) { seis_6 = "D"; }
            else if (mbce == 15) { seis_6 = "E"; }
            else if (mbce == 16) { seis_6 = "F"; }
            else if (mbce == 17) { seis_6 = "G"; }
            else if (mbce == 18) { seis_6 = "H"; }
            else if (mbce == 19) { seis_6 = "I"; }
            else if (mbce == 20) { seis_6 = "J"; }
            else if (mbce == 21) { seis_6 = "K"; }
            else if (mbce == 22) { seis_6 = "L"; }
            else if (mbce == 23) { seis_6 = "M"; }
            else if (mbce == 24) { seis_6 = "N"; }
            else if (mbce == 25) { seis_6 = "O"; }
            else if (mbce == 26) { seis_6 = "P"; }
            else if (mbce == 27) { seis_6 = "Q"; }
            else if (mbce == 28) { seis_6 = "R"; }
            else if (mbce == 29) { seis_6 = "S"; }
            else if (mbce == 30) { seis_6 = "T"; }
            else if (mbce == 31) { seis_6 = "U"; }
            else if (mbce == 32) { seis_6 = "V"; }
            else if (mbce == 33) { seis_6 = "W"; }
            else if (mbce == 34) { seis_6 = "X"; }
            else if (mbce == 35) { seis_6 = "Y"; }
            else if (mbce == 36) { seis_6 = "Z"; }
            ce = parseInt(datos_correctos[1].replace("CE=", ""), 16); if (ce > 32768) { ce = ce - 65536; }
            else { ce = ce; }
            if (ce == 0) { siete_7 = "--"; }
            else if (ce == 1) { siete_7 = "0"; }
            else if (ce == 2) { siete_7 = "1"; }
            else if (ce == 3) { siete_7 = "2"; }
            else if (ce == 4) { siete_7 = "3"; }
            else if (ce == 5) { siete_7 = "4"; }
            else if (ce == 6) { siete_7 = "5"; }
            else if (ce == 7) { siete_7 = "6"; }
            else if (ce == 8) { siete_7 = "7"; }
            else if (ce == 9) { siete_7 = "8"; }
            else if (ce == 10) { siete_7 = "9"; }
            else if (ce == 11) { siete_7 = "A"; }
            else if (ce == 12) { siete_7 = "B"; }
            else if (ce == 13) { siete_7 = "C"; }
            else if (ce == 14) { siete_7 = "D"; }
            else if (ce == 15) { siete_7 = "E"; }
            else if (ce == 16) { siete_7 = "F"; }
            else if (ce == 17) { siete_7 = "G"; }
            else if (ce == 18) { siete_7 = "H"; }
            else if (ce == 19) { siete_7 = "I"; }
            else if (ce == 20) { siete_7 = "J"; }
            else if (ce == 21) { siete_7 = "K"; }
            else if (ce == 22) { siete_7 = "L"; }
            else if (ce == 23) { siete_7 = "M"; }
            else if (ce == 24) { siete_7 = "N"; }
            else if (ce == 25) { siete_7 = "O"; }
            else if (ce == 26) { siete_7 = "P"; }
            else if (ce == 27) { siete_7 = "Q"; }
            else if (ce == 28) { siete_7 = "R"; }
            else if (ce == 29) { siete_7 = "S"; }
            else if (ce == 30) { siete_7 = "T"; }
            else if (ce == 31) { siete_7 = "U"; }
            else if (ce == 32) { siete_7 = "V"; }
            else if (ce == 33) { siete_7 = "W"; }
            else if (ce == 34) { siete_7 = "X"; }
            else if (ce == 35) { siete_7 = "Y"; }
            else if (ce == 36) { siete_7 = "Z"; }
            ite = parseInt(datos_correctos[2].replace("ITE=", ""), 16); if (ite > 32768) { ite = ite - 65536; }
            else { ite = ite; }
            if (ite == 0) { ocho_8 = "--"; }
            else if (ite == 1) { ocho_8 = "0"; }
            else if (ite == 2) { ocho_8 = "1"; }
            else if (ite == 3) { ocho_8 = "2"; }
            else if (ite == 4) { ocho_8 = "3"; }
            else if (ite == 5) { ocho_8 = "4"; }
            else if (ite == 6) { ocho_8 = "5"; }
            else if (ite == 7) { ocho_8 = "6"; }
            else if (ite == 8) { ocho_8 = "7"; }
            else if (ite == 9) { ocho_8 = "8"; }
            else if (ite == 10) { ocho_8 = "9"; }
            else if (ite == 11) { ocho_8 = "A"; }
            else if (ite == 12) { ocho_8 = "B"; }
            else if (ite == 13) { ocho_8 = "C"; }
            else if (ite == 14) { ocho_8 = "D"; }
            else if (ite == 15) { ocho_8 = "E"; }
            else if (ite == 16) { ocho_8 = "F"; }
            else if (ite == 17) { ocho_8 = "G"; }
            else if (ite == 18) { ocho_8 = "H"; }
            else if (ite == 19) { ocho_8 = "I"; }
            else if (ite == 20) { ocho_8 = "J"; }
            else if (ite == 21) { ocho_8 = "K"; }
            else if (ite == 22) { ocho_8 = "L"; }
            else if (ite == 23) { ocho_8 = "M"; }
            else if (ite == 24) { ocho_8 = "N"; }
            else if (ite == 25) { ocho_8 = "O"; }
            else if (ite == 26) { ocho_8 = "P"; }
            else if (ite == 27) { ocho_8 = "Q"; }
            else if (ite == 28) { ocho_8 = "R"; }
            else if (ite == 29) { ocho_8 = "S"; }
            else if (ite == 30) { ocho_8 = "T"; }
            else if (ite == 31) { ocho_8 = "U"; }
            else if (ite == 32) { ocho_8 = "V"; }
            else if (ite == 33) { ocho_8 = "W"; }
            else if (ite == 34) { ocho_8 = "X"; }
            else if (ite == 35) { ocho_8 = "Y"; }
            else if (ite == 36) { ocho_8 = "Z"; }
            pce = parseInt(datos_correctos[3].replace("PCE=", ""), 16); if (pce > 32768) { pce = pce - 65536; }
            else { pce = pce; }
            if (pce == 0) { nueve_9 = "--"; }
            else if (pce == 1) { nueve_9 = "0"; }
            else if (pce == 2) { nueve_9 = "1"; }
            else if (pce == 3) { nueve_9 = "2"; }
            else if (pce == 4) { nueve_9 = "3"; }
            else if (pce == 5) { nueve_9 = "4"; }
            else if (pce == 6) { nueve_9 = "5"; }
            else if (pce == 7) { nueve_9 = "6"; }
            else if (pce == 8) { nueve_9 = "7"; }
            else if (pce == 9) { nueve_9 = "8"; }
            else if (pce == 10) { nueve_9 = "9"; }
            else if (pce == 11) { nueve_9 = "A"; }
            else if (pce == 12) { nueve_9 = "B"; }
            else if (pce == 13) { nueve_9 = "C"; }
            else if (pce == 14) { nueve_9 = "D"; }
            else if (pce == 15) { nueve_9 = "E"; }
            else if (pce == 16) { nueve_9 = "F"; }
            else if (pce == 17) { nueve_9 = "G"; }
            else if (pce == 18) { nueve_9 = "H"; }
            else if (pce == 19) { nueve_9 = "I"; }
            else if (pce == 20) { nueve_9 = "J"; }
            else if (pce == 21) { nueve_9 = "K"; }
            else if (pce == 22) { nueve_9 = "L"; }
            else if (pce == 23) { nueve_9 = "M"; }
            else if (pce == 24) { nueve_9 = "N"; }
            else if (pce == 25) { nueve_9 = "O"; }
            else if (pce == 26) { nueve_9 = "P"; }
            else if (pce == 27) { nueve_9 = "Q"; }
            else if (pce == 28) { nueve_9 = "R"; }
            else if (pce == 29) { nueve_9 = "S"; }
            else if (pce == 30) { nueve_9 = "T"; }
            else if (pce == 31) { nueve_9 = "U"; }
            else if (pce == 32) { nueve_9 = "V"; }
            else if (pce == 33) { nueve_9 = "W"; }
            else if (pce == 34) { nueve_9 = "X"; }
            else if (pce == 35) { nueve_9 = "Y"; }
            else if (pce == 36) { nueve_9 = "Z"; }
            rie = parseInt(datos_correctos[4].replace("RIE=", ""), 16); if (rie > 32768) { rie = rie - 65536; }
            else { rie = rie; }
            if (rie == 0) { diez_10 = "--"; }
            else if (rie == 1) { diez_10 = "0"; }
            else if (rie == 2) { diez_10 = "1"; }
            else if (rie == 3) { diez_10 = "2"; }
            else if (rie == 4) { diez_10 = "3"; }
            else if (rie == 5) { diez_10 = "4"; }
            else if (rie == 6) { diez_10 = "5"; }
            else if (rie == 7) { diez_10 = "6"; }
            else if (rie == 8) { diez_10 = "7"; }
            else if (rie == 9) { diez_10 = "8"; }
            else if (rie == 10) { diez_10 = "9"; }
            else if (rie == 11) { diez_10 = "A"; }
            else if (rie == 12) { diez_10 = "B"; }
            else if (rie == 13) { diez_10 = "C"; }
            else if (rie == 14) { diez_10 = "D"; }
            else if (rie == 15) { diez_10 = "E"; }
            else if (rie == 16) { diez_10 = "F"; }
            else if (rie == 17) { diez_10 = "G"; }
            else if (rie == 18) { diez_10 = "H"; }
            else if (rie == 19) { diez_10 = "I"; }
            else if (rie == 20) { diez_10 = "J"; }
            else if (rie == 21) { diez_10 = "K"; }
            else if (rie == 22) { diez_10 = "L"; }
            else if (rie == 23) { diez_10 = "M"; }
            else if (rie == 24) { diez_10 = "N"; }
            else if (rie == 25) { diez_10 = "O"; }
            else if (rie == 26) { diez_10 = "P"; }
            else if (rie == 27) { diez_10 = "Q"; }
            else if (rie == 28) { diez_10 = "R"; }
            else if (rie == 29) { diez_10 = "S"; }
            else if (rie == 30) { diez_10 = "T"; }
            else if (rie == 31) { diez_10 = "U"; }
            else if (rie == 32) { diez_10 = "V"; }
            else if (rie == 33) { diez_10 = "W"; }
            else if (rie == 34) { diez_10 = "X"; }
            else if (rie == 35) { diez_10 = "Y"; }
            else if (rie == 36) { diez_10 = "Z"; }
            ece = parseInt(datos_correctos[5].replace("ECE=", ""), 16); if (ece > 32768) { ece = ece - 65536; }
            else { ece = ece; }
            if (ece == 0) { once_11 = "--"; }
            else if (ece == 1) { once_11 = "0"; }
            else if (ece == 2) { once_11 = "1"; }
            else if (ece == 3) { once_11 = "2"; }
            else if (ece == 4) { once_11 = "3"; }
            else if (ece == 5) { once_11 = "4"; }
            else if (ece == 6) { once_11 = "5"; }
            else if (ece == 7) { once_11 = "6"; }
            else if (ece == 8) { once_11 = "7"; }
            else if (ece == 9) { once_11 = "8"; }
            else if (ece == 10) { once_11 = "9"; }
            else if (ece == 11) { once_11 = "A"; }
            else if (ece == 12) { once_11 = "B"; }
            else if (ece == 13) { once_11 = "C"; }
            else if (ece == 14) { once_11 = "D"; }
            else if (ece == 15) { once_11 = "E"; }
            else if (ece == 16) { once_11 = "F"; }
            else if (ece == 17) { once_11 = "G"; }
            else if (ece == 18) { once_11 = "H"; }
            else if (ece == 19) { once_11 = "I"; }
            else if (ece == 20) { once_11 = "J"; }
            else if (ece == 21) { once_11 = "K"; }
            else if (ece == 22) { once_11 = "L"; }
            else if (ece == 23) { once_11 = "M"; }
            else if (ece == 24) { once_11 = "N"; }
            else if (ece == 25) { once_11 = "O"; }
            else if (ece == 26) { once_11 = "P"; }
            else if (ece == 27) { once_11 = "Q"; }
            else if (ece == 28) { once_11 = "R"; }
            else if (ece == 29) { once_11 = "S"; }
            else if (ece == 30) { once_11 = "T"; }
            else if (ece == 31) { once_11 = "U"; }
            else if (ece == 32) { once_11 = "V"; }
            else if (ece == 33) { once_11 = "W"; }
            else if (ece == 34) { once_11 = "X"; }
            else if (ece == 35) { once_11 = "Y"; }
            else if (ece == 36) { once_11 = "Z"; }
            tbcc = parseInt(datos_correctos[12].replace("TBCC=", ""), 16); if (tbcc > 32768) { tbcc = tbcc - 65536; }
            else { tbcc = tbcc; }
            document.getElementById("modelo_idu").innerHTML = cero_0 + uno_1 + dos_2 + tres_3 + cuatro_4 + cinco_5; document.getElementById("modelo_odu").innerHTML = seis_6 + siete_7 + ocho_8 + nueve_9 + diez_10 + once_11; document.getElementById("modelo_hp").innerHTML = seis_6 + siete_7 + ocho_8 + nueve_9 + diez_10 + once_11; if (tbcc == 2) { document.getElementById("rol_idu").innerHTML = egw24.master_individual; }
            else if (tbcc == 3) { document.getElementById("rol_idu").innerHTML = egw24.master_bloque; }
            if (tbcc == 0) { document.getElementById("rol_odu").innerHTML = egw24.esclavo_individual; }
            else if (tbcc == 1) { document.getElementById("rol_odu").innerHTML = egw24.esclavo_bloque; }
            else if (tbcc == 2) { document.getElementById("rol_odu").innerHTML = egw24.autonoma; }
            if (tbcc == 1) { document.getElementById("rol_hp").innerHTML = egw24.esclavo_bloque; }
            else if (tbcc == 2) { document.getElementById("rol_hp").innerHTML = egw24.autonomo; }
            else if (tbcc == 3) { document.getElementById("rol_hp").innerHTML = egw24.master_bloque; }
            cont_err = 0; actualizarpagina1();
        }
    }).fail(function () {
        cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
        setTimeout("actualizarpagina()", 141); return;
    });
}
function actualizarpagina1() {
    var cadena = "idOperacion=2127"; $.ajax({ type: "POST", url: "../../../../recepcion_datos_4.cgi", data: cadena, async: false, }).done(function (data) {
        var datos = data.split("\n"); var datos_correctos = eliminarErrores(datos); var datos2 = datos_correctos[datos_correctos.length - 1]; if (datos2 != 0) {
            cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
            setTimeout("actualizarpagina1()", 141); return;
        }
        else if (datos2 == 0) { es1 = (datos_correctos[26].replace("ES1=", "")); es2 = (datos_correctos[27].replace("ES2=", "")); es3 = (datos_correctos[28].replace("ES3=", "")); es4 = (datos_correctos[29].replace("ES4=", "")); es5 = (datos_correctos[30].replace("ES5=", "")); es6 = (datos_correctos[31].replace("ES6=", "")); document.getElementById("odu1").value = es1; document.getElementById("odu2").value = es2; document.getElementById("odu3").value = es3; document.getElementById("odu4").value = es4; document.getElementById("odu5").value = es5; document.getElementById("odu6").value = es6; document.getElementById("hp2").value = es2; document.getElementById("hp3").value = es3; cont_err = 0; }
    }).fail(function () {
        cont_err++; if (cont_err >= 4) { cont_err = 0; alert(mensaje_reconexion); }
        setTimeout("actualizarpagina1()", 141); return;
    });
}
function eliminarErrores(string) {
    var j = 0; var temp = new Array(); for (var i = 0; i < string.length - 1; i++) { if (string[i].indexOf("error") < 0) { temp[j] = string[i]; j++; } }
    temp[j] = string[i]; return temp;
}