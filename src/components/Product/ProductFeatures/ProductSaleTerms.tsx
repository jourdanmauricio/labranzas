import { ISaleTerm } from '@/models';

interface IProps {
  saleTerms: ISaleTerm[];
}

const ProductSaleTerms = ({ saleTerms }: IProps) => {
  return (
    <div className="w-full sm:grid sm:grid-cols-2 sm:gap-x-8 gap-y-2">
      {saleTerms.map((term) => (
        <div className="w-full" key={term.id}>
          {term.value_name.length > 0 && (
            <div className="w-full">
              <label className="label-form" htmlFor={term.id}>
                {term.name}
              </label>
              <input
                className="input-form"
                type="text"
                name={term.id}
                id={term.id}
                value={term.value_name || ''}
                disabled
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductSaleTerms;
