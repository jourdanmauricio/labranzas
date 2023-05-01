import DataTable from 'react-data-table-component';
import useSettingService from './useSettingService';
import Modal from '@/commons/Modal/Modal';
import SettingDeleteValue from '../SettingDeleteValue/SettingDeleteValue';

const SettingServices = () => {
  const {
    SERVICE_COLUMNS,
    services,
    actionsMenu,
    showModalDelete,
    currentData,
    action,
    onCancelDelete,
    onDelete,
  } = useSettingService();

  return (
    <div>
      <DataTable
        className="mb-10"
        title="Servicios"
        columns={SERVICE_COLUMNS}
        data={services}
        dense
        responsive
        actions={actionsMenu}
      />

      {action === 'deleteService' && (
        <Modal show={showModalDelete} onClose={onCancelDelete}>
          <SettingDeleteValue
            dataToDelete={currentData}
            onDelete={onDelete}
            onCancelDelete={onCancelDelete}
            type="Servicio"
          />
        </Modal>
      )}
    </div>
  );
};

export default SettingServices;
