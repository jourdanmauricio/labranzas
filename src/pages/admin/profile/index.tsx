import { SettingsProvider } from '@/context/SettingsContext';
import Profile from '@/components/AdminProfile/Profile';
import AdminLayout from '@/layout/AdminLayout';

const ProfilePage = () => {
  return (
    <AdminLayout>
      <SettingsProvider>
        <Profile />
      </SettingsProvider>
    </AdminLayout>
  );
};

export default ProfilePage;
