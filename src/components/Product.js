import { useCartDispatch } from '../cart-context'
import getSymbolFromCurrency from 'currency-symbol-map'

function Product({ product, selectedCurrency, setShowSidebar }) {
    const dispatch = useCartDispatch()
    const { title, image_url, price } = product;
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <img src={image_url} alt={title} className="w-48 h-32" />

            <h5 className="text-sm my-6 texxt-gray-700">{title}</h5>
            <h4 className="text-xs">
                {`From ${getSymbolFromCurrency(selectedCurrency)}${price}.00`}
            </h4>

            <button
                onClick={() => {
                    dispatch({ type: 'add', payload: product });
                    setShowSidebar(true);
                }}
                className="px-10 py-3 text-xs bg-black text-white mt-8">
                Add to Cart
            </button>
        </div>
    );
}

export default Product;
