import { createContext, useEffect, useReducer } from 'react';
import { ProductHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useRouter } from 'next/router';

const productService = new ProductHttpService();
const ProductsContext = createContext();

const ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_CURRENT_DATA: 'setCurrentdata',
  UPD_ACTION: 'updAction',
  DEL_PRODUCT: 'delProduct',
  SET_SHOW_MODAL_DELETE: 'showModalDelete',
  CANCEL: 'cancel',
};

function reducer(state, action) {
  console.log('action.payload', action.payload);
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        status: 'success',
        message: '',
        action: 'view',
        error: '',
      };
    case ACTIONS.SET_CURRENT_DATA:
      return {
        ...state,
        currentData: action.payload,
      };
    case ACTIONS.UPD_ACTION:
      return {
        ...state,
        action: action.payload,
      };
    case ACTIONS.DEL_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => prod.id !== action.payload),
        status: 'suscces',
      };
    case ACTIONS.SET_SHOW_MODAL_DELETE:
      return {
        ...state,
        showModalDelete: action.payload,
      };
    case ACTIONS.CANCEL:
      return {
        ...state,
        currentData: null,
        showModalDelete: false,
        // showModalDetail: false,
      };
    default:
      return state;
  }
}

const ProductsProvider = ({ children }) => {
  // const route = useRouter();
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    action: 'view',
    status: 'success',
    error: null,
    currentData: null,
    message: '',
    showModalDelete: false,
  });

  const { products, status, action, message, currentData, showModalDelete } =
    state;

  useEffect(() => {
    dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
    const fetchProducts = async () => {
      try {
        const products = await productService.getAll();
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
      } catch (error) {
        console.log('ERRRRRRRRORRRRR', error);
        //			setError(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {};
  const handleUpdProduct = () => {};
  const handleDeleteProduct = async (id) => {
    try {
      await productService.delete(id);
      dispatch({ type: ACTIONS.DEL_PRODUCT, payload: id });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Producto eliminado',
      });
    } catch (err) {
      console.log('ERROR CONTEXT ', err);
      dispatchNotif({
        type: 'Error',
        message: 'Error eliminando el producto',
      });
    }
  };

  const data = {
    products,
    status,
    action,
    message,
    currentData,
    showModalDelete,
    // handleAddCategory,
    handleDeleteProduct,
    // handleUpdStatus,
    handleUpdProduct,
    handleAddProduct,
    handleUpdAction: (action) =>
      dispatch({
        type: ACTIONS.UPD_ACTION,
        payload: action,
      }),
    setCurrentData: (currentData) =>
      dispatch({
        type: ACTIONS.SET_CURRENT_DATA,
        payload: currentData,
      }),
    setShowModalDelete: (showModalDelete) =>
      dispatch({
        type: ACTIONS.SET_SHOW_MODAL_DELETE,
        payload: showModalDelete,
      }),
    handleCancelDelete: () => dispatch({ type: ACTIONS.CANCEL }),
  };

  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export { ProductsProvider };
export default ProductsContext;
