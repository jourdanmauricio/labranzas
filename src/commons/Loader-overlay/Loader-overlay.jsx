import styles from './loader-overlay.module.css';
const Loader = () => {
  return (
    <>
      <div className={styles.loader__container}>
        <div className={styles.loadingio__spinner}>
          <div className={styles.ldio}>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
