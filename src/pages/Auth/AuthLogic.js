import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const AuthLogic = ({ startingMode }) => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();

  const { state } = useLocation();

  const destination = state?.destination;

  const [loginMode, setLoginMode] = useState(startingMode === 'login');
  const [displayResend, setDisplayResend] = useState(false);

  // Institutions managment
  const [institutions, setInstitutions] = useState([]);
  const [institutionsHelperText, setInstitutionsHelperText] = useState();
  const userInstitutions = useRef([]);

  useLoadPage(() => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken &&
      axios
        .get(API_ORIGIN + '/user/u', {
          headers: {
            'x-access-token': accessToken,
          },
        })
        .then(() => {
          navigate('/user/u', { replace: true });
        })
        .catch((err) => {
          if (getStatusCode(err) === 401 || getStatusCode(err) === 404) {
            localStorage.removeItem('accessToken');
          }
        });

    axios
      .get(API_ORIGIN + '/institution/suggestions')
      .then(({ data }) => {
        setInstitutions(data);
        setPageStatus('active');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const switchLoginMode = () => {
    clearErrors(['email', 'password']);
    loginMode
      ? navigate('/register', {
          replace: true,
        })
      : navigate('/login', {
          replace: true,
        });

    setLoginMode(!loginMode);
  };

  const onInstitutionsChange = (event, value) => {
    institutionsHelperText && setInstitutionsHelperText(undefined);
    userInstitutions.context = value;
  };

  const onSubmit = (login) => (formData) => {
    // If the user register it add some checks
    var institutionIds;
    if (!login) {
      if (!(userInstitutions.context && userInstitutions.context.length)) {
        setInstitutionsHelperText(
          "Les acheteurs ne vont pas pouvoir voir tes annonces si tu n'es pas disponible dans au moins un ??tablissement"
        );
        return;
      }
      setPageStatus('sending');

      institutionIds = institutions
        .filter((inst) => userInstitutions.context.includes(inst.name))
        .map((inst) => inst.id);
    }

    axios
      .post(API_ORIGIN + '/auth/' + (login ? 'signin' : 'signup'), {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        institutionIds: !login && institutionIds,
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            localStorage.setItem('accessToken', res.data.accessToken);
            navigate(destination || '/', { replace: true });
            break;
          case 201:
            navigate('/confirm-email/sent', {
              state: { email: formData.email },
            });
            break;
          case 202:
            setDisplayResend(true);
            setError('email', {
              type: 'custom',
              message: 'Adresse email pas encore confirm??e',
            });
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        switch (getStatusCode(err)) {
          case 403:
            setError('password', {
              type: 'custom',
              message: 'Mot de passe incorrect',
            });
            break;

          case 404:
            setError('email', {
              type: 'custom',
              message: 'Adresse email inconnue',
            });
            break;

          case 409:
            if (err.response.data.message.includes('email'))
              setError('email', {
                type: 'custom',
                message: 'Adresse d??j?? utilis??e par un autre compte',
              });
            else
              setError('username', {
                type: 'custom',
                message: "Nom d'utilisateur d??j?? utilis??e par un autre compte",
              });
            break;

          default:
            console.log(err);
            break;
        }
      })
      .finally(() => {
        setPageStatus('active');
      });
  };

  const fields = loginMode
    ? [
        {
          id: 'email',
          label: 'Email',
          registration: {
            required: true,
            pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        },
        {
          id: 'password',
          password: true,
          label: 'Mot de passe',
          registration: { required: true },
        },
      ]
    : [
        {
          id: 'username',
          label: "Nom d'utilisateur",
          registration: { required: true },
        },
        {
          id: 'email',
          label: 'Email',
          registration: {
            required: true,
            pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        },
        {
          id: 'password',
          password: true,
          label: 'Mot de passe',
          registration: { required: true },
        },
      ];

  return {
    pageStatus,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit(loginMode)),
    loginMode,
    switchLoginMode,
    fields,
    displayResend,
    institutions,
    onInstitutionsChange,
    institutionsHelperText,
  };
};

export default AuthLogic;
