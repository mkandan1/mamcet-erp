import React, { useState } from "react";
import { Icon } from "@iconify/react";
import mamcet_logo from "../assets/images/mamcet-logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Container = ({ children, title }) => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Dashboard",
      icon: "tdesign:dashboard-1",
      subMenuItems: [{ id: 11, title: "Dashboard", url: "/" }],
      isExpanded: false,
    },
    {
      id: 3,
      title: "Employees",
      icon: "clarity:employee-solid",
      subMenuItems: [
        { id: 12, title: "Employees", url: "/employee/all" },
        { id: 11, title: "Employees Onboarding", url: "/employee/onboarding" },
      ],
      isExpanded: false,
    },
    {
      id: 4,
      title: "Courses",
      icon: "tdesign:course",
      subMenuItems: [
        { id: 11, title: "Courses", url: "/course/all" },
        { id: 12, title: "Subjects", url: "/course/subject" },
      ],
      isExpanded: false,
    },
    {
      id: 5,
      title: "Academic",
      icon: "ph:student-fill",
      subMenuItems: [
        { id: 13, title: "Batches", url: "/course/batch" },
        { id: 14, title: "Semesters", url: "/course/subject-mapping" },
      ],
      isExpanded: false,
    },
    {
      id: 6,
      title: "Exam",
      icon: "ph:exam",
      subMenuItems: [{ id: 11, title: "Exams", url: "/exam/all" }],
      isExpanded: false,
    },
  ]);

  const { user } = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSubMenu = (id) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.id === id
          ? { ...item, isExpanded: !item.isExpanded }
          : { ...item, isExpanded: false }
      )
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Implement search logic here
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-10 md:hidden bg-gray-900 bg-opacity-50 transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col w-[280px] md:w-[280px] bg-white text-gray-800 dark:bg-gray-50 dark:text-gray-800 shadow-lg`}
      >
        <div className="py-4 flex flex-col items-center border-b">
          <img src={mamcet_logo} alt="MAMCET" className="h-24 w-24" />
          <h3 className="pl-4 font-bold text-lg">MAMCET ERP</h3>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((menuItem) => (
              <li key={menuItem.id}>
                <div
                  className="flex items-center justify-between p-2 space-x-3 rounded-md transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-gray-800 cursor-pointer"
                  onClick={() => toggleSubMenu(menuItem.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon icon={menuItem.icon} className="w-5 h-5" />
                    <span>{menuItem.title}</span>
                  </div>
                  <Icon
                    icon={
                      menuItem.isExpanded
                        ? "mdi:chevron-down"
                        : "mdi:chevron-right"
                    }
                    className="w-5 h-5"
                  />
                </div>
                {menuItem.isExpanded && menuItem.subMenuItems.length > 0 && (
                  <ul className="pl-6 space-y-1 mt-1">
                    {menuItem.subMenuItems.map((subMenuItem) => (
                      <li key={subMenuItem.id}>
                        <Link
                          to={subMenuItem.url}
                          className="flex items-center p-2 space-x-3 rounded-md text-sm text-gray-400 hover:text-gray-800 dark:hover:text-gray-700"
                        >
                          {subMenuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="w-48 mt-10 absolute bottom-0 p-4">
            <p className="text-xs text-gray-500 leading-6">
              &copy; 2024{" "}
              <span className="uppercase">
              Selvamm Arts and Science College
              </span>
              , Namakkal
            </p>
            <p className="text-xs text-gray-400">www.mamcet.com</p>
            <p className="text-xs text-gray-400">v0.0.12</p>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto md:ml-[280px]">
        <header className="flex items-center justify-between bg-blue-700 text-white p-4 shadow-md">
          <div className="flex items-center">
            <button className="md:hidden p-2" onClick={toggleMobileMenu}>
              <Icon icon="mdi:menu" className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-4 relative">
            <button className="relative p-2 hover:bg-blue-600 rounded-full">
              <Icon icon="mdi:bell-outline" className="w-6 h-6" />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                3
              </span>
            </button>
            <button className="relative p-2 hover:bg-blue-600 rounded-full">
              <Icon icon="mdi:message-outline" className="w-6 h-6" />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                5
              </span>
            </button>
            <button
              className="relative p-2 hover:bg-blue-600 rounded-full"
              onClick={toggleDropdown}
            >
              <Icon icon="mdi:settings-outline" className="w-6 h-6" />
            </button>
            <button className="relative p-2" onClick={toggleDropdown}>
              <img
                src={user.photo + "?alt=media"}
                alt="User Profile"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-12 right-0 text-gray-500 bg-white border rounded-md shadow-lg w-48">
                <div className="p-3 border-b">
                  <div className="font-semibold text-gray-500">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.designation}
                  </div>
                </div>
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};
