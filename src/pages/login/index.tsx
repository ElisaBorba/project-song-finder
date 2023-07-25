import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../../components/Carregando';
import TrybeTunes from '../../images/TRYBETUNES.gif';
import './login.css';

function Login() {
  const [loginValues, setLoginValues] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValues(event.target.value);
    validateLogin();
  };

  const validateLogin = (): boolean => {
    let valid = true;

    if (String(loginValues).length < 3) {
      valid = false;
    }
    return valid;
  };

  const onSubmit = async () => {
    // try {
    setLoading(true);

    if (loginValues) {
      await createUser({ name: loginValues });
      console.log('entrou');
      setLoading(false);
      navigate('/search');
    }
    // } catch (error: any) {
    //   setLoading(false);
    //   throw new Error('Error creating user');
    // }
  };

  return (
    <form onSubmit={ onSubmit }>
      {loading ? (<Carregando />) : (
        <div className="login-container">
          <label htmlFor="userName">
            <img
              src={ TrybeTunes }
              alt="TrybeTunes logo"
            />
            <input
              data-testid="login-name-input"
              type="text"
              name="userName"
              value={ loginValues }
              onChange={ onChange }
              placeholder="                                       Qual o seu nome?"
              required
              className="input-login"
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ !validateLogin() }
            type="submit"
            className="btn-login"
          >
            Entrar
          </button>
        </div>
      )}
    </form>
  );
}

export default Login;
