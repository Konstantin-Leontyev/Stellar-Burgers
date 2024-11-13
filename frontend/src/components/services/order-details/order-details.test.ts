import { OrderStatus } from '../../utils/constants';
import { TOrder } from '../../utils/types';
import { getOrderDetails } from './actions';
import { initialState, orderSlice as slice } from './slice';

const testOrder: TOrder = {
  status: OrderStatus.DONE,
  name: 'Флюоресцентный минеральный био-марсианский антарианский бургер',
  number: 58974,
  ingredients: [
    '643d69a5c3f7b9001cfa093d', 
    '643d69a5c3f7b9001cfa0941', 
    '643d69a5c3f7b9001cfa0945', 
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa093d'
  ],
  _id: '672f7df0b27b06001c3e71ad',
  createdAt: '2024-11-09T15:21:20.095Z',
  updatedAt: '2024-11-09T15:21:20.095Z',
  owner: {
    email:'test_user@yandex.ru',
    name: 'Test_user_name',
  },
  __v: 0,
};

describe('oder-details slice', () => { 
  it('should initialized correctly', () => {
    const sate = slice.reducer(undefined, { type: '' });

    expect(sate).toEqual(initialState);
  });

    describe('get order details actions', () => { 
      it('should ingredients load set to true', () => {
        const action = { type: getOrderDetails.pending.type };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderDetailsLoading: true, hasOrderDetailsRequestError: false });
      });

      it('should get order info', () => {
        const action = { type: getOrderDetails.fulfilled.type, payload: testOrder };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderDetailsLoading: false, orderDetails: testOrder });
      });   

      it('should order info request falls with error', () => {
        const action = { type: getOrderDetails.rejected.type, error: { message: 'error' } };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderDetailsLoading: false, hasOrderDetailsRequestError: 'error' });
      });
  });
});
