var mouseXC = 0,
    mouseYC = 0, 
    retas = new Array(4), 
    dots = new Array(1), 
    dot = null,
    alreadyCollided = false
  
const circleRadius = 10;
const SPEED = 1;



class Dot{
  
    constructor(x, y, cor, rad){
       this.X = ((Math.random() > 0.5) ?  -1 : 1);
       this.Y = ((Math.random() > 0.5) ?  -1 : 1);
       this.cor = cor;
       this.directX = ((Math.random() > 0.5) ?  -1 : 1);
       this.directY = ((Math.random() > 0.5) ?  -1 : 1);
       this.radius = rad;
    }
  
    move(){
       this.X += SPEED * this.directX;
       this.Y += SPEED * this.directY;
 //      console.log("dot X: "+this.X+"  // dot Y: "+this.Y);
    }
  
    dash( direction, dashDistance ){
       if("xis"){
          this.X += (SPEED + circleRadius) * this.directX;
       }else if("yis"){
          this.Y += (SPEED + circleRadius) * this.directY;
       }
    }
  
  
    drawDot(){
       fill(255);
       circle(this.X, this.Y, this.radius);
    }
} 




class SegReta {
    constructor(x1, y1, x2, y2, cor, corr){
       this.X = x1;
       this.Y = y1;
       this.X2 = x2
       this.Y2 = y2;
       this.cor = cor;
       this.corr = corr;
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
        dots[i] = new Dot(0, 0, color(255, 255, 0), circleRadius);
    }
  
    gerarRetas();
}



function draw(){
    grabMouse();
    goCartesian();
    drawArrow();
    drawRetas();
  
    frameRate(60);
  
    for( let i =0; i < retas.length; i++){
       checkCollide( // passando objeto anonimo
            {
              X: retas[i].X,
              Y: retas[i].Y
            },
            {
              X: retas[i].X2,
              Y: retas[i].Y2
            },
            retas[i].corr
      );
    }
}



function keyReleased(){
    if( key == 'a' || key == 'A'){
        gerarRetas();
      
        for( let i=0; i < dots.length; i++ )
            dots[i] = new Dot(0, 0, color(255, 255, 0), circleRadius);
    }

}




function gerarRetas(){

    // primeiro quadrante
    let x1 = Math.floor( Math.random() * (width/2-20) )  +80; 
    let y1 = Math.floor( Math.random() * (height/2-10) )  +40;

    // segundo quadrante
    let x2 = (-1) * Math.floor( Math.random() * (width/2-50) ) -40; 
    let y2 = Math.floor( Math.random() * (height/2-10) )  +30;
    retas[0] = new SegReta(x1+30, y1, x2-100, y2, color(255, 0, 0), "Red");  // VERMELHO


    // terceiro quadrante
    let x3 = (-1) * (Math.floor( Math.random() * (width/2-20) ) - 40); 
    let y3 = (-1) * (Math.floor( Math.random() * (height/2-10) ) + 10);
    retas[1] = new SegReta( x2-60, y2+50, x3-90, y3-60, color(0, 255, 0), "Green"); // VERDE


  // quarto quadrante
    let x4 = Math.floor( Math.random() * (width/2-20) ); 
    let y4 = (-1) * (Math.floor( Math.random() * (height/2-10) ) + 10);
    retas[2] = new SegReta( x3-135, y3+15, x4+60, y4-60, color(0, 0, 255), "Blue");  // AZUL


  // primeiro quadrante
    retas[3] = new SegReta( x4-20, y4-85, x1-20, y1+60, color(0, 255, 255), "SkyBlue");// AZUL CLARO
}



function drawRetas(){
  
  for( let i =0; i < retas.length; i++){
      color(retas[i].cor);
      retas[i].drawSegmento();
  }
}





function getTriangleArea( circleOrigin, pointLineA, pointLineB ){
  
    let OA = {
         X: pointLineA.X - circleOrigin.X, 
         Y: pointLineA.Y - circleOrigin.Y  
    };
  
    let OB = {
         X: pointLineB.X - circleOrigin.X, 
         Y: pointLineB.Y - circleOrigin.Y  
    };
  
    let cross_product = (OA.X * OB.Y) - (OA.Y * OB.X);
  
    if (cross_product < 0) // O VALOR DO PRODUTO VETORIAL AQUI NAO PODE SER NEGATIVO! ENTAO O SINAL É INVERTIDO CASO SEJA
       cross_product *= (-1); 
  
    return cross_product/2; // retornando o valor da area do triangulo formado entre o centro do circulo O, pointLineA e pointLineB, ou O, A, B
}




function getMinimumDistanceCircleLine( O, A, B ){
    
    // height = 2 x AreaTriangulo / base
    let base = Math.sqrt(  ( Math.pow( (B.X - A.X), 2)  +  Math.pow( (B.Y - A.Y), 2))  );
  
    let minimunDistance = (2 * getTriangleArea( O, A, B )) / base;
  
    if ( minimunDistance < 0)
        minimunDistance *= (-1); // O VALOR DO PRODUTO VETORIAL AQUI NAO PODE SER NEGATIVO! ENTAO O SINAL É INVERTIDO CASO SEJA
  
    return minimunDistance;
}




function checkCollide( lineA, lineB, lineCor){
   
  
   for( let i=0; i < dots.length; i++){
        
         dots[i].drawDot();
         let distance = getMinimumDistanceCircleLine( dots[i], lineA, lineB );
     
     
// SE A DISTANCIA ENTRE O CENTRO DO CIRCULO ATE O PONTO DA RETA MAIS PROXIMO DELE FOR MENOR OU IGUAL AO RAIO DO CIRCULO, ENTAO HOUVE COLISAO!
         if( distance <= dots[i].radius+circleRadius ){
           
                if( lineCor == "Red" ){
                    texto("vermelho  ", -(width/2) + 10, -(height/2-50 )); 
                    dots[i].directY *= -1;
                    dots[i].dash("yis", circleRadius);

                  
                }else if( lineCor == "Green" ){
                    texto("verde ", -(width/2) + 10, -(height/2-50 )); 
                    dots[i].directX *= -1;
                    dots[i].dash("xis", circleRadius);

                  
                }else if( lineCor == "Blue" ){
                    texto("azul  ", -(width/2) + 10, -(height/2-50 )); 
                    dots[i].directY *= -1;
                    dots[i].dash("yis", circleRadius);

                  
                }else if( lineCor == "SkyBlue" ){
                    texto("azul claro  ", -(width/2) + 10, -(height/2-50 )); 
                    dots[i].directX *= -1;
                    dots[i].dash("xis", circleRadius);
                }
           
      
         }
     
         dots[i].move();
         texto("", -(width/2) + 10, -(height/2-50 )); 
         console.log( dots[i].directX +" "+ dots[i].directY);
   }
}
    

    // https://www.baeldung.com/cs/circle-line-segment-collision-detection 
  



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
    
    
    
    
/*  
function getReducedEquationLineAnCheckCollision( lineA, lineB, cor ){
    // obtendo o coeficiente angular "a" atraves do deltaY (Y2 - Y) / deltaX (X2 - X):
  
    
    let Y, x;
    const a = Math.floor( (lineB.Y - lineA.Y) / (lineB.X - lineA.X) );
    
    // Y = a * x + b
    // b = Y - a * x
    const b = Math.floor( lineA.Y - (a * lineA.X) );
  
  
    console.log("a: "+a+" b: "+b);
    
    /* Com os valores de "a" e "b" obtidos, eh possivel verificar se a bolinha cruza a reta! para isso, basta substituir o X da bolina na equacao reduzida da reta e verificar se o Y obtido eh igual ao        Y da bolinha... se forem iguais, entao a bolinha cruzou a reta!  */


/*  
   for( let i=0; i < dots.length; i++){
         dots[i].move();
         dots[i].drawDot();
     
         Y = (a * dots[i].X) + b; // obtendo o Y da reta a partir do X do ponto
         X = (dots[i].Y - b) / a; // obtendo o X da reta a partir do Y do ponto
       
       //   Y = (width/2) - Y;
       // Y *= -1;
       //  Y = (height/2) - Y;
       //  X = X - (width/2);
     

        console.log("dot Y: "+Math.floor(dots[i].Y)+"  ==  Y: "+Math.floor(Y) );
    
        if(  Math.floor(dots[i].Y) == Math.floor(Y) ||
             Math.floor(dots[i].X) == Math.floor(X)
         ){
              if( cor == "Red" ){
                  dots[i].directY *= -1;
                
              }else if( cor == "Green" ){
                   dots[i].directX *= -1
                
              }else if( cor== "Blue" ){
                   dots[i].directY *= -1
                
              }else if( cor=="SkyBlue" ){
                   dots[i].directX *= -1
              }
          
              dots[i].directX *= -1 
              dots[i].directY *= -1
      
              texto("Bolinha cruzou a reta!  ", -(width/2) + 10, -(height/2-50 )); 
        }
   }
}
*/    

    
    
/*

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
         ( intersectDot.X > 0 && 
           line1.X2 > 0 && 
           line2.X2 > 0 ) 
                   || 
         ( intersectDot.X < 0 && 
           line1.X2 < 0 && 
           line2.X2 < 0 )
      ) 
       return intersectDot;
     //  console.log("ponto de intersecção:  X: "+intersectDot.X +"  Y: "+ intersectDot.Y);
    else 
       intersectDot = null;
}



function getReducedEquationLineAnCheckCollision( lineA, lineB, cor ){
    // obtendo o coeficiente angular "a" atraves do deltaY (Y2 - Y) / deltaX (X2 - X):
  
    let Y, x;
    const a = Math.floor( (lineB.Y - lineA.Y) / (lineB.X - lineA.X) );
    
    // Y = a * x + b
    // b = Y - a * x
    const b = Math.floor( lineA.Y - (a * lineA.X) );
  
    console.log("a: "+a+" b: "+b);
    
    /* Com os valores de "a" e "b" obtidos, eh possivel verificar se a bolinha cruza a reta!
       para isso, basta substituir o X da bolina na equacao reduzida da reta e verificar se o Y obtido eh igual ao        Y da bolinha...
      se forem iguais, entao a bolinha cruzou a reta!  */

  /*
   for( let i=0; i < dots.length; i++){
         dots[i].move();
         dots[i].drawDot();
     
         Y = (a * dots[i].X) + b; // obtendo o Y da reta a partir do X do ponto
         X = (dots[i].Y - b) / a; // obtendo o X da reta a partir do Y do ponto
       
   }
*/
