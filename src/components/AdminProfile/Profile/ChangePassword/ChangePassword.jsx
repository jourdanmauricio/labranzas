import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
// import { putUserChangePass } from '@/services/api/users.api';
// import { useSelector } from 'react-redux';
// import { useNotification } from '@/commons/Notifications/NotificationProvider';
// import Spinner from '@/commons/Spinner/Spinner';

const ChangePassword = ({ handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const [shownPass, setPasswordShown] = useState({
    newPass: false,
    confirmPass: false,
  });
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorPass, setErrorPass] = useState(null);
  const [errorConfirmPass, setErrorConfirmPass] = useState(null);
  const dispatchNotif = useNotification();
  let user = useSelector((state) => state.user.user);

  const handleChange = (name, value) => {
    if (name === 'newPass') {
      setNewPass(value);
      if (value.length < 8) {
        setErrorPass('Mínimo 8 caracteres');
      } else {
        setErrorPass(null);
      }
      if (confirmPass.length === 0) {
        setErrorConfirmPass(null);
      }
    }

    if (name === 'confirmPass') {
      setConfirmPass(value);
      if (newPass !== value) {
        setErrorConfirmPass('La confirmación no coindide');
      } else {
        setErrorConfirmPass(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass.length === 0 || confirmPass.length === 0) return;
    if (errorPass || errorConfirmPass) return;

    try {
      setLoading(true);
      const response = await putUserChangePass(user.id, newPass);
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contraseña modificada',
      });
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    } finally {
      setLoading(false);
      handleCancel();
    }
  };

  return (
    <>
      {/* {loading && <Spinner />} */}
      <form
        className="bg-white p-5 flex justify-center items-center flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">Cambiar password</h2>
        <div className="form__group">
          <label className="form__label">Nueva contraseña</label>
          <i
            className="input__icon"
            onClick={() =>
              setPasswordShown({
                ...shownPass,
                newPass: !shownPass.newPass,
              })
            }
          >
            {shownPass.newPass ? <FaEye /> : <FaEyeSlash />}
          </i>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`form__input ${
              !errorPass ? 'border-gray-500' : 'border-red-500'
            }`}
            type={shownPass.newPass ? 'text' : 'password'}
            id="newPass"
            name="newPass"
            placeholder="Nueva contraseña"
          />
          <p
            className={`input__error ${
              errorPass ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {errorPass}
          </p>
        </div>
        <div className="form__group">
          <label className="form__label">Confirmación contraseña</label>
          <i
            className="input__icon"
            onClick={() =>
              setPasswordShown({
                ...shownPass,
                confirmPass: !shownPass.confirmPass,
              })
            }
          >
            {shownPass.confirmPass ? <FaEye /> : <FaEyeSlash />}
          </i>

          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`form__input ${
              !errorConfirmPass ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type={shownPass.confirmPass ? 'text' : 'password'}
            id="confirmPass"
            name="confirmPass"
            placeholder="Nueva contraseña"
          />
          <p
            className={`input__error ${
              errorConfirmPass ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {errorConfirmPass}
          </p>
        </div>

        <button className="mt-8 btn__primary" type="submit">
          Cambiar contraseña
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
