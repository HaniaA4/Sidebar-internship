import { useState, useEffect } from 'react';
import { HiHome, HiSearch, HiUser, HiCog } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { RxDoubleArrowRight } from "react-icons/rx";
import logo from '../assets/logo.png';

const navItems = [
  { label: 'Home', href: "#home", icon: <HiHome /> },
  { label: 'Search', href: "#search", icon: <HiSearch /> },
  { label: 'Profile', href: "#profile", icon: <HiUser /> },
  { label: 'Dashboard', href: "#dashboard", icon: <MdSpaceDashboard /> },
  { label: 'Settings', href: "#settings", icon: <HiCog /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Set activeIndex based on hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    const foundIndex = navItems.findIndex(item => item.href === hash);
    setActiveIndex(foundIndex !== -1 ? foundIndex : null);

    // Listen for hash changes
    const onHashChange = () => {
      const newHash = window.location.hash;
      const idx = navItems.findIndex(item => item.href === newHash);
      setActiveIndex(idx !== -1 ? idx : null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Reset active nav item when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
      window.location.hash = ''; // Remove the hash from the URL
    }
  }, [isOpen]);

  const handleNavClick = (href, index) => {
    window.location.hash = href;
    setActiveIndex(index);
  };

  return (
    <div className={`bg-gray-950 text-white h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-44' : 'w-24'}`}>
      <div className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center">
          {isOpen ? (
            <span className="tracking-widest text-xl text-purple-800">TECHnet</span>
          ) : (
            <img src={logo} alt="TECHnet Logo" className="rounded-full object-cover" />
          )}
        </div>
        <button
          aria-label="Toggle Sidebar"
          onClick={() => setIsOpen(prev => !prev)}
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'ml-2'}`}
        >
          <RxDoubleArrowRight />
        </button>
      </div>
      <nav className="mt-10 space-y-4">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            tabIndex={-1}
            style={{ display: 'block' }}
            onClick={e => {
              e.preventDefault();
              handleNavClick(item.href, index);
            }}
          >
            <NavItem
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              active={activeIndex === index}
            />
          </a>
        ))}
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isOpen, active }) {
  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 cursor-pointer group outline-none
        ${active ? 'bg-purple-700' : ''}
        hover:bg-purple-700 hover:text-pink-300 transition-colors duration-200`}
      title={!isOpen ? label : undefined}
      tabIndex={0}
      role="button"
    >
      <div className="text-lg">{icon}</div>
      {isOpen && <span className="transition-opacity duration-300">{label}</span>}
    </div>
  );
}
