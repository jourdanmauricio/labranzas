import { useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface IProps {
  children: JSX.Element;
  title: string;
  active: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ children, title, active, onToggle }: IProps) => {
  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <li
      className={`border-t border-solid border-gray-400 ${
        active ? 'bg-slate-200' : ''
      }`}
    >
      <button
        type="button"
        className="bg-slate-900 text-white text-left flex flex-wrap w-full justify-between items-center py-4 px-10 cursor-pointer border-none"
        onClick={onToggle}
      >
        {title}
        <span className="text-xl">
          {active ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        ref={contentEl}
        className={`overflow-hidden ${active ? 'h-auto' : 'h-0'}`}
        // transition-height
        // style={
        // active
        // ? { height: contentEl.current?.scrollHeight }
        // : { height: '0px' }
        // }
      >
        <div className="p-2">{children}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
