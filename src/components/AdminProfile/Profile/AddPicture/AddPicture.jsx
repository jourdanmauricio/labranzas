// import { useModal } from '@/hooks/useModal';
// import { Modal } from '@/commons/Modal/Modal';
// import Media from '@/components/Media/Media';
// import { useDispatch, useSelector } from 'react-redux';
// import { updProfile } from '@/store/user';

const AddPicture = ({ profile }) => {
  // const [isOpenModal, openModal, closeModal] = useModal(false);

  // const dispatch = useDispatch();
  // let { user } = useSelector((state) => state.user);

  // const handleSelect = (image) => {
  //   closeModal();
  //   dispatch(updProfile({ id: user.id, image }));
  // };

  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <div
          className="mt-5 inline-block mx-auto w-40 h-40 rounded-full bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          style={{ backgroundImage: `url('${profile.image}')` }}
        />

        <button
          // onClick={openModal}
          type="button"
          className="btn__primary block mx-auto"
        >
          Seleccionar imagen
        </button>
      </div>

      {/* <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal> */}
    </>
  );
};

export default AddPicture;
