import { 
    TAuthStore, 
    authSlice as slice, 
    initialState,
    setIsAuthChecked,
 } from './slice';
import { register, login, logout } from './actions';

import { TUser } from '../../utils/types';

const user: TUser = {
    email:"test_user@yandex.ru",
    name: "Test_user_name",
};

const testPayload: TAuthStore = {
    user,
    isAuthChecked: true,
};

describe("auth slice", () => {
    it('should initialized correctly', () => {
        const sate = slice.reducer(undefined, { type: '' });

        expect(sate).toEqual(initialState);
    });

    it('set auth checked to true', () => {
        const action = { type: setIsAuthChecked.type, payload: true };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });

    it('register fulfilled', () => {
        const action = { type: register.fulfilled.type, payload: testPayload };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual(testPayload)
    })

    it('login fulfilled', () => {
        const action = { type: login.fulfilled.type, payload: testPayload };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual(testPayload)
    })

    it('logout fulfilled', () => {
        const action = { type: logout.fulfilled.type };
        const state = slice.reducer(initialState, action);

        expect(state).toEqual(initialState)
    })
});
