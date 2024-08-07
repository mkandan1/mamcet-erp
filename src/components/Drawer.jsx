import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export const Drawer = () => {
  // State to manage the expanded/collapsed state of each menu item
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: 'Dashboard',
      icon: 'tdesign:dashboard-1',
      subMenuItems: [
        { id: 11, title: 'Dashboard', url: '/' },
      ],
      isExpanded: false,
    },
    // {
    //   id: 2,
    //   title: 'Admissions',
    //   icon: 'mdi:smart-card-outline',
    //   subMenuItems: [
    //     { id: 11, title: 'Admission Registry', url: '/admission/registry' },
    //   ],
    //   isExpanded: false,
    // },
    {
      id: 3,
      title: 'Employees',
      icon: 'clarity:employee-solid',
      subMenuItems: [
        { id: 12, title: 'Employees', url: '/employee/all' },
        { id: 11, title: 'Employees Onboarding', url: '/employee/onboarding' },
      ],
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Courses',
      icon: 'tdesign:course',
      subMenuItems: [
        { id: 11, title: 'Courses', url: '/course/all' },
        { id: 12, title: 'Subjects', url: '/course/subject' },
      ],
      isExpanded: false,
    },
    {
      id: 5,
      title: 'Academic',
      icon: 'ph:student-fill',
      subMenuItems: [
        { id: 13, title: 'Batches', url: '/course/batch' },
        { id: 14, title: 'Semesters', url: '/course/subject-mapping' },
      ],
      isExpanded: false,
    },
    {
      id: 6,
      title: 'Exam',
      icon: 'ph:exam',
      subMenuItems: [
        { id: 11, title: 'Exams', url: '/exam/all' },
      ],
      isExpanded: false,
    },
  ]);

  const toggleSubMenu = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : { ...item, isExpanded: false }
      )
    );
  };

  return (
    <div className='h-screen top-16 fixed w-52 2xl:w-64 bg-gray-50'>
      <div className='row-span-2 col-span-2 row-start-1 flex flex-col items-center justify-center px-8 py-4 gap-x-1 border-b border-r border-gray-200 bg-white md:col-span-2'>
        <img src='https://firebasestorage.googleapis.com/v0/b/mymamcet.appspot.com/o/mamcet%2Fassets%2Fimage%2Fmamcet%20logo.jpg?alt=media&token=e2cf6795-eb9c-43c4-8e62-0f3bbecee8e4' className='w-20' alt="mamcet logo" />
      </div>

      <div className='h-full relative w-auto bg-base-100 border-r border-base-300 col-span-2'>
        {menuItems.map((menuItem, index) => (
          <div key={menuItem.id} className='relative block'>
            <div
              className={`w-full h-12 flex items-center justify-between group px-4 border-b border-r border-base-200 hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 cursor-pointer`}
              onClick={() => toggleSubMenu(menuItem.id)}
            >
              <div className='flex items-center flex-wrap gap-x-4 text-gray-700'>
                <Icon icon={menuItem.icon} className='text-blue-500 text-[18px]' />
                <span className='font-manrope text-base tracking-normal'>{menuItem.title}</span>
              </div>

              <Icon
                icon={`fluent:ios-arrow-24-filled`}
                className={`text-base p-0 transition-all duration-300 group-hover:text-gray-500 cursor-pointer ${menuItem.isExpanded ? 'rotate-90' : 'rotate-180'
                  }`}
              />
            </div>

            {menuItem.isExpanded && (
              <div key={menuItem.id}>
                <div className='row-start-2 block w-full bg-gray-200 transition-all duration-300 overflow-hidden text-gray-700 relative pl-5'>
                  {menuItem.subMenuItems.map((subMenuItem) => (
                    <Link
                      to={subMenuItem.url}
                      key={subMenuItem.id}
                      className='w-full flex items-center px-8 py-2 text-sm font-manrope text-gray-600 group transition-all duration-300  hover:text-blue-400'
                    >
                      <div className='w-[1.2px] h-12 bg-gray-400 group-hover:bg-blue-400 absolute left-6'></div>
                      <div className='w-4 absolute left-5'>
                        <Icon icon={'material-symbols:play-arrow'} className='text-gray-400 group-hover:text-blue-400' />
                      </div>
                      {subMenuItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='absolute bottom-20 left-5'>
          <p className='text-[13px] text-slate-700'>&copy; Copyright 2024, MAMCET</p>
          <p className='text-[12px] text-slate-500'>www.mamcet.com</p>
          <p className='text-[12px] text-slate-500'>Version 1.1.0</p>
        </div>
    </div>
  );
};