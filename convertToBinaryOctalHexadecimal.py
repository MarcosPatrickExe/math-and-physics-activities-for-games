import math;


print("digite um numero decimal...");
number = int( input() );
acumulativeRests = "";

while True:
    if(number < 2):
        acumulativeRests = str(number) + acumulativeRests;
        break;

    quocient = math.floor( number / 2 );
    rest = number % 2;

    acumulativeRests = str(rest) + acumulativeRests;
    number = quocient;

print("Binario: ",acumulativeRests);


binaryStr = "";

if len(acumulativeRests) % 3 == 1:
     binaryStr = "00"+acumulativeRests;

elif len(acumulativeRests) % 3 == 2:
     binaryStr = "0"+acumulativeRests;

elif len(acumulativeRests) % 3 ==0:
     binaryStr = acumulativeRests;



maxGroupVectors = len( binaryStr ) // 3;
groupList = {};


# inicializando cada chave/key do Dict com 0:
for groupIndex in range(1, maxGroupVectors+1 ):
    groupList[ "list"+str(groupIndex) ] = 0;


indexSubList = 1; # variavel necessaria para identificar os chaves/keys do Dict "groupList"
indexSubListElements = 0; # os indexs do vetor de cada chave do Dict sempre irao de 0 a 2

octalDivisor = 4; # somente pode ter valores {4, 2 e 1}


            # percorrendo cada caractere do numero binario
for bit in range( 0, len(binaryStr)):

 # acessando cada chave/key criada no 'for' anterior e somando ao conteudo dessa chave o produto entre 'octalDivisor' e o valor do bit atual de 'binaryStr' 
    groupList[ "list"+str(indexSubList) ] += (octalDivisor * int( binaryStr[bit]) );

    indexSubListElements += 1;
    octalDivisor = octalDivisor // 2;

    if( indexSubListElements == 3 ):
         octalDivisor = 4;
         indexSubListElements = 0;
         indexSubList += 1;


resultInOctal = "";

# acessando cada chave do Dict 'groupList'
for groupIndex in range(1, maxGroupVectors+1 ):
    # concatenando o numero contido em cada key na String 'resultOctal'
    resultInOctal = resultInOctal + str( groupList[ "list"+str(groupIndex) ] );


print("Octal: ", resultInOctal);
#print("dict: ", groupList);
