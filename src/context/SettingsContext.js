import { createContext, useEffect, useReducer } from 'react';
import { SettingHttpService } from '@/services/local';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const settingService = new SettingHttpService();
const SettingsContext = createContext();

const ACTIONS = {
  SET_SETTINGS: 'setSettings',
  UPD_SETTING: 'updSetting',
  UPD_STATUS: 'updStatus',
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
        // action: 'view',
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

const SettingsProvider = ({ children }) => {
  const dispatchNotif = useNotification();
  const [state, dispatch] = useReducer(reducer, {
    settings: [],
    status: 'success',
    error: null,
    message: '',
  });

  const { settings, status } = state;

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
    selectType: (type) => {
      const data = settings.filter((setting) => setting.type === type);
      const dataType = data.reduce(
        (obj, cur) => ({ ...obj, [cur.feature]: cur.value }),
        {}
      );
      return dataType;
    },
    handleUpdSettings: async (values) => {
      console.log('values', values);
      for (const property in values) {
        let found = settings.find(
          (setting) =>
            setting.feature === property && setting.value !== values[property]
        );
        if (found) {
          found = { ...found, value: values[property] };
          console.log('UPD');
          await handleUpdSetting(found);
        }
      }
      console.log('FIN');
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Configuración modificada',
      });
    },
  };

  return (
    <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
  );
};

export { SettingsProvider };
export default SettingsContext;
