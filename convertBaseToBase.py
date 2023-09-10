import math;

# utilizando recursividade para ter diminuir o grau de complexidade do algoritmo 
def recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent):
   
    if(currentIndex == -1 ):
        return cumulativeResult;

    cumulativeResult += int( number[currentIndex] ) * math.pow(base, exponent);
    currentIndex -= 1;
    exponent += 1;
    return recursive_AnyBaseToDecimal( currentIndex, cumulativeResult, number, base, exponent)


# utilizando recursividade para ter diminuir o grau de complexidade do algoritmo 
def recursive_DecimalToAnyBase( number, base, totalResult ):
   
    # caso o number (ou quociente) seja menor que o divisor (ou nesse caso, a base) entao o processo de divisoes sucessivas ira parar
    if(number < base):
        finalResult = str(number)+""+ totalResult;
        return finalResult;
    
    quotient = math.floor( number/base );
    restOfDivision = number % base;
    totalResult = str(restOfDivision) + totalResult;

    return recursive_DecimalToAnyBase( quotient, base, totalResult );


print("digite uma base numerica... ");
base1 = int( input() );

print("digite um numero que pertence a base numerica anterior... ");
anyNumber = input();

print("digite a base para a qual o numero sera convertido... ");
base2 = int( input() );


if( base1 < 10 ):
    decimalResult = recursive_AnyBaseToDecimal( len(anyNumber)-1, 0, anyNumber, base1, 0);

    baseDesiredResult = recursive_DecimalToAnyBase( decimalResult, base2, "");

    print("o numero ",anyNumber,"(",base1,") na base ",base2," é ",baseDesiredResult);





#from convertAnyBaseNumericalToDecimal import recursive_convertToDecimal;
#from convertDecimalToAnyBase import recursive_Calc;
