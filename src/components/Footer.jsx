'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ShopFooter({ onNewsletterSubmit }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (onNewsletterSubmit) {
      onNewsletterSubmit(`Subscribed successfully with email: ${email}`);
    }
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <style>{`
        /* --- Premium Footer Design --- */
        .shop-footer-container {
          background: #050507;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 80px 4% 30px 4%;
          font-family: inherit;
          color: #8f929d;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .shop-footer-container::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.04) 0%, transparent 70%);
          z-index: -1;
          pointer-events: none;
        }

        .shop-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 60px auto;
        }

        @media (max-width: 992px) {
          .shop-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 576px) {
          .shop-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        .shop-footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .shop-footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #fff;
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 0.05em;
        }

        .shop-footer-brand-logo span {
          color: var(--accent-orange, #ff6b00);
        }

        .shop-footer-brand-logo i {
          color: var(--accent-orange, #ff6b00);
        }

        .shop-footer-brand-desc {
          font-size: 13px;
          line-height: 1.6;
        }

        .shop-footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .shop-footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 14px;
        }

        .shop-footer-social-btn:hover {
          background: var(--accent-orange, #ff6b00);
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255,107,0,0.4);
          border-color: var(--accent-orange, #ff6b00);
        }

        .shop-footer-title {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }

        .shop-footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .shop-footer-link {
          font-size: 13px;
          color: #8f929d;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .shop-footer-link:hover {
          color: #fff;
          transform: translateX(4px);
          text-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        .shop-footer-newsletter-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .shop-footer-newsletter-desc {
          font-size: 13px;
          line-height: 1.6;
        }

        .shop-footer-newsletter-form {
          display: flex;
          gap: 8px;
          position: relative;
        }

        .shop-footer-newsletter-input {
          flex-grow: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 12px 16px;
          border-radius: 20px;
          color: #fff;
          font-size: 13px;
          outline: none;
          transition: all 0.3s ease;
        }

        .shop-footer-newsletter-input:focus {
          border-color: var(--accent-orange, #ff6b00);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 10px rgba(255,107,0,0.1);
        }

        .shop-footer-newsletter-btn {
          background: var(--accent-orange, #ff6b00);
          border: none;
          color: #000;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shop-footer-newsletter-btn:hover {
          background: #fff;
          box-shadow: 0 5px 15px rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        .shop-footer-newsletter-btn.subscribed {
          background: #00e676;
          color: #000;
        }

        .shop-footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          max-width: 1200px;
          margin: 0 auto 30px auto;
        }

        .shop-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .shop-footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        .shop-footer-legal-links {
          display: flex;
          gap: 24px;
        }
      `}</style>

      <footer className="shop-footer-container">
        <div className="shop-footer-grid">
          {/* Brand Column */}
          <div className="shop-footer-brand-col">
            <Link href="/" className="shop-footer-brand-logo">
              <i className="fa-solid fa-bolt"></i>
              NIKE<span>SHOW</span>
            </Link>
            <p className="shop-footer-brand-desc">
              Pushing boundaries of performance footwear. Discover, view, and acquire the latest technical releases engineered for elite comfort and speed.
            </p>
            <div className="shop-footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="shop-footer-social-btn" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="shop-footer-social-btn" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="shop-footer-social-btn" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="shop-footer-social-btn" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="shop-footer-title">Categories</h4>
            <ul className="shop-footer-links">
              <li><Link href="/shop" className="shop-footer-link">Running Sneakers</Link></li>
              <li><Link href="/shop" className="shop-footer-link">Racing Performance</Link></li>
              <li><Link href="/shop" className="shop-footer-link">Lifestyle / Streetwear</Link></li>
              <li><Link href="/shop" className="shop-footer-link">Training & Gym</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="shop-footer-title">Support</h4>
            <ul className="shop-footer-links">
              <li><a onClick={(e) => { e.preventDefault(); alert("Returns policy: 30 days hassle-free returns on all shoes."); }} className="shop-footer-link">Shipping & Returns</a></li>
              <li><Link href="/contact" className="shop-footer-link">Contact Support</Link></li>
              <li><a onClick={(e) => { e.preventDefault(); alert("FAQs: Orders dispatch within 24 hours."); }} className="shop-footer-link">Order Status</a></li>
              <li><Link href="/size-guide" className="shop-footer-link">Sizing Guides</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="shop-footer-newsletter-col">
            <h4 className="shop-footer-title">Stay Updated</h4>
            <p className="shop-footer-newsletter-desc">
              Subscribe to unlock premium access to limited edition drops, colorway restocks, and exclusive Nike member benefits.
            </p>
            <form onSubmit={handleSubmit} className="shop-footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="shop-footer-newsletter-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className={`shop-footer-newsletter-btn ${subscribed ? 'subscribed' : ''}`}
                disabled={subscribed}
              >
                {subscribed ? 'Subscribed!' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        <div className="shop-footer-divider" />

        <div className="shop-footer-bottom">
          <span>&copy; {new Date().getFullYear()} NikeShow. All rights reserved. Built for showcase purposes.</span>
          <div className="shop-footer-legal-links">
            <a onClick={(e) => { e.preventDefault(); alert("Privacy Policy: We do not resell your browsing data."); }} className="shop-footer-link">Privacy Policy</a>
            <a onClick={(e) => { e.preventDefault(); alert("Terms of Sale: All sales final for tester environment."); }} className="shop-footer-link">Terms of Sale</a>
          </div>
        </div>
      </footer>
    </>
  );
}
