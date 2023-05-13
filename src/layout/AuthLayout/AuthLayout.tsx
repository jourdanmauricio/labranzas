import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyles}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud__one}></div>
          <div className={styles.cloud__two}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
