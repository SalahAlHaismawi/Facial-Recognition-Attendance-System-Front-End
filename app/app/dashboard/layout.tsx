import SideBar from '../components/SideBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-row bg-blue">
        <SideBar />
        <main className="flex-1">{children}</main>
      </div>
    );
  };

  export default Layout;