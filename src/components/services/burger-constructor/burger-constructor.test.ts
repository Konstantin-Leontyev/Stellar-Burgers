import { TIngredientWithKeyField, TOrderInfoResponse } from '../../utils/types';
import { getOrderInfo } from './actions';
import { currentBun, currentIngredients, hasOrderInfoRequestError, initialState, isOrderInfoLoading, orderInfo, burgerConstructorSlice as slice } from './slice';

const testBun: TIngredientWithKeyField = {
  _id:"643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
  key: ''
};

const firstIngredient: TIngredientWithKeyField = {
  _id :"643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
  key: "jdyuweCG7ymGFiUZNHIg6",
};

const secondIngredient: TIngredientWithKeyField = {
    _id: "643d69a5c3f7b9001cfa0945",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0,
    key: "ZMhF3ymdtF_XunK2zw4ZS",
  };

const thirdIngredient: TIngredientWithKeyField = {
    _id:"643d69a5c3f7b9001cfa0946",
    name: "Хрустящие минеральные кольца",
    type: "main",
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    __v: 0,
    key: "esrkBCd3toMKhXIV5aJjz",
  };

const testOrderInfoResponse: TOrderInfoResponse = {
  success: true,
  name: "Флюоресцентный минеральный био-марсианский антарианский бургер",
  order: {
    number: 58962
  }
};

describe('burger-constructor reducer', () => {
    it('should initialized correctly', () => {
        const state = slice.reducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });

    describe('burger ingredients add and remove', () => {
      it('should add bun to burger', () => {
        const action = { type: slice.actions.addCurrentBurgerBun.type, payload: testBun };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, currentBun: testBun });
      });

      it('should add ingredient to burger', () => {
        const action = { type: slice.actions.addCurrentBurgerIngredient.type, payload: firstIngredient };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, currentIngredients: [firstIngredient] });
      });

      it('should delete ingredient from burger', () => {
          const prevState = { ...initialState, currentIngredients: [firstIngredient, secondIngredient, thirdIngredient] };
          const action = { type: slice.actions.deleteCurrentBurgerIngredient.type, payload: firstIngredient.key };
          const state = slice.reducer(prevState, action);

          expect(state).toEqual({ ...prevState, currentIngredients: [secondIngredient, thirdIngredient]});
      })
    });

    describe('burger ingredients dnd', () => {
      it('should move ingredient up', () => {
        const prevState = { ...initialState, currentIngredients: [firstIngredient, secondIngredient, thirdIngredient] };
        const action = { type: slice.actions.moveIngredients.type, payload: { hoverIndex: 0, dragIndex: 2} };
        const state = slice.reducer(prevState, action);
        expect(state).toEqual({ ...prevState, currentIngredients: [thirdIngredient, firstIngredient, secondIngredient] });
      });

      it('should move ingredient down', () => {
        const prevState = { ...initialState, currentIngredients: [firstIngredient, secondIngredient, thirdIngredient] };
        const action = { type: slice.actions.moveIngredients.type, payload: { hoverIndex: 2, dragIndex: 0} };
        const state = slice.reducer(prevState, action);
        
        expect(state).toEqual({ ...prevState, currentIngredients: [secondIngredient, thirdIngredient, firstIngredient] });
      });
    });

    describe('order info actions', () => { 
      it('should order info load', () => {
        const action = { type: getOrderInfo.pending.type };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderInfoLoading: true, hasOrderInfoRequestError: false });
      });

      it('should get order info', () => {
        const action = { type: getOrderInfo.fulfilled.type, payload: testOrderInfoResponse };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderInfoLoading: false, hasOrderInfoRequestError: null, orderInfo: testOrderInfoResponse });
      });    

      it('should order info request falls with error', () => {
        const action = { type: getOrderInfo.rejected.type, error: { message: 'error' } };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isOrderInfoLoading: false, hasOrderInfoRequestError: 'error' });
      });
    });

    it('should reset order info', () => {
      const prevState = { 
        ...initialState,
        currentBun: testBun,
        currentIngredients: [firstIngredient, secondIngredient, thirdIngredient],
        orderInfo: testOrderInfoResponse, 
        isOrderInfoLoading: false, 
        hasOrderInfoRequestError: false, 
      }
      const action = { type: slice.actions.resetOrderInfo.type };
      const state = slice.reducer(prevState, action);

      expect(state).toEqual({ ...prevState, currentBun: null, currentIngredients: [], orderInfo: null });
    });
});
