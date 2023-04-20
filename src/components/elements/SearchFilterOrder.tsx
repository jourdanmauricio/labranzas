// import { Icon } from '@iconify/react';
import { FaSearch } from 'react-icons/fa';

interface IProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
  order: string;
  setOrder: (order: string) => void;
  total: number;
  // partial: number;
  // feature: string;
}

const SearchFilterOrder = ({
  searchText,
  setSearchText,
  order,
  setOrder,
  total,
}: // partial,
// feature,
IProps) => {
  return (
    <article className="h-12 p-1 sm:px-3 text-sm text-gray-700 flex items-center justify-between border-t border-b border-gray-300">
      <div className="flex justify-end items-center relative">
        <input
          className="border border-gray-300 rounded p-1 w-full"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FaSearch />
        {/* <Icon
          icon="mdi:search"
          className="absolute text-lg right-0 w-8 rotate-90"
        /> */}
      </div>
      <div>
        <select
          className="border border-gray-300 bg-white rounded p-1 w-full"
          name="select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="INITIAL">Ordenar por</option>
          <option value="MIN-VALUE">Menor precio</option>
          <option value="MAX-VALUE">Mayor precio</option>
        </select>
      </div>
      <p className="hidden sm:inline-block">
        {/* {feature} {partial} de {total} */}
      </p>
    </article>
  );
};

export default SearchFilterOrder;
