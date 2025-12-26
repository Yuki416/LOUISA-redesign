import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ShoppingCart, User, List, Coffee, Home, ChevronLeft, Flame, Snowflake, MapPin, Clock } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from './constants';
import { Category } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showHours, setShowHours] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;
      const openTime = 7 * 60 + 30; // 07:30
      const closeTime = 21 * 60; // 21:00
      
      setIsOpen(currentTime >= openTime && currentTime < closeTime);
    };
    
    checkStoreStatus();
    // Optional: Update status every minute to keep it accurate
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter products based on selected category
  const activeProducts = selectedCategory 
    ? MOCK_PRODUCTS.filter(p => p.categoryId === selectedCategory.id)
    : [];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
  };

  const toggleHours = () => {
    setShowHours(!showHours);
  };

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {selectedCategory ? (
            <button 
              onClick={handleBackToHome}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
             // Empty placeholder to balance the Search icon
             <div className="w-10"></div>
          )}
          
          <h1 className="text-lg font-bold text-gray-800">
             {selectedCategory ? selectedCategory.name : 'LOUISA COFFEE'}
          </h1>
          
          <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Search size={22} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="">
        
        {/* VIEW 1: HOME - Store Info + Categories */}
        {!selectedCategory && (
          <div className="animate-fade-in">
             {/* Store Information Section */}
             <div className="px-5 py-4 bg-white mb-2">
                <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-wide">路易莎 嘉義中山(圓環)店</h2>
                
                <div className="flex items-start flex-col gap-2">
                  {/* Status & Hours */}
                  <button 
                    onClick={toggleHours}
                    className="flex items-center text-sm text-gray-700 hover:bg-gray-50 rounded px-1 -ml-1 py-1 transition-colors"
                  >
                     <span className={`font-bold text-xs border px-1.5 py-0.5 rounded mr-2 ${
                       isOpen 
                         ? 'text-green-600 border-green-600 bg-green-50' 
                         : 'text-gray-500 border-gray-400 bg-gray-100'
                     }`}>
                       {isOpen ? '營業中' : '已歇業'}
                     </span>
                     <span className="mr-1">查看營業時間</span>
                     <ChevronDown size={14} className={`transform transition-transform ${showHours ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Expanded Hours Details */}
                  {showHours && (
                    <div className="w-full pl-2 text-sm text-gray-500 mb-2 animate-fade-in border-l-2 border-gray-100 ml-1">
                      <p>週一至週日: 07:30 - 21:00</p>
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex items-center text-sm text-gray-500 pl-1">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">3.3 公里 • 嘉義市西區中山路294號</span>
                  </div>
                </div>
             </div>

             {/* Category Grid Section */}
             <div className="px-4">
                <div className="bg-orange-500 text-white text-center py-2.5 rounded-t-lg font-bold text-lg flex items-center justify-center relative shadow-sm">
                    全部分類
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <List size={20} className="opacity-80"/>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2 pb-4">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className="relative overflow-hidden group rounded-lg shadow-sm border border-gray-100 transition-all active:scale-[0.98] h-28"
                    >
                      {/* Background Image */}
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay - Darkened slightly to make text readable */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      
                      {/* Text */}
                      <div className="relative z-10 flex items-center justify-center h-full">
                        <span className="text-white font-bold text-lg tracking-wide shadow-black/50 drop-shadow-md px-2 text-center">
                          {category.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT LIST (When a category is clicked) */}
        {selectedCategory && (
          <div className="space-y-4 px-4 animate-fade-in pt-4">
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <div key={product.id} className="flex items-start bg-white p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg">
                  {/* Product Image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover mr-4 shadow-sm shrink-0 bg-gray-100"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 py-1">
                    <h3 className="text-gray-900 font-bold text-lg">{product.name}</h3>
                    <div className="flex items-center mt-2 space-x-4">
                       {/* Price Tags */}
                       {product.tags?.includes('ice') && (
                         <div className="flex items-center text-blue-500 text-sm font-bold bg-blue-50 px-2 py-1 rounded-md">
                           <Snowflake size={14} className="mr-1" />
                           ${product.coldPrice}
                         </div>
                       )}
                       {product.tags?.includes('hot') && (
                         <div className="flex items-center text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-md">
                           <Flame size={14} className="mr-1" />
                           ${product.hotPrice || product.price}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="text-center py-20 text-gray-400">
                 <p>此分類暫無商品</p>
               </div>
            )}
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <button 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${!selectedCategory ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={handleBackToHome}
          >
            <Home size={24} strokeWidth={selectedCategory ? 2 : 2.5} />
            <span className="text-xs font-medium">首頁</span>
          </button>
          
          <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400">
             <div className="relative">
               <ShoppingCart size={24} />
               <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
             </div>
            <span className="text-xs font-medium">購物車</span>
          </button>
          
          <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400">
            <List size={24} />
            <span className="text-xs font-medium">訂單</span>
          </button>
          
          <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400">
            <User size={24} />
            <span className="text-xs font-medium">會員</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;