import SettingsContext from '@/context/SettingsContext';
import { IUpdateSettingDto } from '@/models';
import { FormEventHandler, useContext, useEffect, useState } from 'react';

const ChangeSettingHero = () => {
  const [setting, setSetting] = useState<IUpdateSettingDto | null>(null);
  const { selectName, settings, handleUpdSetting } =
    useContext(SettingsContext);

  useEffect(() => {
    const heroCarousel = selectName('HERO_CAROUSEL', 'array');
    if (heroCarousel.length > 0) {
      setSetting(heroCarousel[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const onChangeSetting = (name: string, value: string | boolean) => {
    if (name === 'show') {
      value = value === 'false' ? false : true;
    }
    setSetting({ ...setting, [name]: value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleUpdSetting(setting);
  };
  return (
    <>
      {setting && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-end gap-5 mb-10"
        >
          <div className="flex gap-5 w-full sm:w-2/3 items-end">
            <div className="w-full">
              <input
                type="checkbox"
                value=""
                id="show"
                name="show"
                checked={setting?.show}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="show"
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Mostrar sección
              </label>
            </div>
            <div className="w-full">
              <label className="label-form" htmlFor="time">
                Milisegundos entre imágenes
              </label>
              <input
                className="input-form"
                type="number"
                name="value"
                id="time"
                value={setting?.value}
                min="1000"
                step="500"
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <button className="w-full sm:w-1/3 btn-primary" type="submit">
            Modificar
          </button>
        </form>
      )}
    </>
  );
};

export default ChangeSettingHero;
