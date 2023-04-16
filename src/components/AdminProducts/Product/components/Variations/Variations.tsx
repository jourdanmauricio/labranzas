import DataTable from 'react-data-table-component';
import { FaPlus } from 'react-icons/fa';
import useVariations from './useVariations';

interface IProps {
  formik: any;
}

const Variations = ({ formik }: IProps) => {
  const {
    variations,
    VARIATIONS_COLUMNS,
    fieldsVar,
    ExpandedComponent,
    newData,
    onChangeAddVar,
  } = useVariations({
    formik,
  });

  return (
    <div>
      <div className="flex gap-2">
        {fieldsVar.map((field) => (
          <div key={field}>
            <label className="label-form text-xs" htmlFor={field}>
              {field}
            </label>
            <input
              id={field}
              name={field}
              className="input-form text-xs"
              type="text"
              onBlur={(e) => onChangeAddVar(e.target.name, e.target.value)}
            />
          </div>
        ))}
        <button className="table__icon table__icon--add mt-4" onClick={newData}>
          <FaPlus />
        </button>
      </div>

      <DataTable
        className="mt-4"
        columns={VARIATIONS_COLUMNS}
        data={variations}
        dense
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};

export default Variations;
