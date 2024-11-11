import { TIngredient } from '../../utils/types';
import { burgerIngredientsSlice as slice, initialState, ingredientsList, } from './slice'
import { getIngredients } from './actions'

const testIngredients: TIngredient[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

const bun: TIngredient = {
  _id: "643d69a5c3f7b9001cfa093d",
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
};

const ingredient: TIngredient = {
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
};

describe('burger-ingredients reducer', () => { 
  it('should initialized correctly', () => {
    const state = slice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should set current tab', () => {
    const action = { type: slice.actions.setTab.type, payload: 'Соусы' };
    const state = slice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, currentTab: 'Соусы' });
  });

  it('should increase ingredient count', () => {
    const prevState = { ...initialState, ingredientsList: [ingredient] };
    const action = { type: slice.actions.setIngredientCount.type, payload: ingredient };
    const state = slice.reducer(prevState, action);

    expect(state).toEqual({...prevState, ingredientsList: [{ ...ingredient, __v: 1 }]});
  });

  it('should set bun count', () => {
    const prevState = { ...initialState, ingredientsList: [bun] };
    const action = { type: slice.actions.setIngredientCount.type, payload: bun };
    const state = slice.reducer(prevState, action);

    expect(state).toEqual({...prevState, ingredientsList: [{ ...bun, __v: 2 }]});
  });

  it('should decrease ingredient count', () => {
    const prevState = { ...initialState, ingredientsList: [{ ...ingredient, __v: 3 }] };
    const action = { type: slice.actions.resetIngredientCount.type, payload: ingredient };
    const state = slice.reducer(prevState, action);

    expect(state).toEqual({...prevState, ingredientsList: [{ ...ingredient, __v: 2 }]});
  });

  describe('get ingredients actions', () => { 
    it('should ingredients load set to true', () => {
      const action = { type: getIngredients.pending.type };
      const state = slice.reducer(initialState, action);

      expect(state).toEqual({ ...initialState, isIngredientsListLoading: true, hasIngredientsListRequestError: false });
    });

    it('should get order info', () => {
        const action = { type: getIngredients.fulfilled.type, payload: testIngredients };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isIngredientsListLoading: false, ingredientsList: [...testIngredients] });
    });   

    it('should order info request falls with error', () => {
      const action = { type: getIngredients.rejected.type, error: { message: 'error' } };
      const state = slice.reducer(initialState, action);

      expect(state).toEqual({ ...initialState, isIngredientsListLoading: false, hasIngredientsListRequestError: 'error' });
    });
  });
});
