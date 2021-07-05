import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Prueba en authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const defaultState = {
      logged: false
    };
    
    const state = authReducer(defaultState, {});

    expect(state).toEqual(defaultState);
  });

  test('debe de autenticar y colocar el name del usuario', () => {
    const login = {
      name: 'John',
    };

    const loginAction = {
      type: types.login,
      payload: login
    };
    
    const state = authReducer({logged: false}, loginAction);

    expect(state).toEqual({
      ...login,
      logged: true
    });
  });
  
  test('debe de borrar el name del usuario y logged en false', () => {
    const loginValue = {
      name: 'John',
      logged: true
    };
  
    const logoutAction = {
      type: types.logout,
    };
    
    const state = authReducer(loginValue, logoutAction);
  
    expect(state).toEqual({ logged: false });
  });
});