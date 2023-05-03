import { useState } from 'react';
import styles from '@/styles/Tabs.module.css';
import ProductAttibutes from './ProductAttibutes';
import ProductSaleTerms from './ProductSaleTerms';
import { IProduct } from '@/models';

interface IProps {
  product: IProduct;
}

const ProductFeatures = ({ product }: IProps) => {
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
          {/* <FaSearch color="teal" size={20} /> */}
          <span>Ficha Técnica</span>
        </div>
        <div
          onClick={() => toggleTab(2)}
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.active__tabs}`
              : styles.tabs
          }
        >
          {/* <FaSearchLocation color="green" size={20} /> */}
          <span>Grantía / Elaboración</span>
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
          <ProductAttibutes attributes={product.attributes} />
        </div>
        <div
          className={
            toggleState === 2
              ? `${styles.tab__content} ${styles.active__content}`
              : styles.tab__content
          }
        >
          <ProductSaleTerms />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
