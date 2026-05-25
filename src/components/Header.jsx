'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function ShopHeader({ wishlistCount, cartCount, onCartOpen, onWishlistClick, onSizeGuideOpen }) {
  const pathname = usePathname() || '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [localCartCount, setLocalCartCount] = useState(0);
  const [localWishlistCount, setLocalWishlistCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const savedCart = localStorage.getItem('nike_shop_cart');
        const savedWishlist = localStorage.getItem('nike_shop_wishlist');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          setLocalCartCount(cartData.reduce((total, item) => total + item.quantity, 0));
        } else {
          setLocalCartCount(0);
        }
        if (savedWishlist) {
          setLocalWishlistCount(JSON.parse(savedWishlist).length);
        } else {
          setLocalWishlistCount(0);
        }
      } catch (err) {
        console.error(err);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('nike_cart_update', updateCounts);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('nike_cart_update', updateCounts);
    };
  }, []);

  const activeWishlistCount = wishlistCount !== undefined ? wishlistCount : localWishlistCount;
  const activeCartCount = cartCount !== undefined ? cartCount : localCartCount;

  const handleCartClick = () => {
    if (onCartOpen) {
      onCartOpen();
    } else {
      window.location.href = '/shop?openCart=true';
    }
  };

  const handleWishlistClick = () => {
    if (onWishlistClick) {
      onWishlistClick(`Wishlist contains ${activeWishlistCount} shoe(s)`);
    } else {
      window.location.href = '/shop?openWishlist=true';
    }
  };

  return (
    <>
      <style>{`
        /* --- Premium Responsive Header Style --- */
        .shop-header-container {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height, 80px);
          background: rgba(5, 5, 7, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--shop-border, rgba(255, 255, 255, 0.06));
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4%;
        }

        .shop-header-nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .shop-mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .shop-header-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 12, 0.98);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-direction: column;
            padding: 24px;
            gap: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }

          .shop-header-nav.open {
            display: flex;
          }

          .shop-mobile-toggle {
            display: block;
          }
        }
      `}</style>

      <header className="shop-header-container">
        {/* Brand Logo */}
        <Link href="/" className="shop-logo-section">
          <i className="fa-solid fa-bolt" style={{ animation: 'pulseLogo 2s infinite alternate' }}></i>
          <span className="shop-logo-title">
            NIKE<span>SHOW</span>
          </span>
        </Link>

        {/* Desktop / Responsive Navigation Links */}
        <nav className={`shop-header-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/" className={`shop-nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className={`shop-nav-link ${pathname.startsWith('/about') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/shop" className={`shop-nav-link ${pathname.startsWith('/shop') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/size-guide" className={`shop-nav-link ${pathname.startsWith('/size-guide') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Size Guide</Link>
          <Link href="/contact" className={`shop-nav-link ${pathname.startsWith('/contact') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>

        {/* Action icons */}
        <div className="shop-header-actions">
          {/* Wishlist toggle */}
          <button
            className="shop-action-btn"
            onClick={handleWishlistClick}
            aria-label="Wishlist"
          >
            <i className="fa-regular fa-heart"></i>
            {activeWishlistCount > 0 && <span className="shop-cart-badge">{activeWishlistCount}</span>}
          </button>

          {/* Cart toggle */}
          <button
            className="shop-action-btn"
            onClick={handleCartClick}
            aria-label="Shopping Cart"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            {activeCartCount > 0 && <span className="shop-cart-badge">{activeCartCount}</span>}
          </button>

          {/* Responsive Hamburger Toggle */}
          <button
            className="shop-mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>
      </header>

      <style>{`
        @keyframes pulseLogo {
          0% { transform: scale(1); filter: drop-shadow(0 0 2px var(--accent-orange, #ff6b00)); }
          100% { transform: scale(1.1); filter: drop-shadow(0 0 10px var(--accent-orange, #ff6b00)); }
        }
      `}</style>
    </>
  );
}
