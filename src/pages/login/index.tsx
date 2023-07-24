import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../../components/Carregando';

const INITIAL_LOGIN_STATE = {
  userName: '',
};

export type LoginValueType = {
  userName: string | undefined,
};

function Login() {
  const [loginValues, setLoginValues] = useState<LoginValueType>(INITIAL_LOGIN_STATE);
  const [loading, setLoading] = useState(false);
  const { userName } = loginValues;
  const navigate = useNavigate();

  const onSubmit = async () => {
    // try {
    setLoading(true);
    await createUser({ name: String(userName) });
    setLoading(false);
    navigate('/search');
    // } catch (error: any) {
    //   setLoading(false);
    //   throw new Error('Error creating user');
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });

    validateLogin();
  };

  const validateLogin = (): boolean => {
    let valid = true;

    if (String(userName).length < 3) {
      valid = false;
    }
    return valid;
  };

  return (
    <form onSubmit={ onSubmit }>
      {loading ? (<Carregando />) : (
        <div>
          <label htmlFor="userName">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="userName"
              value={ userName }
              onChange={ onChange }
              placeholder="Nome"
              required
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ !validateLogin() }
            type="submit"
          >
            Entrar
          </button>
        </div>
      )}
    </form>
  );
}

export default Login;
