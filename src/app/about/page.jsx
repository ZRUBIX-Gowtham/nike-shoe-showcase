'use client';

import { useState } from 'react';
import Link from 'next/link';
import ShopHeader from '@/components/Header';
import ShopFooter from '@/components/Footer';
import '../shop/products.css';

export default function AboutPage() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="shop-body-wrapper">
      {/* Decorative Atmosphere Glow */}
      <div className="shop-glow-radial" />
      <div className="shop-glow-radial-2" />

      {/* Common Header */}
      <ShopHeader onWishlistClick={showToast} />

      <main className="shop-container" style={{ padding: '60px 4%' }}>
        {/* About Hero */}
        <section className="shop-hero" style={{ minHeight: 'auto', marginBottom: '80px' }}>
          <div className="shop-hero-content" style={{ maxWidth: '100%' }}>
            <span className="shop-hero-tag" style={{ color: 'var(--accent-orange)' }}>Our Story</span>
            <h1 className="shop-hero-title">
              <span>Pushing The Limits</span>
              <span>Of Performance <em>Science</em></span>
            </h1>
            <p className="shop-hero-desc" style={{ maxWidth: '700px' }}>
              NikeShow is a dedicated showcase of Nike's most technically advanced footwear. We explore the intersection of cutting-edge materials, biomechanics, and aesthetic innovation to bring athletes the future of speed and comfort today.
            </p>
          </div>
        </section>

        {/* Pillars Grid */}
        <section style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '28px', textTransform: 'uppercase', fontWeight: '800', marginBottom: '40px', color: '#fff' }}>
            Core Pillars
          </h2>
          <div className="shop-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="shop-card" style={{ padding: '40px', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,107,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-orange)' }}>
                <i className="fa-solid fa-microchip" style={{ fontSize: '20px' }}></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff' }}>Next-Gen Tech</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Integrating advanced physical structures like carbon fiber Flyplates and dual-pressure Dynamic Air tubes to transform impact energy into forward propulsion.
              </p>
            </div>

            <div className="shop-card" style={{ padding: '40px', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,42,95,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-crimson)' }}>
                <i className="fa-solid fa-gauge-high" style={{ fontSize: '20px' }}></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff' }}>Elite Speed</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Every contour is fine-tuned for aerodynamic efficiency. Our shoes are worn by world-record marathon runners and elite athletes seeking to shave seconds off their times.
              </p>
            </div>

            <div className="shop-card" style={{ padding: '40px', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,210,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d2ff' }}>
                <i className="fa-solid fa-feather-pointed" style={{ fontSize: '20px' }}></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff' }}>Ultralight Cushioning</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Utilizing proprietary compounds such as ReactX foam and ZoomX foam to achieve maximum energy return while maintaining virtually weightless support.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '28px', textTransform: 'uppercase', fontWeight: '800', marginBottom: '40px', color: '#fff' }}>
            Evolution of Innovation
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="shop-card" style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap', padding: '30px' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent-orange)' }}>1987</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>Visible Air Cushioning</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  The launch of the original Air Max 1 introduced visible pressurized air units inside the heel. For the first time, athletes could see the tech cushioning their strides.
                </p>
              </div>
            </div>

            <div className="shop-card" style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap', padding: '30px' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent-crimson)' }}>2017</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>The Carbon Flyplate Revolution</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  The Nike Vaporfly 4% took the world by storm, introducing a curved carbon-fiber plate embedded within soft ZoomX foam. This combination dramatically reduced oxygen expenditure during racing.
                </p>
              </div>
            </div>

            <div className="shop-card" style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap', padding: '30px' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#00d2ff' }}>2026</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>Dynamic Air (Air Max Dn)</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  Dynamic Air technology debuts, featuring dual-pressure tubes that allow air to flow dynamically in response to foot pressure, delivering a smooth transition and unprecedented springiness.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Common Footer */}
      <ShopFooter onNewsletterSubmit={showToast} />

      {/* Toast notifications container */}
      <div className="shop-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="shop-toast">
            <i className="fa-solid fa-circle-check"></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
