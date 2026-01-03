import { rootReducer } from './store';
import { constructorInitialState } from '@slices/constructorSlice/constructorSlice';
import userSlice from '@slices/userSlice/userSlice';
import ingredientsSlice from '@slices/ingredientsSlice/ingredientsSlice';
import feedsSlice from '@slices/feedsSlice/feedsSlice';
import orderSlice from '@slices/orderSlice/orderSlice';

describe('Проверка rootReducer', () => {
  it('правильно инициализирует начальное состояние всего хранилища', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const userExpectedState = userSlice.getInitialState();
    const ingredientsExpectedState = ingredientsSlice.getInitialState();
    const feedsExpectedState = feedsSlice.getInitialState();
    const orderExpectedState = orderSlice.getInitialState();

    const fullExpectedState = {
      userSlice: userExpectedState,
      ingredientsSlice: ingredientsExpectedState,
      constructorBurgerSlice: constructorInitialState,
      feedsSlice: feedsExpectedState,
      orderSlice: orderExpectedState
    };

    expect(initialState).toEqual(fullExpectedState);
  });
});
