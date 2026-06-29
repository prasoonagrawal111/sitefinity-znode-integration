import React from 'react';
import Header from '../components/Header';
import { departments } from '../services/storeSession';

const promos = [
  { title: 'Same-day shipping', text: 'On in-stock compliance supplies ordered before 3pm.' },
  { title: 'Regulatory updates', text: 'DOT, IATA, and IMDG changes tracked so you stay current.' },
  { title: 'Bulk & business pricing', text: 'Volume discounts and account tools for shipping teams.' },
];

function HomePage() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-content">
        <section className="hero-box">
          <div className="hero-inner">
            <h1 className="hero-title">Ship dangerous goods with confidence</h1>
            <p className="hero-subtitle">
              Labels, placards, packaging, software, and training — everything you need
              to stay compliant, in one place.
            </p>
            <a className="hero-cta" href="/store">
              Shop the store
            </a>
          </div>
        </section>

        <section>
          <h2 className="section-title">Shop by department</h2>
          <div className="dept-grid">
            {departments.slice(0, 10).map((dept) => (
              <a key={dept.href} className="dept-tile" href={dept.href}>
                {dept.label}
              </a>
            ))}
          </div>
        </section>

        <section className="promo-row">
          {promos.map((promo) => (
            <div key={promo.title} className="promo-card">
              <h3 className="promo-title">{promo.title}</h3>
              <p className="promo-text">{promo.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
