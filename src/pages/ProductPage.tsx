import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList, { Product } from '../components/ProductList';

const dummyProducts: Product[] = [
  { id: 1, name: 'Cordless Drill', price: '$129.00', imageColor: '#d8e6f5' },
  { id: 2, name: 'Safety Gloves', price: '$19.00', imageColor: '#f0ead9' },
  { id: 3, name: 'Garden Hose', price: '$42.00', imageColor: '#ddebd6' },
  { id: 4, name: 'Steel Hammer', price: '$28.00', imageColor: '#e7dff1' }
];

function ProductPage() {
  const navigate = useNavigate();
  const router = {
    push: (path: string) => navigate(path)
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-content">
          <button
            type="button"
            className="logo-button"
            aria-label="Go to home page"
            onClick={() => router.push('/')}
          >
            <div className="logo" aria-label="site logo">
              HW
            </div>
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
        <h1 className="section-title">Products</h1>
        <ProductList products={dummyProducts} />
      </main>
    </div>
  );
}

export default ProductPage;