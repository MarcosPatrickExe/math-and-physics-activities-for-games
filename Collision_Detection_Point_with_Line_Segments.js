var mouseXC=0,
    mouseYC=0, 
    retas = [], 
    intersectionPoints = new Array(4), 
    dots = new Array(2), 
    dot = null;

const SPEED = 1;



class Dot{
  
    constructor(x, y, cor){ 
       this.X = ((Math.random() > 0.5) ?  -1 : 1);
       this.Y = ((Math.random() > 0.5) ?  -1 : 1);
       this.cor = cor;
       this.directX = ((Math.random() > 0.5) ?  -1 : 1);
       this.directY = ((Math.random() > 0.5) ?  -1 : 1);
    }
  
    move(){
       this.X += SPEED * this.directX;
       this.Y += SPEED * this.directY;
 //      console.log("dot X: "+this.X+"  // dot Y: "+this.Y);
    }
  
    drawDot(){
       fill(255);
       circle(this.X, this.Y, 20);
    }
} 




class SegReta {
    constructor(x1, y1, x2, y2, cor, letra1, letra2){
       this.X = x1;
       this.Y = y1;
       this.X2 = x2
       this.Y2 = y2;
       this.cor = cor;
    }
  
    drawSegmento(){
        strokeWeight(4);
        stroke( this.cor );
        line(this.X, this.Y, this.X2, this.Y2);
    }
  
    getTamanho(){
        var dx = this.X2 - this.X ;
        var dy = this.Y2 - this.Y;
        var lengthVec = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy,2) ) // comprimento do vetor
        return lengthVec.toFixed(2);
    }
}



function setup(){
    createCanvas(windowHeight/1.01, windowHeight/1.01);
  
    for( let i=0; i < dots.length; i++ ){
        dots[i] = new Dot(0, 0, color(255, 255, 0));
    }
  
    gerarRetas();
}


function draw(){
 //   console.log("Valor aleatorio: "+ Math.floor(Math.random() *width/2)  * ((Math.random() > 0.5) ? -1 : 1));
    grabMouse();
    goCartesian();
    drawArrow();
    
  
 //   dot.move();
 //   dot.drawDot();
  
    drawRetas()

  
   for( let i =0; i < retas.length; i++){
     getReducedEquationLineAnCheckCollision( // passando objeto anonimo
          { 
            X: retas[i].X,
            Y: retas[i].Y
          },
          { 
            X: retas[i].X2,
            Y: retas[i].Y2
          }
     );
   }
    
}



function keyReleased(){
    if(key == 'a'){
        gerarRetas();
    }
       
}



function gerarRetas(){

    // primeiro quadrante
    let x1 = Math.floor( Math.random() * (width/2-20) )  +10; 
    let y1 = Math.floor( Math.random() * (height/2-10) )  +10;
  
    // segundo quadrante
    let x2 = (-1) * (Math.floor( Math.random() * (width/2-10) )  +10); 
    let y2 = Math.floor( Math.random() * (height/2-10) )  +10;
    retas [0] = new SegReta(x1+30, y1, x2, y2, color(255, 0, 0));
      
  
    // terceiro quadrante
    let x3 = (-1) * (Math.floor( Math.random() * (width/2-20) ) + 10); 
    let y3 = (-1) * (Math.floor( Math.random() * (height/2-10) ) + 10);
    retas [1] = new SegReta( x2+25, y2+50, x3, y3, color(0, 255, 0));
  
  
  // quarto quadrante
    let x4 = Math.floor( Math.random() * (width/2-20) ); 
    let y4 = (-1) * (Math.floor( Math.random() * (height/2-10) ) + 10);
    retas [2] = new SegReta( x3-25, y3+15, x4, y4, color(0, 0, 255));
  
    
  // primeiro quadrante
    retas [3] = new SegReta( x4-20, y4-25, x1-20, y1+60, color(0, 255, 255));
  
  
    intersectionPoints[0] = calculateIntersection( retas[0], retas[1] ); 
    intersectionPoints[1] = calculateIntersection( retas[1], retas[2] ); 
    intersectionPoints[2] = calculateIntersection( retas[2], retas[3] ); 
    intersectionPoints[3] = calculateIntersection( retas[3], retas[0] ); 
}



function drawRetas(){
  
  for( let i =0; i < retas.length; i++){
      color(retas[i].cor);
      retas[i].drawSegmento();
  }
}







// função que calcula o ponrto de cruzamento entre os segmentos AB e CD
function calculateIntersection( line1, line2) {
    var c2x = line2.X - line2.X2; // (x3 - x4)
  	var c3x = line1.X - line1.X2; // (x1 - x2)
  	var c2y = line2.Y - line2.Y2; // (y3 - y4)
  	var c3y = line1.Y - line1.Y2; // (y1 - y2)
    let intersectDot;
  
  	// down part of intersection point formula
  	var d  = c3x * c2y - c3y * c2x;
  
  	if (d == 0){  // throw new Error('Number of intersection points is zero or infinity.');
       console.log("Número de intersecçao é zero ou infinito"); 
       intersectDot = null;
       return
    }
  
  	// upper part of intersection point formula
  	var u1 = line1.X * line1.Y2 - line1.Y * line1.X2; // (x1 * y2 - y1 * x2)
  	var u4 = line2.X * line2.Y2 - line2.Y * line2.X2; // (x3 * y4 - y3 * x4)
  
  	// intersection point formula
  	var px = (u1 * c2x - c3x * u4) / d;
  	var py = (u1 * c2y - c3y * u4) / d;
  	
  	intersectDot = { X: px, Y: py };
      
  	
// VERIFICANDO ABAIXO SE O PONTO "D", "B" E O PONTO DE INTERSECÇÃO ESTAO NO 2 E 3 QUADRANTE OU NO 1 E 4 QUADRANTE, CASO SIM, ENTAO HAVERA A INTERSECÇÃO ENTRE OS SEGMENTOS DE RETA, CASO NÃO, ENTÃO O PONTO DE CRUZAMENTO NÃO É DESENHADO !!
    if(
        (  intersectDot.X > 0 && 
           line1.X2 > 0 && 
           line2.X2 > 0) 
                   || 
        (  intersectDot.X < 0 && 
           line1.X2 < 0 && 
           line2.X2 < 0 )
      ) 
       return intersectDot;
     //  console.log("ponto de intersecção:  X: "+intersectDot.X +"  Y: "+ intersectDot.Y);
    else 
       intersectDot = null;
}



function getReducedEquationLineAnCheckCollision( lineA, lineB ){
    // obtendo o coeficiente angular "a" atraves do deltaY (Y2 - Y) / deltaX (X2 - X):
  
    let Y, x, b;
    const a = (lineB.Y - lineA.Y) / (lineB.X - lineA.X);
    
    // Y = a * x + b
    // b = Y - a * x
    b = lineA.Y - (a * lineA.X);
    
    /* Com os valores de "a" e "b" obtidos, eh possivel verificar se a bolinha cruza a reta!
       para isso, basta substituir o X da bolina na equacao reduzida da reta e verificar se o Y obtido eh igual ao        Y da bolinha...
      se forem iguais, entao a bolinha cruzou a reta!  */
  
  
  
   for( let i=0; i < dots.length; i++ ){
         dots[i].move();
         dots[i].drawDot();
     
         Y = (a * dots[i].X) + b; // obtendo o Y da reta a partir do X do ponto
         X = (dots[i].Y - b) / a; // obtendo o X da reta a partir do Y do ponto
       
      // console.log("dot Y: "+Math.floor(dot.Y)+"  ==  "+ Math.floor(Y) );
      
    
        if( Math.floor( dots[i].Y) == Math.floor(Y) ||
            Math.floor( dots[i].X) == Math.floor(X)
     /*     Math.floor( dots[i].Y) == (Math.floor(Y)+1) ||
            Math.floor( dots[i].Y) == (Math.floor(Y)+2) ||
            Math.floor( dots[i].Y) == (Math.floor(Y)+3) ||
            Math.floor( dots[i].Y) == (Math.floor(Y)-1) ||
            Math.floor( dots[i].Y) ==  (Math.floor(Y)-2) ||
            Math.floor( dots[i].Y) ==  (Math.floor(Y)-3)
           */
          ){
              texto("Bolinha cruzou a reta!  ", -(width/2) + 10, -(height/2-50 )); 
               dots[i].directX *= -1;
               dots[i].directY *= -1;
        }
   }
}
    
    



//===========================  FUNCOES PADROES JA IMPLEMENTADAS NO KIT BASICO  ========================================
function goCartesian(){
  background(0)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  strokeWeight(1.1);
  colore(128,0,0)
  line(0,height/2,width, height/2)
  colore(0,128,0)
  line(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}


function grabMouse(){
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

function texto(str,x,y){
  strokeWeight(0.7);
  push()
    translate( x, y)
    scale(1.3,-1.3)
    translate(-x,-y)
  
    // desenha o texto normalmente
    text(str,x,y)
  pop()
}


function colore(c1,c2,c3,c4){
  if(c4 != null){
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
    
  if(c3 != null){
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null ){
    fill(c1)
    stroke(c1)
  }
    
  else{
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}

    
function drawArrow(){
  strokeWeight(1);
  colore(26) 
  var R = 128 // alcance das setas
  for( ang=0; ang<2*PI; ang += PI/26)
      line(0,0, R*cos(ang), R*sin(ang))
}

    
//  MACETE PARA DESCOBRIR A EQUACAO GERAL DA RETA QUE PASSA POR 2 PONTOS SEM USAR O DETERMINANTE:
// https://www.youtube.com/watch?v=9dhtGUPgekw&t=362s&ab_channel=EquacionaComPauloPereira
    

// MACETE PARA OBTER A EQUACAO REDUZIDA DA RETA QUE PASSA POR 2 PONTOS SEM USAR O DETERMINANTE:
//  https://www.youtube.com/watch?v=j0dU93bKML8&t=126s&ab_channel=DicasdematSandroCuri%C3%B3
