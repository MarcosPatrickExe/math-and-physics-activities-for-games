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


function lancamentoHorizontal(){
  
  if( Y <= height-20)
      t += 0.1; // tempo
  else
      t=0;
      
  Yo = 0;     // posicao inicial
  Vox = 30;   // velocidade inicial
  g = 20;     // aceleracao da gravidade
  X = 0;      // posicao final em X
  Xo = 0;     // posicao inicial em X

  // equacao do movimento constante:
  // X = Xo + Vox * t
  X = Xo + Vox * t;

  // equacao de queda livre:
  // Y = Yo - (g * t²) /2
  Y = Yo + (g * t*t) / 2;

  circle(X, Y, 30);
}


function lancamentoObliquo(){
   /* Anotacoes a parte
   definicoes: 
Sabendo da velocidade de lancamento na diagonal, 
representada pelo vetor 'Vo', e fazendo relacoes com os vetores Vox e Voy, 
temos:
    
   cos# = Vox / Vo, substituindo o Vox, temos:
       =>  Vox = cos# * Vo
   
   sen# = Voy / Vo, substituindo o Voy, temos:
       =>  Voy = sen# * Vo
   
   Agora temos as definicoes de Vx e Vy!  
   OBS: # representa um angulo qualquer entre V e Vx
  */
  
   // MRU para o eixo X horizontal:
   // X = Xo + Vox * t  mas agora inserindo o valor de Vox:
//    X = Xo + cos# * Vo *t
  
   // MRUV ou equacao da funcao da horaria da posicao:
   // Y = Yo + Voy * t + (g*t²) /2   
//    Y = Yo + sen# * Vo * t + (g*t²) /2
  
  
  if( Y <= height-20)
     t += 0.1;      // tempo
  else
     t = 0;         // reiniciando o lancamento atraves do tempo
    
  Vo = 160;         // vetor velocidade de lancamento (na diagonal)
  angle = 77;       // angulo de lancamento do projetil
  Yo = height-20;   // altura inicial
  Vox = 30;         // velocidade inicial
  g = 30;           // aceleracao da gravidade
  Xo = 0;           // posicao inicial em X
  
  
  // obtendo alcance total X, ou posicao final no eixo X
  X = Xo + cos( angle*PI /180 ) * Vo * t;
  
  // obtendo a altura Y em funcao de t
  Y = Yo - sin( angle*PI/180) * Vo *t + (g*t*t) / 2
  
  circle(X, Y, 30);
}
