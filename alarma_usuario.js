var cont_err = 0;
var timer_repeat;
datos_correctos = new Array;
function Inicializar() {
    traducir();
    getAlarmas();
    periodicamente();
}
function periodicamente() {
    clearTimeout(timer_repeat);
    actualizarpagina();
    timer_repeat = setTimeout("periodicamente()", 10000);
}
function traducir() {
    document.getElementById('txtalarma').innerHTML = egw24.alarmas_activas;
    document.getElementById('txtalarma_larga').innerHTML = egw24.estado_alarmas;
    document.getElementById('txtalarma_0').innerHTML = egw24.alarma + "1";
    document.getElementById('txtalarma_1').innerHTML = egw24.alarma + "2";
    document.getElementById('txtalarma_2').innerHTML = egw24.alarma + "3";
    document.getElementById('txtalarma_3').innerHTML = egw24.alarma + "4";
    document.getElementById('txtalarma_4').innerHTML = egw24.alarma + "5";
    document.getElementById('txtbloqueo_1').innerHTML = egw24.bloqueo;
    document.getElementById('txtduracion_1').innerHTML = egw24.larga_duracion;
    document.getElementById('txtrecurrencia_1').innerHTML = egw24.recurrencia;
    document.getElementById('botonreset').innerHTML = egw24.resetear_alarmas;
    document.getElementById('txtsin_alarma').innerHTML = egw24.sin_alarmas;
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
    document.getElementById('titulo_web').innerHTML = version_easynet;
}
function actualizarpagina() {
    var cadena = "idOperacion=2135";
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
            rarb = parseInt(datos_correctos[30].replace("RARB=", ""), 16);
            if (rarb > 32768) {
                rarb = rarb - 65536;
            } else {
                rarb = rarb;
            }
            activa1 = parseInt(datos_correctos[25].replace("CAA1=", ""), 16);
            if (activa1 > 32768) {
                activa1 = activa1 - 65536;
            } else {
                activa1 = activa1;
            }
            activa2 = parseInt(datos_correctos[26].replace("CAA2=", ""), 16);
            if (activa2 > 32768) {
                activa2 = activa2 - 65536;
            } else {
                activa2 = activa2;
            }
            activa3 = parseInt(datos_correctos[27].replace("CAA3=", ""), 16);
            if (activa3 > 32768) {
                activa3 = activa3 - 65536;
            } else {
                activa3 = activa3;
            }
            activa4 = parseInt(datos_correctos[28].replace("CAA4=", ""), 16);
            if (activa4 > 32768) {
                activa4 = activa4 - 65536;
            } else {
                activa4 = activa4;
            }
            activa5 = parseInt(datos_correctos[29].replace("CAA5=", ""), 16);
            if (activa5 > 32768) {
                activa5 = activa5 - 65536;
            } else {
                activa5 = activa5;
            }
            bloqueo = parseInt(datos_correctos[22].replace("CAB=", ""), 16);
            if (bloqueo > 32768) {
                bloqueo = bloqueo - 65536;
            } else {
                bloqueo = bloqueo;
            }
            duracion = parseInt(datos_correctos[23].replace("CALD=", ""), 16);
            if (duracion > 32768) {
                duracion = duracion - 65536;
            } else {
                duracion = duracion;
            }
            recurrencia = parseInt(datos_correctos[24].replace("CAR=", ""), 16);
            if (recurrencia > 32768) {
                recurrencia = recurrencia - 65536;
            } else {
                recurrencia = recurrencia;
            }
            if (activa1 != 0) {
                document.getElementById('alarma_activa1').hidden = false;
            } else if (activa1 == 0) {
                document.getElementById('alarma_activa1').hidden = true;
            }
            if (activa2 != 0) {
                document.getElementById('alarma_activa2').hidden = false;
            } else if (activa2 == 0) {
                document.getElementById('alarma_activa2').hidden = true;
            }
            if (activa3 != 0) {
                document.getElementById('alarma_activa3').hidden = false;
            } else if (activa3 == 0) {
                document.getElementById('alarma_activa3').hidden = true;
            }
            if (activa4 != 0) {
                document.getElementById('alarma_activa4').hidden = false;
            } else if (activa4 == 0) {
                document.getElementById('alarma_activa4').hidden = true;
            }
            if (activa5 != 0) {
                document.getElementById('alarma_activa5').hidden = false;
            } else if (activa5 == 0) {
                document.getElementById('alarma_activa5').hidden = true;
            }
            if (activa1 == 0 && activa2 == 0 && activa3 == 0 && activa4 == 0 && activa5 == 0) {
                document.getElementById('sin_alarma_activa').hidden = false;
            } else {
                document.getElementById('sin_alarma_activa').hidden = true;
            }
            const activa = [activa1, activa2, activa3, activa4, activa5, bloqueo, duracion, recurrencia]
            for (i = 0; i < 8; i++) {
                switch (activa[i]) {
                    case 0:
                        texto = "txtalarma" + i;
                        document.getElementById(texto).innerHTML = alarm.alarm0;
                        break;
                    case 1:
                        texto1 = "txtalarma" + i;
                        document.getElementById(texto1).innerHTML = alarm.alarm1;
                        break;
                    case 2:
                        texto2 = "txtalarma" + i;
                        document.getElementById(texto2).innerHTML = alarm.alarm2;
                        break;
                    case 3:
                        texto3 = "txtalarma" + i;
                        document.getElementById(texto3).innerHTML = alarm.alarm3;
                        break;
                    case 4:
                        texto4 = "txtalarma" + i;
                        document.getElementById(texto4).innerHTML = alarm.alarm4;
                        break;
                    case 5:
                        texto5 = "txtalarma" + i;
                        document.getElementById(texto5).innerHTML = alarm.alarm5;
                        break;
                    case 6:
                        texto6 = "txtalarma" + i;
                        document.getElementById(texto6).innerHTML = alarm.alarm6;
                        break;
                    case 7:
                        texto7 = "txtalarma" + i;
                        document.getElementById(texto7).innerHTML = alarm.alarm7;
                        break;
                    case 8:
                        texto8 = "txtalarma" + i;
                        document.getElementById(texto8).innerHTML = alarm.alarm8;
                        break;
                    case 9:
                        texto9 = "txtalarma" + i;
                        document.getElementById(texto9).innerHTML = alarm.alarm9;
                        break;
                    case 10:
                        texto10 = "txtalarma" + i;
                        document.getElementById(texto10).innerHTML = alarm.alarm10;
                        break;
                    case 11:
                        texto11 = "txtalarma" + i;
                        document.getElementById(texto11).innerHTML = alarm.alarm11;
                        break;
                    case 12:
                        texto12 = "txtalarma" + i;
                        document.getElementById(texto12).innerHTML = alarm.alarm12;
                        break;
                    case 13:
                        texto13 = "txtalarma" + i;
                        document.getElementById(texto13).innerHTML = alarm.alarm13;
                        break;
                    case 14:
                        texto14 = "txtalarma" + i;
                        document.getElementById(texto14).innerHTML = alarm.alarm14;
                        break;
                    case 15:
                        texto15 = "txtalarma" + i;
                        document.getElementById(texto15).innerHTML = alarm.alarm15;
                        break;
                    case 16:
                        texto16 = "txtalarma" + i;
                        document.getElementById(texto16).innerHTML = alarm.alarm16;
                        break;
                    case 17:
                        texto17 = "txtalarma" + i;
                        document.getElementById(texto17).innerHTML = alarm.alarm17;
                        break;
                    case 18:
                        texto18 = "txtalarma" + i;
                        document.getElementById(texto18).innerHTML = alarm.alarm18;
                        break;
                    case 19:
                        texto19 = "txtalarma" + i;
                        document.getElementById(texto19).innerHTML = alarm.alarm19;
                        break;
                    case 20:
                        texto20 = "txtalarma" + i;
                        document.getElementById(texto20).innerHTML = alarm.alarm20;
                        break;
                    case 21:
                        texto21 = "txtalarma" + i;
                        document.getElementById(texto21).innerHTML = alarm.alarm21;
                        break;
                    case 22:
                        texto22 = "txtalarma" + i;
                        document.getElementById(texto22).innerHTML = alarm.alarm22;
                        break;
                    case 23:
                        texto23 = "txtalarma" + i;
                        document.getElementById(texto23).innerHTML = alarm.alarm23;
                        break;
                    case 24:
                        texto24 = "txtalarma" + i;
                        document.getElementById(texto24).innerHTML = alarm.alarm24;
                        break;
                    case 25:
                        texto25 = "txtalarma" + i;
                        document.getElementById(texto25).innerHTML = alarm.alarm25;
                        break;
                    case 26:
                        texto26 = "txtalarma" + i;
                        document.getElementById(texto26).innerHTML = alarm.alarm26;
                        break;
                    case 27:
                        texto27 = "txtalarma" + i;
                        document.getElementById(texto27).innerHTML = alarm.alarm27;
                        break;
                    case 28:
                        texto28 = "txtalarma" + i;
                        document.getElementById(texto28).innerHTML = alarm.alarm28;
                        break;
                    case 29:
                        texto29 = "txtalarma" + i;
                        document.getElementById(texto29).innerHTML = alarm.alarm29;
                        break;
                    case 30:
                        texto30 = "txtalarma" + i;
                        document.getElementById(texto30).innerHTML = alarm.alarm30;
                        break;
                    case 31:
                        texto31 = "txtalarma" + i;
                        document.getElementById(texto31).innerHTML = alarm.alarm31;
                        break;
                    case 32:
                        texto32 = "txtalarma" + i;
                        document.getElementById(texto32).innerHTML = alarm.alarm32;
                        break;
                    case 33:
                        texto33 = "txtalarma" + i;
                        document.getElementById(texto33).innerHTML = alarm.alarm33;
                        break;
                    case 34:
                        texto34 = "txtalarma" + i;
                        document.getElementById(texto34).innerHTML = alarm.alarm34;
                        break;
                    case 35:
                        texto35 = "txtalarma" + i;
                        document.getElementById(texto35).innerHTML = alarm.alarm35;
                        break;
                    case 36:
                        texto36 = "txtalarma" + i;
                        document.getElementById(texto36).innerHTML = alarm.alarm36;
                        break;
                    case 37:
                        texto37 = "txtalarma" + i;
                        document.getElementById(texto37).innerHTML = alarm.alarm37;
                        break;
                    case 38:
                        texto38 = "txtalarma" + i;
                        document.getElementById(texto38).innerHTML = alarm.alarm38;
                        break;
                    case 39:
                        texto39 = "txtalarma" + i;
                        document.getElementById(texto39).innerHTML = alarm.alarm39;
                        break;
                    case 40:
                        texto40 = "txtalarma" + i;
                        document.getElementById(texto40).innerHTML = alarm.alarm40;
                        break;
                    case 41:
                        texto41 = "txtalarma" + i;
                        document.getElementById(texto41).innerHTML = alarm.alarm41;
                        break;
                    case 42:
                        texto42 = "txtalarma" + i;
                        document.getElementById(texto42).innerHTML = alarm.alarm42;
                        break;
                    case 43:
                        texto43 = "txtalarma" + i;
                        document.getElementById(texto43).innerHTML = alarm.alarm43;
                        break;
                    case 44:
                        texto44 = "txtalarma" + i;
                        document.getElementById(texto44).innerHTML = alarm.alarm44;
                        break;
                    case 45:
                        texto45 = "txtalarma" + i;
                        document.getElementById(texto45).innerHTML = alarm.alarm45;
                        break;
                    case 46:
                        texto46 = "txtalarma" + i;
                        document.getElementById(texto46).innerHTML = alarm.alarm46;
                        break;
                    case 47:
                        texto47 = "txtalarma" + i;
                        document.getElementById(texto47).innerHTML = alarm.alarm47;
                        break;
                    case 48:
                        texto48 = "txtalarma" + i;
                        document.getElementById(texto48).innerHTML = alarm.alarm48;
                        break;
                    case 49:
                        texto49 = "txtalarma" + i;
                        document.getElementById(texto49).innerHTML = alarm.alarm49;
                        break;
                    case 50:
                        texto50 = "txtalarma" + i;
                        document.getElementById(texto50).innerHTML = alarm.alarm50;
                        break;
                    case 51:
                        texto51 = "txtalarma" + i;
                        document.getElementById(texto51).innerHTML = alarm.alarm51;
                        break;
                    case 52:
                        texto52 = "txtalarma" + i;
                        document.getElementById(texto52).innerHTML = alarm.alarm52;
                        break;
                    case 53:
                        texto53 = "txtalarma" + i;
                        document.getElementById(texto53).innerHTML = alarm.alarm53;
                        break;
                    case 54:
                        texto54 = "txtalarma" + i;
                        document.getElementById(texto54).innerHTML = alarm.alarm54;
                        break;
                    case 55:
                        texto55 = "txtalarma" + i;
                        document.getElementById(texto55).innerHTML = alarm.alarm55;
                        break;
                    case 56:
                        texto56 = "txtalarma" + i;
                        document.getElementById(texto56).innerHTML = alarm.alarm56;
                        break;
                    case 57:
                        texto57 = "txtalarma" + i;
                        document.getElementById(texto57).innerHTML = alarm.alarm57;
                        break;
                    case 58:
                        texto58 = "txtalarma" + i;
                        document.getElementById(texto58).innerHTML = alarm.alarm58;
                        break;
                    case 59:
                        texto59 = "txtalarma" + i;
                        document.getElementById(texto59).innerHTML = alarm.alarm59;
                        break;
                    case 60:
                        texto60 = "txtalarma" + i;
                        document.getElementById(texto60).innerHTML = alarm.alarm60;
                        break;
                    case 61:
                        texto61 = "txtalarma" + i;
                        document.getElementById(texto61).innerHTML = alarm.alarm61;
                        break;
                    case 62:
                        texto62 = "txtalarma" + i;
                        document.getElementById(texto62).innerHTML = alarm.alarm62;
                        break;
                    case 63:
                        texto63 = "txtalarma" + i;
                        document.getElementById(texto63).innerHTML = alarm.alarm63;
                        break;
                    case 64:
                        texto64 = "txtalarma" + i;
                        document.getElementById(texto64).innerHTML = alarm.alarm64;
                        break;
                    case 65:
                        texto65 = "txtalarma" + i;
                        document.getElementById(texto65).innerHTML = alarm.alarm65;
                        break;
                    case 66:
                        texto66 = "txtalarma" + i;
                        document.getElementById(texto66).innerHTML = alarm.alarm66;
                        break;
                    case 67:
                        texto67 = "txtalarma" + i;
                        document.getElementById(texto67).innerHTML = alarm.alarm67;
                        break;
                    case 68:
                        texto68 = "txtalarma" + i;
                        document.getElementById(texto68).innerHTML = alarm.alarm68;
                        break;
                    case 69:
                        texto69 = "txtalarma" + i;
                        document.getElementById(texto69).innerHTML = alarm.alarm69;
                        break;
                    case 70:
                        texto70 = "txtalarma" + i;
                        document.getElementById(texto70).innerHTML = alarm.alarm70;
                        break;
                    case 71:
                        texto71 = "txtalarma" + i;
                        document.getElementById(texto71).innerHTML = alarm.alarm71;
                        break;
                    case 72:
                        texto72 = "txtalarma" + i;
                        document.getElementById(texto72).innerHTML = alarm.alarm72;
                        break;
                    case 73:
                        texto73 = "txtalarma" + i;
                        document.getElementById(texto73).innerHTML = alarm.alarm73;
                        break;
                    case 74:
                        texto74 = "txtalarma" + i;
                        document.getElementById(texto74).innerHTML = alarm.alarm74;
                        break;
                    case 75:
                        texto75 = "txtalarma" + i;
                        document.getElementById(texto75).innerHTML = alarm.alarm75;
                        break;
                    case 76:
                        texto76 = "txtalarma" + i;
                        document.getElementById(texto76).innerHTML = alarm.alarm76;
                        break;
                    case 77:
                        texto77 = "txtalarma" + i;
                        document.getElementById(texto77).innerHTML = alarm.alarm77;
                        break;
                    case 78:
                        texto78 = "txtalarma" + i;
                        document.getElementById(texto78).innerHTML = alarm.alarm78;
                        break;
                    case 79:
                        texto79 = "txtalarma" + i;
                        document.getElementById(texto79).innerHTML = alarm.alarm79;
                        break;
                    case 80:
                        texto80 = "txtalarma" + i;
                        document.getElementById(texto80).innerHTML = alarm.alarm80;
                        break;
                    case 81:
                        texto81 = "txtalarma" + i;
                        document.getElementById(texto81).innerHTML = alarm.alarm81;
                        break;
                    case 82:
                        texto82 = "txtalarma" + i;
                        document.getElementById(texto82).innerHTML = alarm.alarm82;
                        break;
                    case 83:
                        texto83 = "txtalarma" + i;
                        document.getElementById(texto83).innerHTML = alarm.alarm83;
                        break;
                    case 84:
                        texto84 = "txtalarma" + i;
                        document.getElementById(texto84).innerHTML = alarm.alarm84;
                        break;
                    case 85:
                        texto85 = "txtalarma" + i;
                        document.getElementById(texto85).innerHTML = alarm.alarm85;
                        break;
                    case 86:
                        texto86 = "txtalarma" + i;
                        document.getElementById(texto86).innerHTML = alarm.alarm86;
                        break;
                    case 87:
                        texto87 = "txtalarma" + i;
                        document.getElementById(texto87).innerHTML = alarm.alarm87;
                        break;
                    case 88:
                        texto88 = "txtalarma" + i;
                        document.getElementById(texto88).innerHTML = alarm.alarm88;
                        break;
                    case 89:
                        texto89 = "txtalarma" + i;
                        document.getElementById(texto89).innerHTML = alarm.alarm89;
                        break;
                    case 90:
                        texto90 = "txtalarma" + i;
                        document.getElementById(texto90).innerHTML = alarm.alarm90;
                        break;
                    case 91:
                        texto91 = "txtalarma" + i;
                        document.getElementById(texto91).innerHTML = alarm.alarm91;
                        break;
                    case 92:
                        texto92 = "txtalarma" + i;
                        document.getElementById(texto92).innerHTML = alarm.alarm92;
                        break;
                    case 93:
                        texto93 = "txtalarma" + i;
                        document.getElementById(texto93).innerHTML = alarm.alarm93;
                        break;
                    case 94:
                        texto94 = "txtalarma" + i;
                        document.getElementById(texto94).innerHTML = alarm.alarm94;
                        break;
                    case 95:
                        texto95 = "txtalarma" + i;
                        document.getElementById(texto95).innerHTML = alarm.alarm95;
                        break;
                    case 96:
                        texto96 = "txtalarma" + i;
                        document.getElementById(texto96).innerHTML = alarm.alarm96;
                        break;
                    case 97:
                        texto97 = "txtalarma" + i;
                        document.getElementById(texto97).innerHTML = alarm.alarm97;
                        break;
                    case 98:
                        texto98 = "txtalarma" + i;
                        document.getElementById(texto98).innerHTML = alarm.alarm98;
                        break;
                    case 99:
                        texto99 = "txtalarma" + i;
                        document.getElementById(texto99).innerHTML = alarm.alarm99;
                        break;
                    case 100:
                        texto100 = "txtalarma" + i;
                        document.getElementById(texto100).innerHTML = alarm.alarm100;
                        break;
                    case 101:
                        texto101 = "txtalarma" + i;
                        document.getElementById(texto101).innerHTML = alarm.alarm101;
                        break;
                    case 102:
                        texto102 = "txtalarma" + i;
                        document.getElementById(texto102).innerHTML = alarm.alarm102;
                        break;
                    case 103:
                        texto103 = "txtalarma" + i;
                        document.getElementById(texto103).innerHTML = alarm.alarm103;
                        break;
                    case 104:
                        texto104 = "txtalarma" + i;
                        document.getElementById(texto104).innerHTML = alarm.alarm104;
                        break;
                    case 105:
                        texto105 = "txtalarma" + i;
                        document.getElementById(texto105).innerHTML = alarm.alarm105;
                        break;
                    case 106:
                        texto106 = "txtalarma" + i;
                        document.getElementById(texto106).innerHTML = alarm.alarm106;
                        break;
                    case 107:
                        texto107 = "txtalarma" + i;
                        document.getElementById(texto107).innerHTML = alarm.alarm107;
                        break;
                    case 108:
                        texto108 = "txtalarma" + i;
                        document.getElementById(texto108).innerHTML = alarm.alarm108;
                        break;
                    case 109:
                        texto109 = "txtalarma" + i;
                        document.getElementById(texto109).innerHTML = alarm.alarm109;
                        break;
                    case 110:
                        texto110 = "txtalarma" + i;
                        document.getElementById(texto110).innerHTML = alarm.alarm110;
                        break;
                    case 111:
                        texto111 = "txtalarma" + i;
                        document.getElementById(texto111).innerHTML = alarm.alarm111;
                        break;
                    case 112:
                        texto112 = "txtalarma" + i;
                        document.getElementById(texto112).innerHTML = alarm.alarm112;
                        break;
                    case 113:
                        texto113 = "txtalarma" + i;
                        document.getElementById(texto113).innerHTML = alarm.alarm113;
                        break;
                    case 114:
                        texto114 = "txtalarma" + i;
                        document.getElementById(texto114).innerHTML = alarm.alarm114;
                        break;
                    case 115:
                        texto115 = "txtalarma" + i;
                        document.getElementById(texto115).innerHTML = alarm.alarm115;
                        break;
                    case 116:
                        texto116 = "txtalarma" + i;
                        document.getElementById(texto116).innerHTML = alarm.alarm116;
                        break;
                    case 117:
                        texto117 = "txtalarma" + i;
                        document.getElementById(texto117).innerHTML = alarm.alarm117;
                        break;
                    case 118:
                        texto118 = "txtalarma" + i;
                        document.getElementById(texto118).innerHTML = alarm.alarm118;
                        break;
                    case 119:
                        texto119 = "txtalarma" + i;
                        document.getElementById(texto119).innerHTML = alarm.alarm119;
                        break;
                    case 120:
                        texto120 = "txtalarma" + i;
                        document.getElementById(texto120).innerHTML = alarm.alarm120;
                        break;
                    case 121:
                        texto121 = "txtalarma" + i;
                        document.getElementById(texto121).innerHTML = alarm.alarm121;
                        break;
                    case 122:
                        texto122 = "txtalarma" + i;
                        document.getElementById(texto122).innerHTML = alarm.alarm122;
                        break;
                    case 123:
                        texto123 = "txtalarma" + i;
                        document.getElementById(texto123).innerHTML = alarm.alarm123;
                        break;
                    case 124:
                        texto124 = "txtalarma" + i;
                        document.getElementById(texto124).innerHTML = alarm.alarm124;
                        break;
                    case 125:
                        texto125 = "txtalarma" + i;
                        document.getElementById(texto125).innerHTML = alarm.alarm125;
                        break;
                    case 126:
                        texto126 = "txtalarma" + i;
                        document.getElementById(texto126).innerHTML = alarm.alarm126;
                        break;
                    case 127:
                        texto127 = "txtalarma" + i;
                        document.getElementById(texto127).innerHTML = alarm.alarm127;
                        break;
                    case 128:
                        texto128 = "txtalarma" + i;
                        document.getElementById(texto128).innerHTML = alarm.alarm128;
                        break;
                    case 129:
                        texto129 = "txtalarma" + i;
                        document.getElementById(texto129).innerHTML = alarm.alarm129;
                        break;
                    case 130:
                        texto130 = "txtalarma" + i;
                        document.getElementById(texto130).innerHTML = alarm.alarm130;
                        break;
                    case 131:
                        texto131 = "txtalarma" + i;
                        document.getElementById(texto131).innerHTML = alarm.alarm131;
                        break;
                    case 132:
                        texto132 = "txtalarma" + i;
                        document.getElementById(texto132).innerHTML = alarm.alarm132;
                        break;
                    case 133:
                        texto133 = "txtalarma" + i;
                        document.getElementById(texto133).innerHTML = alarm.alarm133;
                        break;
                    case 134:
                        texto134 = "txtalarma" + i;
                        document.getElementById(texto134).innerHTML = alarm.alarm134;
                        break;
                    case 135:
                        texto135 = "txtalarma" + i;
                        document.getElementById(texto135).innerHTML = alarm.alarm135;
                        break;
                    case 136:
                        texto136 = "txtalarma" + i;
                        document.getElementById(texto136).innerHTML = alarm.alarm136;
                        break;
                    case 137:
                        texto137 = "txtalarma" + i;
                        document.getElementById(texto137).innerHTML = alarm.alarm137;
                        break;
                    case 138:
                        texto138 = "txtalarma" + i;
                        document.getElementById(texto138).innerHTML = alarm.alarm138;
                        break;
                    case 139:
                        texto139 = "txtalarma" + i;
                        document.getElementById(texto139).innerHTML = alarm.alarm139;
                        break;
                    case 140:
                        texto140 = "txtalarma" + i;
                        document.getElementById(texto140).innerHTML = alarm.alarm140;
                        break;
                    case 141:
                        texto141 = "txtalarma" + i;
                        document.getElementById(texto141).innerHTML = alarm.alarm141;
                        break;
                    case 142:
                        texto142 = "txtalarma" + i;
                        document.getElementById(texto142).innerHTML = alarm.alarm142;
                        break;
                    case 143:
                        texto143 = "txtalarma" + i;
                        document.getElementById(texto143).innerHTML = alarm.alarm143;
                        break;
                    case 144:
                        texto144 = "txtalarma" + i;
                        document.getElementById(texto144).innerHTML = alarm.alarm144;
                        break;
                    case 145:
                        texto145 = "txtalarma" + i;
                        document.getElementById(texto145).innerHTML = alarm.alarm145;
                        break;
                    case 146:
                        texto146 = "txtalarma" + i;
                        document.getElementById(texto146).innerHTML = alarm.alarm146;
                        break;
                    case 147:
                        texto147 = "txtalarma" + i;
                        document.getElementById(texto147).innerHTML = alarm.alarm147;
                        break;
                    case 148:
                        texto148 = "txtalarma" + i;
                        document.getElementById(texto148).innerHTML = alarm.alarm148;
                        break;
                    case 149:
                        texto149 = "txtalarma" + i;
                        document.getElementById(texto149).innerHTML = alarm.alarm149;
                        break;
                    case 150:
                        texto150 = "txtalarma" + i;
                        document.getElementById(texto150).innerHTML = alarm.alarm150;
                        break;
                    case 151:
                        texto151 = "txtalarma" + i;
                        document.getElementById(texto151).innerHTML = alarm.alarm151;
                        break;
                    case 152:
                        texto152 = "txtalarma" + i;
                        document.getElementById(texto152).innerHTML = alarm.alarm152;
                        break;
                    case 153:
                        texto153 = "txtalarma" + i;
                        document.getElementById(texto153).innerHTML = alarm.alarm153;
                        break;
                    case 154:
                        texto154 = "txtalarma" + i;
                        document.getElementById(texto154).innerHTML = alarm.alarm154;
                        break;
                    case 155:
                        texto155 = "txtalarma" + i;
                        document.getElementById(texto155).innerHTML = alarm.alarm155;
                        break;
                    case 156:
                        texto156 = "txtalarma" + i;
                        document.getElementById(texto156).innerHTML = alarm.alarm156;
                        break;
                    case 157:
                        texto157 = "txtalarma" + i;
                        document.getElementById(texto157).innerHTML = alarm.alarm157;
                        break;
                    case 158:
                        texto158 = "txtalarma" + i;
                        document.getElementById(texto158).innerHTML = alarm.alarm158;
                        break;
                    case 159:
                        texto159 = "txtalarma" + i;
                        document.getElementById(texto159).innerHTML = alarm.alarm159;
                        break;
                    case 160:
                        texto160 = "txtalarma" + i;
                        document.getElementById(texto160).innerHTML = alarm.alarm160;
                        break;
                    case 161:
                        texto161 = "txtalarma" + i;
                        document.getElementById(texto161).innerHTML = alarm.alarm161;
                        break;
                    case 162:
                        texto162 = "txtalarma" + i;
                        document.getElementById(texto162).innerHTML = alarm.alarm162;
                        break;
                    case 163:
                        texto163 = "txtalarma" + i;
                        document.getElementById(texto163).innerHTML = alarm.alarm163;
                        break;
                    case 164:
                        texto164 = "txtalarma" + i;
                        document.getElementById(texto164).innerHTML = alarm.alarm164;
                        break;
                    case 165:
                        texto165 = "txtalarma" + i;
                        document.getElementById(texto165).innerHTML = alarm.alarm165;
                        break;
                    case 166:
                        texto166 = "txtalarma" + i;
                        document.getElementById(texto166).innerHTML = alarm.alarm166;
                        break;
                    case 167:
                        texto167 = "txtalarma" + i;
                        document.getElementById(texto167).innerHTML = alarm.alarm167;
                        break;
                    case 168:
                        texto168 = "txtalarma" + i;
                        document.getElementById(texto168).innerHTML = alarm.alarm168;
                        break;
                    case 169:
                        texto169 = "txtalarma" + i;
                        document.getElementById(texto169).innerHTML = alarm.alarm169;
                        break;
                    case 170:
                        texto170 = "txtalarma" + i;
                        document.getElementById(texto170).innerHTML = alarm.alarm170;
                        break;
                    case 171:
                        texto171 = "txtalarma" + i;
                        document.getElementById(texto171).innerHTML = alarm.alarm171;
                        break;
                    case 172:
                        texto172 = "txtalarma" + i;
                        document.getElementById(texto172).innerHTML = alarm.alarm172;
                        break;
                    case 173:
                        texto173 = "txtalarma" + i;
                        document.getElementById(texto173).innerHTML = alarm.alarm173;
                        break;
                    case 174:
                        texto174 = "txtalarma" + i;
                        document.getElementById(texto174).innerHTML = alarm.alarm174;
                        break;
                    case 175:
                        texto175 = "txtalarma" + i;
                        document.getElementById(texto175).innerHTML = alarm.alarm175;
                        break;
                    case 176:
                        texto176 = "txtalarma" + i;
                        document.getElementById(texto176).innerHTML = alarm.alarm176;
                        break;
                    case 177:
                        texto177 = "txtalarma" + i;
                        document.getElementById(texto177).innerHTML = alarm.alarm177;
                        break;
                    case 178:
                        texto178 = "txtalarma" + i;
                        document.getElementById(texto178).innerHTML = alarm.alarm178;
                        break;
                    case 179:
                        texto179 = "txtalarma" + i;
                        document.getElementById(texto179).innerHTML = alarm.alarm179;
                        break;
                    case 180:
                        texto180 = "txtalarma" + i;
                        document.getElementById(texto180).innerHTML = alarm.alarm180;
                        break;
                    case 181:
                        texto181 = "txtalarma" + i;
                        document.getElementById(texto181).innerHTML = alarm.alarm181;
                        break;
                    case 182:
                        texto182 = "txtalarma" + i;
                        document.getElementById(texto182).innerHTML = alarm.alarm182;
                        break;
                    case 183:
                        texto183 = "txtalarma" + i;
                        document.getElementById(texto183).innerHTML = alarm.alarm183;
                        break;
                    case 184:
                        texto184 = "txtalarma" + i;
                        document.getElementById(texto184).innerHTML = alarm.alarm184;
                        break;
                    case 185:
                        texto185 = "txtalarma" + i;
                        document.getElementById(texto185).innerHTML = alarm.alarm185;
                        break;
                    case 186:
                        texto186 = "txtalarma" + i;
                        document.getElementById(texto186).innerHTML = alarm.alarm186;
                        break;
                    case 187:
                        texto187 = "txtalarma" + i;
                        document.getElementById(texto187).innerHTML = alarm.alarm187;
                        break;
                    case 188:
                        texto188 = "txtalarma" + i;
                        document.getElementById(texto188).innerHTML = alarm.alarm188;
                        break;
                    case 189:
                        texto189 = "txtalarma" + i;
                        document.getElementById(texto189).innerHTML = alarm.alarm189;
                        break;
                    case 190:
                        texto190 = "txtalarma" + i;
                        document.getElementById(texto190).innerHTML = alarm.alarm190;
                        break;
                    case 191:
                        texto191 = "txtalarma" + i;
                        document.getElementById(texto191).innerHTML = alarm.alarm191;
                        break;
                    case 192:
                        texto192 = "txtalarma" + i;
                        document.getElementById(texto192).innerHTML = alarm.alarm192;
                        break;
                    case 193:
                        texto193 = "txtalarma" + i;
                        document.getElementById(texto193).innerHTML = alarm.alarm193;
                        break;
                    case 194:
                        texto194 = "txtalarma" + i;
                        document.getElementById(texto194).innerHTML = alarm.alarm194;
                        break;
                    case 195:
                        texto195 = "txtalarma" + i;
                        document.getElementById(texto195).innerHTML = alarm.alarm195;
                        break;
                    case 196:
                        texto196 = "txtalarma" + i;
                        document.getElementById(texto196).innerHTML = alarm.alarm196;
                        break;
                    case 197:
                        texto197 = "txtalarma" + i;
                        document.getElementById(texto197).innerHTML = alarm.alarm197;
                        break;
                    case 198:
                        texto198 = "txtalarma" + i;
                        document.getElementById(texto198).innerHTML = alarm.alarm198;
                        break;
                    case 199:
                        texto199 = "txtalarma" + i;
                        document.getElementById(texto199).innerHTML = alarm.alarm199;
                        break;
                    case 200:
                        texto200 = "txtalarma" + i;
                        document.getElementById(texto200).innerHTML = alarm.alarm200;
                        break;
                    case 201:
                        texto201 = "txtalarma" + i;
                        document.getElementById(texto201).innerHTML = alarm.alarm201;
                        break;
                    case 202:
                        texto202 = "txtalarma" + i;
                        document.getElementById(texto202).innerHTML = alarm.alarm202;
                        break;
                    case 203:
                        texto203 = "txtalarma" + i;
                        document.getElementById(texto203).innerHTML = alarm.alarm203;
                        break;
                    case 204:
                        texto204 = "txtalarma" + i;
                        document.getElementById(texto204).innerHTML = alarm.alarm204;
                        break;
                    case 205:
                        texto205 = "txtalarma" + i;
                        document.getElementById(texto205).innerHTML = alarm.alarm205;
                        break;
                    case 206:
                        texto206 = "txtalarma" + i;
                        document.getElementById(texto206).innerHTML = alarm.alarm206;
                        break;
                    case 207:
                        texto207 = "txtalarma" + i;
                        document.getElementById(texto207).innerHTML = alarm.alarm207;
                        break;
                    case 208:
                        texto208 = "txtalarma" + i;
                        document.getElementById(texto208).innerHTML = alarm.alarm208;
                        break;
                    case 209:
                        texto209 = "txtalarma" + i;
                        document.getElementById(texto209).innerHTML = alarm.alarm209;
                        break;
                    case 210:
                        texto210 = "txtalarma" + i;
                        document.getElementById(texto210).innerHTML = alarm.alarm210;
                        break;
                    case 211:
                        texto211 = "txtalarma" + i;
                        document.getElementById(texto211).innerHTML = alarm.alarm211;
                        break;
                    case 212:
                        texto212 = "txtalarma" + i;
                        document.getElementById(texto212).innerHTML = alarm.alarm212;
                        break;
                    case 213:
                        texto213 = "txtalarma" + i;
                        document.getElementById(texto213).innerHTML = alarm.alarm213;
                        break;
                    case 214:
                        texto214 = "txtalarma" + i;
                        document.getElementById(texto214).innerHTML = alarm.alarm214;
                        break;
                    case 215:
                        texto215 = "txtalarma" + i;
                        document.getElementById(texto215).innerHTML = alarm.alarm215;
                        break;
                    case 216:
                        texto216 = "txtalarma" + i;
                        document.getElementById(texto216).innerHTML = alarm.alarm216;
                        break;
                    case 217:
                        texto217 = "txtalarma" + i;
                        document.getElementById(texto217).innerHTML = alarm.alarm217;
                        break;
                    case 218:
                        texto218 = "txtalarma" + i;
                        document.getElementById(texto218).innerHTML = alarm.alarm218;
                        break;
                    case 219:
                        texto219 = "txtalarma" + i;
                        document.getElementById(texto219).innerHTML = alarm.alarm219;
                        break;
                    case 220:
                        texto220 = "txtalarma" + i;
                        document.getElementById(texto220).innerHTML = alarm.alarm220;
                        break;
                    case 221:
                        texto221 = "txtalarma" + i;
                        document.getElementById(texto221).innerHTML = alarm.alarm221;
                        break;
                    case 222:
                        texto222 = "txtalarma" + i;
                        document.getElementById(texto222).innerHTML = alarm.alarm222;
                        break;
                    case 223:
                        texto223 = "txtalarma" + i;
                        document.getElementById(texto223).innerHTML = alarm.alarm223;
                        break;
                    case 224:
                        texto224 = "txtalarma" + i;
                        document.getElementById(texto224).innerHTML = alarm.alarm224;
                        break;
                    case 225:
                        texto225 = "txtalarma" + i;
                        document.getElementById(texto225).innerHTML = alarm.alarm225;
                        break;
                    case 226:
                        texto226 = "txtalarma" + i;
                        document.getElementById(texto226).innerHTML = alarm.alarm226;
                        break;
                    case 227:
                        texto227 = "txtalarma" + i;
                        document.getElementById(texto227).innerHTML = alarm.alarm227;
                        break;
                    case 228:
                        texto228 = "txtalarma" + i;
                        document.getElementById(texto228).innerHTML = alarm.alarm228;
                        break;
                    case 229:
                        texto229 = "txtalarma" + i;
                        document.getElementById(texto229).innerHTML = alarm.alarm229;
                        break;
                    case 230:
                        texto230 = "txtalarma" + i;
                        document.getElementById(texto230).innerHTML = alarm.alarm230;
                        break;
                    case 231:
                        texto231 = "txtalarma" + i;
                        document.getElementById(texto231).innerHTML = alarm.alarm231;
                        break;
                    case 232:
                        texto232 = "txtalarma" + i;
                        document.getElementById(texto232).innerHTML = alarm.alarm232;
                        break;
                    case 233:
                        texto233 = "txtalarma" + i;
                        document.getElementById(texto233).innerHTML = alarm.alarm233;
                        break;
                    case 234:
                        texto234 = "txtalarma" + i;
                        document.getElementById(texto234).innerHTML = alarm.alarm234;
                        break;
                    case 235:
                        texto235 = "txtalarma" + i;
                        document.getElementById(texto235).innerHTML = alarm.alarm235;
                        break;
                    case 236:
                        texto236 = "txtalarma" + i;
                        document.getElementById(texto236).innerHTML = alarm.alarm236;
                        break;
                    case 237:
                        texto237 = "txtalarma" + i;
                        document.getElementById(texto237).innerHTML = alarm.alarm237;
                        break;
                    case 238:
                        texto238 = "txtalarma" + i;
                        document.getElementById(texto238).innerHTML = alarm.alarm238;
                        break;
                    case 239:
                        texto239 = "txtalarma" + i;
                        document.getElementById(texto239).innerHTML = alarm.alarm239;
                        break;
                    case 240:
                        texto240 = "txtalarma" + i;
                        document.getElementById(texto240).innerHTML = alarm.alarm240;
                        break;
                    case 241:
                        texto241 = "txtalarma" + i;
                        document.getElementById(texto241).innerHTML = alarm.alarm241;
                        break;
                    case 242:
                        texto242 = "txtalarma" + i;
                        document.getElementById(texto242).innerHTML = alarm.alarm242;
                        break;
                    case 243:
                        texto243 = "txtalarma" + i;
                        document.getElementById(texto243).innerHTML = alarm.alarm243;
                        break;
                    case 244:
                        texto244 = "txtalarma" + i;
                        document.getElementById(texto244).innerHTML = alarm.alarm244;
                        break;
                    case 245:
                        texto245 = "txtalarma" + i;
                        document.getElementById(texto245).innerHTML = alarm.alarm245;
                        break;
                    case 246:
                        texto246 = "txtalarma" + i;
                        document.getElementById(texto246).innerHTML = alarm.alarm246;
                        break;
                    case 247:
                        texto247 = "txtalarma" + i;
                        document.getElementById(texto247).innerHTML = alarm.alarm247;
                        break;
                    case 248:
                        texto248 = "txtalarma" + i;
                        document.getElementById(texto248).innerHTML = alarm.alarm248;
                        break;
                    case 249:
                        texto249 = "txtalarma" + i;
                        document.getElementById(texto249).innerHTML = alarm.alarm249;
                        break;
                    case 250:
                        texto250 = "txtalarma" + i;
                        document.getElementById(texto250).innerHTML = alarm.alarm250;
                        break;
                    case 251:
                        texto251 = "txtalarma" + i;
                        document.getElementById(texto251).innerHTML = alarm.alarm251;
                        break;
                    case 252:
                        texto252 = "txtalarma" + i;
                        document.getElementById(texto252).innerHTML = alarm.alarm252;
                        break;
                    case 253:
                        texto253 = "txtalarma" + i;
                        document.getElementById(texto253).innerHTML = alarm.alarm253;
                        break;
                    case 254:
                        texto254 = "txtalarma" + i;
                        document.getElementById(texto254).innerHTML = alarm.alarm254;
                        break;
                    case 255:
                        texto255 = "txtalarma" + i;
                        document.getElementById(texto255).innerHTML = alarm.alarm255;
                        break;
                    case 256:
                        texto256 = "txtalarma" + i;
                        document.getElementById(texto256).innerHTML = alarm.alarm256;
                        break;
                    default:
                        textofinal = "txtalarma" + i;
                        document.getElementById(textofinal).innerHTML = "Not found";
                }
            }
            document.getElementById('div_izquierda').style.display = "inline";
            timer_repeat = setTimeout("actualizarpagina()", 10000);
            cont_err = 0;
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
function send() {
    var cadena = "idOperacion=2012&dir=6755&num=1&1";
    $.ajax({
        type: "POST",
        url: "../../../../recepcion_datos_4.cgi",
        data: cadena,
        async: false,
    }).done(function (data) {
        actualizarpagina();
    }).fail(function () {
        setTimeout("send()", 141);
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
