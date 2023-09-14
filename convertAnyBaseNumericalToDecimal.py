import math;

print("digite uma base numera qualquer...");
baseI = int( input() );

print("digite um numero que pertence a essa base numerica...");
numberI = input();


#usando recursividade para aumentar a velocidade de execucao para esse caso em especifico
def recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent):

    #condição de parada da função recursiva
    if(currentIndex == -1 ):
        return cumulativeResult;

    # "cumulativeResult" vai acumulando as a soma de todos os valores multiplicados pela base elevada pelo expoente crescente
    cumulativeResult += int( number[currentIndex] ) * math.pow(base, exponent);
    currentIndex -= 1; # fazendo alguma alteracao na variavel antes de envia-la para a proxima recursao
    exponent += 1;
    return recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent)
    

# primeira chamada do método recursivo, passando o indice que aponta para o ultimo digito, resultado acumulado, numero à ser convertido, base numerica e expoente
result = recursive_AnyBaseToDecimal( len(numberI)-1, 0, numberI, baseI, 0);
print("resultado:  ", int(result) )

