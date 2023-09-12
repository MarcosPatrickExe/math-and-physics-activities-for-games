import math;

print("digite um numero qualquer... ");
numberI = int( input() );

print("digite a base numérica para aplicar no numero anterior... ");
baseI = int( input() );

# usando funcao recursiva para melhorar o desempenho
def recursive_DecimalToAnyBase(number, base, totalResult ):
    
    if(number < base):
        finalResult = str(number)+""+ totalResult;
        return finalResult;
    
    quotient = math.floor( number/base );
    restOfDivision = number % base;
    totalResult = str(restOfDivision) + totalResult;

    return recursive_DecimalToAnyBase( quotient, base, totalResult );

print("resultado: ", recursive_DecimalToAnyBase(numberI, baseI, "") );




# FORMA ALTERNATIVA (utilizando o For) PARA CONVERTER NUMERO DECIMAL PARA QUALQUER OUTRA BASE NUMERICA
"""
while True:
    if(quotient < base ):
        totalResult = str(quotient) + totalResult;
        break;
    else:
        quotient = math.floor( number / base );
        restOfDivision = number % base;

        totalResult = str(restOfDivision) + totalResult;
       
        number = quotient; # na proxima iteracao o number (ou dividendo) vai ser o quociente dessa iteracao atual

print("result: ", totalResult);
"""
