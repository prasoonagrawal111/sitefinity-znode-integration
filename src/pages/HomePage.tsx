import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const router = {
    push: (path: string) => navigate(path)
  };
  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-content">
          <button
            type="button"
            className="logo-button"
            aria-label="Go to home page"
            onClick={goToHome}
          >
            <div className="logo" aria-label="site logo">HW</div>
          </button>
          <input
            className="search-field"
            type="text"
            placeholder="Search by Part # or Name"
            readOnly
          />
          <div className="cart-area" aria-label="cart icon">
            <span className="cart-icon" aria-hidden="true" />
            <span>Cart</span>
          </div>
        </div>
      </header>

      <nav className="menu-bar">
        <ul className="menu-list">
          <li className="menu-item">
            <button
              type="button"
              className="menu-button"
              onClick={() => router.push('/product')}
            >
              Departments
            </button>
          </li>
          <li className="menu-item">About</li>
          <li className="menu-item">Brands</li>
        </ul>
      </nav>

      <main className="page-content">
        <section className="hero-box">Sandbox Home</section>
      </main>
    </div>
  );
}

export default HomePage;