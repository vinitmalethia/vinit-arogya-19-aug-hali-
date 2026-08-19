export const whatsappNumber = '917769999888'

export const products = [
  {
    slug: 'puro-a2-cow-ghee',
    name: 'Puro A2 Cow Ghee',
    price: '₹1,599',
    mrp: '₹1,899',
    packSize: '1kg Jar',
    variants: [
      { id: '1kg', label: '1kg', packSize: '1kg Jar', price: '₹1,599', mrp: '₹1,899' },
      { id: 'half-kg', label: '1/2kg', packSize: '1/2kg Jar', price: '₹859', mrp: '₹899' }
    ],
    badge: 'Best Seller',
    category: 'Traditional Dairy',
    image: '/products/puro-ghee.png',
    description:
      'Traditional Vedic A2 cow ghee prepared for everyday Indian meals, festive cooking, and nourishing family rituals.',
    benefits: ['Traditional slow-crafted richness', 'Grainy texture and deep aroma', 'Ideal for tadka, rotis, rice, and sweets', 'No artificial color or flavor'],
    usage: 'Use one spoon for tadka, spread over rotis, mix into warm rice, or add to sweets and festive recipes.',
    faqs: [
      ['Is this suitable for daily cooking?', 'Yes. It is designed as a premium everyday ghee for Indian kitchens.'],
      ['How should I store it?', 'Store in a cool, dry place and always use a clean, dry spoon.']
    ]
  },
  {
    slug: 'organic-wheat-sharbati',
    name: 'Organic Wheat',
    price: '₹399',
    mrp: '₹449',
    packSize: '5kg Whole Grain',
    badge: 'Stone Mill Ready',
    category: 'Farm Staples',
    image: '/products/organic-wheat.png',
    description:
      'Sharbati whole grain wheat packed in a natural jute-style presentation for fresh atta, rotis, and daily pantry use.',
    benefits: ['Whole grain Sharbati wheat', 'Clean farm staple', 'Naturally wholesome', 'Packed for freshness'],
    usage: 'Mill fresh for atta or store airtight in a cool pantry for daily family meals.',
    faqs: [
      ['Is this whole grain wheat?', 'Yes, this SKU is whole grain wheat suitable for milling.'],
      ['Can I order larger quantities?', 'Bulk availability can be confirmed over WhatsApp.']
    ]
  },
  {
    slug: 'premium-basmati-rice',
    name: 'Premium Basmati Rice',
    price: '₹599',
    mrp: '₹699',
    packSize: '5kg Long Grain',
    badge: 'Premium Pick',
    category: 'Farm Staples',
    image: '/products/premium-rice.png',
    description:
      'Aged basmati long grain rice selected for aroma, elegant grain length, and special Indian meals.',
    benefits: ['Aged basmati long grain', 'Naturally aromatic', 'Ideal for biryani and pulao', 'Clean pantry essential'],
    usage: 'Rinse gently, soak for 20-30 minutes, and cook for biryani, pulao, steamed rice, or festive meals.',
    faqs: [
      ['Is this basmati rice?', 'Yes, it is a premium aged basmati long grain rice.'],
      ['What is the pack size?', 'This product is listed as a 5kg pack.']
    ]
  },
  {
    slug: 'natural-cow-dung-cakes',
    name: 'Natural Cow Dung Cakes',
    price: '₹199',
    mrp: '₹249',
    packSize: 'Eco Pack',
    variants: [
      { id: '6-pieces', label: '6 pieces', packSize: '6 Pieces', price: '₹199', mrp: '₹249' },
      { id: '10-pieces', label: '10 pieces', packSize: '10 Pieces', price: '₹299', mrp: '₹349' }
    ],
    badge: 'Farm Ritual',
    category: 'Natural Living',
    image: '/products/cow-dung-cakes.png',
    description:
      'Handmade natural cow dung cakes for traditional rituals, havan, and eco-conscious farm living.',
    benefits: ['Handmade and sun-dried', 'Traditional ritual use', 'Eco-friendly farm product', 'No synthetic additives'],
    usage: 'Use for havan, puja, traditional smoke rituals, or farm-based natural living practices.',
    faqs: [
      ['Are these handmade?', 'Yes, they are presented as handmade natural cow dung cakes.'],
      ['Can they be shipped?', 'Shipping availability is confirmed over WhatsApp based on location and quantity.']
    ]
  },
  {
    slug: 'triphala-churna',
    name: 'Triphala Churna',
    price: '₹299',
    mrp: '₹349',
    packSize: '200g Pouch',
    badge: 'Ayurvedic',
    category: 'Ayurvedic Wellness',
    image: '/products/triphala-churna.png',
    description:
      'A classic Ayurvedic herbal formulation made with amalaki, bibhitaki, and haritaki for everyday digestive wellness.',
    benefits: ['Traditional Ayurvedic blend', 'Supports digestion', 'No preservatives', 'Convenient resealable pouch'],
    usage: 'Take 1-2 teaspoons with warm water at night, or as advised by a qualified practitioner.',
    faqs: [
      ['What is Triphala made from?', 'It is traditionally made from amalaki, bibhitaki, and haritaki.'],
      ['Can everyone use it?', 'For pregnancy, medication, or chronic health concerns, consult a qualified practitioner first.']
    ]
  }
]

export const collections = [
  {
    title: 'Puro A2 Cow Ghee',
    description: 'Traditional Vedic ghee for daily meals and festive cooking.',
    image: products[0].image,
    link: '/shop/puro-a2-cow-ghee'
  },
  {
    title: 'Organic Wheat',
    description: 'Whole grain Sharbati wheat for fresh home-milled atta.',
    image: products[1].image,
    link: '/shop/organic-wheat-sharbati'
  },
  {
    title: 'Premium Rice',
    description: 'Aged basmati long grain for special Indian meals.',
    image: products[2].image,
    link: '/shop/premium-basmati-rice'
  },
  {
    title: 'Ayurvedic Wellness',
    description: 'Triphala churna and daily herbal essentials.',
    image: products[4].image,
    link: '/shop/triphala-churna'
  }
]
