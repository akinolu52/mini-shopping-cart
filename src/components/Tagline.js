
function Tagline() {
    return (
        <section className="md:px-24 p-10 md:pt-24 pt-10">
            <h1 className="md:text-6xl text-3xl mb-4 md:text-left text-center">All Products</h1>

            <div className="flex md:flex-row flex-col justify-between items-center mb-20">
                <h4 className="md:text-xl md:mb-0 mb-6 text-gray-400">A 360° look at Lumin</h4>
                <div className="relative bottom-0">
                    <select className="w-64 h-10 px-3 outline shadow-md appearance-none block bg-white text-black border border-gray">
                        <option>Filter by</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black rounded-full">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tagline;
