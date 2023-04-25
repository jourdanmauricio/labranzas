import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from '@/hooks/useModal';
// import { useNotification } from '@/commons/Notifications/NotificationProvider';
// import { delMessage, updProfile } from '@/store/user';
// import { changeSettings, updateSettings } from '@/store/settings';

const useProfile = () => {
  // const dispatch = useDispatch();
  // const dispatchNotif = useNotification();
  // const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  // const [error, setError] = useState({ name: null });
  const [profile, setProfile] = useState({});

  // // Data
  // const { user, message, status } = useSelector((state) => state.user);
  // const data = useSelector((state) =>
  //   state.settings.settings.filter((setting) => setting.type === 'contactData')
  // );
  // const contact = data.reduce(
  //   (obj, cur) => ({ ...obj, [cur.feature]: cur }),
  //   {}
  // );
  // const settings = useSelector((state) => state.settings.settings);

  // // Methods
  // useEffect(() => {
  //   console.log('User', user);
  //   if (user) setProfile({ id: user.id, name: user.name, image: user.image });
  // }, [user]);
  // useEffect(() => {
  //   if (message) {
  //     dispatchNotif({
  //       type: status === 'success' ? 'SUCCESS' : 'ERROR',
  //       message,
  //     });
  //     dispatch(delMessage());
  //   }
  // }, [message]);
  // const onChangeSttings = (feature, value) => {
  //   dispatch(changeSettings({ feature, value, type: 'contactData' }));
  // };
  // const handleChange = (name, value) => {
  //   setProfile({
  //     ...profile,
  //     [name]: value,
  //   });
  // };
  // const handleCancel = () => {
  //   closeModalPass();
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     updProfile({ id: profile.id, name: profile.name, image: profile.image })
  //   );
  //   const updated = settings.findIndex((setting) => setting.updated === true);
  //   if (updated !== -1) dispatch(updateSettings());
  // };

  return {
    //    error,
    profile,
    // isOpenModalPass,
    // openModalPass,
    // user,
    // status,
    // contact,
    // handleChange,
    // handleCancel,
    // handleSubmit,
    // onChangeSttings,
    // closeModalPass,
  };
};

export default useProfile;
