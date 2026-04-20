import constructorSlice, {
  constructorActions,
  constructorInitialState
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const mockMainIngredient: TIngredient = {
  _id: '60d3b41abdacab0026a733c7',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 1420,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

describe('Проверяют редьюсеры constructorSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(constructorInitialState);
  });

  it('должен добавить булку в конструктор', () => {
    const action = constructorActions.addIngredient(mockBun);

    expect(action.payload.ingredient).toEqual(
      expect.objectContaining({ ...mockBun, id: expect.any(String) })
    );

    const result = constructorSlice.reducer(constructorInitialState, action);

    expect(result.bun).toEqual(
      expect.objectContaining({ ...mockBun, id: expect.any(String) })
    );
    expect(result.ingredients).toEqual([]);
  });

  it('должен добавить начинку в конструктор', () => {
    const action = constructorActions.addIngredient(mockMainIngredient);
    const result = constructorSlice.reducer(constructorInitialState, action);

    expect(result.bun).toBeNull();
    expect(result.ingredients).toEqual([
      expect.objectContaining({ ...mockMainIngredient, id: expect.any(String) })
    ]);
  });

  it('должен удалить ингредиент по id', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMainIngredient, id: 'id-to-remove' },
        { ...mockMainIngredient, _id: 'main-2', id: 'id-to-keep' }
      ]
    };

    const action = constructorActions.removeIngredient({ id: 'id-to-remove' });
    const result = constructorSlice.reducer(stateWithIngredients, action);

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0].id).toBe('id-to-keep');
  });

  it('должен переместить ингредиент в списке', () => {
    const stateWithThreeIngredients = {
      bun: null,
      ingredients: [
        { ...mockMainIngredient, _id: 'main-1', id: 'id1' },
        { ...mockMainIngredient, _id: 'main-2', id: 'id2' },
        { ...mockMainIngredient, _id: 'main-3', id: 'id3' }
      ]
    };

    const action = constructorActions.moveIngredient({ from: 0, to: 2 });
    const result = constructorSlice.reducer(stateWithThreeIngredients, action);

    expect(result.ingredients[0].id).toBe('id2');
    expect(result.ingredients[1].id).toBe('id3');
    expect(result.ingredients[2].id).toBe('id1');
  });

  it('должен очистить конструктор', () => {
    const fullState = {
      bun: { ...mockBun, id: 'some-bun-id' },
      ingredients: [{ ...mockMainIngredient, id: 'some-ing-id' }]
    };

    const action = constructorActions.clearConstructor();
    const result = constructorSlice.reducer(fullState, action);

    expect(result).toEqual(constructorInitialState);
  });
});
