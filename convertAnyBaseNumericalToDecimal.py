import math;

print("digite uma base numera qualquer...");
baseI = int( input() );

print("digite um numero que pertence a essa base numerica...");
numberI = input();


def recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent):
   
    if(currentIndex == -1 ):
        return cumulativeResult;

    # "cumulativeResult" vai acumulando as a soma de todos os valores multiplicados pela base elevada pelo expoente crescente
    cumulativeResult += int( number[currentIndex] ) * math.pow(base, exponent);
    currentIndex -= 1; # fazendo alguma alteracao na variavel antes de envia-la para a proxima recursao
    exponent += 1;
    return recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent)


result = recursive_AnyBaseToDecimal( len(numberI)-1, 0, numberI, baseI, 0);
print("resultado:  ", int(result) )





#for digit in range( len(numberI)-1, -1, -1 ):
 #   print( numberI[digit] );
