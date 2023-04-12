import { useContext, useState } from 'react';
import { CloudinaryImage } from '@/models';
import ImagesContext from '@/context/ImagesContext';

const useMediaTabs = () => {
  const [currentData, setCurrentData] = useState<CloudinaryImage | null>(null);
  // const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);

  const onDelete = async () => {
    handleDelete(currentData?.public_id);
    setShowModalDelete(false);
  };

  const {
    status,
    toggleState,
    picture,
    images,
    setPicture,
    setToggleTab,
    handleAddPict,
    handleDelete,
    showModalDelete,
    setShowModalDelete,
  } = useContext(ImagesContext);

  return {
    status,
    toggleState,
    picture,
    images,
    currentData,
    showModalDelete,
    showModalDetail,
    setPicture,
    setCurrentData,
    setShowModalDelete,
    setShowModalDetail,
    setToggleTab,
    handleAddPict,
    handleDelete,
  };
};

export default useMediaTabs;
