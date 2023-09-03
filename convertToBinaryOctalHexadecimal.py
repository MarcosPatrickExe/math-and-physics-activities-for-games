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

groupList = {};


# inicializando o Dict com vetores em cada chave/key:
for groupIndex in range(1, maxGroupVectors+1 ):
     groupList[ "list"+str(groupIndex) ] = [];


indexSubList = 1;
indexSubListElements = 0;


for bit in range( 0, len(binaryStr)):

    groupList[ "list"+str(indexSubList) ].append( binaryStr[bit] );

    indexSubListElements += 1;

    if( indexSubListElements == 3 ):
         indexSubListElements = 0;
         indexSubList += 1;
    

print("dict: ", groupList);
# dict:  {
#    'list1': ['0', '0', '1'], 
#    'list2': ['1', '0', '0'], 
#    'list3': ['1', '0', '0']
# }

