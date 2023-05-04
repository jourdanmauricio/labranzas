import { useEffect, useState } from 'react';
import { ISaleTerm } from '@/models/product.model';
import { initialSaleTerms } from '@/config/variables';

interface IProps {
  formik: any;
}

function SaleTerms({ formik }: IProps) {
  const [saleTerms, setSaleTerms] = useState<ISaleTerm[]>(initialSaleTerms);

  useEffect(() => {
    setSaleTerms(formik.getFieldProps('sale_terms').value);
    // const _terms: ISaleTerm[] = formik.getFieldProps('sale_terms').value;
    // const _saleTerms = saleTerms.map((saleTerm) => {
    //   const value = _terms.find((term) => term.id === saleTerm.id);
    //   return value ? value : saleTerm;
    // });
    // setSaleTerms(_saleTerms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const handleChange = (name: string, value: string) => {
    const newData = saleTerms.map((term) =>
      term.id === name ? { ...term, value_name: value } : term
    );
    setSaleTerms(newData);
    formik.setFieldValue('sale_terms', newData);
  };

  return (
    <div className="w-full sm:grid sm:grid-cols-2 sm:gap-x-8 gap-y-2">
      {saleTerms.map((term) => (
        <div key={term.id}>
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
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SaleTerms;
