import { RecintosZoo } from './recintos-zoo';

describe('Testes de RecintosZoo', () => {
  let zoo;

  beforeAll(() => {
    zoo = new RecintosZoo();
  });

  test('Deve encontrar recintos para 1 crocodilo', () => {
    const resultado = zoo.analisaRecintos('CROCODILO', 1);
    expect(resultado.recintosViaveis).toEqual([
      'Recinto 4 (espaço livre: 7 total: 10)'
    ]);
  });

  test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.recintosViaveis).toEqual([
      'Recinto 1 (espaço livre: 5 total: 12)',
      'Recinto 2 (espaço livre: 3 total: 8)'
    ]);
  });

  test('Não deve encontrar recintos para 10 macacos', () => {
    const resultado = zoo.analisaRecintos('MACACO', 10);
    expect(resultado.erro).toBe('Não há recinto viável');
  });

  test('Deve retornar erro para tipo de animal inválido', () => {
    const resultado = zoo.analisaRecintos('UNICORNIO', 5);
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve retornar erro para quantidade inválida', () => {
    const resultado = zoo.analisaRecintos('MACACO', -5);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

  test('Não deve encontrar recintos para 5 leões', () => {
    const resultado = zoo.analisaRecintos('LEAO', 5);
    expect(resultado.erro).toBe('Não há recinto viável');
  });
});
