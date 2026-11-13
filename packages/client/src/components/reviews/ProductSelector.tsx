import { products, type ProductId } from './products';

type Props = {
   selectedProductId: ProductId;
   onSelect: (productId: ProductId) => void;
};

const ProductSelector = ({ selectedProductId, onSelect }: Props) => {
   return (
      <section className="mb-6">
         <div className="mb-3">
            <h2 className="text-lg font-bold tracking-tight">
               Select a product
            </h2>

            <p className="mt-1 text-sm text-slate-500">
               Choose a product to explore its customer reviews.
            </p>
         </div>

         <div className="flex flex-wrap gap-2">
            {products.map(({ id, name, Icon }) => {
               const isSelected = selectedProductId === id;

               return (
                  <button
                     key={id}
                     type="button"
                     onClick={() => onSelect(id)}
                     aria-pressed={isSelected}
                     className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                        isSelected
                           ? 'border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm'
                           : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                     }`}
                  >
                     {isSelected && (
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                     )}

                     <span>{name}</span>
                  </button>
               );
            })}
         </div>
      </section>
   );
};

export default ProductSelector;
