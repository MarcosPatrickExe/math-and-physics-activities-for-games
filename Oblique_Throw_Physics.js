let X, Y, Yo, Vo, Vox, Voy, g, t=0, angle = 0;

// funcao horaria da velocidade (V = Vo + a*t):
// Vy = Voy - g*t
  
// funcao horaria da posicao (S = So + V0*t + a*t²/2):
// Y = Yo + Voy*t - (g * t²) / 2

// equacao de Torricelli
// V²y = V²oy - 2g * (Y - Yo)

function setup() {
  createCanvas(700, 780);
}


function draw() {
  background(0);
  
  // lancamentoHorizontal();
    lancamentoVertical();
  // lancamentoObliquo();
}



function lancamentoVertical(){
  
  if( Y <= height-20)
    t += 0.1;      // tempo
  else t = 0;
  
  Yo = height-20;  // posicao inicial
  Voy = 90;        // velocidade inicial
  g = 10;          // aceleracao da gravidade
  X = width /3;    // posicao final em X
  
/*
na fisica, o vetor "Voy" cresce par cima com sinal positivo,   entretando aqui no p5js, somente valores negativos   direcionam o vetor para cima. Dessa forma, foi necessario mudar o sentido do vetor "Voy" para negativo e "g" para positivo para que o resultado fosse de subida e descida fosse
corretamente aplicado 
*/
    Y = Yo - Voy*t + (g * t*t /2);
    //  Y = Yoy + Voy*t - (g *  t * t) / 2

    if( Y > height)
       Y = height-3;

    circle(X, Y, 30);
    print(Y);
}
