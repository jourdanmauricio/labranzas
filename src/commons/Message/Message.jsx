import { FaRegWindowClose } from 'react-icons/fa';

const Message = ({ msg, closeMessage }) => {
  return (
    <div
      className={`relative flex justify-center items-center h-8 bg-red-50 transition-opacity ${
        msg ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        className="absolute z-50 border-none bg-none top-2 right-2 text-lg font-bold text-red-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125"
        onClick={closeMessage}
      >
        <FaRegWindowClose />
      </button>
      <p className="text-red-500">{msg}</p>
    </div>
  );
};

export default Message;
