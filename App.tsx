import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ShoppingCart, User, List, Coffee, Home, ChevronLeft, Flame, Snowflake, MapPin, Clock, Plus, Trash2, Receipt, CheckCircle, ShoppingBag } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from './constants';
import { Category, Product, CartItem, Order } from './types';

type Tab = 'home' | 'cart' | 'orders' | 'member';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showHours, setShowHours] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // State for Cart and Orders
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    // Mock initial history order
    {
      id: 'ORD-2023102501',
      date: '2023/10/25 08:30',
      total: 130,
      status: 'completed',
      items: [
        { ...MOCK_PRODUCTS[2], cartId: 'mock1', quantity: 1, selectedPrice: 55, type: 'hot' },
        { ...MOCK_PRODUCTS[0], cartId: 'mock2', quantity: 1, selectedPrice: 75, type: 'ice' }
      ]
    }
  ]);

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
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // -- Logic Handlers --

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    } else {
      setSelectedCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHours = () => {
    setShowHours(!showHours);
  };

  const addToCart = (product: Product, type: 'hot' | 'ice' | 'default' = 'default') => {
    const price = type === 'hot' && product.hotPrice ? product.hotPrice 
                : type === 'ice' && product.coldPrice ? product.coldPrice 
                : product.price;

    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity: 1,
      selectedPrice: price,
      type
    };

    setCart([...cart, newItem]);
    // Optional: Visual feedback could be added here
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}${Math.floor(Math.random()*100)}`,
      date: new Date().toLocaleString('zh-TW', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' }),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.selectedPrice, 0),
      status: 'processing'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setActiveTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.selectedPrice, 0);

  // -- Render Components --

  const renderHome = () => {
    const activeProducts = selectedCategory 
      ? MOCK_PRODUCTS.filter(p => p.categoryId === selectedCategory.id)
      : [];

    return (
      <>
        {/* VIEW 1: Categories */}
        {!selectedCategory && (
          <div className="animate-fade-in">
             {/* Store Information */}
             <div className="px-5 py-4 bg-white mb-2">
                <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-wide">路易莎 嘉義中山(圓環)店</h2>
                <div className="flex items-start flex-col gap-2">
                  <button onClick={toggleHours} className="flex items-center text-sm text-gray-700 hover:bg-gray-50 rounded px-1 -ml-1 py-1 transition-colors">
                     <span className={`font-bold text-xs border px-1.5 py-0.5 rounded mr-2 ${isOpen ? 'text-green-600 border-green-600 bg-green-50' : 'text-gray-500 border-gray-400 bg-gray-100'}`}>
                       {isOpen ? '營業中' : '已歇業'}
                     </span>
                     <span className="mr-1">查看營業時間</span>
                     <ChevronDown size={14} className={`transform transition-transform ${showHours ? 'rotate-180' : ''}`} />
                  </button>
                  {showHours && (
                    <div className="w-full pl-2 text-sm text-gray-500 mb-2 animate-fade-in border-l-2 border-gray-100 ml-1">
                      <p>週一至週日: 07:30 - 21:00</p>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500 pl-1">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">3.3 公里 • 嘉義市西區中山路294號</span>
                  </div>
                </div>
             </div>

             {/* Category Grid */}
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
                      <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="relative z-10 flex items-center justify-center h-full">
                        <span className="text-white font-bold text-lg tracking-wide shadow-black/50 drop-shadow-md px-2 text-center">{category.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* VIEW 2: Product List */}
        {selectedCategory && (
          <div className="space-y-4 px-4 animate-fade-in pt-4">
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <div key={product.id} className="flex items-start bg-white p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg relative group">
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover mr-4 shadow-sm shrink-0 bg-gray-100" />
                  <div className="flex-1 py-1 pr-8">
                    <h3 className="text-gray-900 font-bold text-lg">{product.name}</h3>
                    <div className="flex items-center mt-2 flex-wrap gap-2">
                       {product.tags?.includes('ice') && (
                         <button 
                           onClick={() => addToCart(product, 'ice')}
                           className="flex items-center text-blue-500 text-sm font-bold bg-blue-50 px-2 py-1 rounded-md active:bg-blue-100 transition-colors"
                         >
                           <Snowflake size={14} className="mr-1" /> ${product.coldPrice} <Plus size={14} className="ml-1 opacity-50"/>
                         </button>
                       )}
                       {product.tags?.includes('hot') && (
                         <button 
                           onClick={() => addToCart(product, 'hot')}
                           className="flex items-center text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-md active:bg-red-100 transition-colors"
                         >
                           <Flame size={14} className="mr-1" /> ${product.hotPrice || product.price} <Plus size={14} className="ml-1 opacity-50"/>
                         </button>
                       )}
                       {(!product.tags || (!product.tags.includes('ice') && !product.tags.includes('hot'))) && (
                          <button 
                            onClick={() => addToCart(product, 'default')}
                            className="flex items-center text-gray-700 text-sm font-bold bg-gray-100 px-2 py-1 rounded-md active:bg-gray-200 transition-colors"
                          >
                            ${product.price} <Plus size={14} className="ml-1 opacity-50"/>
                          </button>
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
      </>
    );
  };

  const renderCart = () => (
    <div className="px-4 py-6 animate-fade-in min-h-[60vh]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <ShoppingCart className="mr-3 text-orange-500" /> 購物車
      </h2>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-30" />
          <p className="text-lg">購物車是空的</p>
          <button onClick={handleBackToHome} className="mt-4 px-6 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">去逛逛</button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-24">
            {cart.map((item) => (
              <div key={item.cartId} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4 bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                     {item.type === 'hot' && <Flame size={12} className="text-red-500 mr-1" />}
                     {item.type === 'ice' && <Snowflake size={12} className="text-blue-500 mr-1" />}
                     <span>${item.selectedPrice}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
             <div className="flex justify-between items-center mb-4 text-gray-800">
               <span className="font-medium">總計 ({cart.length} 件)</span>
               <span className="text-2xl font-bold text-orange-600">${cartTotal}</span>
             </div>
             <button 
               onClick={handleCheckout}
               className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all flex items-center justify-center"
             >
               送出訂單
             </button>
          </div>
        </>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="px-4 py-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Receipt className="mr-3 text-orange-500" /> 歷史訂單
      </h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>尚無訂單記錄</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-2">
                   {order.status === 'processing' ? (
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   ) : (
                     <CheckCircle size={14} className="text-gray-400"/>
                   )}
                   <span className="font-bold text-gray-700 text-sm">{order.date}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${order.status === 'processing' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                  {order.status === 'processing' ? '製作中' : '已完成'}
                </span>
              </div>
              
              <div className="p-4">
                 <div className="space-y-2 mb-4">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex justify-between text-sm">
                       <span className="text-gray-600 flex items-center">
                         {item.type === 'hot' && <span className="text-red-500 mr-1 text-xs">[熱]</span>}
                         {item.type === 'ice' && <span className="text-blue-500 mr-1 text-xs">[冰]</span>}
                         {item.name} x {item.quantity}
                       </span>
                       <span className="font-medium text-gray-800">${item.selectedPrice}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">訂單編號: {order.id}</span>
                    <span className="text-lg font-bold text-gray-900">${order.total}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMember = () => (
    <div className="px-4 py-6 animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
        <User size={48} />
      </div>
      <h2 className="text-xl font-bold text-gray-800">歡迎回來，會員</h2>
      <p className="text-gray-500 mt-2">目前無新通知</p>
    </div>
  );

  // -- Main Layout --

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {(selectedCategory && activeTab === 'home') ? (
            <button onClick={handleBackToHome} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={24} />
            </button>
          ) : (
             <div className="w-10"></div>
          )}
          
          <h1 className="text-lg font-bold text-gray-800">
             {activeTab === 'home' 
               ? (selectedCategory ? selectedCategory.name : 'LOUISA COFFEE')
               : activeTab === 'cart' ? '購物清單'
               : activeTab === 'orders' ? '訂單記錄'
               : '會員中心'
             }
          </h1>
          
          <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Search size={22} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'cart' && renderCart()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'member' && renderMember()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 h-16">
        <div className="flex justify-around items-center h-full">
          <button 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={handleBackToHome} // Resets to home view
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">首頁</span>
          </button>
          
          <button 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'cart' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('cart')}
          >
             <div className="relative">
               <ShoppingCart size={24} strokeWidth={activeTab === 'cart' ? 2.5 : 2} />
               {cart.length > 0 && (
                 <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full font-bold px-1">
                   {cart.length}
                 </span>
               )}
             </div>
            <span className="text-[10px] font-medium">購物車</span>
          </button>
          
          <button 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'orders' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('orders')}
          >
            <List size={24} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">訂單</span>
          </button>
          
          <button 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'member' ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('member')}
          >
            <User size={24} strokeWidth={activeTab === 'member' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">會員</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;