import ReactDOM from 'react-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import styles from './Modal.module.css';
import { useEffect, useState } from 'react';

function Modal({ children, show, onClose }) {
  const [isBowser, setIsBrowser] = useState();
  const handleClickContainer = (e) => e.stopPropagation();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <section
      className={`${styles.modal} ${show && styles.is__open}`}
      onClick={onClose}
    >
      <div className={styles.modal__container} onClick={handleClickContainer}>
        <button onClick={onClose} className={styles.modal__close}>
          <FaRegWindowClose />
        </button>
        {children}
      </div>
    </section>
  ) : null;

  if (isBowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal')
    );
  } else {
    return null;
  }
}

export default Modal;
