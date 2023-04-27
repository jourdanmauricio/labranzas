import { createContext, useEffect, useReducer } from 'react';
import { SettingHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const settingService = new SettingHttpService();
const SettingsContext = createContext();

const ACTIONS = {
  SET_SETTINGS: 'setSettings',
  UPD_SETTING: 'updSetting',
  UPD_STATUS: 'updStatus',
  SET_CURRENT_DATA: 'setCurrentdata',
  UPD_ACTION: 'updAction',
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

  const { settings, status, action, currentData } = state;

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

  const data = {
    settings,
    status,
    action,
    currentData,
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
  };

  return (
    <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
  );
};

export { SettingsProvider };
export default SettingsContext;
