import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '@slices/sliceNames';
import ingredientsSlice from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
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
  },
  {
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
  }
];

describe('Проверяют редьюсеры ingredientsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(result).toEqual(ingredientsSlice.getInitialState());
  });

  it('при вызове экшена Request меняет requestStatus на Loading', () => {
    // Мы создаем "фейковый" экшен, который будет пойман мэтчером isActionPending
    const action = { type: `${INGREDIENTS_SLICE_NAME}/fetch/pending` };

    const result = ingredientsSlice.reducer(
      ingredientsSlice.getInitialState(),
      action
    );

    // Проверяем, что статус изменился, а ингредиенты пока не загружены
    expect(result).toEqual({
      ingredients: [],
      requestStatus: RequestStatus.Loading
    });
  });

  // Тест 3: Проверка успешного выполнения (fulfilled)
  it('при вызове экшена Success записывает данные и меняет requestStatus на Success', () => {
    // Создаем фейковый экшен с полезной нагрузкой (payload)
    const action = {
      type: `${INGREDIENTS_SLICE_NAME}/fetch/fulfilled`,
      payload: mockIngredients
    };

    const result = ingredientsSlice.reducer(
      ingredientsSlice.getInitialState(),
      action
    );

    // Проверяем, что данные записаны и статус изменился
    expect(result).toEqual({
      ingredients: mockIngredients,
      requestStatus: RequestStatus.Success
    });
  });

  // Тест 4: Проверка ошибки (rejected)
  it('при вызове экшена Failed меняет requestStatus на Failed', () => {
    // Создаем фейковый экшен ошибки
    const action = { type: `${INGREDIENTS_SLICE_NAME}/fetch/rejected` };

    const result = ingredientsSlice.reducer(
      ingredientsSlice.getInitialState(),
      action
    );

    // Проверяем, что статус изменился на Failed
    expect(result).toEqual({
      ingredients: [],
      requestStatus: RequestStatus.Failed
    });
  });
});
