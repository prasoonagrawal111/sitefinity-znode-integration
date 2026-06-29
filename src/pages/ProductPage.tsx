import React from 'react';
import Header from '../components/Header';
import ProductList, { Product } from '../components/ProductList';

const dummyProducts: Product[] = [
  { id: 1, name: 'Cordless Drill', price: '$129.00', imageColor: '#d8e6f5' },
  { id: 2, name: 'Safety Gloves', price: '$19.00', imageColor: '#f0ead9' },
  { id: 3, name: 'Garden Hose', price: '$42.00', imageColor: '#ddebd6' },
  { id: 4, name: 'Steel Hammer', price: '$28.00', imageColor: '#e7dff1' }
];

function ProductPage() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-content">
        <h1 className="section-title">Products</h1>
        <ProductList products={dummyProducts} />
      </main>
    </div>
  );
}

export default ProductPage;
