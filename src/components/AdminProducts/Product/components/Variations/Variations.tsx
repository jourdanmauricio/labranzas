import DataTable from 'react-data-table-component';
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
    newAttrib,
    newAtribComb,
    newData,
    onBlurAddVar,
    handleAddAttrib,
    handleResetAttribs,
    onChangeAddAtrib,
  } = useVariations({
    formik,
  });

  return (
    <div>
      {/* SET ATTRIBUTES */}

      {variations.length === 0 && (
        <div className="flex gap-2 mt-4">
          <p className="w-72">Nuevo atributo</p>
          <input
            id="newAtrib"
            name="newAtrib"
            className="input-form text-xs"
            type="text"
            value={newAttrib}
            onChange={(e) => onChangeAddAtrib(e.target.name, e.target.value)}
          />

          <button
            onClick={handleAddAttrib}
            className="btn-primary disabled:bg-gray-400"
            disabled={!newAttrib}
          >
            Agregar atributo
          </button>
          <button
            onClick={handleResetAttribs}
            className="btn-primary disabled:bg-gray-400"
            disabled={fieldsVar.length === 0}
          >
            Eliminar todos
          </button>
        </div>
      )}
      {/* ADD VARIATION */}
      {fieldsVar.length > 0 && (
        <div className="flex gap-2 mt-4 justify-between items-end w-full">
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
                value={
                  newAtribComb.find((attrib) => attrib?.name === field)
                    ?.value_name || ''
                }
                onChange={(e) => onBlurAddVar(e.target.name, e.target.value)}
              />
            </div>
          ))}
          <button
            className="btn-primary disabled:bg-gray-400"
            onClick={newData}
            disabled={newAtribComb
              .map((attrib) => attrib.value_name.length !== 0)
              .includes(false)}
          >
            Crear Variación
          </button>
        </div>
      )}
      <DataTable
        className="mt-8"
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
