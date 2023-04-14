import AdminLayout from '@/layout/AdminLayout';
import MediaTabs from '@/components/AdminImages/MediaTabs/MediaTabs';
import { ImagesProvider } from '@/context/ImagesContext';

const MediaPage = () => {
  const handleSelect = () => {};
  const handleCancel = () => {};
  return (
    <AdminLayout>
      <ImagesProvider>
        <MediaTabs handleSelect={handleSelect} handleCancel={handleCancel} />
      </ImagesProvider>
    </AdminLayout>
  );
};

export default MediaPage;
