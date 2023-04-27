import AdminHomePage from '@/components/AdminHomePage/AdminHomePage';
import { SettingsProvider } from '@/context/SettingsContext';
import AdminLayout from '@/layout/AdminLayout';

const HomePage = () => {
  return (
    <div>
      <AdminLayout>
        <SettingsProvider>
          <AdminHomePage />
        </SettingsProvider>
      </AdminLayout>
    </div>
  );
};

export default HomePage;
