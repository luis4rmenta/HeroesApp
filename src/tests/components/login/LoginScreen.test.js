import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Pruebas en <LoginScreen />', () => {
  const history = {
    replace: jest.fn()
  };

  

  const contextValue = {
    dispatch: jest.fn()
  }
  
  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <LoginScreen history={ history }/>
    </AuthContext.Provider>
  );
  test('Debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de realizar el dispash y la navegación', () => {
    const handleClick = wrapper.find('button').prop('onClick');

    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: expect.any(String)
      }
    });
    expect(history.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');

    handleClick();

    expect(history.replace).toHaveBeenCalledWith('/dc');
  });
});