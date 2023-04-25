import { useState } from 'react';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import Metadata from '@/components/AdminProfile/Metadata/Metadata';
import styles from '@/styles/Tabs.module.css';
import AdminProfile from './Profile/AdminProfile';

const Profile = () => {
  const [toggleState, setToggleState] = useState(2);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <div className={styles.tabs__container}>
      <div className={styles.tabs__bloc}>
        <div
          onClick={() => toggleTab(1)}
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaCloudUploadAlt color="teal" size={20} />
          <span>Perfil</span>
        </div>
        <div
          onClick={() => toggleTab(2)}
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaImages color="green" size={20} />
          <span>Meta Data</span>
        </div>
      </div>
      <div className={styles.tabs__content}>
        <div
          className={
            toggleState === 1
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <AdminProfile />
          {/* <span>PROFILE</span> */}
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <Metadata />
        </div>
      </div>
    </div>
  );
};

export default Profile;
