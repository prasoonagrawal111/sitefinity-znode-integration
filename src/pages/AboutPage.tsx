import React from 'react';
import Header from '../components/Header';

function AboutPage() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-content">
        <h1 className="section-title">About Us</h1>

        <section className="content-card">
          <p>
            Welcome to our store. We help shippers stay compliant and keep dangerous
            goods moving safely — from labels and placards to packaging, software, and
            training. This page is a placeholder for the React shell.
          </p>
          <p>
            For more than a few decades, teams like ours have focused on making
            regulatory compliance simpler so you can spend less time on paperwork and
            more time getting shipments out the door.
          </p>
        </section>

        <section className="content-card">
          <h2 className="content-heading">What we do</h2>
          <ul className="content-list">
            <li>Hazmat labels, markings, and placards that meet DOT, IATA, and IMDG rules.</li>
            <li>UN-certified packaging and supplies for shipping dangerous goods.</li>
            <li>Software and data services that keep your shipping documentation accurate.</li>
            <li>Training to help your team ship safely and stay audit-ready.</li>
          </ul>
        </section>

        <section className="content-card">
          <h2 className="content-heading">Get in touch</h2>
          <p>
            Questions about an order or a product? Reach out to our team — we're happy
            to help you find the right solution.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
