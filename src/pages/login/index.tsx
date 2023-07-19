import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { Carregando } from '../../components/Carregando';

type LoginProps = {
  loginValues: LoginValuesType,
  setLoginValues: (prop: LoginValuesType) => void,
  handleSubmit: () => void,
};

const INITIAL_LOGIN_STATE = {
  userName: '',
};

export type LoginValuesType = {
  userName?: string | undefined,
};

function Login(props: LoginProps) {
  const { handleSubmit } = props;

  const [loginValues, setLoginValues] = useState<LoginValuesType>(INITIAL_LOGIN_STATE);

  const [loading, setLoading] = useState(true);

  const { userName } = loginValues;
  const navigate = useNavigate();

  const handleClick = () => {
    createUser({ name: String(userName) });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
    createUser({ name: String(userName) });
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigate('/search');
    }, 2000);
  }, []);

  return (
    <form onSubmit={ onSubmit }>
      {loading ? (<Carregando />) : (
        <div>
          <label htmlFor="userName">
            Login
            <input
              data-testid="login-name-input"
              type="text"
              name="userName"
              value={ userName }
              onChange={ onChange }
              required
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ !validateLogin() }
            onClick={ handleClick }
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
