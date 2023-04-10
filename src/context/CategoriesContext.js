import { createContext, useEffect, useReducer } from 'react';
import { CategoryHttpService } from '@/services/local';
import { useRouter } from 'next/router';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const categoryService = new CategoryHttpService();

const CategoriesContext = createContext();

const ACTIONS = {
  SET_CATEGORIES: 'set_categories',
  ADD_CATEGORY: 'add_category',
  UPD_CATEGORY: 'upd_category',
  DEL_CATEGORY: 'del_category',
  UPD_STATUS: 'upd_status',
  UPD_ACTION: 'upd_action',
  UPD_ERROR: 'upd_error',
  UPD_MESSAGE: 'upd_message',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        status: 'success',
        message: '',
        action: 'view',
        error: '',
      };
    case ACTIONS.ADD_CATEGORY:
      state.categories = [...state.categories, action.payload];
      state.status = 'success';
      return state;
    case ACTIONS.UPD_CATEGORY:
      state.categories = state.categories.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat
      );
      state.status = 'success';
      return state;
    case ACTIONS.DEL_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
        status: 'suscces',
      };
    case ACTIONS.UPD_STATUS:
      return { ...state, status: action.payload };
    case ACTIONS.UPD_ACTION:
      return { ...state, action: action.payload };
    case ACTIONS.UPD_ERROR:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };
    case ACTIONS.UPD_MESSAGE:
      return {
        ...state,
        status: 'success',
        message: action.payload,
      };

    default:
      return state;
  }
}

const CategoriesProvider = ({ children }) => {
  const route = useRouter();
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, {
    categories: [],
    action: 'view',
    status: 'success',
    error: null,
    message: '',
  });

  const { categories, status, action, message } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getAll();
        dispatch({ type: ACTIONS.SET_CATEGORIES, payload: categories });
      } catch (error) {
        console.log('ERRRRRRRRORRRRR', error);
        //			setError(error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (category) => {
    try {
      delete category.id;
      const newCategory = await categoryService.create(category);
      dispatch({ type: ACTIONS.ADD_CATEGORY, payload: newCategory });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Categoría creada!',
      });
      dispatch({ type: ACTIONS.UPD_ACTION, payload: 'view' });
    } catch (err) {
      dispatch({
        type: ACTIONS.UPD_ERROR,
        payload: { status: 'error', message: err },
      });
      dispatchNotif({
        type: 'Error',
        message: 'Error creando la categoría',
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      dispatch({ type: ACTIONS.DEL_CATEGORY, payload: id });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Categoría eliminada',
      });
    } catch (err) {
      console.log('ERROR CONTEXT ', err);
      dispatchNotif({
        type: 'Error',
        message: 'Error eliminando la categoría',
      });
    }
  };

  const handleUpdCategory = async (category) => {
    try {
      const updCategory = await categoryService.update(category.id, category);
      dispatch({ type: ACTIONS.UPD_CATEGORY, payload: updCategory });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Categoría modificada!',
      });
      dispatch({ type: ACTIONS.UPD_ACTION, payload: 'view' });
    } catch (err) {
      console.log('ERROR CONTEXT ', err);
      dispatch({
        type: ACTIONS.UPD_ERROR,
        payload: { status: 'error', message: err },
      });
      dispatchNotif({
        type: 'Error',
        message: 'Error creando la categoría',
      });
    }
  };

  const handleUpdAction = (action) => {
    dispatch({
      type: ACTIONS.UPD_ACTION,
      payload: action,
    });
  };

  const handleUpdStatus = (status, message) => {
    dispatch({
      type: ACTIONS.UPD_ERROR,
      payload: { status, message },
    });
  };

  const data = {
    categories,
    status,
    action,
    message,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdStatus,
    handleUpdCategory,
    handleUpdAction,
  };

  return (
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider };
export default CategoriesContext;
