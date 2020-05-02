$(document).ready(function(){
	
	
	var num = 1;
	var turno;
	var fichasActivas;
	var numMovimientos;
	var soplar;
	var anterior;

	var auxFicha;
	var auxColor;
	var posiblesCasillas;
	var auxCasilla;
	//Creacion de las pestañas
	var tab = $("#panel").tabs();
			
	//Creación de casillas y fichas solamente para la lógica del juego
	casillas = [];
	for (var i = 0; i < 32; i++){
		var cod = "";		
		if (i < 4){
			cod += "A" + num.toString();
		}
		if (i >= 4 && i < 8){
			cod += "B" + num.toString();
		}
		if (i >= 8 && i < 12){
			cod += "C" + num.toString();
		}
		if (i >= 12 && i < 16){
			cod += "D" + num.toString();
		}
		if (i >= 16 && i < 20){
			cod += "E" + num.toString();
		}
		if (i >= 20 && i < 24){
			cod += "F" + num.toString();
		}
		if (i >= 24 && i < 28){
			cod += "G" + num.toString();
		}
		if (i >= 28){
			cod += "H" + num.toString();
		}
		casillas[i] = new Casilla(cod);
		num+=2;
		if(num == 9){
			num=2;
		}
		if(num == 10){
			num=1;
		}
	}
	

	rojo = [];
	azul = [];

	for (var i = 0; i < 12; i++){
		rojo[i] = new Ficha("r" + (i+1).toString(), "rojo");
		azul[i] = new Ficha("a" + (i+1).toString(), "azul");		
	}

	var numRojo = 12;
	var numAzul = 12;

	var tablasRojo = false;
	var tablasAzul = false;
	var isPidiendoTablas = false;

	var rendirseRojo = false;
	var rendirseAzul = false;

	$.widget("com.WidgetMensaje", {
            _create: function() {
                this._img = $("<img id='mensaje'>");                
                //this._img.css("visibility",  "hidden");
                this._img.css("position",  "absolute");
                this._img.css("width",  "480px");
                this._img.css("height",  "200px");
                this._img.css("top",  "150px");
                this._img.css("left",  "0px");
                this._img.css("z-index",  "2");
                this._img.css("display",  "none");                   
                $(this.element).append(this._img);
            },
        });

	


	organizarTablero();
	//Asignarción de funcionalidad a los botones
	$("#posicionar").click(posicionarPiezas);
	$("#terminarTurno").click(terminarTurno);

	$("#pedirTablas").click(pedirTablas);
	$("#aceptarTablas").click(aceptarTablas);
	$("#rechazarTablas").click(rechazarTablas);
	$("#rendirse").click(rendirse);


	//Ocultar los botones
	$("#pedirTablas").hide("highlight", 1500);
	$("#aceptarTablas").hide("highlight", 1500);
	$("#terminarTurno").hide("highlight", 1500);		
	$("#rechazarTablas").hide("highlight", 1500);
	$("#rendirse").hide("highlight", 1500);
	$("#posicionar").show("highlight", 1500);


});

function organizarTablero(){
	//Primero posicionamos el tablero

	 $("#tableroPrincipal").position({
            my: "center",
            at: "center",
            of: "#tablero"
        });
	 //Posicionamiento de las casillas del juego

	 //posicionamiento de los div de nivel 1
	
	 $("#seccion1").position({
            my: "left top",
            at: "left top",
            of: "#tableroPrincipal"
        });

	 $("#seccion2").position({
            my: "right top",
            at: "right top",
            of: "#tableroPrincipal"
        });

	 $("#seccion3").position({
            my: "left bottom",
            at: "left bottom",
            of: "#tableroPrincipal"
        });

	 $("#seccion4").position({
            my: "right bottom",
            at: "right bottom",
            of: "#tableroPrincipal"
        });

	//posicionamiento de los div de nivel 2
	
	//Para cada seccion de nivel 1 analisamos sus secciones de nivel 2
	//j representa las secciones de nivel 1, i las de nivel 2
	for (var j = 1; j < 5; j++){		
		seccionObjetivo = "#seccion1";
		
		for (var i = 1; i < 5; i++){
			var seccion = "#seccion";
			seccion += j.toString() + i.toString();				
			
			if (i==1){
				$(seccion).position({
		            my: "left top",
		            at: "left top",
		            of: "#seccion" + j.toString()
		        });
			}

			if (i==2){
				$(seccion).position({
		            my: "right top",
		            at: "right top",
		            of: "#seccion" + j.toString()
			    });
			}

			if (i==3){
				$(seccion).position({
		            my: "left bottom",
	            	at: "left bottom",
		            of: "#seccion" + j.toString()
		        });
			}

			if (i==4){
				$(seccion).position({
		            my: "right bottom",
	            	at: "right bottom",
		            of: "#seccion" + j.toString()
		        });
			}
				
		}		
	}
	
	
	
	//Ciclo para cada letra
	for (var letra = 1; letra < 9; letra++){		
		var numero = 0;		
		var limite = 0;
		var left;

		if ((letra%2) == 1){
			numero = 1;
			limite = 8;	
			left = true;		
		}else{
			numero = 2;
			limite = 9;
			left = false;
		}

		var nivel1, nivel2;		
		
		if (letra == 1 || letra == 2){
			nivel1 = nivel2 = 3;			
		}
		if (letra == 3 || letra == 4){
			nivel1 = 3;
			nivel2 = 4;			
		}
		if (letra == 5 || letra == 6){
			nivel1 = 4;
			nivel2 = 3;			
		}
		if (letra == 7 || letra == 8){
			nivel1 = nivel2 = 4;		
		}

		for (var num = numero; num < limite; num+=2){				
			
			if(nivel2 == -1){
				nivel2 = 3;
				nivel1 -= 2;
			}
			if(nivel2 == 0){
				nivel2 = 4;
				nivel1 -= 2;
			}

			var casilla = "#";
			if (letra == 1){
				casilla += "A" + num.toString();						
			}
			if (letra == 2){
				casilla += "B" + num.toString();
			}
			if (letra == 3){
				casilla += "C" + num.toString();
			}
			if (letra == 4){
				casilla += "D" + num.toString();
			}
			if (letra == 5){
				casilla += "E" + num.toString();
			}
			if (letra == 6){
				casilla += "F" + num.toString();
			}
			if (letra == 7){
				casilla += "G" + num.toString();
			}
			if (letra == 8){
				casilla += "H" + num.toString();
			}			
			
			if (left){
				$(casilla).position({
					my: "left bottom",
					at: "left bottom",
					of: "#seccion" + nivel1.toString() + nivel2.toString()
				});
			}else{
				$(casilla).position({
					my: "right top",
					at: "right top",
					of: "#seccion" + nivel1.toString() + nivel2.toString()
				});
			}
			nivel2 -= 2;
		}			
	}	

	

	$(".fichaRoja").draggable({
		revert: "invalid",
		start: function() {
			for (var i = 0; i < 12; i++){
				if (rojo[i].codigo == this.id){
					auxFicha = i;
					auxColor = "rojo";

					posiblesCasillas = rojo[i].mover(rojo, azul).split("_");

					for (var j = 0; j < posiblesCasillas.length; j++){


						$("#" + posiblesCasillas[j]).animate({
							 backgroundColor: "yellow"
						})

					}
					var casillaActual = rojo[i].casillaActualLetra + rojo[i].casillaActualNum.toString();

					for (var j=0; j < 32; j++){
		      			if (casillas[j].codigo == casillaActual){      				
		      				auxCasilla = j;
		      			}
		      		}
				}
					
			}
      },
      	stop: function(){
      		for (var i = 0; i < 32; i++){
				$("#" + casillas[i].codigo).animate({
					 backgroundColor: "transparent"
				})
			}

      	}
	});	


	$(".fichaAzul").draggable({
		revert: "invalid",
		start: function() {

			for (var i = 0; i < 12; i++){				

				if (azul[i].codigo == this.id){
					auxFicha = i;
					auxColor = "azul";

					posiblesCasillas = azul[i].mover(azul, rojo).split("_");

					for (var j = 0; j < posiblesCasillas.length; j++){


						$("#" + posiblesCasillas[j]).animate({
							 backgroundColor: "yellow"
						})

					}
					var casillaActual = azul[i].casillaActualLetra + azul[i].casillaActualNum.toString();

					for (var j=0; j < 32; j++){
		      			if (casillas[j].codigo == casillaActual){      				
		      				auxCasilla = j;   		
		      			}
		      		}					
				}
					
			}
      },
      	stop: function(){
      		for (var i = 0; i < 32; i++){
				$("#" + casillas[i].codigo).animate({
					 backgroundColor: "transparent"
				})
			}

      	}
	});	
	//Proporcionarle dinamismo a las piezas
		
	

	$(".casilla").droppable({		
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function(){
      		$(fichasActivas).draggable({
				revert: "invalid"
			});
      		for (var i=0; i < 32; i++){
      			if (casillas[i].codigo == this.id){
      				if (casillas[i].isOcupada){
      					$(".fichaRoja").draggable({
							revert: "valid"
						});
						$(".fichaAzul").draggable({
							revert: "valid"
						});
      				}else{
      					
      					var b = false;
      					for (var j = 0; j < posiblesCasillas.length; j++){
      						if (casillas[i].codigo == posiblesCasillas[j]){
      							b = true;
      						}
      					}

  						if (b){
  							
  							$(fichasActivas).draggable({
								revert: "invalid"
							});
							//lógica del juego
							casillas[i].isOcupada = true;
							casillas[auxCasilla].isOcupada = false;

							//console.log(casillas[auxCasilla].codigo + " " + casillas[auxCasilla].isOcupada);

							var letra = casillas[i].codigo.substring(0,1);
							var numero = casillas[i].codigo.substring(1,2);
							

							

							numMovimientos--;


							if(numMovimientos == 0){
								$(fichasActivas).draggable({
								    disabled: true
								});
							}

							
							soplar = true;
							if (auxColor == "rojo"){
									
								anterior = rojo[auxFicha].retornarCasillaActual();
								//trasladar la pieza
								rojo[auxFicha].casillaActualLetra = letra;
								rojo[auxFicha].casillaActualNum = Number(numero);					
								
								var casActual = letra + numero;
								//Codigo para la captura de piezas azules

								if (rojo[auxFicha].isCapturandoIzq){
									
									if (casActual == rojo[auxFicha].casillaparaCapturarIzqA
										|| casActual == rojo[auxFicha].casillaparaCapturarIzqB){
										for (var j = 0; j < 12; j++){
											var c = azul[j].casillaActualLetra + azul[j].casillaActualNum.toString();
											
											if (c ==  rojo[auxFicha].casillaCapturadaIzqA
												|| c == rojo[auxFicha].casillaCapturadaIzqB){

												soplar = false;
												numAzul--;
												var piezaCapturada = "#" + azul[j].codigo;
												azul[j].casillaActualLetra = "cementerio";
												$(piezaCapturada).effect("explode", 2000);

											}
										}

										for (var j = 0; j < 32; j++){
											if (rojo[auxFicha].casillaCapturadaIzqA == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}
										rojo[auxFicha].isCapturandoDer = false;

									}else{
										//Codigo para analizar si la pieza movida es soplada
										if (rojo[auxFicha].isCapturandoDer){
											rojo[auxFicha].isCapturandoIzq = false;
										}else{

											numRojo--;
											var piezaCapturada = "#" + rojo[auxFicha].codigo;
											rojo[auxFicha].casillaActualLetra = "cementerio";
											$(piezaCapturada).effect("explode", 2000);
											
											for (var j = 0; j < 32; j++){
												if (casActual == casillas[j].codigo){											
													casillas[j].isOcupada = false;
												}
											}
										}
										
									}				
								}
								
								if (rojo[auxFicha].isCapturandoDer){

									if (casActual == rojo[auxFicha].casillaparaCapturarDerA
										|| casActual == rojo[auxFicha].casillaparaCapturarDerB){
										for (var j = 0; j < 12; j++){
											var c = azul[j].casillaActualLetra + azul[j].casillaActualNum.toString();
											
											if (c ==  rojo[auxFicha].casillaCapturadaDerA
												|| c == rojo[auxFicha].casillaCapturadaDerB){

												soplar = false;
												numAzul--;
												var piezaCapturada = "#" + azul[j].codigo;
												azul[j].casillaActualLetra = "cementerio";
												$(piezaCapturada).effect("explode", 2000);

											}
										}

										for (var j = 0; j < 32; j++){
											if (rojo[auxFicha].casillaCapturadaDerA == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}
									}else{
										//Codigo para analizar si la pieza movida es soplada
										numRojo--;
										var piezaCapturada = "#" + rojo[auxFicha].codigo;
										rojo[auxFicha].casillaActualLetra = "cementerio";
										$(piezaCapturada).effect("explode", 2000);
										
										for (var j = 0; j < 32; j++){
											if (casActual == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}								
									}
								}								

																
								//Transición peon a dama
								transicionPeonaDama(rojo[auxFicha]);
								//Continuar capturando
								continuarCapturando(rojo[auxFicha], rojo, azul);
								
								
							}else{
								anterior = azul[auxFicha].retornarCasillaActual();
								//trasladar la pieza
								azul[auxFicha].casillaActualLetra = letra;
								azul[auxFicha].casillaActualNum = Number(numero);

								var casActual = letra + numero;

								//Codigo para la captura de las piezas rojas
								if (azul[auxFicha].isCapturandoIzq){
									
									if (casActual == azul[auxFicha].casillaparaCapturarIzqA
										|| casActual == azul[auxFicha].casillaparaCapturarIzqB){
										for (var j = 0; j < 12; j++){
											var c = rojo[j].casillaActualLetra + rojo[j].casillaActualNum.toString();
											
											if (c ==  azul[auxFicha].casillaCapturadaIzqA
												|| c == azul[auxFicha].casillaCapturadaIzqB){

												soplar = false;
												numRojo--;
												var piezaCapturada = "#" + rojo[j].codigo;
												rojo[j].casillaActualLetra = "cementerio";
												$(piezaCapturada).effect("explode", 2000);

											}
										}

										for (var j = 0; j < 32; j++){
											if (azul[auxFicha].casillaCapturadaIzqA == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}
										azul[auxFicha].isCapturandoDer = false;
									}else{
										//Codigo para analizar si la pieza es soplada
										if (azul[auxFicha].isCapturandoDer){
											azul[auxFicha].isCapturandoIzq = false;
										}else{
											numAzul--;
											var piezaCapturada = "#" + azul[auxFicha].codigo;
											azul[auxFicha].casillaActualLetra = "cementerio";
											$(piezaCapturada).effect("explode", 2000);
											
											for (var j = 0; j < 32; j++){
												if (casActual == casillas[j].codigo){											
													casillas[j].isOcupada = false;
												}
											}
										}
										
									}		
								}
								if (azul[auxFicha].isCapturandoDer){
									
									if (casActual == azul[auxFicha].casillaparaCapturarDerA
										|| casActual == azul[auxFicha].casillaparaCapturarDerB){
										for (var j = 0; j < 12; j++){
											var c = rojo[j].casillaActualLetra + rojo[j].casillaActualNum.toString();
											
											if (c ==  azul[auxFicha].casillaCapturadaDerA
												|| c == azul[auxFicha].casillaCapturadaDerB){

												soplar = false;												
												numRojo--;
												var piezaCapturada = "#" + rojo[j].codigo;
												rojo[j].casillaActualLetra = "cementerio";
												$(piezaCapturada).effect("explode", 2000);

											}
										}

										for (var j = 0; j < 32; j++){
											if (azul[auxFicha].casillaCapturadaDerA == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}
									}else{
										//Codigo para analizar si la pieza es soplada
										numAzul--;
										var piezaCapturada = "#" + azul[auxFicha].codigo;
										azul[auxFicha].casillaActualLetra = "cementerio";
										$(piezaCapturada).effect("explode", 2000);
										
										for (var j = 0; j < 32; j++){
											if (casActual == casillas[j].codigo){											
												casillas[j].isOcupada = false;
											}
										}							
									}
								}

																
								//Transición peon a dama
								transicionPeonaDama(azul[auxFicha]);
								//Continuar capturando
								continuarCapturando(azul[auxFicha], azul, rojo);
							}

							terminarJuego();

							return;	
  						}else{
  							$(fichasActivas).draggable({
								revert: "valid"
							});
  						}
      							      					
      				}
      				
      			}
      		}
      		
      },
      out: function(){
      		$(fichasActivas).draggable({
				revert: "invalid"
			});
      		
      }
    });


	
}

function posicionarPiezas(){
	//Posicionamiento de las fichas

	for (var i = 1; i < 5; i++){
		var ida = "#a" + i.toString();
		var idr = "#r" + i.toString();

		var leftA = 65 + (120*(i-1));
		var leftR = (120*(i-1)) + 5;
		
		$(ida).attr("src","img/peonAzul.png");
		$(ida).show("explode", 2000);
		$(ida).animate({
	        left: leftA.toString() + "px",
	        top: "5px"
	    });

		$(idr).attr("src","img/peonRojo.png");
		$(idr).show("explode", 2000);
	    $(idr).animate({
	        left: leftR.toString() + "px",
	        top: "425px"
	    });
	    //lógica del juego
	    rojo[i-1].tipo = "peon";
	    azul[i-1].tipo = "peon";

	    rojo[i-1].casillaActualNum = 1;
	    azul[i-1].casillaActualNum = 8;

	    
	}

	for (var i = 5; i < 9; i++){
		var ida = "#a" + i.toString();
		var idr = "#r" + i.toString();

		var leftR = 65 + (120*(i-5));
		var leftA = (120*(i-5)) + 5;
		
		$(ida).attr("src","img/peonAzul.png");
		$(ida).show("explode", 2000);
		$(ida).animate({
	        left: leftA.toString() + "px",
	        top: "65px"
	    });

		$(idr).attr("src","img/peonRojo.png");
		$(idr).show("explode", 2000);
	    $(idr).animate({
	        left: leftR.toString() + "px",
	        top: "365px"
	    });
	    //lógica del juego
	    rojo[i-1].tipo = "peon";
	    azul[i-1].tipo = "peon";

	    rojo[i-1].casillaActualNum = 2;
	    azul[i-1].casillaActualNum = 7;
	}

	for (var i = 9; i < 13; i++){
		var ida = "#a" + i.toString();
		var idr = "#r" + i.toString();

		var leftA = 65 + (120*(i-9));
		var leftR = (120*(i-9)) + 5;
		
		$(ida).attr("src","img/peonAzul.png");
		$(ida).show("explode", 2000);
		$(ida).animate({
	        left: leftA.toString() + "px",
	        top: "125px"
	    });

		$(idr).attr("src","img/peonRojo.png");
		$(idr).show("explode", 2000);
	    $(idr).animate({
	        left: leftR.toString() + "px",
	        top: "305px"
	    });
	    //lógica del juego
	    rojo[i-1].tipo = "peon";
	    azul[i-1].tipo = "peon";

	    rojo[i-1].casillaActualNum = 3;
	    azul[i-1].casillaActualNum = 6;
	}

	//lógica del juego

	casillas[0].isOcupada = true;
	casillas[1].isOcupada = true;
	casillas[3].isOcupada = true;

	casillas[4].isOcupada = true;
	casillas[6].isOcupada = true;
	casillas[7].isOcupada = true;

	casillas[8].isOcupada = true;
	casillas[9].isOcupada = true;
	casillas[11].isOcupada = true;

	casillas[12].isOcupada = true;
	casillas[14].isOcupada = true;
	casillas[15].isOcupada = true;

	casillas[16].isOcupada = true;
	casillas[17].isOcupada = true;
	casillas[19].isOcupada = true;

	casillas[20].isOcupada = true;
	casillas[22].isOcupada = true;
	casillas[23].isOcupada = true;

	casillas[24].isOcupada = true;
	casillas[25].isOcupada = true;
	casillas[27].isOcupada = true;

	casillas[28].isOcupada = true;
	casillas[30].isOcupada = true;
	casillas[31].isOcupada = true;

	casillas[2].isOcupada = false;
	casillas[5].isOcupada = false;
	casillas[10].isOcupada = false;
	casillas[13].isOcupada = false;
	casillas[18].isOcupada = false;
	casillas[21].isOcupada = false;
	casillas[26].isOcupada = false;
	casillas[29].isOcupada = false;

	rojo[0].casillaActualLetra = rojo[8].casillaActualLetra = azul[4].casillaActualLetra = "A";
	rojo[1].casillaActualLetra = rojo[9].casillaActualLetra = azul[5].casillaActualLetra = "C";
	rojo[2].casillaActualLetra = rojo[10].casillaActualLetra = azul[6].casillaActualLetra = "E";
	rojo[3].casillaActualLetra = rojo[11].casillaActualLetra = azul[7].casillaActualLetra = "G";

	rojo[4].casillaActualLetra = azul[0].casillaActualLetra = azul[8].casillaActualLetra = "B";
	rojo[5].casillaActualLetra = azul[1].casillaActualLetra = azul[9].casillaActualLetra = "D";
	rojo[6].casillaActualLetra = azul[2].casillaActualLetra = azul[10].casillaActualLetra = "F";
	rojo[7].casillaActualLetra = azul[3].casillaActualLetra = azul[11].casillaActualLetra = "H";

	turno = "azul";	
	soplar = false;

	rendirseRojo = rendirseAzul = isPidiendoTablas = tablasAzul = tablasRojo = false;
	numRojo = numAzul = 12;
	

	$("#aceptarTablas").hide("highlight", 1500);
	$("#rechazarTablas").hide("highlight", 1500);


	$("#posicionar").hide("highlight", 1500);
	
	$("#pedirTablas").show("highlight", 1500);
	$("#terminarTurno").show("highlight", 1500);
	$("#rendirse").show("highlight", 1500);

	//Linea de codigo para esconder el mensaje
	$("#mensaje").hide("fade", 1500);

	

	terminarTurno();

}

function terminarTurno(){
	numMovimientos = 1;
	//analizar piezas posiblemente sopladas
	if (soplar){
		
		soplarPiezas(auxFicha);
	}

	
	anterior = "";

	auxFicha = null;
	auxColor = "";
	posiblesCasillas = "";
	auxCasilla = null;

	if (turno == "azul"){
		turno = "rojo";
		fichasActivas = ".fichaRoja";
		$(".fichaAzul").draggable({
		   disabled: true 
		});
		$(".fichaRoja").draggable({
		   disabled: false 
		});
	}else{
		turno = "azul";
		fichasActivas = ".fichaAzul";
		$(".fichaRoja").draggable({
		   disabled: true 
		});
		$(".fichaAzul").draggable({
		   disabled: false 
		});
	}
	
	if (isPidiendoTablas){
		$("#aceptarTablas").show("highlight", 1500);
		$("#rechazarTablas").show("highlight", 1500);
		isPidiendoTablas = false;		
	}
}

function transicionPeonaDama(ficha){
	if (ficha.peonaDama()){									
		$("#" + ficha.codigo).hide("fade", 1000);									
		$("#" + ficha.codigo).show("explode", 1000);
		if (ficha.color == "rojo"){
			$("#" + ficha.codigo).attr("src","img/damaRojo.png");
		}else{
			$("#" + ficha.codigo).attr("src","img/damaAzul.png");
		}		
	}
}

function continuarCapturando(ficha, fichasP, fichasC){
	if(ficha.continuarCapturando(fichasP, fichasC)) {
		$("#" + ficha.codigo).draggable({
			disabled: false
		})
		soplar = true;
		auxFicha = null;
	}else{		
		$("#" + ficha.codigo).draggable({
			disabled: true
		})
	}
}

function soplarPiezas(fichaCorrida){

	if (fichasActivas == ".fichaRoja"){

		var casActual;

		for (var i = 0; i < 12; i++){
			
			if (rojo[i].tipo == "dama"){
				if (rojo[i].soplar(rojo, azul, anterior) && i!=fichaCorrida){				
					
					numRojo--;
					var piezaCapturada = "#" + rojo[i].codigo;
					rojo[i].casillaActualLetra = "cementerio";
					$(piezaCapturada).effect("explode", 2000);
					
					
				}
				casActual = rojo[i].casillaActualLetra + rojo[i].casillaActualNum.toString();
				for (var j = 0; j < 32; j++){
					if (casActual == casillas[j].codigo){											
						casillas[j].isOcupada = false;
					}
				}
			}
		}




		for (var i = 0; i < 12; i++){			
			if(rojo[i].tipo == "peon"){
				if (rojo[i].soplar(rojo, azul, anterior) && i!=fichaCorrida){			
					
					numRojo--;
					var piezaCapturada = "#" + rojo[i].codigo;
					rojo[i].casillaActualLetra = "cementerio";
					$(piezaCapturada).effect("explode", 2000);
					
					
				}
				casActual = rojo[i].casillaActualLetra + rojo[i].casillaActualNum.toString();
				for (var j = 0; j < 32; j++){
					if (casActual == casillas[j].codigo){											
						casillas[j].isOcupada = false;
					}
				}
			}				
		}

		
	}else{
		var casActual;

		for (var i = 0; i < 12; i++){
			if (azul[i].tipo == "dama"){
				if (azul[i].soplar(azul, rojo, anterior) && i!=fichaCorrida){				
					
					numAzul--;
					var piezaCapturada = "#" + rojo[i].codigo;
					rojo[i].casillaActualLetra = "cementerio";
					$(piezaCapturada).effect("explode", 2000);
					
					
				}
				casActual = rojo[i].casillaActualLetra + rojo[i].casillaActualNum.toString();
				for (var j = 0; j < 32; j++){
					if (casActual == casillas[j].codigo){											
						casillas[j].isOcupada = false;
					}
				}
			}		
				
		}

		for (var i = 0; i < 12; i++){			
			if (azul[i].tipo == "peon"){
				if (azul[i].soplar(azul, rojo, anterior) && i!=fichaCorrida){				
					
					numAzul--;
					var piezaCapturada = "#" + azul[i].codigo;
					azul[i].casillaActualLetra = "cementerio";
					$(piezaCapturada).effect("explode", 2000);
					
				}
				casActual = azul[i].casillaActualLetra + azul[i].casillaActualNum.toString();
				for (var j = 0; j < 32; j++){
					if (casActual == casillas[j].codigo){											
						casillas[j].isOcupada = false;
					}
				}
			}
				
		}
	}
	terminarJuego();
}

function pedirTablas(){

	isPidiendoTablas = true;
	if (fichasActivas == ".fichaRoja"){
		tablasRojo = true;
	}else{
		tablasAzul = true;
	}
	
	$("#pedirTablas").hide("highlight", 1500);
}

function aceptarTablas(){
	if (fichasActivas == ".fichaRoja" && tablasAzul){
		tablasRojo = true;
	}
	if (fichasActivas == ".fichaAzul" && tablasRojo){
		tablasAzul = true;
	}
	$("#aceptarTablas").hide("highlight", 1500);
	$("#rechazarTablas").hide("highlight", 1500);	

	terminarJuego();
}

function rechazarTablas(){
	
	tablasRojo = false;
	tablasAzul = false;
	
	$("#aceptarTablas").hide("highlight", 1500);
	$("#rechazarTablas").hide("highlight", 1500);
	$("#pedirTablas").show("highlight", 1500);
	
}

function rendirse(){
	if (fichasActivas == ".fichaRoja"){
		rendirseRojo = true;
	}else{
		rendirseAzul = true;
	}
	terminarJuego();
}

function terminarJuego(){
	
	if ((fichasActivas == ".fichaRoja" && numAzul == 0)
		|| rendirseAzul){		

		$("#tableroPrincipal").WidgetMensaje();

		$("#mensaje").attr("src", "img/piezasRojasGanan.png");		
		$("#mensaje").show("fade", 1500);

		$("#pedirTablas").hide("highlight", 1500);
		$("#terminarTurno").hide("highlight", 1500);		
		$("#rechazarTablas").hide("highlight", 1500);
		$("#rendirse").hide("highlight", 1500);
		$("#posicionar").show("highlight", 1500);
	}

	if ((fichasActivas == ".fichaAzul" && numRojo == 0)
		|| rendirseRojo) {
		
		$("#tableroPrincipal").WidgetMensaje();
		
		$("#mensaje").attr("src", "img/piezasAzulesGanan.png");			
		$("#mensaje").show("fade", 1500);

		$("#pedirTablas").hide("highlight", 1500);
		$("#terminarTurno").hide("highlight", 1500);		
		$("#rechazarTablas").hide("highlight", 1500);
		$("#rendirse").hide("highlight", 1500);
		$("#posicionar").show("highlight", 1500);
	}

	if (tablasAzul && tablasRojo){
		$("#tableroPrincipal").WidgetMensaje();

		$("#mensaje").attr("src", "img/empate.png");			
		$("#mensaje").show("fade", 1500);

		$("#pedirTablas").hide("highlight", 1500);
		$("#terminarTurno").hide("highlight", 1500);		
		$("#rechazarTablas").hide("highlight", 1500);
		$("#rendirse").hide("highlight", 1500);
		$("#posicionar").show("highlight", 1500);
	}
}