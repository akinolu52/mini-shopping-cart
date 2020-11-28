import { useCartState, useCartDispatch } from '../cart-context';
import getSymbolFromCurrency from 'currency-symbol-map'
import React from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const CURRENCIES = gql`
    query GetCurrencies {
        currency 
    }
`;

function List({ product, selectedCurrency }) {
    const dispatch = useCartDispatch()
    const { title, count, amount, image_url, id } = product;
    return (
        <div className="bg-white flex flex-col justify-between mt-6 p-8">
            <div className="flex justify-between items-center ">
                <div className="capitalize">
                    <p className="text-sm text-gray-800">{title}</p>
                </div>
                <button className="" onClick={() => dispatch({ type: 'remove', payload: id })}>&times;</button>
            </div>
            <div className="flex justify-between mt-6 items-center">
                <div className="flex items-center text-center border border-gray-600 h-8">
                    <button onClick={() => dispatch({ type: 'decrement', payload: id })} className="w-8">-</button>
                    <span className="w-10">{count}</span>
                    <button className="w-8" onClick={() => dispatch({ type: 'increment', payload: id })}>+</button>
                </div>
                <div>
                    <p className="text-sm text-gray-600">
                        {`${getSymbolFromCurrency(selectedCurrency)}${amount}.00`}
                    </p>
                </div>
                <div>
                    <img src={image_url} alt={title} className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

function Sidebar({ showSidebar, setShowSidebar }) {
    const { products, selectedCurrency } = useCartState()
    const [currency, setCurrency] = React.useState(null);
    const [changed, setChanged] = React.useState(false);
    const { data: currencies } = useQuery(CURRENCIES);
    const dispatch = useCartDispatch()

    const PRODUCTS = gql`
            query GetProducts {
                products {
                    id,
                    title,
                    image_url,
                    price(currency: ${currency})
                }
            }
        `;
    const [
        getCountries,
        { loading, error, data }
    ] = useLazyQuery(PRODUCTS);
    if (!loading && !error && data?.products && !changed) {
        setChanged(true);
        const allProducts = data.products;
        console.log('allProducts -> ', allProducts);
        dispatch({ type: 'save-products', payload: allProducts });
    }

    return (
        <div className={`fixed flex flex-col justify-between right-0 top-0 md:w-2/5 w-full p-8 h-full bg-gray-50 fixed ${!showSidebar ? 'hidden' : null}`}>
            <div>

                <div className="relative flex justify-center mb-2">
                    <div className="absolute left-0 bottom-1 cursor-pointer text-xs bg-white border px-2 py-1 rounded-full border-gray-600" onClick={() => setShowSidebar(false)}>{'<'}</div>
                    <h4 className="text-xs inline-block text-center text-gray-400">YOUR CART</h4>
                </div>

                {currencies?.currency ? (
                    <div>
                        <select onChange={async x => {
                            const selectedCurrency = x.target.value;
                            await setCurrency(selectedCurrency);
                            await getCountries();
                            await dispatch({
                                type: 'change-currency',
                                payload: selectedCurrency
                            });
                        }}>
                            {currencies.currency.map(currency => <option key={currency}>{currency}</option>)}
                        </select>
                    </div>
                ) : <></>}

                {products?.map(product => <List key={product.id} product={product} selectedCurrency={selectedCurrency} />)}
            </div>

            <div className="border-gray-400 border-t mt-4">
                <div className="my-3 flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Subtotal</span>
                    <span className="text-gray-700 text-sm">
                        {`${getSymbolFromCurrency(selectedCurrency)}`}
                        {products?.reduce((accum, item) => accum + item.amount, 0)}.00
                    </span>
                </div>

                <div className="flex justify-between mt-3 flex-col">
                    <button className="border-gray-500 border bg-white text-xs tracking-wider font-light py-2 h-12 mb-5">
                        MAKE THIS A SUBSCRIPTION (SAVE 20%)
                    </button>
                    <button className="bg-gray-700 text-white text-xs tracking-wider font-light py-2 h-12 ">
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Sidebar;
