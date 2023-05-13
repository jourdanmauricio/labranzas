import styles from './spinner.module.css';

const Spinner = ({ type = 'component' }) => {
  return (
    <div
      id="spinner"
      className={`${styles.spinner} ${
        type === 'component' ? 'w-[50px] h-[50px]' : 'w-[16px] h-[16px]'
      }`}
    ></div>
  );
};

export default Spinner;
