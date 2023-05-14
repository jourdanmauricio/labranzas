import DataTable from 'react-data-table-component';
import CategoryDelete from '@/components/AdminCategories/CategoryDelete/CategoryDelete';
import useCategories from './useCategories';
import Modal from '@/commons/Modal/Modal';
import Category from '@/components/AdminCategories/Category/Category';
import Message from '@/commons/Message/Message';
import Breadcrumbs from '@/components/AdminCategories/Breadcrumbs/Breadcrumbs';

const CategoriesPage = () => {
  const {
    categories,
    action,
    message,
    CATEGORIES_COLUMNS,
    actionsMenu,
    showModal,
    currentData,
    onCancelDelete,
    onDelete,
    closeMessage,
  } = useCategories();

  console.log('categories', categories);
  return (
    <div>
      <Breadcrumbs catId={currentData.id} />
      <Message msg={message} closeMessage={closeMessage} />

      {action !== 'view' && <Category category={currentData} />}
      {action === 'view' && categories && (
        <DataTable
          title="Categorías"
          columns={CATEGORIES_COLUMNS}
          data={categories}
          dense
          actions={actionsMenu}
        />
      )}
      <Modal show={showModal} onClose={onCancelDelete}>
        <CategoryDelete
          dataToDelete={currentData}
          onDelete={onDelete}
          onCancelDelete={onCancelDelete}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;
