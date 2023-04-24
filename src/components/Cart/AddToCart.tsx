import { IProduct } from '@/models';

interface IProps {
  item: IProduct;
}

const AddToCart = ({ item }: IProps) => {
  console.log('item', item);
  return (
    <div className="flex justify-end flex-wrap text-sm">
      <input
        className="text-gray-400 text-center w-8 p-1 focus:outline-0 border border-gray-500"
        placeholder="1"
        type="text"
        name=""
        id=""
      />
      <button className="p-1 border tracking-wider bg-white hover:bg-purple-200 border-gray-500 text-gray-800 transition ease-in-out delay-150">
        Agregar al carrito
      </button>
      {/* <input className="w-8 h-8 p-2 border-none rounded-l" type="text" />
      <button className="border h-8 p-1 rounded-r bg-gray-400">
        Agregar al carrito
      </button> */}
    </div>
  );
};

export default AddToCart;
