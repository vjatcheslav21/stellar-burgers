// import { FC, useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import { Preloader } from '@ui';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useDispatch, useSelector } from '@store';
// import { fetchOrderByNumber } from '@thunks/orderThunk';
// import { ingredientsSelectors } from '@slices/ingredientsSlice/ingredientsSlice';
// import { orderSelectors } from '@slices/orderSlice/orderSlice';

// export const OrderInfo: FC = () => {
//   const dispatch = useDispatch();
//   const { number } = useParams();
//   const orderData = useSelector(orderSelectors.orderDataSelect);
//   const ingredients: TIngredient[] = useSelector(
//     ingredientsSelectors.ingredientsSelect
//   );

//   useEffect(() => {
//     if (number) {
//       dispatch(fetchOrderByNumber(Number(number)));
//     }
//   }, [dispatch, number]);

//   const orderInfo = useMemo(() => {
//     if (!orderData || !ingredients.length) return null;

//     const date = new Date(orderData.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = orderData.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...orderData,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [orderData, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { fetchOrderByNumber } from '@thunks/orderThunk';
import { ingredientsSelectors } from '@slices/ingredientsSlice/ingredientsSlice';
import { orderSelectors } from '@slices/orderSlice/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderData = useSelector(orderSelectors.currentOrderSelect);
  const ingredients: TIngredient[] = useSelector(
    ingredientsSelectors.ingredientsSelect
  );

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
