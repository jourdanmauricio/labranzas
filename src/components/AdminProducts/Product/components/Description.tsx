import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { quillSimpleModules } from '@/config/variables';

interface IProps {
  formik: any;
}
const Description = ({ formik }: IProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const handleChange = (value: string) => {
    formik.setFieldValue('description', value);
  };

  return (
    <>
      {/* <div className="w-full">
          <label className="label-form" htmlFor="ml-id">
            Descripción
          </label>
          <textarea
            className="input-form"
            type="text"
            id="ml-id"
            rows="5"
            {...formik.getFieldProps('description')}
          ></textarea>
          {formik.errors.description && formik.touched.description && (
            <span className="text-xs text-rose-500">
              {formik.errors.description}
            </span>
          )}
        </div> */}

      <div className="form__group w-full">
        <label className="form__label">Título</label>
        <ReactQuill
          style={{
            backgroundColor: '#ededed',
          }}
          onChange={(e) => handleChange(e)}
          theme="snow"
          value={formik.getFieldProps('description').value}
          modules={quillSimpleModules}
        />
      </div>
    </>
  );
};

export default Description;
