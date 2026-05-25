'use client';

import { useState } from 'react';
import Link from 'next/link';
import ShopHeader from '@/components/Header';
import ShopFooter from '@/components/Footer';
import '../shop/products.css';

export default function ContactPage() {
  const [toasts, setToasts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Support',
    shoeModel: 'Nike Air Max Dn',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Message sent! Our support team will respond within 24 hours. ⚡');
      setFormData({
        name: '',
        email: '',
        subject: 'General Support',
        shoeModel: 'Nike Air Max Dn',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <div className="shop-body-wrapper">
      {/* Decorative Atmosphere Glow */}
      <div className="shop-glow-radial" />
      <div className="shop-glow-radial-2" />

      {/* Common Header */}
      <ShopHeader onWishlistClick={showToast} />

      <main className="shop-container" style={{ padding: '60px 4%' }}>
        
        {/* Contact Hero */}
        <section className="shop-hero" style={{ minHeight: 'auto', marginBottom: '60px' }}>
          <div className="shop-hero-content" style={{ maxWidth: '100%' }}>
            <span className="shop-hero-tag" style={{ color: 'var(--accent-orange)' }}>Support center</span>
            <h1 className="shop-hero-title">
              <span>Connect With Our Team</span>
              <span>We Are Here To <em>Help</em></span>
            </h1>
            <p className="shop-hero-desc" style={{ maxWidth: '700px' }}>
              Have questions regarding dynamic cushioning, size guides, custom orders, or delivery times? Send us a message and our Nike specialists will get back to you shortly.
            </p>
          </div>
        </section>

        {/* Form and info split */}
        <div className="shop-layout-split" style={{ alignItems: 'flex-start' }}>
          
          {/* Contact Form */}
          <section className="shop-card" style={{ flexGrow: 1, padding: '40px', background: 'var(--shop-bg-secondary)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', color: '#fff', marginBottom: '24px' }}>
              Send Inquiry
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--shop-border)', 
                      borderRadius: '12px', 
                      padding: '14px 16px', 
                      color: '#fff', 
                      fontSize: '14px', 
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--shop-border)', 
                      borderRadius: '12px', 
                      padding: '14px 16px', 
                      color: '#fff', 
                      fontSize: '14px', 
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Topic</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={{ 
                      background: 'var(--shop-bg-secondary)', 
                      border: '1px solid var(--shop-border)', 
                      borderRadius: '12px', 
                      padding: '14px 16px', 
                      color: '#fff', 
                      fontSize: '14px', 
                      fontFamily: 'inherit',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="General Support">General Support</option>
                    <option value="Sizing Sizing">Sizing Advice</option>
                    <option value="Shipping Delivery">Shipping & Delivery</option>
                    <option value="Shoe Customizations">Shoe Customizations</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Shoe of Interest</label>
                  <select 
                    name="shoeModel"
                    value={formData.shoeModel}
                    onChange={handleInputChange}
                    style={{ 
                      background: 'var(--shop-bg-secondary)', 
                      border: '1px solid var(--shop-border)', 
                      borderRadius: '12px', 
                      padding: '14px 16px', 
                      color: '#fff', 
                      fontSize: '14px', 
                      fontFamily: 'inherit',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Nike Air Max Dn">Nike Air Max Dn</option>
                    <option value="Nike Pegasus 41">Nike Pegasus 41</option>
                    <option value="Nike Vaporfly 3">Nike Vaporfly 3</option>
                    <option value="Other model">Other Model</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Message</label>
                <textarea 
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--shop-border)', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    color: '#fff', 
                    fontSize: '14px', 
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || submitted}
                style={{ 
                  background: submitted ? '#00e676' : 'var(--text-primary)', 
                  color: '#000', 
                  border: 'none', 
                  padding: '16px 0', 
                  borderRadius: '30px', 
                  fontWeight: '700', 
                  fontSize: '13px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease',
                  marginTop: '10px',
                  boxShadow: submitted ? '0 0 15px rgba(0, 230, 118, 0.4)' : 'none'
                }}
              >
                {isSubmitting ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : submitted ? (
                  <>
                    <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i> Message Sent!
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </form>
          </section>

          {/* Contact Details Cards */}
          <aside className="shop-sidebar" style={{ width: '320px', flexShrink: 0 }}>
            <div className="shop-card" style={{ padding: '30px', gap: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: '#fff' }}>
                Contact Info
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <i className="fa-regular fa-envelope" style={{ color: 'var(--accent-orange)', fontSize: '18px', marginTop: '2px' }}></i>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email</div>
                    <a href="mailto:support@nikeshow.com" style={{ color: '#fff', fontSize: '13px', textDecoration: 'none' }}>support@nikeshow.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--accent-crimson)', fontSize: '18px', marginTop: '2px' }}></i>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Phone</div>
                    <div style={{ color: '#fff', fontSize: '13px' }}>1-800-555-NIKE (6453)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-map-location-dot" style={{ color: '#00d2ff', fontSize: '18px', marginTop: '2px' }}></i>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Showcase Hub</div>
                    <div style={{ color: '#fff', fontSize: '13px', lineHeight: '1.4' }}>
                      Nike Bowerman Drive<br />
                      Beaverton, OR 97005
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shop-card" style={{ padding: '30px', gap: '12px', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <h5 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#fff' }}>Response Hours</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
                Our support team is active Monday through Friday, 8:00 AM - 6:00 PM PST. Emails received over the weekend will be answered first thing Monday morning.
              </p>
            </div>
          </aside>
        </div>
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
