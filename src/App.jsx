import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  BadgeCheck,
  BadgePercent,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Menu,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Truck,
  User,
  Users,
  X
} from 'lucide-react'
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { collections, products, whatsappNumber } from './data/products.js'

const farmHero = '/hero/organic-products-hero.png'
const ayurvedaImage =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80'
const founderImage =
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1400&q=80'
const farmCareImage = '/story/farm-care.jpeg'
const herbsImage = '/story/ayurvedic-herbs.jpeg'
const gheeServingImage = '/story/ghee-serving.jpeg'

const promiseItems = [
  'Ethically raised Desi cows',
  'Traditional Bilona method',
  'Pure A2 milk and ghee',
  'Ayurvedic principles in every product',
  'Crafted with patience, care, and devotion'
]

const journeySteps = [
  ['01', 'Natural farms', 'Ingredients are selected from clean farms where soil health, seasonal rhythm, and careful handling matter.'],
  ['02', 'Ethical sourcing', 'We work with people who understand traditional food, Desi cow care, and patient production.'],
  ['03', 'Traditional processing', 'Bilona churning, small-batch packing, and low-intervention methods help preserve natural character.'],
  ['04', 'Home delivery', 'Every order is confirmed personally on WhatsApp, so families know exactly what they are receiving.']
]

const knowledgePosts = [
  ['Why Bilona Ghee Feels Different', 'A short guide to the churning method, aroma, texture, and sattvic value of traditional ghee.'],
  ['Ayurveda in a Modern Kitchen', 'Simple ways to bring herbs, ghee, grains, and seasonal eating into everyday routines.'],
  ['Reading an Honest Ingredient Label', 'What to look for when choosing natural products with no preservatives or shortcuts.']
]

const seasonalCollections = [
  ['Monsoon Digestion', 'Triphala, warm ghee meals, and gentle herbal rituals for slower days.', herbsImage],
  ['Family Pantry Staples', 'Rice, wheat, and pure ghee for everyday Indian cooking.', '/products/premium-rice.png'],
  ['Ritual & Natural Living', 'Cow dung cakes and sattvic essentials for traditional home practices.', '/products/cow-dung-cakes.png']
]

function whatsappUrl(productName) {
  const text = productName
    ? `Hello Arogya Organic, I would like to buy ${productName}`
    : 'Hello Arogya Organic, I would like to know more about your organic products'

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

function whatsappCartUrl(items) {
  const orderLines = items.map(({ product, quantity }) => `• ${productOrderName(product)} × ${quantity}`).join('\n')
  const total = items.reduce((sum, { product, quantity }) => sum + priceValue(product.price) * quantity, 0)
  const text = `Hello Arogya Organic, I would like to order:\n${orderLines}\n\nTotal: ${formatPrice(total)}`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

function priceValue(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0
}

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function productCartId(product) {
  return product.cartId || product.slug
}

function productOrderName(product) {
  return product.packSize ? `${product.name} (${product.packSize})` : product.name
}

function productWithVariant(product, variant) {
  if (!variant) return product

  return {
    ...product,
    cartId: `${product.slug}-${variant.id}`,
    packSize: variant.packSize,
    price: variant.price,
    mrp: variant.mrp
  }
}

function discountPercent(product) {
  if (!product?.mrp) return 0
  const mrp = priceValue(product.mrp)
  const price = priceValue(product.price)
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
}

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const addProduct = (product) => {
    setItems((current) => {
      const id = productCartId(product)
      const existing = current.find((item) => productCartId(item.product) === id)
      if (existing) {
        return current.map((item) =>
          productCartId(item.product) === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeProduct = (id) => {
    setItems((current) => current.filter((item) => productCartId(item.product) !== id))
  }

  const decreaseProduct = (id) => {
    setItems((current) =>
      current
        .map((item) =>
          productCartId(item.product) === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const count = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, open, setOpen, addProduct, decreaseProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  return useContext(CartContext)
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      className="whatsapp-icon"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.84 9.84 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.44 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.81c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

function ButtonLink({ to, children, variant = 'primary', external = false }) {
  const className = `btn btn-${variant}`
  if (external) {
    return (
      <a className={className} href={to} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { count, setOpen: setCartOpen } = useCart()

  const closeMenus = () => {
    setOpen(false)
    setMoreOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const closeOnResize = () => {
      if (window.innerWidth >= 900) setOpen(false)
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [open])

  const navItems = [
    ['HOME', '/'],
    ['SHOP', '/shop'],
    ['OUR PROCESS', '/the-farm'],
    ['AYURVEDA', '/ayurveda']
  ]

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenus}>
          <img src="/brand/arogya-logo.png" alt="" />
          <span>Arogya Organic</span>
        </Link>

        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={closeMenus}>
              {label}
            </NavLink>
          ))}
          <div className="more-menu">
            <button type="button" onClick={() => setMoreOpen((value) => !value)}>
              MORE <ChevronDown size={14} />
            </button>
            <div className={`more-panel ${moreOpen ? 'show' : ''}`}>
              <Link to="/about" onClick={closeMenus}>
                About Us
              </Link>
              <Link to="/contact" onClick={closeMenus}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-icons" aria-label="Utility links">
          <Link to="/shop" aria-label="Search products">
            <Search size={18} />
          </Link>
          <button className="cart-nav-button" type="button" aria-label={`Shopping bag with ${count} ${count === 1 ? 'item' : 'items'}`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={18} />
            {count > 0 && <span>{count}</span>}
          </button>
          <Link to="/contact" aria-label="Account">
            <User size={18} />
          </Link>
          <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function CollectionCard({ collection }) {
  return (
    <article className="collection-card fade-in" data-aos="fade-up">
      <img src={collection.image} alt={collection.title} />
      <div>
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <Link to={collection.link}>Explore</Link>
      </div>
    </article>
  )
}

function ProductCard({ product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id || '')
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId)
  const selectedProduct = productWithVariant(product, selectedVariant)
  const rating = product.rating ?? '4.9'
  const reviews = product.reviews ?? '20'
  const discount = discountPercent(selectedProduct)
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const [addAnimationKey, setAddAnimationKey] = useState(0)
  const addedTimeout = useRef(null)
  const { addProduct } = useCart()

  useEffect(() => {
    return () => {
      if (addedTimeout.current) {
        clearTimeout(addedTimeout.current)
      }
    }
  }, [])

  const handleAddToCart = () => {
    addProduct(selectedProduct)
    setAdded(true)
    setAddAnimationKey((value) => value + 1)

    if (addedTimeout.current) {
      clearTimeout(addedTimeout.current)
    }

    addedTimeout.current = setTimeout(() => {
      setAdded(false)
    }, 1200)
  }

  return (
    <article className={`product-card product-card-${product.slug} fade-in`} data-aos="fade-up">
      <div className="product-media">
        <span className="product-glow" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wish-button ${saved ? 'saved' : ''}`}
          type="button"
          aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`}
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      <div className="product-card-body">
        <div className="rating-row" aria-label={`${rating} star rating`}>
          <span>
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={13} fill="currentColor" />
            ))}
          </span>
          <em>{rating} ({reviews})</em>
        </div>

        <Link to={`/shop/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>

        {product.variants ? (
          <div className="pack-selector" aria-label={`Choose pack size for ${product.name}`}>
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                className={variant.id === selectedVariantId ? 'active' : ''}
                onClick={() => setSelectedVariantId(variant.id)}
              >
                {variant.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="pack-size">{product.packSize}</span>
        )}

        <div className="product-price-row">
          <strong className="product-price">{selectedProduct.price}</strong>
          {selectedProduct.mrp && <span className="product-mrp">{selectedProduct.mrp}</span>}
          {discount > 0 && (
            <span className="discount-pill" aria-label={`Save ${discount} percent`}>
              <BadgePercent size={13} /> Save {discount}%
            </span>
          )}
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className={`quick-add-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-live="polite"
          >
            <ShoppingBag size={16} /> {added ? 'Added' : 'Add to Cart'}
            {added && (
              <span key={addAnimationKey} className="cart-add-burst" aria-hidden="true">
                Added
              </span>
            )}
          </button>
          <a
            className="whatsapp-order-btn"
            href={whatsappUrl(productOrderName(selectedProduct))}
            target="_blank"
            rel="noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function AnimatedStat({ value, suffix = '', label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const end = Number(value)
    if (!Number.isFinite(end)) return

    let frame = 0
    const totalFrames = 46
    const timer = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / totalFrames, 1)
      setCount(Math.round(end * (1 - Math.pow(1 - progress, 3))))
      if (progress === 1) window.clearInterval(timer)
    }, 24)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <div className="stat-card" data-aos="fade-up">
      <strong>
        {count.toLocaleString('en-IN')}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

function HeroStat({ value, suffix = '', label, plain = false }) {
  if (plain) {
    return (
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    )
  }

  return (
    <div>
      <AnimatedStat value={value} suffix={suffix} label={label} />
    </div>
  )
}

function FAQ({ items }) {
  return (
    <div className="faq-list">
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  )
}

const customerReviews = [
  ['Their ghee has become a staple at home. The aroma feels exactly like the ghee my grandmother made.', 'Rohit M.'],
  ['The texture is beautifully grainy and the WhatsApp ordering process was simple and personal.', 'Ananya R.'],
  ['Honest products, careful packaging, and quick support. A very reassuring experience.', 'Meera S.']
]

function ReviewsCarousel() {
  const [active, setActive] = useState(0)
  const [quote, name] = customerReviews[active]

  const showPrevious = () => setActive((active - 1 + customerReviews.length) % customerReviews.length)
  const showNext = () => setActive((active + 1) % customerReviews.length)

  return (
    <section className="section reviews-carousel-section" aria-labelledby="reviews-title">
      <div className="container reviews-carousel">
        <div>
          <p className="eyebrow">Customer Reviews</p>
          <h2 id="reviews-title">Trusted in everyday kitchens</h2>
        </div>
        <article aria-live="polite">
          <div className="stars" aria-label="Five star review">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
          <blockquote>“{quote}”</blockquote>
          <strong>{name}</strong>
          <div className="review-controls">
            <button type="button" onClick={showPrevious} aria-label="Previous review">
              <ChevronLeft size={20} />
            </button>
            <span>{active + 1} / {customerReviews.length}</span>
            <button type="button" onClick={showNext} aria-label="Next review">
              <ChevronRight size={20} />
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

const trustBadges = [
  {
    icon: ShieldCheck,
    title: 'FSSAI Certified',
    subtitle: 'Licensed & compliant',
  },
  {
    icon: Leaf,
    title: 'No Chemicals',
    subtitle: '100% natural ingredients',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    subtitle: 'On all orders pan-India',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: 'Hassle-free policy',
  },
]

function TrustBadgeStrip() {
  return (
    <section className="trust-badge-strip" aria-label="Trust signals">
      <div className="container trust-badge-grid">
        {trustBadges.map(({ icon: Icon, title, subtitle }) => (
          <div className="trust-badge-item" key={title}>
            <span className="trust-badge-icon" aria-hidden="true">
              <Icon size={26} strokeWidth={1.75} />
            </span>
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function WheatStem({ size = 34 }) {
  return (
    <svg className="wheat-stem" aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5v30" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M19 12c-5-3-7-6-6-9 5 1 7 4 6 9Zm2 0c5-3 7-6 6-9-5 1-7 4-6 9ZM19 20c-5-3-7-6-6-9 5 1 7 4 6 9Zm2 0c5-3 7-6 6-9-5 1-7 4-6 9ZM19 28c-5-3-7-6-6-9 5 1 7 4 6 9Zm2 0c5-3 7-6 6-9-5 1-7 4-6 9Z" fill="currentColor" />
    </svg>
  )
}

function HeroFloatingElements() {
  return (
    <div className="hero-floating-elements" aria-hidden="true">
      {[...Array(5)].map((_, index) => (
        <span key={`leaf-${index}`} className={`hero-float hero-float-leaf hero-leaf-${index + 1}`}>
          <Leaf size={18 + (index % 3) * 5} />
        </span>
      ))}
      {[...Array(3)].map((_, index) => (
        <span key={`wheat-${index}`} className={`hero-float hero-float-wheat hero-wheat-${index + 1}`}>
          <WheatStem size={30 + index * 4} />
        </span>
      ))}
      {[...Array(5)].map((_, index) => (
        <span key={`seed-${index}`} className={`hero-float hero-float-seed hero-seed-${index + 1}`} />
      ))}
      {[...Array(5)].map((_, index) => (
        <span key={`circle-${index}`} className={`hero-float hero-float-circle hero-circle-${index + 1}`} />
      ))}
    </div>
  )
}

function Home() {
  useEffect(() => {
    const updateHeroParallax = () => {
      const hero = document.querySelector('.hero')
      if (!hero) return
      const distance = Math.min(window.scrollY * 0.18, 90)
      hero.style.setProperty('--hero-parallax', `${distance}px`)
    }

    updateHeroParallax()
    window.addEventListener('scroll', updateHeroParallax, { passive: true })
    return () => window.removeEventListener('scroll', updateHeroParallax)
  }, [])

  return (
    <main className="page home-page">
      <section className="hero">
        <img className="hero-bg" src={farmHero} alt="Warm sunlight over organic farm fields" />
        <div className="hero-overlay" />
        <HeroFloatingElements />
        <div className="container hero-content">
          <p className="eyebrow hero-tagline">From Indian soil, with care</p>
          <h1 className="word-reveal" aria-label="Pure Organic Goodness for Your Family">
            {['Pure', 'Organic', 'Goodness', 'for', 'Your', 'Family'].map((word, index) => (
              <span
                key={word}
                className={word === 'Goodness' ? 'highlight-word' : undefined}
                style={{ '--word-delay': `${0.32 + index * 0.13}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-subtext">Farm fresh, chemical-free, natural products delivered with trust.</p>
          <div className="hero-actions">
            <ButtonLink to="/shop">
              <Sparkles size={17} /> Shop Ayurvedic Products
            </ButtonLink>
            <ButtonLink to={whatsappUrl()} variant="whatsapp" external>
              <WhatsAppIcon size={18} /> WhatsApp Order
            </ButtonLink>
          </div>
          <div className="hero-trust-badges" aria-label="Arogya Organic trust badges">
            {['100% A2 Desi Cow Milk', 'Traditional Bilona Method', 'No Chemicals'].map((badge) => (
              <span key={badge}>
                <BadgeCheck size={16} /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-stat-strip" aria-label="Arogya Organic impact">
        <div className="container hero-stat-grid">
          <HeroStat value="500" suffix="+" label="Farmers" />
          <HeroStat value="10000" suffix="+" label="Families" />
          <HeroStat value="100" suffix="%" label="Organic" />
          <HeroStat value="Est. 2020" label="Since" plain />
        </div>
      </section>

      <TrustBadgeStrip />

      <section className="section section-tight">
        <div className="container">
          <div className="collection-grid">
            {collections.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-aos="fade-up">
        <SectionIntro eyebrow="Farm to Home" title="A transparent journey from soil to your kitchen">
          Every product follows a careful path designed around trust, traditional methods, and personal ordering.
        </SectionIntro>
        <div className="container journey-grid">
          {journeySteps.map(([number, title, body]) => (
            <article key={title} className="journey-step" data-aos="fade-up">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          <AnimatedStat value="500" suffix="+" label="Partner farmers" />
          <AnimatedStat value="10000" suffix="+" label="Happy families" />
          <AnimatedStat value="100" suffix="%" label="Organic promise" />
        </div>
      </section>

      <ReviewsCarousel />

      <section className="section oat-band" data-aos="fade-up">
        <SectionIntro eyebrow="Ayurveda Knowledge" title="Learn before you buy">
          Gentle guides for families who want to understand ingredients, rituals, and traditional processing.
        </SectionIntro>
        <div className="container knowledge-grid">
          {knowledgePosts.map(([title, body]) => (
            <article key={title} className="knowledge-card" data-aos="fade-up">
              <BookOpen size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
              <Link to="/ayurveda">Read guide</Link>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

function SplitSection({ image, eyebrow, title, body, link, linkText, reverse = false }) {
  return (
    <section className="section">
      <div className={`container split ${reverse ? 'reverse' : ''}`}>
        <div className="split-image">
          <img src={image} alt={title} />
        </div>
        <div className="split-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
          <Link to={link}>{linkText}</Link>
        </div>
      </div>
    </section>
  )
}

function StoryFeature({ image, eyebrow, title, body, points = [], reverse = false }) {
  return (
    <section className="story-feature">
      <div className={`container story-feature-grid ${reverse ? 'reverse' : ''}`}>
        <div className="story-feature-image">
          <img src={image} alt={title} />
        </div>
        <div className="story-feature-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
          {points.length > 0 && (
            <ul>
              {points.map((point) => (
                <li key={point}>
                  <BadgeCheck size={18} /> {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function Shop() {
  const [activeCategory, setActiveCategory] = useState('All Products')
  const shopBenefits = [
    [ShieldCheck, 'Quality checked batches'],
    [Truck, 'Delivery coordinated on WhatsApp'],
    [PackageCheck, 'Premium packed products']
  ]
  const categoryChips = ['All Products', 'Ghee', 'Grains', 'Ayurveda', 'Natural Living']
  const categoryFilters = {
    Ghee: ['Traditional Dairy'],
    Grains: ['Farm Staples'],
    Ayurveda: ['Ayurvedic Wellness'],
    'Natural Living': ['Natural Living']
  }
  const visibleProducts =
    activeCategory === 'All Products'
      ? products
      : products.filter((product) => categoryFilters[activeCategory]?.includes(product.category))

  return (
    <main className="page">
      <section className="shop-benefit-strip">
        <div className="container shop-benefits">
          {shopBenefits.map(([Icon, label]) => (
            <div key={label}>
              <Icon size={19} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tight product-showcase-section">
        <div className="container">
          <div className="shop-toolbar">
            <div>
              <p className="eyebrow">Curated Catalogue</p>
              <h2>Choose your organic essentials</h2>
            </div>
            <div className="category-pills" role="tablist" aria-label="Product categories">
              {categoryChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className={chip === activeCategory ? 'active' : ''}
                  role="tab"
                  aria-selected={chip === activeCategory}
                  onClick={() => setActiveCategory(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="shop-coming-soon-banner" aria-label="New products coming soon" data-aos="fade-up">
        <div className="container">
          <img src="/banners/new-products-coming-soon.png" alt="Arogya Organic new products coming soon" />
        </div>
      </section>
    </main>
  )
}

const gheeHistory = [
  {
    date: '3000 BCE',
    title: 'Rigvedic Origins',
    body: "The Rigveda, humanity's oldest scripture, first mentions ghee as 'the first and most essential of all foods.' It was offered to Agni (fire god) in sacred yagnas and believed to carry prayers to the heavens. The verse 'Ghritam duhanam' describes it as 'milk of the divine cow.'",
    source: 'ऋग्वेद · Rigveda'
  },
  {
    date: '1500 BCE',
    title: 'Charaka Samhita',
    body: "The foundational text of Ayurveda declares ghee as 'the best of all fats.' Acharya Charaka documented 108 uses of ghee—from treating wounds to enhancing intelligence. He wrote that ghee 'improves memory, intellect, power of digestion, and gives clarity to the mind.'",
    source: 'चरक संहिता'
  },
  {
    date: '1000 BCE',
    title: "Sushruta's Surgical Applications",
    body: 'Acharya Sushruta, the father of surgery, used ghee-based formulations for wound healing and post-operative care. His text describes medicated ghee (Ghrita) preparations that combine ghee with herbs for targeted healing.',
    source: 'सुश्रुत संहिता'
  },
  {
    date: '500 BCE',
    title: 'Buddhist & Jain Traditions',
    body: 'As Buddhism and Jainism spread, ghee became a symbol of non-violence—nourishment obtained without harming the cow. Monks carried ghee lamps as symbols of enlightenment, and ghee was considered sattvic (pure) food for spiritual practitioners.',
    source: 'Buddhist Pali Canon'
  },
  {
    date: '500 CE',
    title: 'Ashtanga Hridaya',
    body: "Vagbhata's masterwork systematized ghee's Ayurvedic applications. He classified ghee as 'Tridosha Shamaka'—the rare substance that balances all three doshas. His protocols for aged ghee (Purana Ghrita) are still followed by Ayurvedic physicians today.",
    source: 'अष्टांग हृदय'
  },
  {
    date: 'Present',
    title: 'Modern Science Validates',
    body: '21st-century research explores what sages described millennia ago. A2 ghee contains naturally occurring fatty acids, including omega-3, omega-9, and conjugated linoleic acid (CLA). Its high smoke point also makes it well suited to many traditional cooking methods.',
    source: 'Modern Research'
  }
]

function GheeHistoryTimeline() {
  return (
    <section className="ghee-history" aria-labelledby="ghee-history-title">
      <div className="container ghee-history-header">
        <p className="eyebrow">A Living Tradition</p>
        <h2 id="ghee-history-title">5,000 Years of Sacred Knowledge</h2>
        <p>
          From Vedic altars to modern laboratories, trace ghee&apos;s remarkable journey through
          human history.
        </p>
      </div>

      <div className="container ghee-history-list">
        {gheeHistory.map((entry, index) => (
          <article className="ghee-history-entry" key={entry.date} data-aos="fade-up">
            <time>{entry.date}</time>
            <span className="ghee-history-marker" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="ghee-history-card">
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <cite>— {entry.source}</cite>
            </div>
          </article>
        ))}
      </div>

      <p className="container ghee-history-note">
        Historical and wellness information is shared for education and is not medical advice.
      </p>
    </section>
  )
}

function ProductDetails() {
  const { slug } = useParams()
  const { addProduct } = useCart()
  const product = products.find((item) => item.slug === slug)
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id || '')
  const selectedVariant = product?.variants?.find((variant) => variant.id === selectedVariantId)
  const selectedProduct = product ? productWithVariant(product, selectedVariant) : null
  const discount = discountPercent(selectedProduct)
  const related = useMemo(() => products.filter((item) => item.slug !== slug).slice(0, 3), [slug])

  useEffect(() => {
    setSelectedVariantId(product?.variants?.[0]?.id || '')
  }, [product?.slug])

  if (!product) {
    return (
      <main className="page">
        <PageHeader eyebrow="Not Found" title="Product unavailable" body="This product may have moved." />
      </main>
    )
  }

  return (
    <main className="page product-details-page">
      <section className="section product-detail-section">
        <div className="container product-detail">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="detail-meta">
              {product.badge && <span>{product.badge}</span>}
              {selectedProduct?.packSize && <span>{selectedProduct.packSize}</span>}
            </div>
            {product.variants && (
              <div className="pack-selector detail-pack-selector" aria-label={`Choose pack size for ${product.name}`}>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={variant.id === selectedVariantId ? 'active' : ''}
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )}
            <div className="detail-price">
              <strong>{selectedProduct.price}</strong>
              {selectedProduct.mrp && (
                <p>
                  MRP <span>{selectedProduct.mrp}</span>
                </p>
              )}
              {discount > 0 && (
                <span className="discount-pill detail-discount-pill" aria-label={`Save ${discount} percent`}>
                  <BadgePercent size={14} /> Save {discount}%
                </span>
              )}
            </div>
            <p>{product.description}</p>
            <div className="detail-actions">
              <ButtonLink to={whatsappUrl(productOrderName(selectedProduct))} external>
                <MessageCircle size={18} /> Order on WhatsApp
              </ButtonLink>
              <ButtonLink to="/shop" variant="outline">
                Back to Shop
              </ButtonLink>
            </div>
            <div className="benefit-list">
              <h2>Benefits</h2>
              <ul>
                {product.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Sprout size={18} /> {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="usage-box">
              <h2>Usage</h2>
              <p>{product.usage}</p>
            </div>
          </div>
        </div>
      </section>
      {product.slug === 'puro-a2-cow-ghee' && <GheeHistoryTimeline />}
      <section className="section oat-band">
        <div className="container detail-lower">
          <div>
            <SectionIntro eyebrow="Product FAQ" title="Before you order" />
            <FAQ items={product.faqs} />
          </div>
          <div>
            <SectionIntro eyebrow="Related" title="You may also like" />
            <div className="related-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mobile-sticky-cart" aria-label="Mobile product action">
        <button type="button" onClick={() => addProduct(selectedProduct)}>
          <ShoppingBag size={19} /> Add to Cart · {selectedProduct.price}
        </button>
      </div>
    </main>
  )
}

function PageHeader({ eyebrow, title, body }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  )
}

function Farm() {
  const processSteps = [
    {
      number: 'Step 1',
      eyebrow: 'Sourcing',
      icon: Sprout,
      title: 'We Start with the Best',
      body: 'We carefully select raw materials directly from trusted farmers who follow natural and sustainable farming practices.',
      image: '/process/farmer-wheat-hand.jpg',
      alt: 'Farmer harvesting wheat in green fields'
    },
    {
      number: 'Step 2',
      eyebrow: 'Natural Farming',
      icon: Leaf,
      title: 'Chemical-Free Cultivation',
      body: 'Our crops are grown without harmful pesticides or synthetic chemicals, allowing nature to preserve their true nutrition and taste.',
      highlights: ['No Harmful Chemicals', 'Sustainable Farming', 'Healthy Soil'],
      image: '/process/rice-plate.jpg',
      alt: 'Cooked white rice served on a plate'
    },
    {
      number: 'Step 3',
      eyebrow: 'Traditional Preparation',
      icon: BadgeCheck,
      title: 'Crafted the Traditional Way',
      body: 'Instead of mass industrial processing, we use time-tested traditional methods that help preserve nutrition, aroma, and authenticity.',
      highlights: ['Bilona method for A2 Ghee', 'Sun drying', 'Stone grinding', 'Slow processing'],
      image: '/process/traditional-ghee-pot.jpg',
      alt: 'Traditional ghee served from an earthen pot'
    },
    {
      number: 'Step 4',
      eyebrow: 'Quality Testing',
      icon: ShieldCheck,
      title: 'Every Batch is Tested',
      body: 'Before reaching your home, every product undergoes strict quality checks.',
      image: '/process/ghee-jar.jpg',
      alt: 'Golden ghee being checked for texture and clarity'
    },
    {
      number: 'Step 5',
      eyebrow: 'Hygienic Packaging',
      icon: PackageCheck,
      title: 'Packed with Care',
      body: 'Products are packed hygienically to maintain freshness and preserve their natural goodness.',
      image: '/process/packing-box.jpg',
      alt: 'Products being packed carefully in a shipping box'
    },
    {
      number: 'Step 6',
      eyebrow: 'Delivered to You',
      icon: Truck,
      title: 'Fresh at Your Doorstep',
      body: 'Once packed, your order is carefully shipped so you receive products that are fresh, authentic, and ready to use.'
    }
  ]

  return (
    <main className="page process-page">
      <section className="process-hero">
        <img src="/process/cowshed.jpg" alt="Cows cared for in a clean farm shed" />
        <div className="process-hero-overlay" />
        <div className="container process-hero-content">
          <p className="eyebrow">Our Process</p>
          <h1>From Nature to Your Home</h1>
          <p>Every product is crafted with purity, traditional wisdom, and uncompromising quality.</p>
        </div>
      </section>

      <section className="section process-timeline" aria-label="Our production process">
        <div className="container process-steps">
          {processSteps.map(({ number, eyebrow, icon: Icon, title, body, highlights = [], image, alt }, index) => (
            <article className={`process-step ${image ? 'with-image' : ''}`} key={title} data-aos="fade-up">
              <div className="process-step-copy">
                <span className="process-step-number">{number} - {eyebrow}</span>
                <Icon size={34} />
                <h2>{title}</h2>
                <p>{body}</p>
                {highlights.length > 0 && (
                  <ul>
                    {highlights.map((highlight) => (
                      <li key={highlight}>
                        <BadgeCheck size={17} /> {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {image && (
                <figure className="process-step-image">
                  <img src={image} alt={alt} />
                </figure>
              )}
              <span className="process-step-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function Ayurveda() {
  const chakras = [
    ['Root', 'Grounding'],
    ['Sacral', 'Creativity'],
    ['Solar Plexus', 'Confidence'],
    ['Heart', 'Love'],
    ['Throat', 'Communication'],
    ['Third Eye', 'Wisdom'],
    ['Crown', 'Inner peace']
  ]
  const doshas = [
    ['Vata', 'Air & Space', 'Controls movement, breathing, and creativity.'],
    ['Pitta', 'Fire & Water', 'Governs digestion, metabolism, and focus.'],
    ['Kapha', 'Earth & Water', 'Provides strength, stability, and immunity.']
  ]
  const dailyRhythm = [
    ['Morning', 'Move & center', 'Exercise, yoga, and meditation prepare the body and mind for the day.'],
    ['Midday', 'Nourish', 'Digestive strength is at its peak, making this the best time for the largest meal.'],
    ['Afternoon', 'Create & focus', 'Use the day’s active energy for meaningful work, learning, and creativity.'],
    ['Evening', 'Slow down', 'Choose relaxation, a light dinner, and gentle routines that settle the senses.'],
    ['Night', 'Rest & repair', 'Deep, consistent sleep gives the body time to restore and renew.']
  ]

  return (
    <main className="page ayurveda-page">
      <section className="ayurveda-hero">
        <div className="container ayurveda-hero-grid">
          <div className="ayurveda-hero-copy fade-in">
            <p className="eyebrow">The Wisdom of Ayurveda</p>
            <h1>Live in balance with your natural rhythm</h1>
            <p>
              Ayurveda is a timeless way of understanding the connection between mind, body,
              spirit, and the world around us. Its daily practices turn wellness into a way of life.
            </p>
            <a className="ayurveda-scroll-link" href="#energy-centers">
              Explore the foundations <ChevronDown size={17} />
            </a>
          </div>
          <div className="ayurveda-hero-image fade-in">
            <img src={herbsImage} alt="Ayurvedic herbs prepared for a mindful wellness ritual" />
            <span>Mind · Body · Spirit</span>
          </div>
        </div>
      </section>

      <section className="ayurveda-foundation" id="energy-centers">
        <div className="container ayurveda-feature-grid">
          <figure className="ayurveda-portrait-card" data-aos="fade-up">
            <img src="/wellness/chakras.jpg" alt="The seven chakras aligned along a meditating figure" />
            <figcaption>Seven centers · One connected system</figcaption>
          </figure>
          <div className="ayurveda-feature-copy" data-aos="fade-up">
            <p className="eyebrow">Energy & Awareness</p>
            <h2>The Seven Chakras</h2>
            <p className="ayurveda-lead">
              Ayurveda teaches that the body contains seven energy centers called chakras. They
              influence our physical, emotional, and mental well-being.
            </p>
            <p>
              When balanced, the chakras support confidence, love, communication, wisdom, and
              inner peace. Meditation, yoga, proper nutrition, and mindful living help keep these
              energy centers aligned and support overall health.
            </p>
            <div className="chakra-list" aria-label="The seven chakras">
              {chakras.map(([name, quality], index) => (
                <span key={name} style={{ '--chakra-index': index }}>
                  <i aria-hidden="true" />
                  <strong>{name}</strong>
                  <small>{quality}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ayurveda-foundation dosha-section">
        <div className="container ayurveda-feature-grid reverse">
          <figure className="ayurveda-portrait-card" data-aos="fade-up">
            <img src="/wellness/dosha-guide.jpg" alt="Meditation scene illustrating Vata, Pitta, and Kapha doshas" />
            <figcaption>Your constitution is uniquely yours</figcaption>
          </figure>
          <div className="ayurveda-feature-copy" data-aos="fade-up">
            <p className="eyebrow">Your Natural Constitution</p>
            <h2>The Three Doshas</h2>
            <p className="ayurveda-lead">
              According to Ayurveda, every person is shaped by three doshas. Their unique balance
              influences how we move, digest, think, and restore.
            </p>
            <div className="dosha-grid">
              {doshas.map(([name, elements, description]) => (
                <article key={name}>
                  <span>{elements}</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className="balance-note">
              <BadgeCheck size={19} /> When the doshas remain balanced, digestion, energy, and
              overall wellness are naturally supported.
            </p>
          </div>
        </div>
      </section>

      <section className="ayurveda-foundation clock-section">
        <div className="container ayurveda-feature-grid">
          <figure className="ayurveda-portrait-card clock-card" data-aos="fade-up">
            <img src="/wellness/ayurvedic-clock.jpg" alt="Illustrated Ayurvedic clock showing the rhythm of a balanced day" />
            <figcaption>Move with the rhythm of the day</figcaption>
          </figure>
          <div className="ayurveda-feature-copy" data-aos="fade-up">
            <p className="eyebrow">Living with Nature</p>
            <h2>The Ayurvedic Clock</h2>
            <p className="ayurveda-lead">
              Ayurveda recommends aligning daily activities with the body’s natural rhythms. A
              well-paced day can support digestion, sleep, energy, and mental clarity.
            </p>
            <ol className="rhythm-list">
              {dailyRhythm.map(([time, title, body], index) => (
                <li key={time}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{time}</small>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ayurveda-closing">
        <div className="container ayurveda-closing-inner" data-aos="fade-up">
          <div>
            <p className="eyebrow">Why Ayurveda Matters</p>
            <h2>A way of life, not only a healing system</h2>
          </div>
          <div>
            <p>
              By balancing mind, body, and spirit through natural foods, daily routines, and
              mindful habits, Ayurveda helps create lasting health, vitality, and inner harmony.
            </p>
            <ButtonLink to="/shop/triphala-churna">
              <Leaf size={18} /> Explore Ayurvedic wellness
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  )
}

function About() {
  const trustBadges = ['100% Organic', 'Farm Fresh', 'Traditional Methods', 'No Preservatives']

  return (
    <main className="page">
      <section className="story-banner">
        <img src={farmCareImage} alt="Traditional organic farm care" />
        <div className="story-banner-overlay" />
        <div className="container story-banner-content">
          <p className="eyebrow">Our Story</p>
          <h1>Food is the first medicine.</h1>
          <p>Purity, tradition, and the healing touch of Ayurveda for modern families.</p>
        </div>
      </section>

      <section className="section story-text-section">
        <div className="container story-text">
          <p className="eyebrow">Our Story</p>
          <h2>A simple belief became a lifelong mission.</h2>
          <div className="story-columns">
            <p>
              What began as a simple belief that food is the first medicine grew into a mission to
              preserve the ancient wisdom of Ayurveda for modern families.
            </p>
            <p>
              Inspired by the teachings of our sages and the timeless traditions of rural India, we
              nurtured our own cows with love, care, and natural fodder. Their milk became the
              foundation of our handcrafted products, prepared without shortcuts or artificial
              interventions.
            </p>
          </div>
        </div>
      </section>

      <StoryFeature
        image={farmCareImage}
        eyebrow="Traditional Farming"
        title="Raised close to the soil, with patience and care"
        body="Our farming practices respect natural rhythms: clean fodder, ethical care for Desi cows, and ingredients grown with attention to soil health. Purity begins long before a product reaches the kitchen."
        points={['Ethically raised Desi cows', 'Natural fodder and clean surroundings', 'Farm-led quality from the source']}
      />

      <StoryFeature
        reverse
        image={herbsImage}
        eyebrow="Ayurvedic Wisdom"
        title="Ancient principles, made practical for today"
        body="Every offering is guided by the Ayurvedic idea that nourishment should support balance, vitality, and well-being. We preserve natural nutrients, aroma, and sattvic qualities through careful preparation."
        points={['Ayurvedic principles in every product', 'No artificial interventions', 'Food prepared as daily wellness']}
      />

      <StoryFeature
        image={gheeServingImage}
        eyebrow="Our Promise"
        title="No chemicals. No preservatives. No compromises."
        body="From Bilona A2 Desi Cow Ghee to wholesome dairy products, our promise is simple: craft every batch with devotion, honesty, and respect for the traditions that shaped Indian homes."
        points={promiseItems}
      />

      <section className="story-trust-section">
        <div className="container story-trust-badges">
          {trustBadges.map((badge) => (
            <div key={badge}>
              <BadgeCheck size={19} />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Contact() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="Contact"
        title="We are here to help you choose well"
        body="For orders, product questions, delivery availability, or farm sourcing enquiries, connect with the Arogya Organic team."
      />
      <section className="section section-tight">
        <div className="container contact-grid">
          <article>
            <h2>Order support</h2>
            <p>WhatsApp: +91 77699 99888</p>
            <p>Email: arogyaorganicteam@gmail.com</p>
            <p>Hours: 10:00 AM - 7:00 PM</p>
            <ButtonLink to={whatsappUrl()} external>
              <MessageCircle size={18} /> Chat on WhatsApp
            </ButtonLink>
          </article>
          <article className="contact-experiences">
            <h2>From our farm to your home</h2>
            <div className="contact-experience-list">
              <div>
                <span aria-hidden="true">🐄</span>
                <div>
                  <h3>Meet Our Desi Cows</h3>
                  <p>See how our cows are raised naturally with care, clean fodder, and traditional practices.</p>
                </div>
              </div>
              <div>
                <span aria-hidden="true">🥣</span>
                <div>
                  <h3>Watch the Bilona Process</h3>
                  <p>Learn how our A2 Ghee is handcrafted using the traditional Bilona method.</p>
                </div>
              </div>
              <div>
                <span aria-hidden="true">📦</span>
                <div>
                  <h3>Pan-India Delivery</h3>
                  <p>Fresh products delivered across India with quality and care.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section contact-trust-section">
        <div className="container contact-trust-grid">
          <div>
            <p className="eyebrow">Our Promise</p>
            <h2>Why Families Choose Arogya Organic</h2>
            <div className="contact-trust-list">
              {[
                'Real Farm, Real Cows',
                'Pure A2 Desi Cow Ghee',
                'Traditional Bilona Method',
                'No Chemicals or Preservatives',
                'Delivered Across India'
              ].map((item) => (
                <span key={item}><BadgeCheck size={18} /> {item}</span>
              ))}
            </div>
          </div>
          <div className="contact-counters" aria-label="Arogya Organic trust counters">
            {[
              ['50+', 'Desi Cows'],
              ['500+', 'Happy Families'],
              ['Pan-India', 'Delivery'],
              ['100%', 'Natural Products']
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-gallery-section">
        <SectionIntro eyebrow="A Closer Look" title="Care you can see">
          A glimpse of our farm-led sourcing, traditional food culture, and finished ghee.
        </SectionIntro>
        <div className="container contact-gallery">
          {[
            [farmCareImage, 'Natural farm care', 'Ingredients begin with hands-on care for the soil.'],
            [gheeServingImage, 'Made for Indian kitchens', 'Golden ghee prepared for everyday family meals.'],
            [products[0].image, 'Carefully prepared jars', 'Our A2 cow ghee, packed and ready for your home.']
          ].map(([image, title, body], index) => (
            <figure className={index === 0 ? 'featured' : undefined} key={title}>
              <img src={image} alt={title} />
              <figcaption>
                <strong>{title}</strong>
                <span>{body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <img src="/brand/arogya-logo.png" alt="" />
            <span>Arogya Organic</span>
          </Link>
          <p>Farm fresh, chemical-free, natural products delivered with trust.</p>
        </div>
        <div className="footer-links">
          <h3>Quick links</h3>
          <Link to="/shop">Shop</Link>
          <Link to="/the-farm">Our Process</Link>
          <Link to="/ayurveda">Ayurveda</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <a href="mailto:arogyaorganicteam@gmail.com">arogyaorganicteam@gmail.com</a>
          <a href="tel:+917769999888">+91 77699 99888</a>
          <a className="footer-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
        <div className="footer-social">
          <h3>Social</h3>
          <div>
            <a href="https://instagram.com/arogya.organic" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://youtube.com/@gaumatavlogss?si=CWFUj6BVaYFCYksq" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Arogya Organic</span>
        <span>Pure food · Mindful living</span>
      </div>
    </footer>
  )
}

function WhatsAppAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`whatsapp-assistant ${open ? 'open' : ''}`}>
      {open && (
        <div className="assistant-panel">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp assistant">
            <X size={16} />
          </button>
          <p className="eyebrow">Arogya Organic Assistant</p>
          <h3>Need help choosing?</h3>
          <p>Tell us your family size, city, and preferred product. We will suggest the right pack.</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Start WhatsApp chat
          </a>
        </div>
      )}
      <button className="assistant-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open WhatsApp assistant">
        <MessageCircle size={22} />
        <span>Chat with us</span>
      </button>
    </div>
  )
}

function CartDrawer() {
  const { items, count, open, setOpen, addProduct, decreaseProduct, removeProduct } = useCart()
  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + priceValue(product.price) * quantity,
    0
  )
  const actualTotal = items.reduce(
    (sum, { product, quantity }) => sum + priceValue(product.mrp || product.price) * quantity,
    0
  )
  const savings = actualTotal - subtotal

  if (!open) return null

  return (
    <div className="cart-drawer-backdrop" role="presentation" onClick={() => setOpen(false)}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
        <div className="cart-drawer-header">
          <div>
            <p className="eyebrow">Your Selection</p>
            <h2 id="cart-title">Shopping bag ({count})</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close shopping bag">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={30} />
            <p>Your bag is empty.</p>
            <button type="button" onClick={() => setOpen(false)}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article key={productCartId(product)}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-copy">
                    <h3>{product.name}</h3>
                    <p>{product.packSize}</p>
                    <strong>{product.price}</strong>
                    <div className="cart-quantity" aria-label={`Quantity for ${product.name}`}>
                      <button type="button" onClick={() => decreaseProduct(productCartId(product))} aria-label={`Decrease ${productOrderName(product)} quantity`}>−</button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => addProduct(product)} aria-label={`Increase ${productOrderName(product)} quantity`}>+</button>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeProduct(productCartId(product))} aria-label={`Remove ${productOrderName(product)}`}>
                    <X size={16} />
                  </button>
                </article>
              ))}
            </div>
            <div className="cart-trust-badges" aria-label="Product trust badges">
              {['A2 Ghee', 'Bilona Method', 'FSSAI', 'No Chemicals'].map((badge) => (
                <span key={badge}><BadgeCheck size={14} /> {badge}</span>
              ))}
            </div>
            <div className="cart-rating">
              <span aria-label="Five stars">★★★★★</span>
              <strong>4.9/5</strong>
              <small>Trusted by Families</small>
            </div>
            <div className="cart-totals">
              <div><span>Actual Price</span><strong>{formatPrice(actualTotal)}</strong></div>
              <div className="cart-savings"><span>Discount You Get</span><strong>− {formatPrice(savings)}</strong></div>
              <div><span>Delivery</span><strong>FREE</strong></div>
              <div className="cart-total"><span>Final Price</span><strong>{formatPrice(subtotal)}</strong></div>
            </div>
            <p className="fresh-batch-message"><Sparkles size={16} /> Freshly made batch · Free delivery across India</p>
            <a className="cart-whatsapp-checkout" href={whatsappCartUrl(items)} target="_blank" rel="noreferrer">
              🛒 Place Order on WhatsApp
            </a>
            <p className="cart-checkout-note">Availability and delivery are confirmed personally on WhatsApp.</p>
            <div className="cart-confidence">
              <h3>Why families choose us</h3>
              <p>Traditional preparation, clean ingredients, careful packing, and personal WhatsApp support.</p>
              <blockquote>“The grainy texture and aroma feel just like homemade ghee.” <strong>— Rohit M.</strong></blockquote>
              <details>
                <summary>How quickly is my order confirmed?</summary>
                <p>Our team confirms availability, batch freshness, and delivery details on WhatsApp.</p>
              </details>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function MobileBottomNav() {
  const { pathname } = useLocation()
  const items = [
    ['Home', '/', Leaf, pathname === '/'],
    ['Shop', '/shop', ShoppingBag, pathname.startsWith('/shop')],
    ['Our Process', '/the-farm', Sprout, pathname === '/the-farm'],
    ['Ayurveda', '/ayurveda', BookOpen, pathname === '/ayurveda'],
    ['Contact', '/contact', User, pathname === '/contact']
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
      {items.map(([label, path, Icon, active]) => (
        <Link
          key={label}
          to={path}
          className={active ? 'active' : undefined}
          aria-label={label}
          aria-current={active ? 'page' : undefined}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    })
  }, [])

  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetails />} />
        <Route path="/the-farm" element={<Farm />} />
        <Route path="/ayurveda" element={<Ayurveda />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <MobileBottomNav />
    </CartProvider>
  )
}

export default App
