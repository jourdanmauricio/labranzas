import { createContext, useEffect, useReducer } from 'react';
import { SettingHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const settingService = new SettingHttpService();
const SettingsContext = createContext();

const ACTIONS = {
  SET_SETTINGS: 'setSettings',
  ADD_SETTING: 'addSetting',
  UPD_SETTING: 'updSetting',
  DEL_SETTING: 'delSetting',
  UPD_STATUS: 'updStatus',
  SET_CURRENT_DATA: 'setCurrentdata',
  UPD_ACTION: 'updAction',
  SET_SHOW_MODAL_DELETE: 'showModalDelete',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SETTINGS:
      console.log('action.payload', action.payload);
      return {
        ...state,
        settings: action.payload,
        status: 'success',
        // message: '',
        action: 'view',
        // error: null,
      };
    case ACTIONS.ADD_SETTING:
      console.log('action.payload', action.payload);
      return {
        ...state,
        status: 'success',
        settings: [...state.settings, action.payload],
        message: '',
        action: 'view',
        error: null,
      };
    case ACTIONS.UPD_SETTING:
      return {
        settings: state.settings.map((setting) =>
          setting.id === action.payload.id ? action.payload : setting
        ),
        status: 'success',
        message: '',
        error: null,
        action: 'view',
      };
    case ACTIONS.DEL_SETTING:
      return {
        ...state,
        settings: state.settings.filter(
          (setting) => setting.id !== action.payload
        ),
        status: 'suscces',
        message: '',
        error: null,
      };
    case ACTIONS.UPD_STATUS:
      return {
        ...state,
        status: action.payload,
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
    case ACTIONS.SET_SHOW_MODAL_DELETE:
      return {
        ...state,
        showModalDelete: action.payload,
      };
    default:
      return state;
  }
}

const SettingsProvider = ({ children }) => {
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, {
    settings: [],
    status: 'success',
    error: null,
    message: '',
    action: 'view',
    currentData: {},
  });

  const { settings, status, action, currentData, showModalDelete } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
    const fetchSettings = async () => {
      try {
        const data = await settingService.getAll();
        dispatch({ type: ACTIONS.SET_SETTINGS, payload: data });
      } catch (error) {
        console.log('ERRRRRRRRORRRRR', error);
        //			setError(error);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdSetting = async (setting) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
      const updSetting = await settingService.update(setting.id, setting);
      dispatch({ type: ACTIONS.UPD_SETTING, payload: updSetting });
    } catch (error) {
      console.log('ERROR CONTEXT ', error);
      dispatchNotif({
        type: 'Error',
        message: 'Error modificando la configuración',
      });
    }
  };

  const handleAddSetting = async (setting) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });

      const newSetting = await settingService.create(setting);
      dispatch({ type: ACTIONS.ADD_SETTING, payload: newSetting });
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Configuración creada',
      });
    } catch (error) {
      console.log('ERROR CONTEXT ', error);
      dispatchNotif({
        type: 'Error',
        message: 'Error creando la configuración',
      });
    }
  };

  const handleDeleteSetting = async (id) => {
    try {
      dispatch({ type: ACTIONS.UPD_STATUS, payload: 'loading' });
      await settingService.delete(id);
      dispatch({ type: ACTIONS.DEL_SETTING, payload: id });
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
    settings,
    status,
    action,
    currentData,
    showModalDelete,
    handleDeleteSetting,
    selectName: (name, type) => {
      const data = settings.filter((setting) => setting.name === name);
      if (type === 'object') {
        const dataName = data.reduce(
          (obj, cur) => ({ ...obj, [cur.feature]: cur.value }),
          {}
        );
        return dataName;
      } else {
        return data;
      }
    },
    handleAddSetting,
    handleUpdSettingsValue: async (values) => {
      for (const property in values) {
        let found = settings.find(
          (setting) =>
            setting.feature === property && setting.value !== values[property]
        );
        if (found) {
          found = { ...found, value: values[property] };
          await handleUpdSetting(found);
        }
      }

      dispatchNotif({
        type: 'SUCCESS',
        message: 'Configuración modificada',
      });
    },
    handleUpdSettings: async (values) => {
      const found = settings.find((setting) => setting.id === values.id);
      if (JSON.stringify(found) !== JSON.stringify(values)) {
        await handleUpdSetting(values);
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Configuración modificada',
        });
      }
    },
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
  };

  return (
    <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
  );
};

export { SettingsProvider };
export default SettingsContext;
