import React, { Suspense } from 'react';
import { CartProvider } from './cart-context';

const Header = React.lazy(() => import('./components/Header'));
const Tagline = React.lazy(() => import('./components/Tagline'));
const Products = React.lazy(() => import('./components/Products'));
const Sidebar = React.lazy(() => import('./components/Sidebar'));

function App() {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartProvider>
        <div className="relative">
          <Header />
          <Tagline />
          <Products
            setShowSidebar={setShowSidebar}
            // addToCart={addToCart}
          />
          <Sidebar
            // products={products}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar} />
        </div>
      </CartProvider>

    </Suspense>
  );
}

export default App;
