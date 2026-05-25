'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { id: 'shop', label: 'Shop', icon: 'fas fa-bag-shopping', path: '/shop', scrollPercent: 0.25 },
  { id: 'about-us', label: 'About Us', icon: 'fas fa-circle-info', path: '/about', scrollPercent: 0.5 },
  { id: 'home', label: 'Home', icon: 'fas fa-house', path: '/', scrollPercent: 0 },
  { id: 'size-guide', label: 'Size Guide', icon: 'fas fa-ruler-horizontal', path: '/size-guide', scrollPercent: 0.75 },
  { id: 'contact-us', label: 'Contact Us', icon: 'fas fa-paper-plane', path: '/contact', scrollPercent: 1.0 },
];

export default function HomeFloatingMenu() {
  const pathname = usePathname() || '';
  const activeItem = MENU_ITEMS.find((item) => {
    if (item.path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.path);
  })?.id || 'home';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Automatically collapse the menu when scrolling
      setIsOpen((prevOpen) => {
        if (prevOpen) return false;
        return prevOpen;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (e, item) => {
    if (item.id === 'home' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style>{`
        /* --- Premium Floating Right-Center Menu Container --- */
        .right-floating-menu {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%); 
          background: rgba(18, 18, 18, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 8px;
          border-radius: 32px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 
                      0 0 0 1px rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          z-index: 999;
          width: 64px;
          max-height: 64px; /* Trigger button (48px) + padding (16px) */
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      padding 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Expanded Capsule State */
        .right-floating-menu.open {
          padding: 20px 8px;
          border-radius: 40px;
          max-height: 360px; /* Fits exactly 5 items */
          overflow: visible; /* Allows tooltips to pop out to the left */
        }

        /* --- Menu Hamburger/Close Trigger --- */
        .menu-trigger {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
          outline: none;
        }

        .menu-trigger:hover {
          background-color: #ffffff;
          color: #000000;
          transform: scale(1.1);
        }

        /* Hide trigger when menu is open */
        .right-floating-menu.open .menu-trigger {
          display: none;
        }

        /* --- Menu Item Container --- */
        .menu-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        /* Reveal items when menu is open */
        .right-floating-menu.open .menu-item {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
          transition-delay: 0.05s;
        }

        /* --- Icon Links --- */
        .menu-item a {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Hover Link State */
        .menu-item a:hover {
          background-color: #ffffff;
          color: #000000;
          transform: scale(1.12);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Active Link State */
        .menu-item.active a {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.25) !important;
        }

        /* --- Tooltip --- */
        .menu-item .tooltip {
          position: absolute;
          right: 68px;
          background-color: rgba(10, 10, 10, 0.95);
          color: #ffffff;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transform: translateX(12px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.12);
          pointer-events: none;
        }

        /* Tooltip Arrow */
        .menu-item .tooltip::after {
          content: "";
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(10, 10, 10, 0.95);
        }

        /* Arrow Outer Border Glow */
        .menu-item .tooltip::before {
          content: "";
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 7px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.12);
          z-index: -1;
          margin-left: 1px;
        }

        /* Show Tooltip on Hover */
        .menu-item:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(0) scale(1);
        }
      `}</style>

      <nav className={`right-floating-menu ${isOpen ? 'open' : ''}`}>
        <button
          className="menu-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menu Items */}
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
          >
            <a
              href={item.path}
              onClick={(e) => handleNavigate(e, item)}
              aria-label={item.label}
            >
              <i className={item.icon}></i>
            </a>
            <span className="tooltip">{item.label}</span>
          </div>
        ))}
      </nav>
    </>
  );
}
