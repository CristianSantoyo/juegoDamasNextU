function Ficha(codigo, color) {
	this.codigo = codigo;
	this.color = color;

	this.tipo;

	this.casillaActualLetra;
	this.casillaActualNum;

	this.isCapturandoIzq;
	this.isCapturandoDer;


	this.casillaCapturadaIzqA;
	this.casillaCapturadaDerA;	

	this.casillaparaCapturarIzqA;
	this.casillaparaCapturarDerA;


	this.casillaCapturadaIzqB;
	this.casillaCapturadaDerB;

	this.casillaparaCapturarIzqB;
	this.casillaparaCapturarDerB;
	


	this.mover = function(fichasPropias, fichasContrarias){
		var casillasPosibles;

		/*for (var i = 0; i < 12; i++){
			console.log(fichasContrarias[i].casillaActualLetra + fichasContrarias[i].casillaActualNum.toString());
		}*/

		if(this.tipo == "peon"){

				casillasPosibles = this.posibleAvanzarIzquierda(fichasPropias, fichasContrarias) 
									+ "_" +  this.posibleAvanzarDerecha(fichasPropias, fichasContrarias)
									+ "_" +  this.posibleCapturarIzquierda(fichasPropias, fichasContrarias)
									+ "_" +  this.posibleCapturarDerecha(fichasPropias, fichasContrarias);
			
		}

		if(this.tipo == "dama"){

				casillasPosibles = this.moverDama(fichasPropias, fichasContrarias);
			
		}
		return casillasPosibles;
	}

	this.posibleAvanzarIzquierda = function(fichasPropias, fichasContrarias){
		
		var casillaPosible;
		switch(this.casillaActualLetra){
			case "A":
				return "";						
			case "B":
				casillaPosible = "A";
				break;

			case "C":
				casillaPosible = "B";
				break;

			case "D":
				casillaPosible = "C";
				break;

			case "E":
				casillaPosible = "D";
				break;

			case "F":
				casillaPosible = "E";
				break;
			case "G":
				casillaPosible = "F";
				break;
			case "H":
				casillaPosible = "G";
				break;
		}
		
		if(this.color == "rojo"){
			casillaPosible += (this.casillaActualNum+1).toString()
		}else{
			casillaPosible += (this.casillaActualNum-1).toString()
		}
		
		for (var i = 0; i < 12; i++){

			var casillaFP = fichasPropias[i].casillaActualLetra + fichasPropias[i].casillaActualNum.toString();
			var casillaFC = fichasContrarias[i].casillaActualLetra + fichasContrarias[i].casillaActualNum.toString();				
			

			if (casillaPosible == casillaFP || casillaPosible == casillaFC){
				return "";
			}
		}					

		return casillaPosible;
	}

	this.posibleAvanzarDerecha = function(fichasPropias, fichasContrarias){
		
		var casillaPosible;
		switch(this.casillaActualLetra){
			case "A":
				casillaPosible = "B";
				break;					
			case "B":
				casillaPosible = "C";
				break;

			case "C":
				casillaPosible = "D";
				break;

			case "D":
				casillaPosible = "E";
				break;

			case "E":
				casillaPosible = "F";
				break;

			case "F":
				casillaPosible = "G";
				break;
			case "G":
				casillaPosible = "H";
				break;
			case "H":
				return "";
		}
		
		if(this.color == "rojo"){
			casillaPosible += (this.casillaActualNum+1).toString()
		}else{
			casillaPosible += (this.casillaActualNum-1).toString()
		}

		
		for (var i = 0; i < 12; i++){

			var casillaFP = fichasPropias[i].casillaActualLetra + fichasPropias[i].casillaActualNum.toString();
			var casillaFC = fichasContrarias[i].casillaActualLetra + fichasContrarias[i].casillaActualNum.toString();			

			if (casillaPosible == casillaFP || casillaPosible == casillaFC){
				return "";
			}
		}					

		return casillaPosible;			

		
	}

	this.posibleCapturarIzquierda = function(fichasPropias, fichasContrarias){
		
		var casillaMuerto;
		var casillaPosible;
		var b = true;
		this.isCapturandoIzq = false;

		switch(this.casillaActualLetra){
			case "A":
				return "";						
			case "B":
				return "";
			case "C":
				casillaPosible = "A";
				casillaMuerto = "B";
				break;

			case "D":
				casillaPosible = "B";
				casillaMuerto = "C";
				break;

			case "E":
				casillaPosible = "C";
				casillaMuerto = "D";
				break;

			case "F":
				casillaPosible = "D";
				casillaMuerto = "E";
				break;
			case "G":
				casillaPosible = "E";
				casillaMuerto = "F";
				break;
			case "H":
				casillaPosible = "F";
				casillaMuerto = "G";
				break;
		}
		
		if(this.color == "rojo"){
			if (this.casillaActualNum == 7){
				return "";
			}
			casillaPosible += (this.casillaActualNum+2).toString();
			casillaMuerto += (this.casillaActualNum+1).toString();
		}else{
			if (this.casillaActualNum == 2){
				return "";
			}
			casillaPosible += (this.casillaActualNum-2).toString();
			casillaMuerto += (this.casillaActualNum-1).toString();
		}
		
		for (var i = 0; i < 12; i++){				

			var casillaFP = fichasPropias[i].casillaActualLetra + fichasPropias[i].casillaActualNum.toString();
			var casillaFC = fichasContrarias[i].casillaActualLetra + fichasContrarias[i].casillaActualNum.toString();

			if (casillaPosible == casillaFP || casillaPosible == casillaFC){
				return "";
			}
			if (casillaMuerto == casillaFC){
				b = false;				
			}
				
		}
		if (b){
			return "";
		}
		
		this.isCapturandoIzq = true;
		this.casillaCapturadaIzqA = casillaMuerto;
		this.casillaparaCapturarIzqA = casillaPosible;
		return casillaPosible;
	}

	this.posibleCapturarDerecha = function(fichasPropias, fichasContrarias){
		
		var casillaMuerto;
		var casillaPosible;
		var b = true;
		this.isCapturandoDer = false;
		switch(this.casillaActualLetra){
			case "A":
				casillaPosible = "C";
				casillaMuerto = "B";
				break;					
			case "B":
				casillaPosible = "D";
				casillaMuerto = "C";
				break;
			case "C":
				casillaPosible = "E";
				casillaMuerto = "D";
				break;

			case "D":
				casillaPosible = "F";
				casillaMuerto = "E";
				break;

			case "E":
				casillaPosible = "G";
				casillaMuerto = "F";
				break;

			case "F":
				casillaPosible = "H";
				casillaMuerto = "G";
				break;
			case "G":
				return "";
			case "H":
				return "";
		}
		
		if(this.color == "rojo"){
			if (this.casillaActualNum == 7){
				return "";
			}
			casillaPosible += (this.casillaActualNum+2).toString();
			casillaMuerto += (this.casillaActualNum+1).toString();
		}else{
			if (this.casillaActualNum == 2){
				return "";
			}
			casillaPosible += (this.casillaActualNum-2).toString();
			casillaMuerto += (this.casillaActualNum-1).toString();
		}
		
		for (var i = 0; i < 12; i++){				

			var casillaFP = fichasPropias[i].casillaActualLetra + fichasPropias[i].casillaActualNum.toString();
			var casillaFC = fichasContrarias[i].casillaActualLetra + fichasContrarias[i].casillaActualNum.toString();

			if (casillaPosible == casillaFP || casillaPosible == casillaFC){
				return "";
			}
			if (casillaMuerto == casillaFC){
				b = false;
				

			}
				
		}
		if (b){
			return "";
		}
		this.isCapturandoDer = true;
		this.casillaCapturadaDerA = casillaMuerto;
		this.casillaparaCapturarDerA = casillaPosible;
		return casillaPosible;
	}


	this.moverDama = function(fichasPropias, fichasContrarias){
		var casillasPosiblesDama = "";
		
		var num = this.casillaActualNum;
		var letr = this.retornarNumero(this.casillaActualLetra);		

		var index = 1;
		//booleanos para restringir el movimiento de la Dama
		var iArriba = true;
		var iAbajo = true;
		var dArriba = true;
		var dAbajo = true;

		for (var i = letr-1; i > 0; i--){
			
			var numArriba = num-index;
			var numAbajo = num+index;
			
			var casillaArriba = this.retornarLetra(i) + numArriba.toString();
			var casillaAbajo = this.retornarLetra(i) + numAbajo.toString();
			if (iArriba){
				if (numArriba < 9 && this.analizarCasilla(casillaArriba, fichasPropias, fichasContrarias)){
					casillasPosiblesDama += casillaArriba + "_";
				}else{
					iArriba = false;
					casillasPosiblesDama += this.capturarconDama(i, numArriba, fichasPropias, fichasContrarias, "abajoIzq") + "_";
					
				}
			}
			if (iAbajo){
				if(numAbajo > 0 && this.analizarCasilla(casillaAbajo, fichasPropias, fichasContrarias)){
					casillasPosiblesDama +=  casillaAbajo + "_";
				}else{
					iAbajo = false;
					casillasPosiblesDama += this.capturarconDama(i, numAbajo, fichasPropias, fichasContrarias, "arribaIzq") + "_";
					
				}
			}	
				
			index++;
		}
		index = 1;
		for (var i = letr+1; i < 9; i++){
			
			var numArriba = num+index;
			var numAbajo = num-index;
			
			var casillaArriba = this.retornarLetra(i) + numArriba.toString();
			var casillaAbajo = this.retornarLetra(i) + numAbajo.toString();
			if (dArriba){
				if (numArriba < 9 && this.analizarCasilla(casillaArriba, fichasPropias, fichasContrarias)){
					casillasPosiblesDama += casillaArriba + "_";
				}else{
					dArriba = false;
					casillasPosiblesDama += this.capturarconDama(i, numArriba, fichasPropias, fichasContrarias, "arribaDer") + "_";
					
				}
			}
			if (dAbajo){
				if(numAbajo > 0 && this.analizarCasilla(casillaAbajo, fichasPropias, fichasContrarias)){
					casillasPosiblesDama +=  casillaAbajo + "_";
				}else{
					dAbajo = false;
					casillasPosiblesDama += this.capturarconDama(i, numAbajo, fichasPropias, fichasContrarias, "abajoDer") + "_";
					
				}
			}				

			index++;
		}
		
		return casillasPosiblesDama;
	}

	this.capturarconDama = function(numLetraCC, numCC, fichasPropias, fichasContrarias, direccion){
		var casillaPosibleCapturarconDama = "";
		var casilla =  this.retornarLetra(numLetraCC) + numCC.toString();		

		if (numLetraCC == 1 || numLetraCC == 8 || numCC == 1 || numCC == 8){
			return "";
		}
		
		if (direccion == "arribaIzq"){
			casillaPosibleCapturarconDama = this.retornarLetra(numLetraCC-1) + (numCC+1).toString();			
		}
		if (direccion == "abajoIzq"){
			casillaPosibleCapturarconDama = this.retornarLetra(numLetraCC-1) + (numCC-1).toString();			
		}
		if (direccion == "arribaDer"){
			casillaPosibleCapturarconDama = this.retornarLetra(numLetraCC+1) + (numCC+1).toString();			
		}
		if (direccion == "abajoDer"){
			casillaPosibleCapturarconDama = this.retornarLetra(numLetraCC+1) + (numCC-1).toString();			
		}	
		
		if (this.analizarCasillaContraria(casilla, fichasContrarias) 
			&& this.analizarCasilla(casillaPosibleCapturarconDama, fichasPropias, fichasContrarias)){

			if (direccion == "arribaIzq"){

				this.casillaCapturadaIzqA = casilla;
				this.casillaparaCapturarIzqA = casillaPosibleCapturarconDama;
				this.isCapturandoIzq = true;

			}
			if (direccion == "abajoIzq"){

				this.casillaCapturadaIzqB = casilla;
				this.casillaparaCapturarIzqB = casillaPosibleCapturarconDama;
				this.isCapturandoIzq = true;

			}
			if (direccion == "arribaDer"){

				this.casillaCapturadaDerA = casilla;
				this.casillaparaCapturarDerA = casillaPosibleCapturarconDama;
				this.isCapturandoDer = true;

			}
			if (direccion == "abajoDer"){

				this.casillaCapturadaDerB = casilla;
				this.casillaparaCapturarDerB = casillaPosibleCapturarconDama;
				this.isCapturandoDer = true;

			}


			return casillaPosibleCapturarconDama;
		}
		/*this.casillaCapturadaIzqA = this.casillaCapturadaDerA = "";
			this.casillaparaCapturarIzqA = this.casillaparaCapturarDerA = "";
			this.isCapturandoIzq = this.isCapturandoDer = false;*/
		return "";		
	}


	this.analizarCasillaContraria = function(casilla, fichasContrarias){
		
		for (var i = 0; i < 12; i++){
			var casillaFC = this.retornarCasillaFicha(fichasContrarias[i]);			

			if (casilla == casillaFC){
				
				return true;
			}
		}
		return false;
	}

	this.analizarCasilla = function(casilla, fichasPropias, fichasContrarias){
		
		for (var i = 0; i < 12; i++){
			var casillaFP = this.retornarCasillaFicha(fichasPropias[i]);
			var casillaFC = this.retornarCasillaFicha(fichasContrarias[i]);

			if (casilla == casillaFP || casilla == casillaFC){
				return false;
			}
		}
		return true;
	}




	this.peonaDama = function(){
		if(this.tipo == "dama"){
			return false;
		}
		if ((this.color == "rojo" && this.casillaActualNum == 8) 
			|| (this.color == "azul" && this.casillaActualNum == 1)){
			

			this.limpiar();


			this.tipo = "dama"
			return true;
		}		
		return false;
	}

	this.continuarCapturando = function(fichasPropias, fichasContrarias){
		
		if(this.tipo == "peon"){			
			if (this.isCapturandoDer || this.isCapturandoIzq){
				
				this.limpiar();

				this.posibleCapturarIzquierda(fichasPropias, fichasContrarias);
				this.posibleCapturarDerecha(fichasPropias, fichasContrarias);

				if (this.isCapturandoDer || this.isCapturandoIzq){
					return true;
				}
			}			
		}
		if(this.tipo == "dama"){	

			if (this.isCapturandoDer || this.isCapturandoIzq){
				
				this.limpiar();
				this.analizarNuevaCasillaDama(fichasPropias, fichasContrarias)
				
				if (this.isCapturandoDer || this.isCapturandoIzq){
					
					return true;
				}
			
			}			
		}
		return false;
	}

	this.soplar = function(fichasPropias, fichasContrarias, casAnterior){
		
		if(this.tipo == "peon"){

			this.posibleCapturarIzquierda(fichasPropias, fichasContrarias);
			this.posibleCapturarDerecha(fichasPropias, fichasContrarias);			
			
			if ((this.isCapturandoDer || this.isCapturandoIzq)
				&& (this.casillaparaCapturarIzqA != casAnterior
				&& this.casillaparaCapturarDerA != casAnterior)
				){
				
				this.limpiar();

				return true;
			}
			
		}

		if (this.tipo == "dama"){
			
			this.analizarNuevaCasillaDama(fichasPropias, fichasContrarias);

			if ((this.isCapturandoDer || this.isCapturandoIzq)
				&& (this.casillaparaCapturarIzqA != casAnterior
				&& this.casillaparaCapturarDerA != casAnterior)
				){
				
				this.limpiar();

				return true;
			}

		}
		return false;
	}

	this.analizarNuevaCasillaDama = function(fichasPropias, fichasContrarias){
				
		var num = this.casillaActualNum;
		var letr = this.retornarNumero(this.casillaActualLetra);		

		var index = 1;
		//booleanos para restringir el movimiento de la Dama
		var iArriba = true;
		var iAbajo = true;
		var dArriba = true;
		var dAbajo = true;

		for (var i = letr-1; i > 0; i--){
			
			var numArriba = num-index;
			var numAbajo = num+index;
			
			var casillaArriba = this.retornarLetra(i) + numArriba.toString();
			var casillaAbajo = this.retornarLetra(i) + numAbajo.toString();
			
			if (iArriba){
				if (numArriba >= 9 || this.analizarCasilla(casillaArriba, fichasPropias, fichasContrarias) == false){
					iArriba = false;
					this.capturarconDama(i, numArriba, fichasPropias, fichasContrarias, "abajoIzq");					
				}
			}
			
			if (iAbajo){
				if(numAbajo <= 0 || this.analizarCasilla(casillaAbajo, fichasPropias, fichasContrarias) == false){
					iAbajo = false;
					this.capturarconDama(i, numAbajo, fichasPropias, fichasContrarias, "arribaIzq");					
				}
			}	
				
			index++;
		}
		index = 1;
		for (var i = letr+1; i < 9; i++){
			
			var numArriba = num+index;
			var numAbajo = num-index;
			
			var casillaArriba = this.retornarLetra(i) + numArriba.toString();
			var casillaAbajo = this.retornarLetra(i) + numAbajo.toString();
			
			if (dArriba){
				if (numArriba >= 9 || this.analizarCasilla(casillaArriba, fichasPropias, fichasContrarias) == false){
					dArriba = false;
					this.capturarconDama(i, numArriba, fichasPropias, fichasContrarias, "arribaDer");					
				}
			}

			if (dAbajo){
				if(numAbajo <= 0 || this.analizarCasilla(casillaAbajo, fichasPropias, fichasContrarias) == false){
					dAbajo = false;
					this.capturarconDama(i, numAbajo, fichasPropias, fichasContrarias, "abajoDer");					
				}
			}				

			index++;
		}		
		
	}




	this.limpiar = function(){

			this.isCapturandoIzq = false;
			this.isCapturandoDer = false;

			this.casillaCapturadaIzqA = this.casillaparaCapturarIzqA = "";
			this.casillaCapturadaDerA = this.casillaparaCapturarDerA = "";	

			this.casillaCapturadaIzqB = this.casillaparaCapturarIzqB = "";
			this.casillaCapturadaDerB = this.casillaparaCapturarDerB = "";

	}

	this.retornarCasillaFicha = function(ficha){
		return ficha.casillaActualLetra + ficha.casillaActualNum.toString();
	}

	this.retornarCasillaActual = function(){
		return this.casillaActualLetra + this.casillaActualNum.toString();
	}

	this.retornarNumero = function(letra){
		var n;
		switch(letra){
			case "A":
				n = 1;
				break;					
			case "B":
				n = 2;
				break;
			case "C":
				n = 3;
				break;
			case "D":
				n = 4;
				break;
			case "E":
				n = 5;
				break;

			case "F":
				n = 6;
				break;
			case "G":
				n = 7;
				break;
			case "H":
				n = 8;
				break;
		}
		return n;
	}

	this.retornarLetra = function(num){
		var letra;
		switch(num){
			case 1:
				letra = "A";
				break;					
			case 2:
				letra = "B";
				break;
			case 3:
				letra = "C";
				break;
			case 4:
				letra = "D";
				break;
			case 5:
				letra = "E";
				break;
			case 6:
				letra = "F";
				break;
			case 7:
				letra = "G";
				break;
			case 8:
				letra = "H";
				break;
		}
		return letra;
	}
}

