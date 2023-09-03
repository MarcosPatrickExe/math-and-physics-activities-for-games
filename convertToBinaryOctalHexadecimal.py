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

print("binario: ",acumulativeRests);


binaryStr = "";


if len(acumulativeRests) % 3 == 1:
     binaryStr = "00"+acumulativeRests;

elif len(acumulativeRests) % 3 == 2:
     binaryStr = "0"+acumulativeRests;

elif len(acumulativeRests) % 3 ==0:
     binaryStr = acumulativeRests;


maxGroupVectors = len( binaryStr ) // 3;
maxGroupVectors +=1;
testDict = {};

for n in range(1, maxGroupVectors):
    print(n);
    testDict[ "list"+str(n) ] = 0;

    for i in range(2, -1, -1):
        testDict[ "list"+str(n) ] = binaryStr[i]


print("dict: ", testDict);


