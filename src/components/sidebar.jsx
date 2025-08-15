import { useState } from 'react';
import { HiHome, HiSearch, HiUser, HiCog, } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RxDoubleArrowRight } from "react-icons/rx";

const navItems = [
  { label: 'Home', href: "#home", icon: <HiHome /> },
  { label: 'Search', href: "#search", icon: <HiSearch /> },
  { label: 'Profile', href: "#profile", icon: <HiUser /> },
  { label: 'Dashboard', href: "#dashboard", icon: <MdSpaceDashboard /> },
  { label: 'Settings', href: "#settings", icon: <HiCog /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold">{isOpen ? 'Logo' : 'L'}</div>
        <button
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <RxDoubleArrowRight />
        </button>
      </div>
      <nav className="mt-10 space-y-4">
        {navItems.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} isOpen={isOpen} />
        ))}
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isOpen }) {
  return (
    <div
      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 cursor-pointer group"
      title={!isOpen ? label : undefined}
    >
      <div className="text-lg">{icon}</div>
      {isOpen && <span className="transition-opacity duration-300">{label}</span>}
    </div>
  );
}
