import { useContext, useEffect, useMemo, useState } from 'react';
import SettingsContext from '@/context/SettingsContext';
import { TImage, TService } from '@/models';

const useAdminHomePage = () => {
  const [time, setTime] = useState('4000');
  const [services, setServices] = useState<TService[]>([]);
  const [imagesCarousel, setImagesCarousel] = useState<TImage[]>([]);
  const [toggleState, setToggleState] = useState<number | null>(null);

  const { selectName, setCurrentData, handleUpdAction, settings } =
    useContext(SettingsContext);

  useEffect(() => {
    const heroCarousel = selectName('HERO_CAROUSEL', 'array');
    if (heroCarousel.length > 0) {
      setImagesCarousel(
        heroCarousel[0].values.sort((a: any, b: any) => +a.order - +b.order)
      );
      setTime(heroCarousel[0].value);
    }
    const services = selectName('SERVICES', 'array');
    if (services.length > 0) {
      setServices(
        services[0].values.sort((a: any, b: any) => +a.order - +b.order)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const initialData = {
    id: imagesCarousel.length + 1,
    value: '',
    image: '',
    alt_image: '',
    order: imagesCarousel.length + 1,
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('new');
  };

  return {
    time,
    services,
    imagesCarousel,
    toggleState,
    setToggleState,
  };
};

export default useAdminHomePage;
