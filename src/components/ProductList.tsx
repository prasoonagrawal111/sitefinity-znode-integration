import React from 'react';

export type Product = {
  id: number;
  name: string;
  price: string;
  imageColor: string;
};

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <div
            className="product-image"
            style={{ backgroundColor: product.imageColor }}
            aria-hidden="true"
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{product.price}</p>
        </article>
      ))}
    </div>
  );
}

export default ProductList;