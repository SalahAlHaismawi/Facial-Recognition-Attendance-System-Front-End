import WelcomeCard from '@/components/shared/WelcomeCard';
import AttendanceBox from '@/components/shared/AttendanceBox';

import SideBar from '../../components/shared/SideBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex h-screen w-screen justify-center pt-10 bg-[#F5F5F5]">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <WelcomeCard />
        <div className='mt-10 flex flex-col '>
          <h1 className=' pl-12 text-xl xl:pl-[50px] 2xl:pl-[120px] 3xl:pl-[140px]'>Current Attendance</h1>
        <AttendanceBox />
        </div>
        
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
    );
  };

  export default Layout;