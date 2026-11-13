import { useState } from 'react';

import ProductSelector from './ProductSelector';
import ReviewList from './ReviewList';
import { products, type ProductId } from './products';

const ReviewsPage = () => {
   const [selectedProductId, setSelectedProductId] = useState<ProductId>(
      products[0].id
   );

   const selectedProduct = products.find(
      (product) => product.id === selectedProductId
   );

   if (!selectedProduct) return null;

   return (
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
         <div className="mx-auto w-full max-w-6xl py-2">
            <ProductSelector
               selectedProductId={selectedProductId}
               onSelect={setSelectedProductId}
            />

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
               <h2 className="mb-5 text-xl font-bold tracking-tight">
                  {selectedProduct.name} Reviews
               </h2>

               <ReviewList
                  key={selectedProductId}
                  productId={selectedProductId}
               />
            </section>
         </div>
      </div>
   );
};

export default ReviewsPage;
