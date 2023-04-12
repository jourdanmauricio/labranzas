import { useContext } from 'react';
import { useRouter } from 'next/router';
import ImagesContext from '@/context/ImagesContext';
import Gallery from '@/components/AdminImages/Gallery/Gallery';
import UploadImage from '../UploadImage/UploadImage';
import Loader from '@/components/Loader-overlay/Loader-overlay';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import styles from '@/styles/Tabs.module.css';
import { CloudinaryImage } from '@/models';

interface IProps {
  handleSelect: (image: CloudinaryImage) => void;
  handleCancel: () => void;
}

const MediaTabs = ({ handleSelect, handleCancel }: IProps) => {
  const { status, tab, setTab, currentData } = useContext(ImagesContext);
  const router = useRouter();

  const onSelect = () => {
    handleSelect(currentData);
  };

  return (
    <>
      <div className={styles.tabs__container}>
        {status === 'loading' && <Loader />}
        <div className={styles.tabs__bloc}>
          <div
            onClick={() => setTab(1)}
            className={
              tab === 1 ? `${styles.tabs} ${styles.active__tabs}` : styles.tabs
            }
          >
            <FaCloudUploadAlt color="teal" size={20} />
            <span>Upload</span>
          </div>
          <div
            onClick={() => setTab(2)}
            className={
              tab === 2 ? `${styles.tabs} ${styles.active__tabs}` : styles.tabs
            }
          >
            <FaImages color="green" size={20} />
            <span>Galería</span>
          </div>
        </div>
        <div className={styles.tabs__content}>
          <div
            className={
              tab === 1
                ? `${styles.tab__content} ${styles.active__content}`
                : styles.tab__content
            }
          >
            <UploadImage />
          </div>
          <div
            className={
              tab === 2
                ? `${styles.tab__content} ${styles.active__content}`
                : styles.tab__content
            }
          >
            <Gallery />
          </div>
        </div>
      </div>
      {router.asPath !== '/admin/media' && (
        <div className="mt-8 flex justify-between">
          <button onClick={handleCancel} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={onSelect} className="btn-primary">
            Seleccionar
          </button>
        </div>
      )}
    </>
  );
};

export default MediaTabs;
