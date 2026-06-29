import React from 'react';
import Header from '../components/Header';

function HomePage() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-content">
        <section className="hero-box">Sandbox Home</section>
      </main>
    </div>
  );
}

export default HomePage;
