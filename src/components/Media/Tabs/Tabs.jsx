import axios from 'axios';
import styles from '@/styles/Tabs.module.css';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { deleteImage, getAllImages } from '../../../services/api/images.api';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';
import UploadImage from '@/commons/UploadImage/UploadImage';
// import Gallery from '../Gallery/Gallery';
// import { useModal } from '@/hooks/useModal';
// import Spinner from '@/commons/Spinner/Spinner';

const Tabs = ({ handleSelect }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [selected, setSelected] = useState(null);
  const [picture, setPicture] = useState(null);
  // const [isOpenModalDelete, openModalDelete, closeModalDelete] =
  //   useModal(false);
  // const [isOpenModalDetail, openModalDetail, closeModalDetail] =
  //   useModal(false);

  // let user = useSelector((state) => state.user.user);
  const [toggleState, setToggleState] = useState(2);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const loadImages = async () => {
    try {
      setLoading(true);
      const allImages = await getAllImages();
      setImages(allImages);
    } catch (error) {
      console.log('ERRROR', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async () => {
    // try {
    //   setLoading(true);
    //   await deleteImage(selected.public_id);
    //   const newImages = images.filter(
    //     (image) => image.asset_id === selected.asset_id
    //   );
    //   setSelected(null);
    //   closeModalDelete();
    //   setImages(newImages);
    // } catch (error) {
    //   console.log('ERRRRORRRRR', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleAddPict = async (file) => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('image', file);
      const upload = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/images/upload-file`,
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            //          Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setImages([upload.data.image, ...images]);
      setToggleState(2);
      setPicture(null);
    } catch (error) {
      console.log('Error', error);
      dispatchNotif({
        type: 'ERROR',
        message: 'Error cargando la imagen',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.tabs__container} mt-10`}>
      {/* {loading && <Spinner />} */}
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
          <span>Upload</span>
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
          {/* <Gallery
            images={images}
            handleDelete={handleDelete}
            selected={selected}
            setSelected={setSelected}
            isOpenModalDelete={isOpenModalDelete}
            openModalDelete={openModalDelete}
            closeModalDelete={closeModalDelete}
            isOpenModalDetail={isOpenModalDetail}
            openModalDetail={openModalDetail}
            closeModalDetail={closeModalDetail}
            handleSelect={handleSelect}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
