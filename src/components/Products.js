import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { useCartState, useCartDispatch } from '../cart-context';

const Product = React.lazy(() => import('./Product'));
const PRODUCTS = gql`
  query GetProducts {
    products {
        id,
        title,
        image_url,
        price(currency: USD)
    }
  }
`;


function Products({ setShowSidebar }) {
    const { loading, error, data } = useQuery(PRODUCTS);
    const dispatch = useCartDispatch();
    const { allProducts, selectedCurrency } = useCartState()

    if (loading) return <p className="text-center my-10">Loading...</p>;
    if (error) return <p className="text-center my-10 text-red-400">Error: {error.message}.</p>;

    if (!loading && !error && data?.products && allProducts.length === 0) {
        const allProducts = data.products;
        dispatch({ type: 'save-products', payload: allProducts });
    }

    return (
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-24 gap-12 md:px-48 md:px-10 px-5 mb-20 md:pt-40 pt-16 bg-gray-100">
            {allProducts?.map(product => (
                <Product
                    key={product.id}
                    product={product}
                    selectedCurrency={selectedCurrency}
                    setShowSidebar={setShowSidebar}
                />
            ))}
        </div>
    )

}

export default Products;
