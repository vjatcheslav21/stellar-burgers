import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@hooks';
import { constructorActions } from '@slices/constructorSlice/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(
          constructorActions.moveIngredient({ from: index, to: index + 1 })
        );
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(
          constructorActions.moveIngredient({ from: index, to: index - 1 })
        );
      }
    };

    const handleClose = () => {
      dispatch(constructorActions.removeIngredient({ id: ingredient.id }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
