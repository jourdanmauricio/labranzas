import AdminLayout from '@/layout/AdminLayout';
import MediaTabs from '@/components/MediaTabs/MediaTabs';
import { ImagesProvider } from '@/context/ImagesContext';

const MediaPage = () => {
  return (
    <AdminLayout>
      <ImagesProvider>
        <MediaTabs />
      </ImagesProvider>
    </AdminLayout>
  );
};

export default MediaPage;
