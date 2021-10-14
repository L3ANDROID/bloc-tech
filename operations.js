//la funcion recibe la suma de dos numeros
/**
 * @param {*} req: Request
 * @param {*} res: Response
 * @param {*} next: Next
 */

// export
export const sumar = (a, b) => +a + +b;
export const restar = (a,b) => +a - +b;
export const multiplicar = (a,b) => +a * +b;
export const dividir = (a,b) => {
    try{
        return +a/+b
    }catch(e){
        throw typeError(e.toString());
    }
}
