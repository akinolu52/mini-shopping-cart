import * as React from 'react';

const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();

function find(products, id) {
    const foundIndex = products.findIndex(p => +p.id === +id);
    const product = products[foundIndex];

    return { product, foundIndex };
}

function remove(products, foundIndex) {
    products.splice(foundIndex, 1);
    return products;
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'save-products': {
            const allProducts = action.payload;
            const { selectedCurrency, products } = state;
            if (products) {
                // const _products = [...products]
                 products.map(product => {
                    product.amount = allProducts[product.id].price * product.count
                });
const _p = [...products]
                // update the values
                console.log('products -> ', products, _p);
                return { products: _p, selectedCurrency, allProducts };


            } else {
            return { products, selectedCurrency, allProducts };
                
            }
        }
        case 'increment': {
            /*
            * check for the index of the product
           `* increase product count by 1
           `*/
            const { products, selectedCurrency, allProducts } = state;
            console.log('selectedCurrency -> ',selectedCurrency);
            const id = action.payload;
            const { product, foundIndex } = find(products, id);

            const count = product.count + 1;
            const amount = count * product.price;
            const _product = {
                ...product,
                amount,
                count,
            };
            const _products = [...products]
            _products[foundIndex] = _product;
            return { products: _products, selectedCurrency, allProducts };
        }
        case 'decrement': {
            /*
            * check for the index of the product
           `* check if the product count is 1, if it's one - remove the product
           `* if product count is more than one, decrease it by 1
            */

            const { products, selectedCurrency, allProducts } = state;
            const id = action.payload;
            const { product, foundIndex } = find(products, id);

            const localProduct = {
                ...products[foundIndex]
            }

            if (localProduct.count === 1) {
                // remove from cart
                const _products = [...products];
                const _p = remove(_products, foundIndex);

                return { products: _p, selectedCurrency, allProducts }
            } else {
                const count = product.count - 1;
                const amount = count * product.price;

                const newProduct = {
                    ...product,
                    amount,
                    count
                };
                const _products = [...products]
                _products[foundIndex] = newProduct;

                return { products: _products, selectedCurrency, allProducts };
            }
        }
        case 'add': {
            /*
            * check if the product exist in the cart
           `* if it exist - increment
           `* if it does not exist & there's no product - create only it
            * if it does not exist & there's at least a product - increment it
            */
            const { products, selectedCurrency, allProducts } = state;
            let product = action.payload;
            const { foundIndex } = find(products, product.id);
            let updatedProducts;

            if (foundIndex !== -1) {
                const _product = products[foundIndex];
                const count = _product?.count + 1;
                const amount = count * _product.price;

                const newProduct = {
                    ..._product,
                    count,
                    amount
                };
                const _products = [...products]
                _products[foundIndex] = newProduct;

                return { products: _products, selectedCurrency, allProducts };
            } else {
                product = {
                    ...product,
                    count: 1,
                    amount: product.price
                }
                if (products?.length) {
                    updatedProducts = [...products, product];
                } else {
                    updatedProducts = [product];
                }
                return { products: updatedProducts, selectedCurrency, allProducts };

            }
        }
        case 'remove': {
            /*
            * check if the index of the product exist
           `* remove the index from the array
            */
            let { products, selectedCurrency, allProducts } = state;
            const id = action.payload;
            const { foundIndex } = find(products, id);

            if (foundIndex !== -1) {
                products = remove(products, foundIndex);
            }

            return { products, selectedCurrency, allProducts };
        }
        case 'change-currency': {
            console.log('payload', action.payload);
            const selectedCurrency = action.payload;

            const { products, allProducts } = state;

            return { products, selectedCurrency, allProducts };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function CartProvider({ children }) {
    const [state, dispatch] = React.useReducer(cartReducer, {
        products: [],
        allProducts: [],
        selectedCurrency: 'USD'
    });
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

function useCartState() {
    const context = React.useContext(CartStateContext);
    if (context === undefined) {
        throw new Error('useCartState must be used within a CartProvider')
    }
    return context
}

function useCartDispatch() {
    const context = React.useContext(CartDispatchContext);
    if (context === undefined) {
        throw new Error('useCartDispatch must be used within a CartProvider')
    }
    return context
}

export { CartStateContext, CartDispatchContext, CartProvider, useCartState, useCartDispatch }