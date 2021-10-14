import { sumar, restar, multiplicar, dividir } from "../operations";

/**
 * *Part1: test('recibe la descripcion de la prueba', 'callback')
 */
test("Esta funcion va a recibir 6 + 4 y retorna 10", () => {
  // Dentro de expect debo llamar a la funcion y saber que me va a retornar
  expect(sumar(6, 4)).toBe(10);
});

test("Esta funcion va a restar 8 - 6 y retorna 2", () => {
  expect(restar(8, 6)).toBe(2);
});

test("Esta funcion va a multiplicar 8 * 6 y retorna 48", () => {
    expect(multiplicar(8, 6)).toBe(48);
  });

  test("Esta funcion va a dividir 8 / 4 y retorna 2", () => {
    expect(dividir(8, 2)).toBe(4);
  });