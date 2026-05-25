'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ShopHeader from '@/components/Header';
import ShopFooter from '@/components/Footer';
import '../shop/products.css';

const SIZE_CHART = [
  { eu: 38, usMen: 5.5, usWomen: 7, uk: 5, cm: 24.0 },
  { eu: 39, usMen: 6.5, usWomen: 8, uk: 6, cm: 24.5 },
  { eu: 40, usMen: 7.0, usWomen: 8.5, uk: 6, cm: 25.0 },
  { eu: 41, usMen: 8.0, usWomen: 9.5, uk: 7, cm: 26.0 },
  { eu: 42, usMen: 8.5, usWomen: 10, uk: 7.5, cm: 26.5 },
  { eu: 43, usMen: 9.5, usWomen: 11, uk: 8.5, cm: 27.5 },
  { eu: 44, usMen: 10.0, usWomen: 11.5, uk: 9, cm: 28.0 },
  { eu: 45, usMen: 11.0, usWomen: 12.5, uk: 10, cm: 29.0 },
  { eu: 46, usMen: 12.0, usWomen: 13.5, uk: 11, cm: 30.0 }
];

export default function SizeGuidePage() {
  const [toasts, setToasts] = useState([]);
  const [cmInput, setCmInput] = useState('');

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Calculator lookup
  const recommendedSize = useMemo(() => {
    const parsedCm = parseFloat(cmInput);
    if (isNaN(parsedCm) || parsedCm <= 0) return null;
    
    // Find the first size where the chart CM is >= entered CM
    const match = SIZE_CHART.find((row) => row.cm >= parsedCm);
    if (match) return match;
    
    // If entered cm is larger than the max row, default to max size
    if (parsedCm > SIZE_CHART[SIZE_CHART.length - 1].cm) {
      return SIZE_CHART[SIZE_CHART.length - 1];
    }
    return null;
  }, [cmInput]);

  return (
    <div className="shop-body-wrapper">
      {/* Decorative Atmosphere Glow */}
      <div className="shop-glow-radial" />
      <div className="shop-glow-radial-2" />

      {/* Common Header */}
      <ShopHeader onWishlistClick={showToast} />

      <main className="shop-container" style={{ padding: '60px 4%' }}>
        
        {/* Size Guide Hero */}
        <section className="shop-hero" style={{ minHeight: 'auto', marginBottom: '60px' }}>
          <div className="shop-hero-content" style={{ maxWidth: '100%' }}>
            <span className="shop-hero-tag" style={{ color: 'var(--accent-orange)' }}>Fit Assistance</span>
            <h1 className="shop-hero-title">
              <span>Find Your Exact Size</span>
              <span>For Maximum <em>Speed</em></span>
            </h1>
            <p className="shop-hero-desc" style={{ maxWidth: '700px' }}>
              Nike shoes are built for high performance. Using an optimal fit ensures you leverage full energy return, prevent slippage, and minimize stress on your joints. Use our interactive finder below to verify your size.
            </p>
          </div>
        </section>

        {/* Interactive Size Calculator */}
        <section className="shop-card" style={{ padding: '40px', marginBottom: '80px', background: 'var(--shop-bg-secondary)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-calculator" style={{ color: 'var(--accent-orange)' }}></i> Interactive Fit Finder
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
            Measure your foot length in centimeters and enter it below. We will instantly calculate your corresponding shoe sizes.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Heel-to-Toe Length (cm)</label>
              <input 
                type="number" 
                step="0.1" 
                min="20" 
                max="35"
                placeholder="e.g. 26.5" 
                value={cmInput}
                onChange={(e) => setCmInput(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--shop-border)', 
                  borderRadius: '12px', 
                  padding: '14px 20px', 
                  color: '#fff', 
                  fontSize: '16px', 
                  fontFamily: 'inherit',
                  outline: 'none',
                  width: '180px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-orange)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--shop-border)'}
              />
            </div>

            {recommendedSize ? (
              <div 
                className="shop-card" 
                style={{ 
                  flexGrow: 1, 
                  padding: '24px 30px', 
                  background: 'rgba(255, 107, 0, 0.05)', 
                  borderColor: 'rgba(255, 107, 0, 0.25)', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: '20px', 
                  alignItems: 'center',
                  animation: 'fadeInUp 0.3s ease'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '20px' }}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-orange)', marginBottom: '4px' }}>Recommended Size</h4>
                  <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>
                    EU {recommendedSize.eu} <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>(US Men {recommendedSize.usMen} / US Women {recommendedSize.usWomen} / UK {recommendedSize.uk})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                Enter foot length above to see matching sizing conversions.
              </div>
            )}
          </div>
        </section>

        {/* Sizing Table */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '24px', textTransform: 'uppercase', fontWeight: '800', marginBottom: '30px', color: '#fff' }}>
            Shoe Size Conversion Chart
          </h2>
          
          <div className="shop-size-guide-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="shop-size-guide-table">
              <thead>
                <tr>
                  <th>EU Size</th>
                  <th>US Men Size</th>
                  <th>US Women Size</th>
                  <th>UK Size</th>
                  <th>Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => {
                  const isHighlighted = recommendedSize && recommendedSize.eu === row.eu;
                  return (
                    <tr 
                      key={row.eu}
                      style={isHighlighted ? { background: 'rgba(255, 107, 0, 0.1)', color: 'var(--accent-orange)', fontWeight: 'bold' } : {}}
                    >
                      <td style={isHighlighted ? { color: 'var(--accent-orange)', fontWeight: '800' } : {}}>EU {row.eu}</td>
                      <td>{row.usMen}</td>
                      <td>{row.usWomen}</td>
                      <td>{row.uk}</td>
                      <td>{row.cm} cm</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips / How to measure */}
        <section className="shop-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '16px' }}>
              How to Measure
            </h3>
            <ol className="shop-size-guide-tips" style={{ paddingLeft: '0' }}>
              <li>Place a sheet of paper flat on the floor against a straight wall.</li>
              <li>Stand on the paper with your heel lightly touching the wall behind you.</li>
              <li>Mark the longest part of your foot (heel-to-toe length) on the paper using a pen.</li>
              <li>Measure the distance from the edge of the paper to your mark with a ruler in centimeters.</li>
              <li>Enter your measurements inside our Fit Finder tool above to identify your ideal size.</li>
            </ol>
          </div>
          <div className="shop-card" style={{ padding: '30px', gap: '16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-circle-info"></i> In-Between Sizes?
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              If your measurements fall between two sizes on our chart, we recommend ordering the **larger size** for standard running and lifestyle shoes to accommodate natural foot swelling during exercise. For racing shoes (like the Vaporfly), you may prefer a **snugger, true-to-size fit** for optimal energy transfer.
            </p>
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
