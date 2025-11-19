import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@hooks';
import { createOrder } from '@thunks/orderThunk';
import { userSelectors } from '@slices/userSlice/userSlice';
import { orderActions, orderSelectors } from '@slices/orderSlice/orderSlice';
import {
  constructorActions,
  constructorSelectors
} from '@slices/constructorSlice/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    constructorSelectors.constructorBurgerElement
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(orderSelectors.newOrderRequestSelect);
  const orderModalData = useSelector(orderSelectors.newOrderSelect);
  const user = useSelector(userSelectors.userSelect);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientId));
  };

  const closeOrderModal = () => {
    if (orderModalData) {
      dispatch(orderActions.clearNewOrder());
      dispatch(constructorActions.clearConstructor());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
