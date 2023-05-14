import { createContext, useEffect, useReducer } from 'react';
import { CategoryHttpService, ProductHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const productService = new ProductHttpService();
const ProductsContext = createContext();

const categoryService = new CategoryHttpService();

const ACTIONS = {
  SET_PRODUCTS: 'setProducts',
  DEL_PRODUCT: 'delProduct',
  ADD_PRODUCT: 'addProduct',
  UPD_PRODUCT: 'updProduct',
  CANCEL: 'cancel',
  UPD_FILTER: 'updFilter',
  UPD_FIELD: 'updField',
};

function reducer(state, action) {
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
        products: [action.payload, ...state.products],
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
        filter: {
          filterCategory: '',
          filterText: '',
          filterStatus: '',
        },
        resetPaginationToggle: !state.resetPaginationToggle,
      };
    case ACTIONS.CANCEL:
      return {
        ...state,
        currentData: null,
        showModalDelete: false,
      };
    case ACTIONS.UPD_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.field]: action.payload.value,
        },
      };
    case ACTIONS.UPD_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
}

const ProductsProvider = ({ children }) => {
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    action: 'view',
    status: 'success',
    error: null,
    currentData: {},
    message: '',
    showModalDelete: false,
    resetPaginationToggle: false,
    filter: {
      filterCategory: '',
      filterText: '',
      filterStatus: '',
    },
  });

  const {
    products,
    status,
    action,
    message,
    currentData,
    showModalDelete,
    resetPaginationToggle,
    filter,
  } = state;

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPD_FIELD,
      payload: { field: 'status', value: 'loading' },
    });

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
      dispatch({
        type: ACTIONS.UPD_FIELD,
        payload: { field: 'status', value: 'loading' },
      });

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
      console.log('ERROR CONTEXT ', error);
      dispatchNotif({
        type: 'Error',
        message: 'Error creando el producto',
      });
    }
  };
  const handleUpdProduct = async (product) => {
    try {
      dispatch({
        type: ACTIONS.UPD_FIELD,
        payload: { field: 'status', value: 'loading' },
      });

      let _product = Object.assign({}, product);

      // Change category
      if (_product.category_id !== _product.category.id)
        _product.category_id = parseInt(_product.category.id);

      // Variations quantity
      if (_product.variations.length > 0) {
        let quantity = 0;
        _product.variations.forEach((variation) => {
          quantity = quantity + parseInt(variation.available_quantity);
        });
        _product.available_quantity = quantity;
      }

      const updProduct = await productService.update(_product);
      dispatch({ type: ACTIONS.UPD_PRODUCT, payload: updProduct });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Producto modificado',
      });
    } catch (error) {
      console.log('ERROR CONTEXT ', error);
      dispatchNotif({
        type: 'Error',
        message: 'Error modificando el producto',
      });
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      dispatch({
        type: ACTIONS.UPD_FIELD,
        payload: { field: 'status', value: 'loading' },
      });

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
      dispatch({
        type: ACTIONS.UPD_FIELD,
        payload: { field: 'status', value: 'loading' },
      });
      let _ml_id = ml_id;
      if (!ml_id.includes('MLA')) _ml_id = `MLA${ml_id}`;

      const productMl = await productService.getProductMl(_ml_id);

      const categoria = await categoryService.findOrCreate(
        productMl.category_id
      );

      const maxSku = Math.max(
        ...products
          .filter((product) => product.sku.includes('ML-'))
          .map((product) => parseInt(product.sku.split('-')[1]))
      );

      const sku = maxSku === -Infinity ? 'ML-1' : `ML-${maxSku + 1}`;

      let newProduct = await productService.createFromMl(
        productMl,
        categoria.id,
        products.length + 1,
        sku
      );
      newProduct.category = categoria;
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
    resetPaginationToggle,
    filter,
    handleDeleteProduct,
    handleUpdProduct,
    handleAddProduct,
    handleAddProductfromMl,
    handleCancelDelete: () => dispatch({ type: ACTIONS.CANCEL }),
    handleUpdFilter: (field, value) =>
      dispatch({
        type: ACTIONS.UPD_FILTER,
        payload: { field, value },
      }),
    handleUpdField: (field, value) =>
      dispatch({
        type: ACTIONS.UPD_FIELD,
        payload: { field, value },
      }),
    getCategories: () => {
      // Array con las categorias
      let categories = state.products.map((product) => product.category?.name);
      // Elimino duplicados
      categories = categories.filter(
        (item, index) => categories.indexOf(item) === index
      );
      return categories;
    },
    filteredItems: () =>
      state.products
        .filter(
          (product) =>
            (product.title
              .toLowerCase()
              .includes(state.filter.filterText.toLowerCase()) ||
              product.sku
                .toLowerCase()
                .includes(state.filter.filterText.toLowerCase())) &&
            product.status
              .toLowerCase()
              .includes(state.filter.filterStatus.toLowerCase()) &&
            product.category?.name
              .toLowerCase()
              .includes(state.filter.filterCategory.toLowerCase())
        )
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)),
  };

  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export { ProductsProvider };
export default ProductsContext;
