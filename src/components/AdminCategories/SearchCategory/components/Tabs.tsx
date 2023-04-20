import { useState } from 'react';
import { FaSearchPlus, FaSearchLocation, FaSearch } from 'react-icons/fa';
import { ICreateIMlCatDetailDto } from '@/models';
import CatPredictor from './CatPredictor';
import CatTree from './CatTree';
import CatUsed from './CatUsed';
import styles from '@/styles/Tabs.module.css';

interface IProps {
  handleSelectCat: (categorySel: ICreateIMlCatDetailDto | null) => void;
}

const Tabs = ({ handleSelectCat }: IProps) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  return (
    <div className={styles.tabs__container}>
      <div className={styles.tabs__bloc}>
        <div
          onClick={() => toggleTab(1)}
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaSearch color="teal" size={20} />
          <span>Predictor</span>
        </div>
        <div
          onClick={() => toggleTab(2)}
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaSearchLocation color="green" size={20} />
          <span>Árbol</span>
        </div>
        <div
          onClick={() => toggleTab(3)}
          className={
            toggleState === 3
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          <FaSearchPlus color="green" size={20} />
          <span>Más utilizadas</span>
        </div>
      </div>
      <div className={styles.tabs__content}>
        <div
          className={
            toggleState === 1
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <CatPredictor handleSelectCat={handleSelectCat}></CatPredictor>
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <CatTree handleSelectCat={handleSelectCat}></CatTree>
        </div>
        <div
          className={
            toggleState === 3
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <CatUsed handleSelectCat={handleSelectCat}></CatUsed>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
