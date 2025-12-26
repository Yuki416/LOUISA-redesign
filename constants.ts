import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'red', 
    name: '紅區(飲品)', 
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'green', 
    name: '綠區(甜點)', 
    image: 'https://i.imgur.com/5pyBWfc.jpeg' 
  },
  { 
    id: 'classic-coffee', 
    name: '經典義式咖啡', 
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'premium-coffee', 
    name: '精品咖啡', 
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'classic-tea', 
    name: '嚴選經典風味茶', 
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'other-drinks', 
    name: '其它風味飲品', 
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'world-tea', 
    name: '嚴選世界知名茶飲', 
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'uk-tea', 
    name: '英國百年茶莊', 
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'food', 
    name: '餐食', 
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'bagel', 
    name: '軟歐貝果', 
    image: 'https://i.imgur.com/9uHsMo3.jpeg' 
  },
  { 
    id: 'new-food', 
    name: '(新)精選餐食_限定', 
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'beef', 
    name: '燒牛專區', 
    image: 'https://i.imgur.com/aBWpSOO.jpeg' 
  },
  { 
    id: 'smoothie', 
    name: '冰沙', 
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'activity', 
    name: '活動專區', 
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'local-farm', 
    name: '嚴選在地小農牧場', 
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 'bags', 
    name: '購物用塑膠袋', 
    image: 'https://i.imgur.com/QKj9TZ9.png' 
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: '咖啡拿鐵', 
    categoryId: 'red', 
    price: 75, coldPrice: 75, hotPrice: 75, tags: ['ice', 'hot'],
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '2', 
    name: '卡布奇諾', 
    categoryId: 'red', 
    price: 75, coldPrice: 75, hotPrice: 75, tags: ['ice', 'hot'],
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '3', 
    name: '美式黑咖啡', 
    categoryId: 'red', 
    price: 55, coldPrice: 55, hotPrice: 55, tags: ['ice', 'hot'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '4', 
    name: '焦糖拿鐵', 
    categoryId: 'red', 
    price: 85, coldPrice: 85, hotPrice: 85, tags: ['ice', 'hot'],
    image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '5', 
    name: '榛果拿鐵', 
    categoryId: 'red', 
    price: 85, coldPrice: 85, hotPrice: 85, tags: ['ice', 'hot'],
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '6', 
    name: '莊園拿鐵', 
    categoryId: 'classic-coffee', 
    price: 95, tags: ['hot'],
    image: 'https://images.unsplash.com/photo-1585848524879-5165b91b5dc3?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: '7', 
    name: '錫蘭紅茶', 
    categoryId: 'classic-tea', 
    price: 40, tags: ['ice'],
    image: 'https://images.unsplash.com/photo-1564890369478-c5235089f6c8?q=80&w=300&auto=format&fit=crop'
  },
];