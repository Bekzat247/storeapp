const PRODUCTS_KEY = 'storeapp_products';
const ORDERS_KEY = 'storeapp_orders';

const defaultProducts = [
  { id: '1', name: 'Whole Milk 1L', category: 'Dairy', units: 24, price: 2.20, cost: 1.40, barcode: '4006381333932', emoji: '🥛' },
  { id: '2', name: 'White Bread', category: 'Bakery', units: 5, price: 1.80, cost: 0.90, barcode: '4000417025005', emoji: '🍞' },
  { id: '3', name: 'Orange Juice 1L', category: 'Drinks', units: 0, price: 3.50, cost: 2.10, barcode: '5449000131805', emoji: '🧃' },
  { id: '4', name: 'Shampoo 400ml', category: 'Hygiene', units: 12, price: 4.90, cost: 2.80, barcode: '8001090302984', emoji: '🧴' },
  { id: '5', name: 'Chocolate Bar', category: 'Snacks', units: 3, price: 1.20, cost: 0.60, barcode: '7622210100566', emoji: '🍫' },
  { id: '6', name: 'Eggs x10', category: 'Dairy', units: 18, price: 3.80, cost: 2.20, barcode: '4002515262987', emoji: '🥚' },
];

const defaultOrders = [
  { id: 'o1', product: 'Milk x2', time: '2 min ago', amount: 4.40, emoji: '🛍️' },
  { id: 'o2', product: 'Bread x1', time: '15 min ago', amount: 2.10, emoji: '📦' },
  { id: 'o3', product: 'Shampoo', time: '1 hr ago', amount: 8.90, emoji: '🧴' },
  { id: 'o4', product: 'Juice x3', time: '2 hr ago', amount: 6.30, emoji: '🧃' },
];

export const getProducts = () => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getOrders = () => {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders));
    return defaultOrders;
  }
  return JSON.parse(stored);
};

export const addOrder = (order) => {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 20)));
};

export const getStats = () => {
  const products = getProducts();
  const lowStock = products.filter(p => p.units > 0 && p.units <= 5).length;
  const outOfStock = products.filter(p => p.units === 0).length;
  return {
    todaySales: 1240,
    orders: 48,
    lowStock,
    totalProducts: products.length,
    outOfStock,
  };
};
