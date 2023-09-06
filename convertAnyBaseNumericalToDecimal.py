import math;

print("digite uma base numera qualquer...");
baseI = int( input() );

print("digite um numero que pertence a essa base numerica...");
numberI = input();


def recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent):
   
    if(currentIndex == -1 ):
        return cumulativeResult;

    cumulativeResult += int( number[currentIndex] ) * math.pow(base, exponent);
    currentIndex -= 1;
    exponent += 1;
    return recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent)


result = recursive_AnyBaseToDecimal( len(numberI)-1, 0, numberI, baseI, 0);
print("resultado:  ", int(result) )





#for digit in range( len(numberI)-1, -1, -1 ):
 #   print( numberI[digit] );
