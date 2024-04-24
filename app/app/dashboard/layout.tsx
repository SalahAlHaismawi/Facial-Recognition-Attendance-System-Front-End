import WelcomeCard from '@/components/shared/WelcomeCard';
import SideBar from '../../components/shared/SideBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex h-screen w-screen justify-center pt-10">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <WelcomeCard />
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
    );
  };

  export default Layout;