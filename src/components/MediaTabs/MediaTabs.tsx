import UploadImage from '@/commons/UploadImage/UploadImage';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import Loader from '@/components/Loader-overlay/Loader-overlay';
import Gallery from '@/components/AdminImages/Gallery/Gallery';
import styles from '@/styles/Tabs.module.css';
import useMediaTabs from './useMediaTabs';

const MediaTabs = () => {
  const {
    status,
    // loading,
    toggleState,
    // toggleTab,
    picture,
    setPicture,
    images,
    currentData,
    setCurrentData,
    showModalDelete,
    setShowModalDelete,
    showModalDetail,
    setShowModalDetail,
    setToggleTab,
    handleAddPict,
    handleDelete,
  } = useMediaTabs();

  return (
    <div className={styles.tabs__container}>
      {status === 'loading' && <Loader />}
      <div className={styles.tabs__bloc}>
        <div
          onClick={() => setToggleTab(1)}
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaCloudUploadAlt color="teal" size={20} />
          <span>Upload</span>
        </div>
        <div
          onClick={() => setToggleTab(2)}
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaImages color="green" size={20} />
          <span>Galería</span>
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
          <UploadImage
            handleAddPict={handleAddPict}
            picture={picture}
            setPicture={setPicture}
          />
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <Gallery />
        </div>
      </div>
    </div>
  );
};

export default MediaTabs;
