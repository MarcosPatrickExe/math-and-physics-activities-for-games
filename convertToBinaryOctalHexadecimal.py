import math;

# funcao com while para fazer divisoes sucessivas
def convertDecimalToBinary( numberDecimal ):
    acumulativeRests2 = "";

    while True:
        if(numberDecimal < 2):
            acumulativeRests2 = str(numberDecimal) + acumulativeRests2;
            break;

        quocient = math.floor( numberDecimal / 2 );
        rest = numberDecimal % 2;

        acumulativeRests2 = str(rest) + acumulativeRests2;
        numberDecimal= quocient;
    
    return acumulativeRests2;


# convertendo numero de 10 ate 15 para  a sua correspondente letra 
def convertNumberToLetter(number):
    match number:
       case 10:
           return 'A'
       case 11:
           return 'B'
       case 12:
           return 'C'
       case 13:
           return 'D'
       case 14:
           return 'E'
       case 15:
           return 'F'
    return number;




print("digite um numero decimal...");
number = int( input() );
acumulativeRests = convertDecimalToBinary( number );

print("\nBinario:    ",acumulativeRests);



#===================  CONVERTENDO DE BINARIO PARA OCTAL:  ======================
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
for key in groupList:
    # concatenando o numero contido em cada key na String 'resultOctal'
    resultInOctal = resultInOctal + str( groupList[key] );

print("Octal:       ", resultInOctal);



#====================  CONVERTENDO DE OCTAL PARA HEXADECIMAL:  ==============

basicBinaryStr = "";

#convertendo o valor contido em cada key para binario e 'juntando na String 'basicBinaryStr''
for key in groupList:
    binaryN = convertDecimalToBinary( groupList[key]);
     
    #o novo numero binario deve ter um tamanho de 3 bits sempre, por isso:
    if( len(binaryN) == 2):
        basicBinaryStr = basicBinaryStr + "0"+binaryN;
    elif( len(binaryN) == 1):
        basicBinaryStr = basicBinaryStr + "00"+binaryN;
    else:
        basicBinaryStr = basicBinaryStr + binaryN;


# adicionando zeros a frente para caso o tamanho total de 'basicBinaryStr' nao seja multiplo de 4
match len( basicBinaryStr) % 4:
    case 1: 
        basicBinaryStr = "000"+str(basicBinaryStr);
    case 2: 
        basicBinaryStr = "00"+str(basicBinaryStr);
    case 3: 
        basicBinaryStr = "0"+str(basicBinaryStr);


binarySubGroup = [];
min = 0;
max = 4;

#print("basicBinaryStr: ", basicBinaryStr);


# esse 'for' ira rodar o mesmo numero de vezes que o numero de grupos de 4 bits dentro de 'basicBinaryStr'
for num in range(0, len(basicBinaryStr) // 4 ):
    binarySubGroup.append( basicBinaryStr[min:max]  );
    min += 4;
    max += 4;


#print("binarySubGroup: ", binarySubGroup);


decimalSubGroup = [];

for subGroup in range(0, len(binarySubGroup)):
    exponent = 0;
    cumulativeSum = 0;

    #esse percorre um subGroup de trás pra frente, como um [1011]
    for i in range(3, -1, -1):
        cumulativeSum += int( binarySubGroup[subGroup][i]) * math.pow(2, exponent);
        exponent += 1;
    
    decimalSubGroup.append( int(cumulativeSum) );


#print("decimalSubGroup:  ",decimalSubGroup);

hexadecimalStr = "";

for index in range(0, len(decimalSubGroup) ):
    
    # converte o decimal para alguma letra caso ele seja > 9
    hexaDecimalValue = convertNumberToLetter( decimalSubGroup[index] );

    # adicionando os resultados em cada subgrupo de 'decimalSubGroup' em uma so String
    hexadecimalStr = hexadecimalStr + str(hexaDecimalValue); 

print("Hexadecimal: ", hexadecimalStr);



# Esse codigo se baseou nos seguintes vídeos:
# 
# Convert Binary To Octal:
# https://www.youtube.com/watch?v=JxmarqiqUdM&t=136s

# convert Octal to Hexadecimal:
# https://www.youtube.com/watch?v=lEgPlyNeHBE
# https://blog.betrybe.com/linguagem-de-programacao/sistema-hexadecimal/
