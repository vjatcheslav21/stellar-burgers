import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '@hooks';
import {
  constructorActions,
  constructorSelectors
} from '@slices/constructorSlice/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const count = useSelector((state) =>
      constructorSelectors.getIngredientCount(state, ingredient._id)
    );

    const handleAdd = () => {
      dispatch(constructorActions.addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
