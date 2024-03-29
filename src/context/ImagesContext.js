import { createContext, useEffect, useReducer } from 'react';
import { ImageHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const imageService = new ImageHttpService();

const ImagesContext = createContext();

const initialState = {
  currentData: null,
  showModalDelete: false,
  showModalDetail: false,
  loading: false,
  tab: 2,
  images: [],
  message: '',
  error: '',
  status: 'success',
};

const ACTIONS = {
  SET_LOADING: 'setLoading',
  SET_TAB: 'setToggleState',
  SET_IMAGES: 'setImages',
  DEL_IMAGE: 'delImage',
  ADD_IMAGE: 'addImage',
  SET_SELECTED: 'setSelected',
  SET_PICTURE: 'setPicture',
  SET_STATUS: 'setStatus',
  SET_ERROR: 'setError',
  SET_SHOW_MODAL_DELETE: 'showModalDelete',
  SET_SHOW_MODAL_DETAIL: 'showModalDetail',
  SET_CURRENT_DATA: 'setCurrentData',
  CANCEL: 'cancel',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    case ACTIONS.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
        status: 'success',
      };
    case ACTIONS.DEL_IMAGE:
      const newImages = state.images.filter(
        (image) => image.public_id !== action.payload
      );
      return {
        ...state,
        images: newImages,
        status: 'success',
        showModalDelete: false,
      };
    case ACTIONS.ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images],
        status: 'success',
        tab: 2,
        currentData: null,
      };
    case ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        status: 'error',
        message: action.payload,
      };
    case ACTIONS.SET_SHOW_MODAL_DELETE:
      return {
        ...state,
        showModalDelete: action.payload,
      };
    case ACTIONS.SET_SHOW_MODAL_DETAIL:
      return {
        ...state,
        showModalDetail: action.payload,
      };
    case ACTIONS.SET_CURRENT_DATA:
      return {
        ...state,
        currentData: action.payload,
      };
    case ACTIONS.CANCEL:
      return {
        ...state,
        currentData: null,
        showModalDelete: false,
        showModalDetail: false,
      };

    default:
      return state;
  }
};

const ImagesProvider = ({ children }) => {
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, tab, images, showModalDelete, showModalDetail, currentData } =
    state;

  const setTab = (index) => {
    dispatch({ type: ACTIONS.SET_TAB, payload: index });
  };

  const loadImages = async () => {
    try {
      // setLoading(true);
      dispatch({ type: ACTIONS.SET_STATUS, payload: 'loading' });
      const allImages = await imageService.getAllImages();
      dispatch({ type: ACTIONS.SET_IMAGES, payload: allImages });
      // setImages(allImages);
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      console.log('ERRROR', error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleAddPict = async (file) => {
    try {
      dispatch({ type: ACTIONS.SET_STATUS, payload: 'loading' });
      const { data } = await imageService.create(file);
      dispatch({ type: ACTIONS.ADD_IMAGE, payload: data.newImage });
      dispatchNotif({ type: 'SUCCESS', message: 'Imagen agregada' });
    } catch (error) {
      console.log('Error', error);
      dispatchNotif({ type: 'ERROR', message: 'Error agregando la imagen' });
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
    }
  };

  const handleDelete = async (public_id) => {
    try {
      dispatch({ type: ACTIONS.SET_STATUS, payload: 'loading' });
      await imageService.delete(public_id);
      dispatchNotif({ type: 'SUCCESS', message: 'Imagen eliminada' });

      dispatch({
        type: ACTIONS.DEL_IMAGE,
        payload: public_id,
      });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      dispatchNotif({ type: 'SUCCESS', message: 'Error eliminando la imagen' });
      console.log('ERRRRORRRRR', error);
    }
  };

  const data = {
    status,
    tab,
    images,
    showModalDelete,
    showModalDetail,
    currentData,
    setPicture: (newImage) =>
      dispatch({ type: ACTIONS.SET_PICTURE, payload: newImage }),
    setSelected: (selected) =>
      dispatch({ type: ACTIONS.SET_SELECTED, payload: selected }),
    setTab,
    handleAddPict,
    handleDelete,
    handleCancelDelete: () => dispatch({ type: ACTIONS.CANCEL }),
    setShowModalDelete: (showModalDelete) =>
      dispatch({
        type: ACTIONS.SET_SHOW_MODAL_DELETE,
        payload: showModalDelete,
      }),
    setShowModalDetail: (showModalDetail) =>
      dispatch({
        type: ACTIONS.SET_SHOW_MODAL_DETAIL,
        payload: showModalDetail,
      }),
    setCurrentData: (currentData) =>
      dispatch({
        type: ACTIONS.SET_CURRENT_DATA,
        payload: currentData,
      }),
  };

  return (
    <ImagesContext.Provider value={data}>{children}</ImagesContext.Provider>
  );
};

export { ImagesProvider };
export default ImagesContext;
