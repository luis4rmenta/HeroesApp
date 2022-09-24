import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {
  const props = {
    location: {
      pathname: '/marvel'
    }
  }
  
  Storage.prototype.setItem = jest.fn();

  test('debe de mostrar el componente si está autenticado y guardar localstorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute 
          isAuthenticated
          component={ () => <span>Listo</span> }
          { ...props }
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", '/marvel');
  });
  
  test('Debe de bloquear el componente si no está autentificado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute 
          isAuthenticated={ false }
          component={ () => <span>Listo</span> }
          { ...props }
        />
      </MemoryRouter>
    );
  
    expect(wrapper.find('span').exists()).toBeFalsy();
  });
});