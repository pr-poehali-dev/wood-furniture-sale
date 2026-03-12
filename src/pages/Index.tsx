import { useState } from 'react';
import Icon from '@/components/ui/icon';

const BED_IMAGE = 'https://cdn.poehali.dev/projects/1eec6480-8d4b-43c2-9345-cdd2bc465662/files/a168f6e2-1b0a-4b9c-88bd-3c95545863cb.jpg';
const TABLE_IMAGE = 'https://cdn.poehali.dev/projects/1eec6480-8d4b-43c2-9345-cdd2bc465662/files/f2048c34-6d8f-4586-8fbc-ba6757aa8173.jpg';
const TV_IMAGE = 'https://cdn.poehali.dev/projects/1eec6480-8d4b-43c2-9345-cdd2bc465662/files/7ee370a7-dd6d-40e2-ad8f-8498f29fab81.jpg';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  material: string;
  description: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Кровать "Дубрава"', category: 'Кровати', price: 42000, image: BED_IMAGE, material: 'Дуб массив', description: 'Просторная кровать с мягким изголовьем, выполненная из массива дуба.' },
  { id: 2, name: 'Обеденный стол "Бор"', category: 'Столы', price: 28000, image: TABLE_IMAGE, material: 'Сосна, дуб', description: 'Вместительный стол для семейных ужинов, с естественной текстурой дерева.' },
  { id: 3, name: 'Тумба под ТВ "Ясень"', category: 'Тумбы', price: 15000, image: TV_IMAGE, material: 'Ясень массив', description: 'Лаконичная тумба с закрытыми отсеками для хранения техники.' },
  { id: 4, name: 'Диван "Кедр"', category: 'Диваны', price: 68000, image: BED_IMAGE, material: 'Кедр, лён', description: 'Мягкий диван на деревянном каркасе с натуральной обивкой.' },
  { id: 5, name: 'Журнальный столик "Ива"', category: 'Столы', price: 12000, image: TABLE_IMAGE, material: 'Берёза', description: 'Изящный столик с полкой, идеально вписывается в гостиную.' },
  { id: 6, name: 'Комод "Лиственница"', category: 'Тумбы', price: 22000, image: TV_IMAGE, material: 'Лиственница', description: 'Вместительный комод с четырьмя ящиками из сибирской лиственницы.' },
];

const PORTFOLIO = [
  { id: 1, title: 'Гостиная в скандинавском стиле', image: TABLE_IMAGE, year: '2024' },
  { id: 2, title: 'Спальня из дуба под заказ', image: BED_IMAGE, year: '2024' },
  { id: 3, title: 'Кухонный гарнитур "Берест"', image: TV_IMAGE, year: '2023' },
  { id: 4, title: 'Детская из берёзы', image: BED_IMAGE, year: '2023' },
  { id: 5, title: 'Рабочий кабинет для дома', image: TABLE_IMAGE, year: '2023' },
  { id: 6, title: 'Прихожая из массива сосны', image: TV_IMAGE, year: '2022' },
];

const CATEGORIES = ['Все', 'Кровати', 'Диваны', 'Столы', 'Тумбы'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const filteredProducts = activeCategory === 'Все'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setCartOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec]" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/95 backdrop-blur-sm border-b border-[#d4c4ae]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="text-[#1e1814] tracking-[0.3em] uppercase font-display font-light text-xl hover:opacity-70 transition-opacity">
            ДРЕВО
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {[['home', 'Главная'], ['catalog', 'Каталог'], ['portfolio', 'Портфолио'], ['contacts', 'Контакты']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm tracking-wide transition-colors font-body ${activeSection === id ? 'text-[#b07d3a]' : 'text-[#1e1814]/70 hover:text-[#1e1814]'}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative flex items-center gap-1 text-sm text-[#1e1814]/70 hover:text-[#b07d3a] transition-colors">
              <Icon name="Heart" size={18} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b07d3a] text-[#f7f3ec] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {favorites.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(!cartOpen)} className="relative flex items-center gap-2 bg-[#1e1814] text-[#f7f3ec] px-4 py-2 text-sm hover:bg-[#b07d3a] transition-colors">
              <Icon name="ShoppingBag" size={16} />
              {cartCount > 0 && <span className="font-body">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#f7f3ec] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[#d4c4ae]">
              <h3 className="font-display text-2xl text-[#1e1814]">Корзина</h3>
              <button onClick={() => setCartOpen(false)} className="text-[#1e1814]/50 hover:text-[#1e1814] transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#1e1814]/40 font-body">
                  <Icon name="ShoppingBag" size={40} />
                  <p className="mt-4">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3 items-center">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body text-[#1e1814] truncate">{product.name}</p>
                        <p className="text-xs text-[#1e1814]/50 font-body">{product.material}</p>
                        <p className="text-sm text-[#b07d3a] font-body mt-0.5">{(product.price * qty).toLocaleString()} ₽</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-body">
                        <span className="text-[#1e1814]/50">×{qty}</span>
                        <button onClick={() => removeFromCart(product.id)} className="text-[#1e1814]/30 hover:text-red-400 transition-colors">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#d4c4ae]">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-[#1e1814]/60">Итого:</span>
                  <span className="font-display text-2xl text-[#1e1814]">{cartTotal.toLocaleString()} ₽</span>
                </div>
                <button onClick={() => scrollTo('contacts')} className="w-full bg-[#1e1814] text-[#f7f3ec] py-3.5 text-sm tracking-widest uppercase font-body hover:bg-[#b07d3a] transition-colors">
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8dcc8] via-[#f7f3ec] to-[#f0e8d8]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
          <img src={BED_IMAGE} alt="Деревянная мебель" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ec] to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-xl">
            <p className="text-[#b07d3a] tracking-[0.4em] uppercase text-xs font-body mb-6 animate-fade-in-up opacity-0 delay-100">
              Мебель ручной работы
            </p>
            <h1 className="font-display text-6xl md:text-8xl text-[#1e1814] leading-[0.95] mb-6 animate-fade-in-up opacity-0 delay-200">
              Дерево<br /><em className="italic text-[#b07d3a]">живёт</em><br />в каждом<br />изделии
            </h1>
            <p className="font-body text-[#1e1814]/60 text-lg leading-relaxed mb-10 animate-fade-in-up opacity-0 delay-300 max-w-md">
              Создаём мебель из массива дерева — кровати, столы, диваны и тумбы. Каждое изделие изготавливается вручную по индивидуальным размерам.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-400">
              <button onClick={() => scrollTo('catalog')} className="bg-[#1e1814] text-[#f7f3ec] px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-[#b07d3a] transition-colors">
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo('contacts')} className="border border-[#1e1814] text-[#1e1814] px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-[#1e1814] hover:text-[#f7f3ec] transition-colors">
                Заказать
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-[#1e1814]/30" />
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-[#1e1814] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['TreePine', 'Массив дерева', 'Только натуральные материалы'],
              ['Ruler', 'Под заказ', 'Любые размеры и конфигурации'],
              ['Award', 'Гарантия 5 лет', 'На все изделия из каталога'],
              ['Truck', 'Доставка', 'По всей России'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <Icon name={icon} fallback="Circle" size={20} className="text-[#b07d3a] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#f7f3ec] text-sm font-body font-medium">{title}</p>
                  <p className="text-[#f7f3ec]/40 text-xs font-body mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#b07d3a] tracking-[0.4em] uppercase text-xs font-body mb-3">Наши работы</p>
              <h2 className="font-display text-5xl md:text-6xl text-[#1e1814]">Каталог</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-wide uppercase font-body border transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#1e1814] text-[#f7f3ec] border-[#1e1814]'
                      : 'border-[#d4c4ae] text-[#1e1814]/60 hover:border-[#1e1814] hover:text-[#1e1814]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-[#f0e8d8] overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-[#f7f3ec]/90 hover:bg-[#f7f3ec] transition-colors"
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={favorites.includes(product.id) ? 'text-[#b07d3a] fill-[#b07d3a]' : 'text-[#1e1814]/50'}
                    />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-[#1e1814] mb-1">{product.name}</h3>
                  <p className="text-xs text-[#b07d3a] font-body uppercase tracking-wider mb-2">{product.material}</p>
                  <p className="text-sm text-[#1e1814]/50 font-body leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-[#1e1814]">{product.price.toLocaleString()} ₽</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-[#1e1814] text-[#f7f3ec] px-4 py-2 text-xs tracking-wider uppercase font-body hover:bg-[#b07d3a] transition-colors"
                    >
                      <Icon name="ShoppingBag" size={13} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#ede4d3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#b07d3a] tracking-[0.4em] uppercase text-xs font-body mb-3">Наши проекты</p>
            <h2 className="font-display text-5xl md:text-6xl text-[#1e1814]">Портфолио</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PORTFOLIO.map((item) => (
              <div key={item.id} className="group relative overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1814]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-[#f7f3ec] font-display text-lg">{item.title}</p>
                    <p className="text-[#f7f3ec]/60 text-xs font-body">{item.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="font-display text-3xl text-[#1e1814] italic mb-2">"Мы создаём мебель, которая передаётся из поколения в поколение"</p>
            <p className="text-[#1e1814]/40 text-sm font-body">Мастерская ДРЕВО</p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#b07d3a] tracking-[0.4em] uppercase text-xs font-body mb-3">Напишите нам</p>
              <h2 className="font-display text-5xl md:text-6xl text-[#1e1814] mb-8">Контакты</h2>
              <div className="space-y-6">
                {[
                  ['Phone', '+7 (900) 000-00-00', 'Телефон и WhatsApp'],
                  ['Mail', 'info@drevo-furniture.ru', 'Электронная почта'],
                  ['MapPin', 'г. Москва, ул. Лесная, 12', 'Шоурум'],
                  ['Clock', 'Пн–Сб: 10:00–19:00', 'Время работы'],
                ].map(([icon, value, label]) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#d4c4ae] flex items-center justify-center shrink-0">
                      <Icon name={icon} fallback="Circle" size={16} className="text-[#b07d3a]" />
                    </div>
                    <div>
                      <p className="font-body text-[#1e1814] text-sm">{value}</p>
                      <p className="font-body text-[#1e1814]/40 text-xs mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {contactSent ? (
                <div className="bg-[#1e1814] p-12 text-center">
                  <Icon name="CheckCircle" size={40} className="text-[#b07d3a] mx-auto mb-4" />
                  <h3 className="font-display text-3xl text-[#f7f3ec] mb-2">Спасибо!</h3>
                  <p className="text-[#f7f3ec]/60 font-body text-sm">Мы свяжемся с вами в течение 30 минут в рабочее время.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1e1814]/50 font-body mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full border border-[#d4c4ae] bg-transparent px-4 py-3 text-sm font-body text-[#1e1814] placeholder-[#1e1814]/30 focus:outline-none focus:border-[#b07d3a] transition-colors"
                      placeholder="Иван Петров"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1e1814]/50 font-body mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-[#d4c4ae] bg-transparent px-4 py-3 text-sm font-body text-[#1e1814] placeholder-[#1e1814]/30 focus:outline-none focus:border-[#b07d3a] transition-colors"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1e1814]/50 font-body mb-1.5">Сообщение</label>
                    <textarea
                      value={contactForm.message}
                      onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full border border-[#d4c4ae] bg-transparent px-4 py-3 text-sm font-body text-[#1e1814] placeholder-[#1e1814]/30 focus:outline-none focus:border-[#b07d3a] transition-colors resize-none"
                      rows={4}
                      placeholder="Расскажите о вашем проекте или задайте вопрос..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#1e1814] text-[#f7f3ec] py-4 text-sm tracking-widest uppercase font-body hover:bg-[#b07d3a] transition-colors">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-[#1e1814]/30 font-body text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e1814] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[#f7f3ec]/90 tracking-[0.3em] uppercase font-display text-lg">ДРЕВО</span>
          <p className="text-[#f7f3ec]/30 text-xs font-body text-center">© 2024 Мастерская ДРЕВО. Деревянная мебель ручной работы.</p>
          <div className="flex gap-6">
            {[['home', 'Главная'], ['catalog', 'Каталог'], ['portfolio', 'Портфолио'], ['contacts', 'Контакты']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-[#f7f3ec]/40 text-xs font-body hover:text-[#b07d3a] transition-colors tracking-wide">
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;