import Slider from '@/commons/Slider/Slider';
import SettingsContext from '@/context/SettingsContext';
import { useContext } from 'react';
import CarouselImage from './Components/SettingHeroCarousel/CarouselImage';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Services from '@/components/Services/Services';
import useAdminHomePage from './useAdminHomePage';
import AccordionItem from '@/commons/AccordionItem/AccordionItem';
import SettingServices from './Components/SettingServices/SettingServices';
import SettingHeroCarousel from './Components/SettingHeroCarousel/SettingHeroCarousel';
import Breadcrumbs from '../AdminHomePage/Breadcrumbs/Breadcrumbs';
import Service from './Components/SettingServices/Service';

const AdminHomePage = () => {
  const { action, status, currentData } = useContext(SettingsContext);

  const { time, services, imagesCarousel, toggleState, setToggleState } =
    useAdminHomePage();

  const toggleTab = (index: number) => {
    toggleState === index ? setToggleState(null) : setToggleState(index);
  };

  return (
    <div>
      <Breadcrumbs id={currentData?.id} type="Hompage" />
      {imagesCarousel.length > 0 && (
        <>
          {status === 'loading' && <Loader />}
          {(action === 'editHeroCarousel' || action === 'newHeroCarousel') && (
            <CarouselImage />
          )}
          {(action === 'editService' || action === 'newService') && <Service />}
          {(action === 'view' || action.includes('delete')) && (
            <>
              <ul className="list-none">
                <AccordionItem
                  onToggle={() => toggleTab(0)}
                  active={toggleState === 0}
                  title="Hero Slider"
                >
                  <>
                    <Slider
                      images={imagesCarousel}
                      autoPlay={true}
                      showButtons={true}
                      time={parseInt(time)}
                    />

                    <SettingHeroCarousel />
                  </>
                </AccordionItem>
                <AccordionItem
                  onToggle={() => toggleTab(1)}
                  active={toggleState === 1}
                  title="Servicios"
                >
                  <>
                    <Services services={services} />
                    <SettingServices />
                  </>
                </AccordionItem>
              </ul>
              <hr />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
