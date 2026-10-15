import JSZip from 'jszip';
import QRCode from 'qrcode';

export type MiniSiteFontFamily = 'jakarta' | 'playfair' | 'montserrat' | 'poppins' | 'space';
export type MiniSiteSegmentType =
  | 'gastronomia'
  | 'servicos_beleza'
  | 'loja_moda'
  | 'saude_clinica'
  | 'automotivo_oficina'
  | 'geral';

export interface MiniSiteTestimonial {
  id?: string;
  author: string;
  role?: string;
  text: string;
  rating?: number;
  timeAgo?: string;
}

export interface MiniSiteServiceItem {
  id?: string;
  title: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  customWhatsappMsg?: string;
  category?: string;
  badge?: string;
}

export interface MiniSiteConfig {
  id?: string;
  companyName: string;
  niche: string;
  city: string;
  tagline?: string;
  bio?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  primaryColor?: string;
  fontFamily?: MiniSiteFontFamily;
  segmentType?: MiniSiteSegmentType;
  showInteractiveMenu?: boolean;
  theme?: 'dark_neon' | 'glass_luxury' | 'sunset_purple' | 'emerald_pro' | 'cyber_blue';

  // Value-generating business details
  aboutText?: string;
  amenities?: string[];
  galleryUrls?: string[];
  testimonials?: MiniSiteTestimonial[];

  // 1-Click Action Buttons
  whatsappNumber?: string;
  whatsappMessage?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  telegramUrl?: string;
  tiktokUrl?: string;
  websiteUrl?: string;
  googleReviewUrl?: string;

  // 1-Click Pix
  pixKey?: string;
  pixKeyType?: 'cnpj' | 'cpf' | 'telefone' | 'email' | 'aleatoria';
  pixBeneficiary?: string;

  // 1-Click Wi-Fi
  wifiSsid?: string;
  wifiPassword?: string;
  wifiSecurity?: 'WPA' | 'WEP' | 'nopass';

  // Location, Contact & Details
  address?: string;
  phone?: string;
  openingHours?: string;
  rating?: number;
  reviewCount?: number;
  marqueeText?: string;
  services?: MiniSiteServiceItem[];
}

export interface FontOption {
  id: MiniSiteFontFamily;
  name: string;
  subtitle: string;
  cssFamily: string;
  googleFontParam: string;
}

export const FONT_FAMILY_OPTIONS: FontOption[] = [
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    subtitle: 'Moderna & Inovadora',
    cssFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontParam: 'Plus+Jakarta+Sans:wght@400;500;600;700;800;900'
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    subtitle: 'Elegante & Luxo Editorial',
    cssFamily: "'Playfair Display', Georgia, serif",
    googleFontParam: 'Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600'
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    subtitle: 'Forte & Comercial',
    cssFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontParam: 'Montserrat:wght@400;500;600;700;800;900'
  },
  {
    id: 'poppins',
    name: 'Poppins',
    subtitle: 'Gastronomia & Criativa',
    cssFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontParam: 'Poppins:wght@400;500;600;700;800;900'
  },
  {
    id: 'space',
    name: 'Space Grotesk',
    subtitle: 'Tech & Contemporânea',
    cssFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    googleFontParam: 'Space+Grotesk:wght@400;500;600;700'
  }
];

export interface ColorPalettePreset {
  id: string;
  name: string;
  hex: string;
  badge: string;
}

export const COLOR_PALETTE_PRESETS: ColorPalettePreset[] = [
  { id: 'amber', name: 'Âmbar Brasa 4K', hex: '#f59e0b', badge: 'Gastronomia' },
  { id: 'emerald', name: 'Esmeralda Prime', hex: '#10b981', badge: 'Alta Conversão' },
  { id: 'ruby', name: 'Rubi Gourmet', hex: '#ef4444', badge: 'Pizzaria & Food' },
  { id: 'sky', name: 'Azul Safira VIP', hex: '#0ea5e9', badge: 'Barbearia & Pro' },
  { id: 'rose', name: 'Rose Gold Boutique', hex: '#ec4899', badge: 'Moda & Beleza' },
  { id: 'violet', name: 'Roxo Imperial', hex: '#8b5cf6', badge: 'Premium' },
  { id: 'gold', name: 'Ouro Clássico', hex: '#eab308', badge: 'VIP Luxo' },
  { id: 'cyan', name: 'Ciano Detailer', hex: '#06b6d4', badge: 'Automotivo' }
];

export interface Curated4KImageSet {
  segment: MiniSiteSegmentType;
  label: string;
  covers: Array<{ title: string; url: string }>;
  gallery: string[];
}

export const CURATED_4K_IMAGES_BY_SEGMENT: Curated4KImageSet[] = [
  {
    segment: 'gastronomia',
    label: '🍔 Gastronomia, Restaurantes, Hamburguerias & Cafés',
    covers: [
      {
        title: 'Hambúrguer Artesanal na Brasa 4K',
        url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Pizzaria Forno a Lenha Napolitana 4K',
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Restaurante & Alta Gastronomia 4K',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Cafeteria & Confeitaria Especial 4K',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=90'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    segment: 'servicos_beleza',
    label: '💈 Barbearia, Salão de Beleza & Studio VIP',
    covers: [
      {
        title: 'Barbearia Clássica & VIP 4K',
        url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Salão de Beleza & Hair Studio 4K',
        url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Corte & Navalha Profissional 4K',
        url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=90'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    segment: 'saude_clinica',
    label: '💆‍♀️ Clínica de Estética, Odontologia, Saúde & Spa',
    covers: [
      {
        title: 'Clínica de Estética & Spa Relax 4K',
        url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Consultório Odontológico & Saúde 4K',
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Massagem & Bem-Estar 4K',
        url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=90'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    segment: 'loja_moda',
    label: '👗 Boutique, Moda, Calçados & Loja',
    covers: [
      {
        title: 'Boutique de Moda & Alta Costura 4K',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Showroom & Loja Conceito 4K',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Acessórios & Bolsas de Luxo 4K',
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=90'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    segment: 'automotivo_oficina',
    label: '🚗 Estética Automotiva, Oficina & Detailer',
    covers: [
      {
        title: 'Estética Automotiva & Vitrificação 4K',
        url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Superesportivo Polimento Espelhado 4K',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Centro Automotivo & Mecânica Premium 4K',
        url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=90'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85'
    ]
  }
];

export function detectSegmentFromNiche(
  niche: string = '',
  explicitSegment?: MiniSiteSegmentType
): MiniSiteSegmentType {
  if (explicitSegment) return explicitSegment;
  const n = (niche || '').toLowerCase();
  if (
    n.includes('restaur') ||
    n.includes('pizz') ||
    n.includes('hamburg') ||
    n.includes('burger') ||
    n.includes('bar ') ||
    n.includes('lanche') ||
    n.includes('caf') ||
    n.includes('bistr') ||
    n.includes('doc') ||
    n.includes('confeit') ||
    n.includes('gastronom') ||
    n.includes('sushi') ||
    n.includes('açaí') ||
    n.includes('acai') ||
    n.includes('padaria') ||
    n.includes('aliment')
  ) {
    return 'gastronomia';
  }
  if (
    n.includes('barbear') ||
    n.includes('barber') ||
    n.includes('salão') ||
    n.includes('salao') ||
    n.includes('cabel') ||
    n.includes('unha') ||
    n.includes('manicur') ||
    n.includes('maquiag')
  ) {
    return 'servicos_beleza';
  }
  if (
    n.includes('estét') ||
    n.includes('estet') ||
    n.includes('clínic') ||
    n.includes('clinic') ||
    n.includes('spa') ||
    n.includes('dent') ||
    n.includes('odont') ||
    n.includes('médic') ||
    n.includes('medic') ||
    n.includes('saúde') ||
    n.includes('saude') ||
    n.includes('fisio')
  ) {
    return 'saude_clinica';
  }
  if (
    n.includes('moda') ||
    n.includes('roupa') ||
    n.includes('vestu') ||
    n.includes('boutique') ||
    n.includes('loja') ||
    n.includes('calç') ||
    n.includes('calc') ||
    n.includes('acessór') ||
    n.includes('otica') ||
    n.includes('óptica') ||
    n.includes('joia')
  ) {
    return 'loja_moda';
  }
  if (
    n.includes('auto') ||
    n.includes('carro') ||
    n.includes('oficina') ||
    n.includes('mecan') ||
    n.includes('lava') ||
    n.includes('detail') ||
    n.includes('pneu') ||
    n.includes('moto')
  ) {
    return 'automotivo_oficina';
  }
  return 'geral';
}

export interface SegmentSmartMetadata {
  segment: MiniSiteSegmentType;
  coverImageUrl: string;
  primaryColor: string;
  fontFamily: MiniSiteFontFamily;
  featuredTitle: string;
  featuredBadge: string;
  menuTabLabel: string;
  ctaLabel: string;
  aboutText: string;
  amenities: string[];
  galleryUrls: string[];
  testimonials: MiniSiteTestimonial[];
  extraCatalogItems: MiniSiteServiceItem[];
}

export function getSegmentSmartMetadata(
  niche: string = '',
  companyName: string = 'Sua Empresa',
  city: string = 'Brasil',
  explicitSegment?: MiniSiteSegmentType
): SegmentSmartMetadata {
  const seg = detectSegmentFromNiche(niche, explicitSegment);

  if (seg === 'gastronomia') {
    const isPizza = niche.toLowerCase().includes('pizz');
    const isCafe = niche.toLowerCase().includes('caf') || niche.toLowerCase().includes('doc') || niche.toLowerCase().includes('confeit');
    return {
      segment: 'gastronomia',
      coverImageUrl: isPizza
        ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90'
        : isCafe
        ? 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=90'
        : 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90',
      primaryColor: isPizza ? '#ef4444' : '#f59e0b',
      fontFamily: 'poppins',
      featuredTitle: 'Destaques do Chef & Mais Pedidos',
      featuredBadge: 'Cardápio 4K',
      menuTabLabel: '🍽️ Cardápio Digital',
      ctaLabel: 'Pedir no WhatsApp',
      aboutText: `Na ${companyName}, selecionamos ingredientes frescos todos os dias para proporcionar uma experiência gastronômica inesquecível em ${city}. Peça pelo nosso Cardápio Digital com atendimento direto no WhatsApp ou venha conhecer nosso espaço!`,
      amenities: [
        '🔥 Ingredientes Frescos Selecionados',
        '🛵 Delivery Rápido & Retirada',
        '❄️ Ambiente Climatizado & Familiar',
        '⚡ Aceitamos Pix, Cartão & VR',
        '📶 Wi-Fi Liberado para Clientes'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 't1',
          author: 'Ricardo Almeida',
          role: 'Local Guide • Google',
          text: `Simplesmente sensacional! O sabor é impecável, chegou super rápido e quentinho. Melhor de ${city}!`,
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 't2',
          author: 'Fernanda Costa',
          role: 'Cliente Verificada • Google',
          text: `Ambiente acolhedor, atendimento nota 1000 e qualidade surreal dos ingredientes. Recomendo de olhos fechados!`,
          rating: 5,
          timeAgo: 'há 5 dias'
        }
      ],
      extraCatalogItems: [
        {
          id: 'cat_g1',
          title: 'Combo Casal Especial + 2 Bebidas',
          price: 'R$ 79,90',
          category: 'Combos & Promoções',
          description: '2 pratos/lanches principais acompanhados de porção crocante e 2 bebidas geladas.',
          imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_g2',
          title: 'Porção Especial da Casa para Compartilhar',
          price: 'R$ 36,90',
          category: 'Entradas & Porções',
          description: 'Porção generosa finalizada com tempero especial da casa e molho artesanal.',
          imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_g3',
          title: 'Suco Natural / Refrigerante Lata Gelado',
          price: 'R$ 8,90',
          category: 'Bebidas',
          description: 'Bebidas trincando de geladas para acompanhar seu pedido.',
          imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_g4',
          title: 'Sobremesa Gourmet Artesanal',
          price: 'R$ 22,90',
          category: 'Sobremesas',
          description: 'Receita exclusiva preparada diariamente para fechar sua refeição com chave de ouro.',
          imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
        }
      ]
    };
  }

  if (seg === 'servicos_beleza') {
    return {
      segment: 'servicos_beleza',
      coverImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=90',
      primaryColor: '#0ea5e9',
      fontFamily: 'montserrat',
      featuredTitle: 'Serviços Mais Agendados',
      featuredBadge: 'Agendamento 1-Clique',
      menuTabLabel: '💈 Tabela de Serviços',
      ctaLabel: 'Agendar Horário',
      aboutText: `A ${companyName} é referência em estilo, cuidado pessoal e visagismo em ${city}. Trabalhamos com produtos de linha profissional, toalha quente, ambiente climatizado e hora marcada para sua total comodidade.`,
      amenities: [
        '✂️ Profissionais Especialistas',
        '❄️ Ambiente Climatizado & Confortável',
        '☕ Café Expresso & Bebida Cortesia',
        '📅 Agendamento Rápido sem Fila',
        '📶 Wi-Fi VIP & Estacionamento Fácil'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 't1',
          author: 'Lucas Mendonça',
          role: 'Local Guide • Google',
          text: 'Atendimento impecável do início ao fim! Ambiente top, pontualidade no horário e o melhor corte da cidade.',
          rating: 5,
          timeAgo: 'há 3 dias'
        },
        {
          id: 't2',
          author: 'Matheus Oliveira',
          role: 'Cliente Verificado • Google',
          text: 'Experiência diferenciada! Toalha quente, resenha boa e profissionais que realmente entendem do que fazem.',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      extraCatalogItems: [
        {
          id: 'cat_b1',
          title: 'Hidratação Profunda & Reconstrução Capilar',
          price: 'R$ 55,00',
          category: 'Tratamentos',
          description: 'Nutrição intensa dos fios com produtos importados de alta performance.',
          imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_b2',
          title: 'Design de Sobrancelha na Pinça / Navalha',
          price: 'R$ 25,00',
          category: 'Acabamentos',
          description: 'Alinhamento simétrico que valoriza o olhar com acabamento natural.',
          imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_b3',
          title: 'Plano Assinatura Mensal VIP (Cortes Ilimitados)',
          price: 'R$ 149,90/mês',
          category: 'Planos VIP',
          description: 'Mantenha o visual impecável toda semana com prioridade na agenda.',
          imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
        }
      ]
    };
  }

  if (seg === 'saude_clinica') {
    return {
      segment: 'saude_clinica',
      coverImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90',
      primaryColor: '#10b981',
      fontFamily: 'playfair',
      featuredTitle: 'Procedimentos & Especialidades',
      featuredBadge: 'Avaliação Especializada',
      menuTabLabel: '✨ Protocolos & Tratamentos',
      ctaLabel: 'Agendar Avaliação',
      aboutText: `Na ${companyName}, unimos tecnologia de ponta, biossegurança rigorosa e atendimento humanizado em ${city}. Nossos protocolos são personalizados para entregar resultados reais com naturalidade e bem-estar.`,
      amenities: [
        '🩺 Especialistas Certificados',
        '🔬 Equipamentos de Última Geração',
        '🛡️ Biossegurança Padrão Ouro',
        '💳 Parcelamento Facilitado & Pix',
        '📍 Localização Privilegiada'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 't1',
          author: 'Camila Vasconcelos',
          role: 'Local Guide • Google',
          text: 'Clínica maravilhosa! Desde a recepção até o procedimento me senti super segura. Resultado ficou super natural!',
          rating: 5,
          timeAgo: 'há 4 dias'
        },
        {
          id: 't2',
          author: 'Patrícia Nogueira',
          role: 'Paciente Verificada • Google',
          text: 'Ambiente impecável, cheiroso e profissionais extremamente atenciosos. Indico para todas as minhas amigas!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      extraCatalogItems: [
        {
          id: 'cat_s1',
          title: 'Consulta de Avaliação Personalizada',
          price: 'Agendar',
          category: 'Consultas',
          description: 'Análise detalhada e montagem do seu plano de tratamento individualizado.',
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_s2',
          title: 'Protocolo Rejuvenescimento & Colágeno',
          price: 'Sob Consulta',
          category: 'Facial',
          description: 'Estímulo profundo de colágeno para firmeza, viço e rejuvenescimento.',
          imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=800&q=80'
        }
      ]
    };
  }

  if (seg === 'loja_moda') {
    return {
      segment: 'loja_moda',
      coverImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90',
      primaryColor: '#ec4899',
      fontFamily: 'playfair',
      featuredTitle: 'Lançamentos & Coleção em Destaque',
      featuredBadge: 'Vitrine 4K',
      menuTabLabel: '🛍️ Catálogo da Loja',
      ctaLabel: 'Comprar no WhatsApp',
      aboutText: `A ${companyName} traz curadoria exclusiva de peças que unem elegância, caimento impecável e conforto em ${city}. Atendemos presencialmente e enviamos com rapidez através do nosso atendimento personalizado no WhatsApp!`,
      amenities: [
        '👗 Lançamentos Toda Semana',
        '📦 Entrega Expressa & Envio Rápido',
        '💳 Parcelamento sem Juros & Pix OFF',
        '✨ Consultoria de Estilo no WhatsApp',
        '🔄 Troca Fácil & Garantida'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 't1',
          author: 'Juliana Martins',
          role: 'Local Guide • Google',
          text: 'Peças de altíssima qualidade e acabamento perfeito! Comprei pelo WhatsApp e chegou no mesmo dia.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 't2',
          author: 'Beatriz Ribeiro',
          role: 'Cliente Verificada • Google',
          text: 'A loja é linda e o atendimento das meninas faz toda a diferença. Sempre encontro looks maravilhosos!',
          rating: 5,
          timeAgo: 'há 6 dias'
        }
      ],
      extraCatalogItems: [
        {
          id: 'cat_m1',
          title: 'Look Completo Consultoria VIP',
          price: 'Condição Especial',
          category: 'Looks Completos',
          description: 'Combinação exclusiva montada por nossas consultoras para sua ocasião.',
          imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'cat_m2',
          title: 'Linha de Acessórios & Bolsas Premium',
          price: 'A partir de R$ 129,90',
          category: 'Acessórios',
          description: 'Complementos sofisticados para elevar qualquer produção.',
          imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
        }
      ]
    };
  }

  if (seg === 'automotivo_oficina') {
    return {
      segment: 'automotivo_oficina',
      coverImageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=90',
      primaryColor: '#06b6d4',
      fontFamily: 'space',
      featuredTitle: 'Serviços & Soluções Automotivas',
      featuredBadge: 'Padrão Premium',
      menuTabLabel: '🚗 Tabela de Serviços',
      ctaLabel: 'Orçamento no WhatsApp',
      aboutText: `A ${companyName} é especialista em cuidado, estética e manutenção automotiva de alto padrão em ${city}. Utilizamos equipamentos homologados, produtos de linha internacional e garantia total em cada serviço.`,
      amenities: [
        '🛡️ Garantia em Todos os Serviços',
        '🚗 Leva e Traz / Box Exclusivo',
        '💎 Produtos Importados Homologados',
        '☕ Sala de Espera Climatizada c/ Wi-Fi',
        '💳 Pix c/ Desconto & Cartão em até 10x'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 't1',
          author: 'Carlos Eduardo Silva',
          role: 'Local Guide • Google',
          text: 'Meu carro saiu parecendo zero km de concessionária! Honestidade, transparência e serviço impecável.',
          rating: 5,
          timeAgo: 'há 3 dias'
        },
        {
          id: 't2',
          author: 'Rodrigo Tavares',
          role: 'Cliente Verificado • Google',
          text: 'Melhor atendimento automotivo da região. Cumprem o prazo certinho e o acabamento é nota 10!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      extraCatalogItems: [
        {
          id: 'cat_a1',
          title: 'Impermeabilização de Bancos & Couro',
          price: 'R$ 290,00',
          category: 'Proteção Interna',
          description: 'Hidratação profunda de bancos em couro ou impermeabilização contra líquidos.',
          imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
        }
      ]
    };
  }

  return {
    segment: 'geral',
    coverImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=90',
    primaryColor: '#f59e0b',
    fontFamily: 'jakarta',
    featuredTitle: 'Principais Destaques & Soluções',
    featuredBadge: 'Catálogo 1-Clique',
    menuTabLabel: '📋 Catálogo Completo',
    ctaLabel: 'Chamar no WhatsApp',
    aboutText: `Bem-vindo à página oficial da ${companyName}! Somos referência em ${niche || 'atendimento de excelência'} em ${city}, oferecendo qualidade comprovada, agilidade e atendimento personalizado diretamente pelo WhatsApp.`,
    amenities: [
      '⭐ Empresa Verificada 5 Estrelas',
      '⚡ Atendimento Rápido pelo WhatsApp',
      '💳 Pagamento Fácil via Pix & Cartão',
      '📶 Wi-Fi Liberado no Local',
      '📍 Localização de Fácil Acesso'
    ],
    galleryUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85'
    ],
    testimonials: [
      {
        id: 't1',
        author: 'Marcelo Santana',
        role: 'Local Guide • Google',
        text: `Atendimento nota 10 da ${companyName}! Resolveram tudo com muita rapidez, educação e preço justo.`,
        rating: 5,
        timeAgo: 'há 2 dias'
      },
      {
        id: 't2',
        author: 'Ana Paula Ferreira',
        role: 'Cliente Verificada • Google',
        text: 'Empresa séria e de total confiança. Recomendo a todos que buscam qualidade de verdade!',
        rating: 5,
        timeAgo: 'há 5 dias'
      }
    ],
    extraCatalogItems: []
  };
}

export function getDefaultFourProducts(niche: string = '', companyName: string = 'Sua Empresa'): Array<{
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  customWhatsappMsg?: string;
  category?: string;
}> {
  const n = (niche || '').toLowerCase();

  if (n.includes('moda') || n.includes('roupa') || n.includes('vestu') || n.includes('loja') || n.includes('calc') || n.includes('acessorio') || n.includes('infantil') || n.includes('feminina') || n.includes('boutique')) {
    return [
      {
        id: 'p1',
        title: 'Coleção Nova & Lançamentos',
        category: 'Destaques',
        description: 'Looks exclusivos, tecidos nobres e caimento impecável para você.',
        price: 'Novidade 4K',
        imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vi os lançamentos no Mini Site da ${companyName} e quero ver fotos e tamanhos!`
      },
      {
        id: 'p2',
        title: 'Alfaiataria & Conjuntos VIP',
        category: 'Alfaiataria',
        description: 'Vestidos, blazers e conjuntos elegantes para todas as ocasiões.',
        price: 'Mais Vendido',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostei muito das peças de Alfaiataria/Conjuntos no Mini Site da ${companyName}. Como posso pedir?`
      },
      {
        id: 'p3',
        title: 'Calçados & Bolsas Premium',
        category: 'Acessórios',
        description: 'Bolsas em couro, calçados e complementos que valorizam o seu estilo.',
        price: 'Tendência',
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vim pelo Mini Site da ${companyName} e gostaria de conhecer as opções de calçados e bolsas!`
      },
      {
        id: 'p4',
        title: 'Atendimento & Consultoria VIP',
        category: 'Consultoria',
        description: 'Montamos seu look ideal e enviamos com rapidez para seu endereço.',
        price: 'Frete Rápido',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vim pelo Mini Site da ${companyName} e quero atendimento personalizado!`
      }
    ];
  }

  if (n.includes('restaur') || n.includes('pizz') || n.includes('hamburg') || n.includes('burger') || n.includes('bar') || n.includes('lanche') || n.includes('caf') || n.includes('gastronom')) {
    return [
      {
        id: 'p1',
        title: 'Especialidade Principal da Casa',
        category: 'Mais Pedidos',
        description: 'Receita artesanal exclusiva preparada na hora com ingredientes selecionados.',
        price: 'R$ 38,90',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vi a Especialidade da Casa no Mini Site de ${companyName} e gostaria de fazer um pedido!`
      },
      {
        id: 'p2',
        title: 'Combo Família / Casal VIP',
        category: 'Combos',
        description: 'Combo completo para compartilhar com acompanhamentos e bebida gelada.',
        price: 'R$ 69,90',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de pedir o Combo Família/Casal anunciado no Mini Site da ${companyName}!`
      },
      {
        id: 'p3',
        title: 'Porções & Entradas Crocantes',
        category: 'Porções',
        description: 'Crocância e sabor incomparáveis com molhos artesanais da casa.',
        price: 'R$ 29,90',
        imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Quais porções e entradas estão disponíveis hoje na ${companyName}?`
      },
      {
        id: 'p4',
        title: 'Sobremesas & Bebidas Especiais',
        category: 'Sobremesas',
        description: 'Doces artesanais e bebidas refrescantes para fechar com chave de ouro.',
        price: 'R$ 22,90',
        imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de ver as opções de sobremesas e bebidas da ${companyName}!`
      }
    ];
  }

  if (n.includes('estét') || n.includes('beleza') || n.includes('salão') || n.includes('barbear') || n.includes('cabel') || n.includes('unha') || n.includes('spa')) {
    return [
      {
        id: 'p1',
        title: 'Procedimentos & Glow Facial',
        category: 'Estética',
        description: 'Limpeza profunda, hidratação celular e cuidados personalizados.',
        price: 'Procedimento VIP',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vi no Mini Site o Glow Facial da ${companyName} e quero agendar meu horário!`
      },
      {
        id: 'p2',
        title: 'Corte & Visagismo Exclusivo',
        category: 'Cabelo & Barba',
        description: 'Harmonização de corte e acabamento impecável com hora marcada.',
        price: 'Agendar',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de agendar um horário para Corte & Visagismo na ${companyName}!`
      },
      {
        id: 'p3',
        title: 'Massagens Relaxantes & SPA',
        category: 'Bem-Estar',
        description: 'Alívio do estresse, relaxamento muscular e bem-estar profundo.',
        price: 'Experiência SPA',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de agendar uma sessão de massagem/SPA na ${companyName}!`
      },
      {
        id: 'p4',
        title: 'Combo Beleza Completa',
        category: 'Combos VIP',
        description: 'Pacote integrado para transformar seu visual com máxima elegância.',
        price: 'Condição Especial',
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vim pelo Mini Site e quero saber mais sobre o Combo Beleza da ${companyName}!`
      }
    ];
  }

  if (n.includes('mecan') || n.includes('oficina') || n.includes('auto') || n.includes('car') || n.includes('moto') || n.includes('pneu')) {
    return [
      {
        id: 'p1',
        title: 'Revisão Preventiva & Estética',
        category: 'Destaque',
        description: 'Checklist completo de segurança e acabamento automotivo premium.',
        price: 'Checklist VIP',
        imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Vi no Mini Site da ${companyName} a Revisão Preventiva e quero agendar para meu veículo!`
      },
      {
        id: 'p2',
        title: 'Polimento & Vitrificação 9H',
        category: 'Estética',
        description: 'Brilho espelhado de zero km e proteção cerâmica de longa duração.',
        price: 'Brilho 4K',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de fazer um orçamento de Polimento/Vitrificação na ${companyName}!`
      },
      {
        id: 'p3',
        title: 'Scanner & Diagnóstico Digital',
        category: 'Tecnologia',
        description: 'Diagnóstico computadorizado de ponta para identificar tudo com precisão.',
        price: 'Diagnóstico 3D',
        imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de agendar um diagnóstico para meu veículo na ${companyName}!`
      },
      {
        id: 'p4',
        title: 'Higienização Interna & Ozônio',
        category: 'Higienização',
        description: 'Limpeza profunda de bancos, teto e ar-condicionado com eliminação de odores.',
        price: 'Ar Puro',
        imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=85',
        customWhatsappMsg: `Olá! Gostaria de fazer a higienização interna na ${companyName}!`
      }
    ];
  }

  return [
    {
      id: 'p1',
      title: 'Atendimento Personalizado VIP',
      category: 'Destaques',
      description: 'Consultoria e atendimento ágil diretamente pelo WhatsApp.',
      price: '1-Clique',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=900&q=85',
      customWhatsappMsg: `Olá! Vim pelo Mini Site de ${companyName} e gostaria de atendimento!`
    },
    {
      id: 'p2',
      title: 'Produtos & Soluções Mais Pedidas',
      category: 'Mais Vendidos',
      description: 'Nossa linha de maior destaque e satisfação comprovada por clientes.',
      price: 'Mais Vendido',
      imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=85',
      customWhatsappMsg: `Olá! Gostaria de conhecer os produtos mais pedidos de ${companyName}!`
    },
    {
      id: 'p3',
      title: 'Condição & Pacote Promocional',
      category: 'Promoções',
      description: 'Ofertas exclusivas para quem entra em contato pelo Mini Site.',
      price: 'Condição Especial',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85',
      customWhatsappMsg: `Olá! Vi o pacote promocional no Mini Site da ${companyName} e quero aproveitar!`
    },
    {
      id: 'p4',
      title: 'Orçamento Rápido e Sem Burocracia',
      category: 'Orçamento',
      description: 'Envie sua dúvida ou pedido e receba retorno em minutos.',
      price: 'Orçamento Grátis',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85',
      customWhatsappMsg: `Olá! Gostaria de solicitar um orçamento rápido na ${companyName}!`
    }
  ];
}

export function formatMiniSitePhone(phone: string = ''): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '5511999999999';
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if (digits.startsWith('55')) return digits;
  return `55${digits}`;
}

export function buildMiniSiteWhatsappUrl(phone: string = '', message: string = ''): string {
  const num = formatMiniSitePhone(phone);
  const msg = message || 'Olá! Vi seu Mini Site e gostaria de atendimento.';
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function sanitizeMiniSiteHandle(urlOrHandle: string = '', prefix: string = ''): string {
  let clean = urlOrHandle.trim();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?(instagram\.com|tiktok\.com|t\.me)\//i, '');
  clean = clean.replace(/^@/, '');
  clean = clean.replace(/\/$/, '');
  return clean ? `${prefix}${clean}` : '';
}

export interface QrCodeOverrides {
  pixQrUrl?: string;
  wifiQrUrl?: string;
}

/**
 * Generates standalone static HTML string for the Mini Site.
 * Includes 4K Hero Cover Banner, Opening Hours in Header, Dynamic Marquee,
 * Segment-Aware Value Proposition, 4 Featured Highlights + Interactive Catalog,
 * 4K Photo Gallery, Dedicated "Como Chegar" Map Card, and Real Google Reviews Card.
 */
export function generateMiniSiteHtml(config: MiniSiteConfig, qrOverrides?: QrCodeOverrides): string {
  const name = (config.companyName || 'Sua Empresa').trim();
  const niche = (config.niche || 'Atendimento Exclusivo').trim();
  const city = (config.city || 'Brasil').trim();
  const smartMeta = getSegmentSmartMetadata(niche, name, city, config.segmentType);
  const tagline = config.tagline || `${niche} de excelência em ${city}`;
  const initial = (name.charAt(0) || 'A').toUpperCase();

  const coverImage = (config.coverImageUrl && config.coverImageUrl.trim()) || smartMeta.coverImageUrl;
  const primaryColor = (config.primaryColor && config.primaryColor.trim()) || smartMeta.primaryColor;
  const selectedFont = FONT_FAMILY_OPTIONS.find((f) => f.id === (config.fontFamily || smartMeta.fontFamily)) || FONT_FAMILY_OPTIONS[0];

  const whatsappUrl = buildMiniSiteWhatsappUrl(
    config.whatsappNumber || config.phone || '5511999999999',
    config.whatsappMessage || `Olá! Vim através do Mini Site de ${name}. Gostaria de mais informações!`
  );

  const instaHandle = sanitizeMiniSiteHandle(config.instagramUrl || '', '@');
  const instaUrl = config.instagramUrl
    ? config.instagramUrl.startsWith('http')
      ? config.instagramUrl
      : `https://instagram.com/${config.instagramUrl.replace(/^@/, '')}`
    : 'https://instagram.com';

  const telegramUrl = config.telegramUrl
    ? config.telegramUrl.startsWith('http')
      ? config.telegramUrl
      : `https://t.me/${config.telegramUrl.replace(/^@/, '')}`
    : '';

  const tiktokHandle = sanitizeMiniSiteHandle(config.tiktokUrl || '', '@');
  const tiktokUrl = config.tiktokUrl
    ? config.tiktokUrl.startsWith('http')
      ? config.tiktokUrl
      : `https://tiktok.com/@${config.tiktokUrl.replace(/^@/, '')}`
    : '';

  const siteUrl = config.websiteUrl
    ? config.websiteUrl.startsWith('http')
      ? config.websiteUrl
      : `https://${config.websiteUrl}`
    : '';

  const reviewUrl = config.googleReviewUrl || 'https://maps.google.com';

  const pixKey = config.pixKey || 'pix@empresa.com.br';
  const pixBeneficiary = config.pixBeneficiary || name;
  const pixType = (config.pixKeyType || 'Chave Pix').toUpperCase();

  const wifiSsid = config.wifiSsid || `${name.replace(/\s+/g, '_')}_WiFi`;
  const wifiPass = config.wifiPassword || 'VisiteNos123';
  const wifiSec = config.wifiSecurity || 'WPA';
  const wifiQrData = `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`;

  const wifiQrUrl =
    qrOverrides?.wifiQrUrl ||
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(wifiQrData)}`;
  const pixQrUrl =
    qrOverrides?.pixQrUrl ||
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(pixKey)}`;

  const addressText = (config.address && config.address.trim()) || `Centro, ${city}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText + ' ' + city)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(addressText + ' ' + city)}&navigate=yes`;

  const phoneDigits = config.phone ? config.phone.replace(/\D/g, '') : '';
  const phoneCallUrl = phoneDigits ? `tel:${phoneDigits}` : '';
  const openingHours = (config.openingHours && config.openingHours.trim()) || 'Seg a Sáb: 09h às 20h';

  const exportDate = new Date().toLocaleDateString('pt-BR');
  const marqueeText =
    config.marqueeText ||
    '🔥 ATENDIMENTO VIP • QUALIDADE 4K COMPROVADA • PEÇA OU AGENDE PELO WHATSAPP • AVALIAÇÃO 5 ESTRELAS NO GOOGLE 🔥';

  const userServices = Array.isArray(config.services) ? config.services : [];
  const defaultServices = getDefaultFourProducts(niche, name);
  const featuredProducts =
    userServices.length >= 4
      ? userServices.slice(0, 4)
      : [...userServices, ...defaultServices.slice(userServices.length, 4)];
  const additionalServices =
    userServices.length > 4 ? userServices.slice(4) : smartMeta.extraCatalogItems;

  const aboutText = (config.aboutText && config.aboutText.trim()) || smartMeta.aboutText;
  const amenities =
    Array.isArray(config.amenities) && config.amenities.length > 0
      ? config.amenities
      : smartMeta.amenities;
  const galleryUrls =
    Array.isArray(config.galleryUrls) && config.galleryUrls.length > 0
      ? config.galleryUrls
      : smartMeta.galleryUrls;
  const testimonials =
    Array.isArray(config.testimonials) && config.testimonials.length > 0
      ? config.testimonials
      : smartMeta.testimonials;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<!-- 
  MINI PÁGINA INOVADORA 4K - ${name}
  Gerado em: ${exportDate}
-->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${name} - Mini Site Oficial 4K</title>
  <meta name="description" content="${tagline}">
  <meta name="theme-color" content="#090d16">
  <meta property="og:title" content="${name} - Mini Site Oficial">
  <meta property="og:description" content="${tagline}">
  <meta property="og:image" content="${coverImage}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${selectedFont.googleFontParam}&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${primaryColor};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      font-family: ${selectedFont.cssFamily};
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      background: radial-gradient(circle at top, #111827 0%, #090d16 55%, #030712 100%);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 0 0 48px;
      overflow-x: hidden;
    }
    .page-shell {
      width: 100%;
      max-width: 460px;
      background: #090d16;
      min-height: 100vh;
      box-shadow: 0 25px 60px rgba(0,0,0,0.75);
      border-left: 1px solid rgba(255,255,255,0.06);
      border-right: 1px solid rgba(255,255,255,0.06);
      position: relative;
      overflow: hidden;
    }
    /* 1. HERO COVER 4K */
    .hero-head {
      position: relative;
      width: 100%;
      height: 230px;
      overflow: hidden;
      background: #0f172a;
    }
    .hero-head img.cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(1.06) saturate(1.1);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(9,13,22,0.25) 0%, rgba(9,13,22,0.55) 55%, #090d16 100%);
    }
    .hero-top-bar {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 5;
    }
    .open-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(9, 13, 22, 0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(52, 211, 153, 0.45);
      color: #34d399;
      font-size: 11px;
      font-weight: 800;
    }
    .open-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 8px #34d399;
    }
    .rating-top-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 11px;
      border-radius: 999px;
      background: rgba(9, 13, 22, 0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(251, 191, 36, 0.45);
      color: #fbbf24;
      font-size: 11px;
      font-weight: 800;
      text-decoration: none;
    }
    /* Profile Identity overlapping hero */
    .identity-wrap {
      padding: 0 18px;
      margin-top: -54px;
      position: relative;
      z-index: 10;
    }
    .identity-row {
      display: flex;
      align-items: flex-end;
      gap: 14px;
    }
    .logo-box {
      width: 84px;
      height: 84px;
      border-radius: 24px;
      background: linear-gradient(135deg, var(--primary), #1e293b);
      border: 3px solid #090d16;
      box-shadow: 0 12px 28px rgba(0,0,0,0.6), 0 0 0 2px var(--primary);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 900;
      color: #fff;
      flex-shrink: 0;
      position: relative;
    }
    .logo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .identity-titles {
      flex: 1;
      min-width: 0;
      padding-bottom: 2px;
    }
    .company-name {
      font-size: 21px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    .company-sub {
      font-size: 11px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 3px;
    }
    .tagline-box {
      margin-top: 10px;
      font-size: 12.5px;
      color: #cbd5e1;
      line-height: 1.45;
    }
    /* Opening hours bar in header */
    .header-hours-bar {
      margin-top: 12px;
      padding: 10px 13px;
      border-radius: 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 11.5px;
      color: #e2e8f0;
    }
    .header-hours-left {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
    }
    /* Marquee */
    .marquee-bar {
      margin: 14px 16px 0;
      overflow: hidden;
      background: linear-gradient(90deg, var(--primary), #fbbf24, var(--primary));
      color: #090d16;
      padding: 8px 0;
      border-radius: 14px;
      font-weight: 900;
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 6px 20px -4px rgba(0,0,0,0.5);
      white-space: nowrap;
    }
    .marquee-track {
      display: inline-block;
      white-space: nowrap;
      animation: marqueeMove 18s linear infinite;
    }
    @keyframes marqueeMove {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    /* Quick Nav */
    .quick-nav {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 14px 16px 4px;
      scrollbar-width: none;
    }
    .quick-nav::-webkit-scrollbar { display: none; }
    .quick-nav a {
      padding: 7px 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #e2e8f0;
      font-size: 11px;
      font-weight: 800;
      text-decoration: none;
      white-space: nowrap;
    }
    .main-stack {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .section-card {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 22px;
      padding: 16px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 8px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
    }
    .section-tag {
      font-size: 10px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: var(--primary);
      border: 1px solid rgba(255,255,255,0.12);
    }
    /* Products 2x2 Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 11px;
    }
    .product-card {
      background: rgba(9, 13, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .product-img-box {
      position: relative;
      height: 118px;
      background: #0f172a;
      overflow: hidden;
    }
    .product-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-price-tag {
      position: absolute;
      top: 7px;
      right: 7px;
      padding: 3px 8px;
      border-radius: 8px;
      background: rgba(9, 13, 22, 0.9);
      color: #34d399;
      font-size: 10px;
      font-weight: 900;
      border: 1px solid rgba(52, 211, 153, 0.35);
    }
    .product-info {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      justify-content: space-between;
    }
    .product-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #fff;
      line-height: 1.25;
    }
    .product-desc {
      font-size: 10.5px;
      color: #94a3b8;
      line-height: 1.35;
      margin-top: 3px;
    }
    .product-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 8px;
      border-radius: 11px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      font-size: 10.5px;
      font-weight: 800;
      text-decoration: none;
    }
    /* Catalog list */
    .catalog-item {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 10px;
      border-radius: 16px;
      background: rgba(9, 13, 22, 0.7);
      border: 1px solid rgba(255,255,255,0.08);
      text-decoration: none;
      color: #fff;
      margin-top: 8px;
    }
    .catalog-item img {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      object-fit: cover;
      flex-shrink: 0;
    }
    /* Amenities */
    .amenities-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 10px;
    }
    .amenity-chip {
      font-size: 10.5px;
      font-weight: 700;
      color: #e2e8f0;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 5px 10px;
      border-radius: 10px;
    }
    /* Gallery 4K */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .gallery-grid img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    /* Como Chegar Map Card */
    .map-visual-banner {
      position: relative;
      height: 115px;
      border-radius: 16px;
      background:
        linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.75)),
        repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 22px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 22px);
      border: 1px solid rgba(244, 63, 94, 0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px;
      margin-bottom: 12px;
      overflow: hidden;
    }
    .map-pin-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #f43f5e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 8px rgba(244, 63, 94, 0.2);
      margin-bottom: 6px;
    }
    .route-btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 10px;
    }
    .route-btn {
      padding: 10px;
      border-radius: 12px;
      font-size: 11.5px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    /* Google Review Print Style Card */
    .google-print-card {
      background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
      border: 1.5px solid rgba(251, 191, 36, 0.45);
      border-radius: 22px;
      padding: 16px;
    }
    .review-snippet {
      background: rgba(9, 13, 22, 0.65);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 10px 12px;
      margin-top: 8px;
    }
    .footer {
      text-align: center;
      padding: 20px 16px 8px;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="page-shell">
    <!-- 1. FOTO NO HEAD (HERO COVER 4K) + HORÁRIO + STATUS -->
    <div class="hero-head">
      <img src="${coverImage}" alt="${name}" class="cover-img" onerror="this.src='https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90'" />
      <div class="hero-overlay"></div>
      <div class="hero-top-bar">
        <div class="open-badge">
          <span class="open-dot"></span>
          <span>Aberto Agora • Online</span>
        </div>
        <a href="#avaliacoes" class="rating-top-pill">
          <span>★ ${(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}</span>
          <span style="color:#cbd5e1;font-weight:600;">(${config.reviewCount || 128})</span>
        </a>
      </div>
    </div>

    <!-- 2. IDENTIDADE + HORÁRIO DE ATENDIMENTO NO HEAD -->
    <div class="identity-wrap">
      <div class="identity-row">
        <div class="logo-box">
          ${config.logoUrl ? `<img src="${config.logoUrl}" alt="${name}" onerror="this.style.display='none'">` : initial}
        </div>
        <div class="identity-titles">
          <h1 class="company-name">${name}</h1>
          <div class="company-sub">${niche} • ${city}</div>
        </div>
      </div>
      <p class="tagline-box">${tagline}</p>

      <div class="header-hours-bar">
        <div class="header-hours-left">
          <span style="color:var(--primary);">🕒 Horário:</span>
          <span>${openingHours}</span>
        </div>
        <a href="#como-chegar" style="color:var(--primary);font-weight:800;text-decoration:none;font-size:11px;">Como Chegar ➔</a>
      </div>
    </div>

    <!-- 3. FRASE DE DESTAQUE PASSANDO (LETREIRO DINÂMICO) -->
    <div class="marquee-bar">
      <div class="marquee-track">
        <span>${marqueeText} &nbsp;&nbsp;•&nbsp;&nbsp; ${marqueeText}</span>
      </div>
    </div>

    <!-- 4. NAVEGAÇÃO RÁPIDA DO MINI SITE -->
    <nav class="quick-nav">
      <a href="#destaques">✨ Destaques</a>
      <a href="#catalogo">${smartMeta.menuTabLabel}</a>
      <a href="#sobre">💎 Diferenciais</a>
      <a href="#como-chegar">📍 Como Chegar</a>
      <a href="#avaliacoes">⭐ Google (${(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)})</a>
      <a href="#pix-wifi">⚡ Pix &amp; Wi-Fi</a>
    </nav>

    <div class="main-stack">
      <!-- 5. DESTAQUES PRINCIPAIS EM 4K -->
      <section id="destaques" class="section-card">
        <div class="section-head">
          <span class="section-title">✨ ${smartMeta.featuredTitle}</span>
          <span class="section-tag">${smartMeta.featuredBadge}</span>
        </div>
        <div class="products-grid">
          ${featuredProducts.slice(0, 4).map((p) => {
            const pWaMsg = p.customWhatsappMsg || `Olá! Vi no Mini Site de ${name} o item "${p.title}"${p.price ? ` (${p.price})` : ''} e gostaria de pedir/agendar!`;
            const pWaUrl = buildMiniSiteWhatsappUrl(config.whatsappNumber || config.phone || '5511999999999', pWaMsg);
            return `
            <div class="product-card">
              <div class="product-img-box">
                <img src="${p.imageUrl || 'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}" loading="lazy" />
                <span class="product-price-tag">${p.price || 'Destaque'}</span>
              </div>
              <div class="product-info">
                <div>
                  <div class="product-title">${p.title}</div>
                  <div class="product-desc">${p.description || 'Atendimento imediato via WhatsApp.'}</div>
                </div>
                <a href="${pWaUrl}" target="_blank" rel="noopener noreferrer" class="product-cta">
                  <span>${smartMeta.ctaLabel}</span>
                </a>
              </div>
            </div>`;
          }).join('')}
        </div>
      </section>

      <!-- 6. CARDÁPIO DIGITAL / CATÁLOGO DO SEGMENTO -->
      ${additionalServices.length > 0 ? `
      <section id="catalogo" class="section-card">
        <div class="section-head">
          <span class="section-title">${smartMeta.menuTabLabel}</span>
          <span class="section-tag">Pedido Rápido</span>
        </div>
        <div>
          ${additionalServices.map((srv) => {
            const srvWaUrl = buildMiniSiteWhatsappUrl(
              config.whatsappNumber || config.phone || '5511999999999',
              `Olá! Vi no Mini Site de ${name} o item "${srv.title}"${srv.price ? ` (${srv.price})` : ''} e quero mais informações!`
            );
            return `
            <a href="${srvWaUrl}" target="_blank" rel="noopener noreferrer" class="catalog-item">
              ${srv.imageUrl ? `<img src="${srv.imageUrl}" alt="${srv.title}" loading="lazy" />` : ''}
              <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                  <strong style="font-size:12.5px;color:#fff;">${srv.title}</strong>
                  ${srv.price ? `<span style="font-size:11px;font-weight:900;color:#34d399;">${srv.price}</span>` : ''}
                </div>
                ${srv.description ? `<p style="font-size:10.5px;color:#94a3b8;margin-top:2px;">${srv.description}</p>` : ''}
              </div>
            </a>`;
          }).join('')}
        </div>
      </section>
      ` : ''}

      <!-- 7. SOBRE A EMPRESA & DIFERENCIAIS DE VALOR -->
      <section id="sobre" class="section-card">
        <div class="section-head">
          <span class="section-title">💎 Sobre &amp; Diferenciais</span>
          <span class="section-tag">Experiência VIP</span>
        </div>
        <p style="font-size:12px;color:#cbd5e1;line-height:1.55;">${aboutText}</p>
        <div class="amenities-wrap">
          ${amenities.map((am) => `<span class="amenity-chip">${am}</span>`).join('')}
        </div>
      </section>

      <!-- 8. GALERIA DE FOTOS REALISTAS EM 4K -->
      <section class="section-card">
        <div class="section-head">
          <span class="section-title">📸 Galeria Realista 4K</span>
          <span class="section-tag">Ultra HD</span>
        </div>
        <div class="gallery-grid">
          ${galleryUrls.slice(0, 4).map((gUrl) => `<img src="${gUrl}" alt="${name}" loading="lazy" />`).join('')}
        </div>
      </section>

      <!-- 9. TELA COMO CHEGAR & LOCALIZAÇÃO GPS -->
      <section id="como-chegar" class="section-card">
        <div class="section-head">
          <span class="section-title">📍 Como Chegar &amp; Horários</span>
          <span class="section-tag">Rota GPS 1-Clique</span>
        </div>
        <div class="map-visual-banner">
          <div class="map-pin-circle">📍</div>
          <strong style="font-size:13px;color:#fff;">${name}</strong>
          <span style="font-size:11px;color:#cbd5e1;margin-top:2px;">${addressText}</span>
        </div>
        <div style="font-size:11.5px;color:#cbd5e1;background:rgba(255,255,255,0.04);padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
          <div><strong>🕒 Atendimento:</strong> ${openingHours}</div>
          ${config.phone ? `<div style="margin-top:4px;"><strong>📞 Telefone:</strong> ${config.phone}</div>` : ''}
        </div>
        <div class="route-btns">
          <a href="${mapsSearchUrl}" target="_blank" rel="noopener noreferrer" class="route-btn" style="background:#ef4444;color:#fff;">
            <span>🗺️ Google Maps</span>
          </a>
          <a href="${wazeUrl}" target="_blank" rel="noopener noreferrer" class="route-btn" style="background:#0ea5e9;color:#082f49;">
            <span>🚗 Abrir no Waze</span>
          </a>
        </div>
      </section>

      <!-- 10. AVALIAÇÃO DO GOOGLE ESTILO PRINT REAL -->
      <section id="avaliacoes" class="google-print-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:40px;height:40px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <div style="font-size:14px;font-weight:900;color:#fff;">Avaliações no Google</div>
              <div style="color:#fbbf24;font-size:14px;font-weight:900;">
                ${(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)} ★★★★★
                <span style="font-size:11px;color:#cbd5e1;font-weight:600;">(${config.reviewCount || 128} avaliações)</span>
              </div>
            </div>
          </div>
          <span style="font-size:10px;font-weight:900;padding:4px 9px;border-radius:999px;background:rgba(251,191,36,0.2);color:#fde68a;border:1px solid rgba(251,191,36,0.4);"> Verificado</span>
        </div>

        <div style="margin:10px 0;">
          ${testimonials.slice(0, 2).map((t) => `
          <div class="review-snippet">
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;">
              <strong style="color:#fff;">${t.author}</strong>
              <span style="color:#fbbf24;">★★★★★ <span style="color:#64748b;font-size:10px;">${t.timeAgo || 'recente'}</span></span>
            </div>
            <p style="font-size:11px;color:#cbd5e1;margin-top:4px;line-height:1.4;">"${t.text}"</p>
          </div>
          `).join('')}
        </div>

        <a href="${reviewUrl}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:14px;background:linear-gradient(135deg,#4285F4,#34A853);color:#fff;font-size:12.5px;font-weight:900;text-decoration:none;margin-top:10px;">
          <span>⭐ Avaliar Nossa Empresa no Google (1-Clique)</span>
        </a>
      </section>

      <!-- 11. PIX, WI-FI E CANAIS RÁPIDOS -->
      <section id="pix-wifi" class="section-card">
        <div class="section-head">
          <span class="section-title">⚡ Central Rápida: Pix, Wi-Fi &amp; Redes</span>
          <span class="section-tag">1-Toque</span>
        </div>
        <div style="background:rgba(20,184,166,0.12);border:1px solid rgba(20,184,166,0.35);border-radius:16px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong style="font-size:12.5px;color:#fff;">💠 Chave Pix (${pixType})</strong>
            <span style="font-size:10px;color:#5eead4;">${pixBeneficiary}</span>
          </div>
          <div style="font-family:monospace;font-size:11.5px;color:#e2e8f0;background:rgba(0,0,0,0.35);padding:8px 10px;border-radius:10px;margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;">${pixKey}</div>
          <button type="button" onclick="navigator.clipboard.writeText('${pixKey.replace(/'/g, "\\'")}');this.innerText='✅ Chave Pix Copiada!';" style="width:100%;padding:10px;border-radius:10px;background:#14b8a6;color:#042f2e;font-weight:900;font-size:11.5px;border:none;cursor:pointer;">
            Copiar Chave Pix Agora
          </button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="padding:11px;border-radius:14px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:#fff;text-decoration:none;font-size:11.5px;font-weight:800;text-align:center;">
            💬 WhatsApp Geral
          </a>
          <a href="${instaUrl}" target="_blank" rel="noopener noreferrer" style="padding:11px;border-radius:14px;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.4);color:#fff;text-decoration:none;font-size:11.5px;font-weight:800;text-align:center;">
            📸 Instagram ${instaHandle}
          </a>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} <strong>${name}</strong> • Mini Página Oficial 4K</p>
    </footer>
  </div>
</body>
</html>`;
}

export async function generateMiniSiteStandaloneHtml(config: MiniSiteConfig): Promise<string> {
  const pixKey = config.pixKey || 'pix@empresa.com.br';
  const name = config.companyName || 'Sua Empresa';
  const wifiSsid = config.wifiSsid || `${name.replace(/\s+/g, '_')}_WiFi`;
  const wifiPass = config.wifiPassword || 'VisiteNos123';
  const wifiSec = config.wifiSecurity || 'WPA';
  const wifiQrData = `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`;

  let pixQrUrl: string | undefined;
  let wifiQrUrl: string | undefined;

  try {
    pixQrUrl = await QRCode.toDataURL(pixKey, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#042f2e', light: '#ffffff' }
    });
  } catch (err) {
    console.warn('QRCode generation for Pix failed, using fallback:', err);
  }

  try {
    wifiQrUrl = await QRCode.toDataURL(wifiQrData, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#082f49', light: '#ffffff' }
    });
  } catch (err) {
    console.warn('QRCode generation for Wi-Fi failed, using fallback:', err);
  }

  return generateMiniSiteHtml(config, { pixQrUrl, wifiQrUrl });
}

export async function downloadMiniSiteHtml(config: MiniSiteConfig, filename?: string): Promise<void> {
  const htmlContent = await generateMiniSiteStandaloneHtml(config);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `index.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadMiniSiteZip(config: MiniSiteConfig, filename?: string): Promise<void> {
  const zip = new JSZip();
  const htmlContent = await generateMiniSiteStandaloneHtml(config);
  const safeName = (config.companyName || 'minisite').toLowerCase().replace(/[^a-z0-9]/g, '_');

  zip.file('index.html', htmlContent);
  zip.file('configuracao_empresa.json', JSON.stringify(config, null, 2));

  const readmeContent = `========================================================================
MINI SITE ESTÁTICO AUTÔNOMO 4K - ${config.companyName || 'Sua Empresa'}
========================================================================
1. Acesse https://app.netlify.com/drop
2. Arraste este arquivo ZIP ou o index.html para publicar gratuitamente!
`;
  zip.file('README.txt', readmeContent);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `minisite_${safeName}_completo.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function openMiniSiteLivePreview(config: MiniSiteConfig): Promise<void> {
  const htmlContent = await generateMiniSiteStandaloneHtml(config);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

export async function copyMiniSiteHtmlToClipboard(config: MiniSiteConfig): Promise<boolean> {
  try {
    const htmlContent = await generateMiniSiteStandaloneHtml(config);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(htmlContent);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to copy HTML:', e);
    return false;
  }
}

export function generateClientShareMessage(config: MiniSiteConfig, hostingUrl?: string): string {
  const name = config.companyName || 'Sua Empresa';
  const url = hostingUrl || 'https://seumini-site.com';
  return `Olá, tudo bem? 🚀

Aqui está a nova *Mini Página Inovadora 4K* de *${name}*!

✨ *O que está incluso na sua página:*
🖼️ Capa Hero em 4K + Logotipo + Horário de Atendimento em destaque
🔥 Letreiro dinâmico com frase de destaque passando
🍽️ Vitrine de Destaques & Cardápio/Catálogo do seu segmento
📍 Tela "Como Chegar" com rota 1-clique no Google Maps e Waze
⭐ Avaliação 5 Estrelas no Google com depoimentos reais
⚡ Pagamento via Pix e Wi-Fi com QR Code

${hostingUrl ? `🔗 Acesse a demonstração online: ${url}\n` : ''}Qualquer dúvida estamos à disposição!`;
}
