import { createContext, useEffect, useReducer } from 'react';
import { CategoryHttpService, ProductHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const productService = new ProductHttpService();
const ProductsContext = createContext();

const categoryService = new CategoryHttpService();

const ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  SET_CURRENT_DATA: 'setCurrentdata',
  UPD_ACTION: 'updAction',
  DEL_PRODUCT: 'delProduct',
  ADD_PRODUCT: 'addProduct',
  UPD_PRODUCT: 'updProduct',
  SET_SHOW_MODAL_DELETE: 'showModalDelete',
  CANCEL: 'cancel',
  UPD_STATUS: 'updStatus',
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
        error: null,
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
        message: '',
        error: null,
      };
    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        status: 'success',
        products: [...state.products, action.payload],
        message: '',
        action: 'view',
        error: null,
      };
    case ACTIONS.UPD_PRODUCT:
      return {
        products: state.products.map((prod) =>
          prod.id === action.payload.id ? action.payload : prod
        ),
        status: 'success',
        message: '',
        action: 'view',
        error: null,
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
    case ACTIONS.UPD_STATUS:
      return {
        ...state,
        status: action.payload,
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
    currentData: {},
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

  const handleAddProduct = async (product) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
      console.log('CREATE Product', product);
      // Change category
      if (product.category_id !== product.category.id)
        product.category_id = parseInt(product.category.id);

      const newProduct = await productService.create(product);
      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: newProduct });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Producto creado',
      });
    } catch (error) {
      console.log('ERROR CONTEXT ', err);
      dispatchNotif({
        type: 'Error',
        message: 'Error creando el producto',
      });
    }
  };
  const handleUpdProduct = async (product) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
      console.log('UPD Product', product);
      // Change category
      if (product.category_id !== product.category.id)
        product.category_id = parseInt(product.category.id);

      const updProduct = await productService.update(product);
      dispatch({ type: ACTIONS.UPD_PRODUCT, payload: updProduct });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Producto modificado',
      });
    } catch (error) {
      console.log('ERROR CONTEXT ', err);
      dispatchNotif({
        type: 'Error',
        message: 'Error modificando el producto',
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
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

  const handleAddProductfromMl = async (ml_id) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
      let _ml_id = ml_id;
      if (!ml_id.includes('MLA')) _ml_id = `MLA${ml_id}`;

      const productMl = await productService.getProductMl(_ml_id);
      console.log('productMl', productMl);

      const categoria = await categoryService.findOrCreate(
        productMl.category_id
      );

      const newProduct = await productService.createFromMl(
        productMl,
        categoria.id
      );
      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: newProduct });

      dispatchNotif({
        type: 'SUCCESS',
        message: 'Producto agregado',
      });
    } catch (error) {
      console.log('ERRRRR', error);
    }
  };

  const data = {
    products,
    status,
    action,
    message,
    currentData,
    showModalDelete,
    handleDeleteProduct,
    handleUpdStatus: (status) =>
      dispatch({
        type: ACTIONS.UPD_STATUS,
        payload: status,
      }),
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
    handleAddProductfromMl,
  };

  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export { ProductsProvider };
export default ProductsContext;
