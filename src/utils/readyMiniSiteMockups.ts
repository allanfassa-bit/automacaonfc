import { MiniSiteConfig } from './miniSiteExporter';

export interface ReadyMockupTemplate {
  id: string;
  category: string;
  title: string;
  emoji: string;
  badge: string;
  tagline: string;
  accentColor: string;
  coverImage: string;
  config: MiniSiteConfig;
}

export const ALF_LOGO_DATA_URI = '/alf-logo.jpg';

export const MEDICAL_LOGO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="medBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f292a" />
      <stop offset="50%" stop-color="#0a1d1e" />
      <stop offset="100%" stop-color="#061214" />
    </linearGradient>
    <linearGradient id="medGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f3e5ab" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#aa8220" />
    </linearGradient>
    <linearGradient id="medTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#0d9488" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="64" fill="url(#medBg)" />
  <circle cx="200" cy="165" r="92" fill="none" stroke="url(#medGold)" stroke-width="2.5" opacity="0.85" />
  <circle cx="200" cy="165" r="82" fill="none" stroke="url(#medTeal)" stroke-width="1" stroke-dasharray="4 4" opacity="0.6" />
  <!-- Medical Cross + Lotus Crest -->
  <path d="M200 105 L200 225 M165 145 L235 145" stroke="url(#medGold)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M200 120 C172 138 172 178 200 205 C228 178 228 138 200 120 Z" fill="none" stroke="url(#medTeal)" stroke-width="3" />
  <path d="M200 135 C155 150 155 185 200 205 C245 185 245 150 200 135 Z" fill="none" stroke="url(#medGold)" stroke-width="2" opacity="0.85" />
  <circle cx="200" cy="100" r="6" fill="url(#medTeal)" />
  <text x="200" y="298" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="25" font-weight="bold" letter-spacing="4">PRIME MED</text>
  <text x="200" y="326" text-anchor="middle" fill="#5eead4" font-family="Arial, sans-serif" font-size="12.5" font-weight="bold" letter-spacing="3.5">DRA. HELENA VASCONCELOS</text>
  <text x="200" y="348" text-anchor="middle" fill="#d4af37" font-family="Arial, sans-serif" font-size="10" letter-spacing="3">MEDICINA &amp; LONGEVIDADE • CRM 184.920</text>
</svg>
`);

export const AESTHETICS_LOGO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="aesBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b1e2e" />
      <stop offset="50%" stop-color="#28131f" />
      <stop offset="100%" stop-color="#190b13" />
    </linearGradient>
    <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbe4eb" />
      <stop offset="45%" stop-color="#e899a8" />
      <stop offset="100%" stop-color="#c59b6d" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="64" fill="url(#aesBg)" />
  <circle cx="200" cy="162" r="90" fill="none" stroke="url(#roseGold)" stroke-width="2.2" opacity="0.9" />
  <circle cx="200" cy="162" r="80" fill="none" stroke="url(#roseGold)" stroke-width="0.9" opacity="0.45" />
  <!-- Minimalist Luxury Facial Line Art & Lotus Star -->
  <path d="M192 98 C175 112 170 132 178 148 C182 156 173 165 170 171 C168 175 176 178 180 181 C177 187 183 193 180 198 C176 206 188 216 204 220" fill="none" stroke="url(#roseGold)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M210 112 C232 128 236 165 214 198" fill="none" stroke="url(#roseGold)" stroke-width="2" stroke-linecap="round" opacity="0.75" />
  <path d="M225 118 L228 126 L236 129 L228 132 L225 140 L222 132 L214 129 L222 126 Z" fill="url(#roseGold)" />
  <text x="200" y="296" text-anchor="middle" fill="#fdf8f5" font-family="Georgia, serif" font-size="24" font-weight="bold" letter-spacing="4.5">MAISON LUMIÈRE</text>
  <text x="200" y="324" text-anchor="middle" fill="#f4a9b8" font-family="Arial, sans-serif" font-size="12" font-weight="bold" letter-spacing="3.5">ESTÉTICA FACIAL &amp; SKINCARE</text>
  <text x="200" y="346" text-anchor="middle" fill="#dcb098" font-family="Arial, sans-serif" font-size="10" letter-spacing="2.8">HARMONIZAÇÃO • BOTOX • BIOESTIMULADORES</text>
</svg>
`);

export const BROW_LOGO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="browBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3a2e29" />
      <stop offset="50%" stop-color="#2c221e" />
      <stop offset="100%" stop-color="#1e1714" />
    </linearGradient>
    <linearGradient id="nudeGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5ebe1" />
      <stop offset="50%" stop-color="#d5b399" />
      <stop offset="100%" stop-color="#b07d62" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="199" fill="url(#browBg)" />
  <circle cx="200" cy="200" r="182" fill="none" stroke="url(#nudeGold)" stroke-width="2" opacity="0.75" />
  <circle cx="200" cy="155" r="76" fill="none" stroke="url(#nudeGold)" stroke-width="1.2" opacity="0.4" />
  <!-- Sleek Brow Arch & Lash Curves -->
  <path d="M138 148 C168 122 214 120 262 142 C232 132 182 134 138 148 Z" fill="url(#nudeGold)" />
  <path d="M152 168 C180 184 220 184 248 168" fill="none" stroke="url(#nudeGold)" stroke-width="3" stroke-linecap="round" />
  <path d="M168 176 L162 190 M184 181 L181 196 M200 183 L200 198 M216 181 L219 196 M232 176 L238 190" stroke="url(#nudeGold)" stroke-width="2.2" stroke-linecap="round" />
  <text x="200" y="282" text-anchor="middle" fill="#f5ebe1" font-family="Georgia, serif" font-size="25" letter-spacing="5">BELLE REGARD</text>
  <text x="200" y="310" text-anchor="middle" fill="#d5b399" font-family="Georgia, serif" font-style="italic" font-size="16" letter-spacing="2">Beauty &amp; Brow Studio</text>
  <text x="200" y="336" text-anchor="middle" fill="#b08d76" font-family="Arial, sans-serif" font-size="9.5" font-weight="bold" letter-spacing="2.8">SOBRANCELHAS • MICROPIGMENTAÇÃO • LASHES</text>
</svg>
`);

export const WM_ALIMENTOS_LOGO_DATA_URI = '/assets/aistudio/IMG-20261019-WA0097_d14d3a71.jpg';
export const WLADMIR_PHOTO_URL = '/assets/aistudio/IMG-20261021-WA0038_a3281e7b.jpg';
export const ALLAN_FASSA_PHOTO_URL = '/assets/aistudio/AISelect_20261022_085549_LinkedIn_a5e8b359.jpg';
export const NIVALDO_PHOTO_URL = '/assets/aistudio/file_000000002d1c820e8f061b8a1be1fc2d_2f5a91e6.png';
export const CORRETOR_PHOTO_URL = NIVALDO_PHOTO_URL;

export const READY_MINISITE_MOCKUPS: ReadyMockupTemplate[] = [
  {
    id: 'alf_automacoes',
    category: 'Oficial ALF Automation',
    title: 'ALF Automation • IA, Estratégia Digital & Gestão de Vendas',
    emoji: '⚡',
    badge: '★ OFICIAL ALF AUTOMATION',
    tagline: 'Placas de Avaliação Google NFC, Cartão de Visita Inteligente, Mini Sites de Apresentação, Sites Institucionais e Automação Comercial.',
    accentColor: '#0ea5e9',
    coverImage: ALF_LOGO_DATA_URI,
    config: {
      id: 'alf_automacoes',
      companyName: 'ALF Automation',
      founderName: 'Allan Fassa',
      founderRole: 'Fundador & Diretor de Tecnologia • ALF Automation',
      founderTagline: 'Inteligência Artificial • Estratégia Digital • Gestão de Vendas',
      portraitImageUrl: ALLAN_FASSA_PHOTO_URL,
      niche: 'Inteligência Artificial • Estratégia Digital • Gestão de Vendas',
      city: 'Atendimento em Todo o Brasil',
      segmentType: 'geral',
      showInteractiveMenu: false,
      primaryColor: '#0ea5e9',
      fontFamily: 'space',
      theme: 'cyber_blue',
      coverImageUrl: ALF_LOGO_DATA_URI,
      tagline: 'Multiplicamos o faturamento e as avaliações 5★ da sua empresa no Google com IA, Placas NFC de Aproximação e Mini Sites de Alta Conversão.',
      logoUrl: ALF_LOGO_DATA_URI,
      marqueeText: '⚡ ALF AUTOMATION • ⭐ PLACAS DE AVALIAÇÃO GOOGLE NFC • 💳 CARTÃO DE VISITA INTELIGENTE NFC • 🌐 BIO SITES & SITES INSTITUCIONAIS DE ALTA CONVERSÃO ⭐',
      aboutText: 'A ALF Automation une Inteligência Artificial, Estratégia Digital e Gestão de Vendas para posicionar sua empresa no topo do Google e acelerar seu fechamento no WhatsApp em 1 toque.',
      amenities: [
        '🌐 Bio Sites & Sites Institucionais de Alta Conversão',
        '⭐ Placas de Avaliação Google NFC: Topo do Google Maps',
        '💳 Cartão de Visita NFC: Autoridade Instantânea sem Papel',
        '📲 Redirecionamento Dinâmico em Nuvem 24h'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 't_alf_minisite_1',
          author: 'Dra. Camila Vasconcelos',
          role: 'Clínica Médica & Estética • Bio Site + Cartão NFC',
          impactBadge: '🌐 Mini Site • +280% Agendamentos no WhatsApp',
          avatarUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=85',
          text: 'O Mini Site de Apresentação com vídeo e meus procedimentos em destaque mudou o patamar da clínica! As pacientes encostam no meu Cartão NFC ou clicam no link da bio e já chamam no WhatsApp decididas a agendar.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 't_alf_minisite_2',
          author: 'Dr. Henrique Albuquerque',
          role: 'Consultoria Imobiliária & Negócios • Mini Site Pro',
          impactBadge: '💼 Mini Site • 3x Mais Autoridade e Fechamentos',
          avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=85',
          text: 'Antes eu perdia clientes mandando fotos soltas e PDFs pesados. Com o Mini Site da ALF Automation, apresento meu portfólio, localização e contato em 1 clique. Triplicou nossa taxa de fechamento no WhatsApp!',
          rating: 5,
          timeAgo: 'há 4 dias'
        },
        {
          id: 't_alf_placa_1',
          author: 'Carlos Eduardo Mendes',
          role: 'Proprietário • Gastronomia & Bistrô (Google Verificado)',
          impactBadge: '⭐ Placa Google NFC • De 42 para 384 Avaliações 5★',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85',
          text: 'Coloquei as Placas NFC de Avaliação do Google da ALF Automation nas mesas e no caixa. Os clientes encostam o celular e avaliam em 3 segundos. Saltamos de 42 para 384 avaliações 5 estrelas em 60 dias e dominamos o Google Maps!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vi o Mini Site da ALF Automation e gostaria de consultar sobre Mini Site, Site Institucional, Cartão NFC e Placa do Google para o meu negócio!',
      instagramUrl: 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 184,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com',
      pixKey: '',
      pixBeneficiary: 'ALF Automation',
      pixKeyType: 'cnpj',
      wifiSsid: 'ALF_Automation_VIP',
      wifiPassword: 'AlfTecnologia2026',
      address: 'Atendimento Digital e Envio de Placas & Cartões NFC para Todo o Brasil',
      phone: '(14) 98130-4973',
      openingHours: 'Segunda a Sexta: 08h às 19h | Sábado: 09h às 14h',
      services: [
        {
          id: 'serv_minisite',
          title: 'Mini Site & Bio Site de Alta Conversão',
          category: 'Sites & Bio Sites',
          price: 'Sob Consulta',
          description: 'Página exclusiva com animações GSAP, vitrine de serviços ou imóveis, botão 1-clique para WhatsApp, Instagram, localização GPS e avaliações do Google.',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de consultar e falar diretamente no WhatsApp sobre um Mini Site / Bio Site para o meu negócio!'
        },
        {
          id: 'serv_placa',
          title: 'Placa de Avaliação Google NFC 5★',
          category: 'Google & NFC',
          price: 'Sob Consulta',
          description: 'Acrílico cast premium com chip NFC de aproximação instantânea + QR Code dinâmico. Multiplique as avaliações 5 estrelas e domine o Google Meu Negócio.',
          imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de consultar diretamente no WhatsApp sobre a Placa de Avaliação Google NFC 5★!'
        },
        {
          id: 'serv_cartao',
          title: 'Cartão de Visita Inteligente NFC',
          category: 'Cartões de Visita',
          price: 'Sob Consulta',
          description: 'Cartão tecnológico de aproximação com chip inteligente conectado ao seu Bio Site. Compartilhe seu contato, WhatsApp, Instagram e catálogo em 0.3s.',
          imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de consultar no WhatsApp sobre o Cartão de Visita NFC Inteligente com Bio Site!'
        },
        {
          id: 'serv_institucional_google',
          title: 'Site Institucional & Posicionamento Google',
          category: 'Site & Google',
          price: 'Sob Consulta',
          description: 'Desenvolvimento de Site Institucional completo + estruturação estratégica no Google para atrair clientes qualificados todos os dias.',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero consultar diretamente com você sobre Site Institucional e posicionamento no Google!'
        }
      ]
    }
  },
  {
    id: 'modelo_corretor_demo',
    category: 'Corretor de Imóveis & Imobiliária',
    title: 'Modelo Corretor • Imóveis de Alto Padrão',
    emoji: '🏢',
    badge: '★ MODELO CORRETOR DE IMÓVEIS',
    tagline: 'Demonstração para Corretores e Imobiliárias: 4 imóveis em destaque com fotos, valores, CRECI e agendamento de visita 1-clique no WhatsApp.',
    accentColor: '#c59b27',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'modelo_corretor_demo',
      companyName: 'Ricardo Alencar',
      companyBrandName: 'Prime Realty • Imóveis de Alto Padrão',
      personRole: 'CRECI 184.520-F • Imóveis de Alto Padrão',
      calligraphyTitle: 'Luxury Real Estate Portfolio',
      niche: 'Corretor de Imóveis • Condomínios & Alto Padrão',
      city: 'São Paulo & Interior - SP',
      segmentType: 'geral',
      showInteractiveMenu: false,
      primaryColor: '#c59b27',
      fontFamily: 'jakarta',
      theme: 'corretor_luxury_gold',
      personalProfileLayout: true,
      portraitImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
      heroStats: [
        { value: '+120 Imóveis', label: 'Negociados' },
        { value: '4 Destaques', label: 'Portfólio Exclusivo' },
        { value: '1-Clique', label: 'Agendar Visita' }
      ],
      nichePalette: {
        primary: '#c59b27',
        secondary: '#292524',
        bg: '#faf8f5',
        cardBg: '#ffffff',
        text: '#1c1917',
        accent: '#d4af37',
        badgeText: 'Dourado & Marfim Imobiliário'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Consultoria especializada na compra, venda e avaliação de residências em condomínio fechado e coberturas de alto padrão.',
      logoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=85',
      marqueeText: '🏢 CONSULTORIA IMOBILIÁRIA DE ALTO PADRÃO • VITRINE DE IMÓVEIS EXCLUSIVOS • AGENDAMENTO DE VISITAS NO WHATSAPP ⭐',
      aboutText: 'Apresente seus imóveis de forma impecável no celular do seu cliente. Este modelo exclusivo para Corretores de Imóveis reúne sua foto profissional, registro CRECI, redes sociais, salvar contato na agenda e vitrine interativa de imóveis com botão direto para agendar visita no WhatsApp.',
      amenities: [
        '🏛️ Vitrine Interativa com Fotos e Valores dos Imóveis',
        '📜 Destaque de Autoridade para Nome e Registro CRECI',
        '📲 Botão Agendar Visita Direto no WhatsApp do Corretor',
        '💳 Compatível com Cartão de Visita Inteligente NFC'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 't_demo_corr_1',
          author: 'Marcelo Vasconcelos',
          role: 'Comprador • Condomínio Alphaville',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85',
          text: 'Recebi o Bio Site pelo WhatsApp, vi os 4 imóveis selecionados com fotos e valores claros e já agendei a visita em 1 clique. Atendimento de altíssimo nível!',
          rating: 5,
          timeAgo: 'há 3 dias'
        },
        {
          id: 't_demo_corr_2',
          author: 'Patrícia Siqueira',
          role: 'Investidora Imobiliária',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=85',
          text: 'Muita praticidade! Encostei o celular no cartão NFC do corretor durante a reunião e já salvei o contato e os imóveis favoritos.',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vi o Modelo de Corretor de Imóveis na ALF Automation e gostaria de solicitar um site desse modelo para mim!',
      instagramUrl: 'https://www.instagram.com/alfautomation',
      instagramHandle: '@ricardoalencar.imoveis',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 142,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com',
      pixKey: '',
      pixBeneficiary: 'Consultoria Imobiliária',
      pixKeyType: 'cnpj',
      wifiSsid: 'Imobiliaria_VIP',
      wifiPassword: 'Imoveis2026',
      address: 'Atendimento Presencial & Digital • Condomínios de Alto Padrão',
      phone: '(14) 98130-4973',
      openingHours: 'Segunda a Sábado: 08h30 às 19h30',
      services: [
        {
          id: 'demo_imovel_1',
          title: 'Mansão Contemporânea Alphaville • 5 Suítes',
          category: 'Condomínio Fechado',
          price: 'R$ 5.900.000',
          description: '640m² de área construída, living com pé-direito duplo, espaço gourmet integrado e piscina aquecida com borda infinita.',
          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo de Corretor de Imóveis e quero solicitar um site igual a este!'
        },
        {
          id: 'demo_imovel_2',
          title: 'Cobertura Duplex Vista Parque • 4 Suítes',
          category: 'Alto Padrão Urbano',
          price: 'R$ 3.850.000',
          description: '410m² privativos, terraço panorâmico com jacuzzi, elevador privativo, acabamentos em mármore e 5 vagas.',
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo de Corretor de Imóveis e quero solicitar um site igual a este!'
        },
        {
          id: 'demo_imovel_3',
          title: 'Residência Arquitetura Moderna • 4 Suítes',
          category: 'Condomínio Clube',
          price: 'R$ 4.490.000',
          description: 'Automação completa de iluminação e persianas, energia fotovoltaica, adega climatizada e paisagismo assinado.',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo de Corretor de Imóveis e quero solicitar um site igual a este!'
        },
        {
          id: 'demo_imovel_4',
          title: 'Villa Garden Térrea c/ Gourmet • 4 Suítes',
          category: 'Conceito Aberto',
          price: 'R$ 3.290.000',
          description: '360m² térrea integrada ao jardim, varanda gourmet com churrasqueira parrillera, piscina aquecida e segurança 24h.',
          imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo de Corretor de Imóveis e quero solicitar um site igual a este!'
        }
      ]
    }
  },
  {
    id: 'modelo_bio_pessoal_demo',
    category: 'Bio Pessoal & Executivo',
    title: 'Modelo Bio Pessoal • Cartão Digital & Autoridade',
    emoji: '👔',
    badge: '★ MODELO BIO PESSOAL & EXECUTIVO',
    tagline: 'Demonstração de Bio Pessoal para empresários, advogados, consultores e liberais com foto, redes sociais, vCard na agenda e portfólio.',
    accentColor: '#f59e0b',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'modelo_bio_pessoal_demo',
      companyName: 'Lucas Andrade',
      companyBrandName: 'Andrade & Associados • Consultoria',
      personRole: 'Diretor Executivo & Consultor Estratégico',
      calligraphyTitle: 'Executive Digital Profile',
      niche: 'Consultoria Empresarial • Palestras & Negócios',
      city: 'São Paulo - SP',
      segmentType: 'geral',
      showInteractiveMenu: false,
      primaryColor: '#f59e0b',
      fontFamily: 'jakarta',
      theme: 'personal_executive',
      personalProfileLayout: true,
      portraitImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
      heroStats: [
        { value: '15+ Anos', label: 'Experiência' },
        { value: '1-Clique', label: 'Salvar Contato' },
        { value: '100% NFC', label: 'Cartão Inteligente' }
      ],
      nichePalette: {
        primary: '#f59e0b',
        secondary: '#0b0806',
        bg: '#070605',
        cardBg: '#120f0d',
        text: '#f8fafc',
        accent: '#fbbf24',
        badgeText: 'Executive Gold & Obsidian'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Gestão estratégica de negócios, consultoria executiva e desenvolvimento de parcerias comerciais de alto impacto. Conecte-se comigo em 1 clique.',
      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
      marqueeText: '👔 MODELO BIO PESSOAL & EXECUTIVO • CARTÃO DE VISITA NFC • SALVAR NA AGENDA 1-CLIQUE • WHATSAPP & INSTAGRAM ⭐',
      aboutText: 'Este é o modelo de Bio Pessoal & Cartão Digital Executivo da ALF Automation. Perfeito para empresários, advogados, arquitetos, representantes comerciais e profissionais liberais que desejam transmitir autoridade imediata ao aproximar o Cartão NFC ou compartilhar o link na bio.',
      amenities: [
        '📲 Salvar Contato na Agenda do Celular (vCard 1-Clique)',
        '💬 Botão Direto para WhatsApp e Instagram Profissional',
        '🏆 Apresentação de Serviços, Palestras ou Empresas do Grupo',
        '💳 Integração Total com Cartão de Visita Físico NFC'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 't_demo_bio_1',
          author: 'Roberto Vasconcelos',
          role: 'CEO • Grupo Vértice',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85',
          text: 'Em eventos de networking, encosto meu cartão NFC no celular do cliente e meu Bio Pessoal abre na hora. Todo mundo elogia o profissionalismo!',
          rating: 5,
          timeAgo: 'há 2 dias'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vi o Modelo de Bio Pessoal & Executivo na ALF Automation e gostaria de solicitar um site desse modelo!',
      instagramUrl: 'https://www.instagram.com/alfautomation',
      instagramHandle: '@seuperfil.oficial',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 164,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com',
      pixKey: '',
      pixBeneficiary: 'Andrade Consultoria',
      pixKeyType: 'cnpj',
      wifiSsid: 'Escritorio_VIP',
      wifiPassword: 'Executivo2026',
      address: 'Av. Paulista, 2000 - Bela Vista, São Paulo - SP',
      phone: '(14) 98130-4973',
      openingHours: 'Segunda a Sexta: 09h às 18h30',
      services: [
        {
          id: 'bio_srv_1',
          title: 'Consultoria & Mentoria Executiva',
          category: 'Atuação Principal',
          price: 'Agendar Reunião',
          description: 'Planejamento estratégico, expansão comercial e acompanhamento executivo personalizado para empresas.',
          imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo Bio Pessoal e quero solicitar um site igual a este!'
        },
        {
          id: 'bio_srv_2',
          title: 'Palestras, Eventos & Parcerias',
          category: 'Networking & Negócios',
          price: 'Falar no WhatsApp',
          description: 'Contato direto para convites corporativos, parcerias estratégicas e projetos especiais.',
          imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Vi o Modelo Bio Pessoal e quero solicitar um site igual a este!'
        }
      ]
    }
  },
  {
    id: 'bio_medica',
    category: 'Área Médica & Clínicas',
    title: 'Bio Site Médico • Dra. Helena Vasconcelos (Prime Med)',
    emoji: '🩺',
    badge: '★ BIO SITE MÉDICO CLEAN',
    tagline: 'Paleta Esmeralda Clínico & Pérola: vídeo imersivo + GSAP Scroll, logo médica, o que a clínica faz, 4 serviços e 1-clique.',
    accentColor: '#0d9488',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'bio_medica',
      companyName: 'Dra. Helena Vasconcelos • Prime Med',
      calligraphyTitle: 'Medicina & Longevidade',
      niche: 'Clínica Médica • Diagnóstico & Longevidade Saudável',
      city: 'São Paulo - SP',
      segmentType: 'saude_clinica',
      showInteractiveMenu: false,
      primaryColor: '#0d9488',
      fontFamily: 'playfair',
      theme: 'clean_medical',
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-doctor-working-on-his-laptop-in-his-office-41409-large.mp4',
      portraitImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85',
      editorialPricelistLayout: false,
      heroStats: [
        { value: '12+ Anos', label: 'Experiência Médica' },
        { value: '+4.200', label: 'Pacientes Atendidos' },
        { value: 'CRM 184.920', label: 'Título de Especialista' }
      ],
      nichePalette: {
        primary: '#0d9488',
        secondary: '#0f292a',
        bg: '#f2f7f7',
        cardBg: '#ffffff',
        text: '#0f292a',
        accent: '#d4af37',
        badgeText: 'Esmeralda Clínico & Marfim'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Medicina integrativa de precisão, check-up executivo e cuidado médico individualizado em ambiente exclusivo e acolhedor.',
      logoUrl: MEDICAL_LOGO_DATA_URI,
      marqueeText: '🩺 DRA. HELENA VASCONCELOS • CRM 184.920 • MEDICINA PREVENTIVA & LONGEVIDADE • AGENDAMENTO 1-CLIQUE NO WHATSAPP 🩺',
      aboutText: 'Na Clínica Prime Med, sob direção da Dra. Helena Vasconcelos, unimos ciência médica atualizada, diagnóstico de alta precisão e escuta ativa para cuidar da sua saúde de forma integral. Nosso foco é identificar a raiz de cada sintoma, otimizar sua energia, metabolismo e longevidade com protocolos médicos seguros, personalizados e baseados em evidências.',
      amenities: [
        '🩺 Consultas Médicas Detalhadas e Humanizadas',
        '🔬 Exames de Bioimpedância & Check-up no Local',
        '🧬 Protocolos Individualizados de Longevidade',
        '💻 Telemedicina & Suporte Direto Pós-Consulta',
        '🅿️ Estacionamento c/ Manobrista & Acessibilidade'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 'rmed1',
          author: 'Patrícia Albuquerque',
          role: 'Paciente Verificada • Google 5 Estrelas',
          text: 'A Dra. Helena é uma médica extraordinária! Consulta super detalhada, atenciosa e com visão completa da saúde. A clínica é impecável e super acolhedora.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'rmed2',
          author: 'Dr. Roberto Magalhães',
          role: 'Local Guide • Google',
          text: 'Excelência desde a recepção até o acompanhamento médico pós-consulta. Meu check-up e protocolo de longevidade transformaram minha disposição diária.',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vim pelo Bio Site da Dra. Helena Vasconcelos (Prime Med) e gostaria de agendar uma consulta médica.',
      instagramUrl: 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 318,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com/?minisite=medica',
      pixKey: '',
      pixBeneficiary: 'Prime Med Clínica Médica Ltda',
      pixKeyType: 'cnpj',
      wifiSsid: 'PrimeMed_Pacientes',
      wifiPassword: 'SaudePlena2026',
      address: 'Av. Brigadeiro Faria Lima, 3477 - Torre Sul, Sala 1402 - Itaim Bibi, São Paulo - SP',
      phone: '(14) 98130-4973',
      openingHours: 'Segunda a Sexta: 08h às 19h | Sábado: 08h às 13h',
      services: [
        {
          id: 'med_1',
          title: 'Consulta Médica & Check-up Integrativo',
          category: 'Consultas & Diagnóstico',
          price: 'Agendar Horário',
          description: 'Anamnese clínica aprofundada, avaliação metabólica completa, solicitação de exames específicos e plano médico individualizado.',
          imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma Consulta Médica & Check-up Integrativo com a Dra. Helena.'
        },
        {
          id: 'med_2',
          title: 'Protocolos de Longevidade & Metabolismo',
          category: 'Longevidade Saudável',
          price: 'Plano Personalizado',
          description: 'Acompanhamento médico focado em performance física e mental, equilíbrio metabólico, qualidade do sono e prevenção ativa.',
          imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero saber mais sobre os Protocolos de Longevidade & Saúde Metabólica.'
        },
        {
          id: 'med_3',
          title: 'Bioimpedância & Diagnóstico de Precisão',
          category: 'Exames na Clínica',
          price: 'Avaliação Clínica',
          description: 'Análise de composição corporal de última geração (massa magra, gordura visceral, hidratação celular e taxa metabólica).',
          imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar o exame de Bioimpedância & Diagnóstico na clínica.'
        },
        {
          id: 'med_4',
          title: 'Telemedicina & Acompanhamento VIP',
          category: 'Atendimento Online',
          price: 'Consulta Online',
          description: 'Consultas médicas por vídeo em alta definição com prescrição digital certificada e canal direto de suporte com a equipe médica.',
          imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma consulta por Telemedicina com a Dra. Helena.'
        }
      ]
    }
  },
  {
    id: 'bio_estetica_facial',
    category: 'Estética Facial & Skincare Luxury',
    title: 'Bio Site Estética Facial • Maison Lumière (Velvet & Rose)',
    emoji: '✨',
    badge: '★ BIO SITE ESTÉTICA LUXO',
    tagline: 'Paleta Velvet Plum, Blush Rose & Champagne (inspirado no modelo Beauty Skincare) com vídeo GSAP imersivo e 4 procedimentos.',
    accentColor: '#d47a92',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'bio_estetica_facial',
      companyName: 'Maison Lumière • Estética Facial',
      calligraphyTitle: 'Beauty & Natural Skincare',
      niche: 'Harmonização Facial • Injetáveis & Skincare Avançado',
      city: 'São Paulo - SP',
      segmentType: 'saude_clinica',
      showInteractiveMenu: false,
      primaryColor: '#d47a92',
      fontFamily: 'playfair',
      theme: 'velvet_skincare',
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-receiving-a-facial-treatment-at-a-spa-41913-large.mp4',
      portraitImageUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=900&q=85',
      editorialPricelistLayout: false,
      heroStats: [
        { value: '10+ Anos', label: 'De Experiência' },
        { value: '+3.500', label: 'Faces Realçadas' },
        { value: '100% VIP', label: 'Protocolos Naturais' }
      ],
      nichePalette: {
        primary: '#d47a92',
        secondary: '#3b1e2e',
        bg: '#faf3eb',
        cardBg: '#ffffff',
        text: '#2e1623',
        accent: '#c59b6d',
        badgeText: 'Velvet Plum & Blush Rose'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Realçamos sua beleza autêntica com Harmonização Facial sutil, Bioestimuladores de Colágeno e Tecnologias Dermatofuncionais de padrão internacional.',
      logoUrl: AESTHETICS_LOGO_DATA_URI,
      marqueeText: '✨ MAISON LUMIÈRE ESTÉTICA FACIAL • HARMONIZAÇÃO NATURAL • BOTOX® & BIOESTIMULADORES • ULTRAFORMER MPT & LAVIEEN ✨',
      aboutText: 'A Maison Lumière é uma clínica boutique dedicada exclusivamente à Estética Facial Avançada, Skincare Regenerativo e Rejuvenescimento com Naturalidade. Realizamos um mapeamento facial tridimensional para desenhar protocolos únicos — combinando Toxina Botulínica, Ácido Hialurônico de grife suíça, Bioestimuladores de Colágeno e Lasers de última geração para entregar uma pele firme, iluminada e elegante sem exageros.',
      amenities: [
        '✨ Especialistas em Harmonização Facial Natural',
        '💎 Produtos Premium Importados & Certificados ANVISA',
        '🔬 Tecnologias Oficiais: Ultraformer MPT & Laser Lavieen',
        '🥂 Experiência Boutique com Suítes de Atendimento Privativas',
        '📍 Localização Nobre com Estacionamento Privativo'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 'raes1',
          author: 'Beatriz Monteiro',
          role: 'Paciente Verificada • Google 5 Estrelas',
          text: 'Fiz meu protocolo Full Face de Harmonização e Bioestimulador de Colágeno na Maison Lumière. O resultado ficou incrivelmente natural e elegante, exatamente como eu sonhava!',
          rating: 5,
          timeAgo: 'há 1 dia'
        },
        {
          id: 'raes2',
          author: 'Carolina Fontes',
          role: 'Local Guide • Google',
          text: 'Ambiente sofisticado, atendimento impecável e mão super leve no Botox e preenchimento labial. Melhor clínica de estética facial!',
          rating: 5,
          timeAgo: 'há 4 dias'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vim pelo Bio Site da Maison Lumière Estética Facial e gostaria de agendar uma avaliação personalizada.',
      instagramUrl: 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 412,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com/?minisite=estetica',
      pixKey: '',
      pixBeneficiary: 'Maison Lumière Estética Facial Ltda',
      pixKeyType: 'cnpj',
      wifiSsid: 'MaisonLumiere_VIP',
      wifiPassword: 'Glow2026',
      address: 'Rua Oscar Freire, 1120 - Jardins, São Paulo - SP',
      phone: '(14) 98130-4973',
      openingHours: 'Segunda a Sexta: 09h às 20h | Sábado: 09h às 15h',
      services: [
        {
          id: 'aes_1',
          title: 'Harmonização Facial & Full Face Natural',
          category: 'Harmonização & Contorno',
          price: 'Avaliação Exclusiva',
          description: 'Estruturação delicada de malar, mento, mandíbula, olheiras e preenchimento labial com ácido hialurônico premium para realçar seus traços sem perder a naturalidade.',
          imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma avaliação para Harmonização Facial & Full Face Natural.'
        },
        {
          id: 'aes_2',
          title: 'Toxina Botulínica (Botox® Preventivo & Global)',
          category: 'Rejuvenescimento Facial',
          price: 'Agendar Sessão',
          description: 'Suavização precisa de linhas de expressão na testa, glabela e área dos olhos, promovendo descanso ao olhar e efeito lifting natural com retorno incluso.',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero saber mais e agendar minha aplicação de Toxina Botulínica (Botox).'
        },
        {
          id: 'aes_3',
          title: 'Bioestimuladores de Colágeno (Sculptra® / Radiesse®)',
          category: 'Firmeza & Colágeno',
          price: 'Protocolo Premium',
          description: 'Ativação intensa da produção natural de colágeno, combatendo a flacidez facial, melhorando a espessura dérmica e devolvendo o viço da pele jovem.',
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Tenho interesse no protocolo de Bioestimuladores de Colágeno e quero agendar avaliação.'
        },
        {
          id: 'aes_4',
          title: 'Tecnologias Faciais (Ultraformer MPT & Lavieen)',
          category: 'Lasers & Lifting Sem Cortes',
          price: 'Alta Tecnologia',
          description: 'Lifting facial não cirúrgico por ultrassom microfocado (efeito bichectomia e contorno) associado ao laser Lavieen para textura de pele de porcelana.',
          imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma sessão de Ultraformer MPT / Laser Lavieen!'
        }
      ]
    }
  },
  {
    id: 'bio_sobrancelha',
    category: 'Sobrancelhas, Micropigmentação & Cílios',
    title: 'Bio Site Beauty Studio • Sobrancelhas & Micropigmentação',
    emoji: '👁️',
    badge: '★ EDITORIAL BEAUTY STUDIO',
    tagline: 'Design System Editorial Nude Greige & Espresso (inspirado no modelo Beauty Studio Pricelist) com vídeo GSAP, foto em arco e 4 serviços.',
    accentColor: '#9c6b53',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'bio_sobrancelha',
      companyName: 'Belle Regard • Beauty & Brow Studio',
      calligraphyTitle: 'Beauty Studio & Pricelist',
      niche: 'Sobrancelhas • Micropigmentação Realista & Lash Design',
      city: 'São Paulo - SP',
      segmentType: 'servicos_beleza',
      showInteractiveMenu: false,
      primaryColor: '#9c6b53',
      fontFamily: 'playfair',
      theme: 'editorial_brow',
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-having-her-eyebrows-done-41908-large.mp4',
      portraitImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
      editorialPricelistLayout: true,
      heroStats: [
        { value: '8+ Anos', label: 'Visagismo do Olhar' },
        { value: '+5.000', label: 'Olhares Transformados' },
        { value: '5.0 ★', label: 'Avaliação Google' }
      ],
      nichePalette: {
        primary: '#9c6b53',
        secondary: '#2c221e',
        bg: '#eae2d9',
        cardBg: '#f8f5f0',
        text: '#2c221e',
        accent: '#b87b62',
        badgeText: 'Editorial Nude & Espresso'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Especialistas na arquitetura do olhar: Micropigmentação Fio a Fio hiper-realista, Brow Lamination, Lash Lifting e Revitalização Labial com naturalidade absoluta.',
      logoUrl: BROW_LOGO_DATA_URI,
      marqueeText: '✨ BELLE REGARD BEAUTY STUDIO • MICROPIGMENTAÇÃO FIO A FIO & NANOBLADING • BROW LAMINATION • LASH DESIGN & LIP BLUSH ✨',
      aboutText: 'Um estúdio boutique de beleza referência em visagismo facial e arquitetura do olhar. Nossa equipe de especialistas utiliza pigmentos orgânicos certificados e técnicas europeias de Nanoblading, Brow Lamination e Lash Design para realçar sua expressão com leveza, simetria milimétrica e sofisticação.',
      amenities: [
        '👁️ Visagismo Personalizado com Mapeamento Geométrico',
        '✒️ Nanoblading & Fio a Fio Hiper-Realista',
        '✨ Brow Lamination & Reconstrução de Sobrancelhas',
        '🌸 Micropigmentação Labial (Efeito Lip Blush Natural)',
        '🥂 Poltronas Zero-Gravidade & Experiência Relaxante'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 'rbrow1',
          author: 'Fernanda Vasques',
          role: 'Cliente Verificada • Google 5 Estrelas',
          text: 'Fiz a Micropigmentação Nanoblading e Brow Lamination no Belle Regard e fiquei apaixonada! Os fios ficaram tão delicados e naturais que ninguém diz que é micropigmentação.',
          rating: 5,
          timeAgo: 'há 1 dia'
        },
        {
          id: 'rbrow2',
          author: 'Mariana Lacerda',
          role: 'Local Guide • Google',
          text: 'Estúdio maravilhoso, super cheiroso e atendimento impecável! O Lash Lifting e o design de sobrancelhas mudaram completamente o meu olhar.',
          rating: 5,
          timeAgo: 'há 3 dias'
        }
      ],
      whatsappNumber: '5514981304973',
      whatsappMessage: 'Olá! Vim pelo Bio Site do Studio Belle Regard (Sobrancelhas & Micropigmentação) e gostaria de agendar um horário.',
      instagramUrl: 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 486,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com/?minisite=sobrancelha',
      pixKey: '',
      pixBeneficiary: 'Belle Regard Beauty Studio Ltda',
      pixKeyType: 'cnpj',
      wifiSsid: 'BelleRegard_Studio',
      wifiPassword: 'Beleza2026',
      address: 'Alameda Lorena, 1680 - Jardins, São Paulo - SP',
      phone: '(14) 98130-4973',
      openingHours: 'Terça a Sábado: 09h às 19h30',
      services: [
        {
          id: 'brow_1',
          title: 'Micropigmentação Fio a Fio (Nanoblading)',
          category: 'Sobrancelhas Hiper-Realistas',
          price: 'R$ 690',
          description: 'Técnica artística com microlâminas ultrafinas que desenha fios idênticos aos naturais, preenchendo falhas com leveza e alta durabilidade.',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar minha Micropigmentação Fio a Fio (Nanoblading)!'
        },
        {
          id: 'brow_2',
          title: 'Brow Lamination & Design Reconstrutor',
          category: 'Alinhamento & Nutrição',
          price: 'R$ 190',
          description: 'Alinhamento texturizado dos fios naturais para sobrancelhas encorpadas, modernas e definidas, finalizado com tintura e spa nutritivo de queratina.',
          imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero agendar um horário para Brow Lamination & Design de Sobrancelhas!'
        },
        {
          id: 'brow_3',
          title: 'Lash Lifting & Extensão de Cílios Fio de Seda',
          category: 'Design de Cílios',
          price: 'R$ 240',
          description: 'Curvatura, alongamento e volume elegante para um olhar marcante todos os dias ao acordar, sem necessidade de rímel.',
          imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar Lash Lifting / Extensão de Cílios no Studio!'
        },
        {
          id: 'brow_4',
          title: 'Micropigmentação Labial (Revitalização Lip Blush)',
          category: 'Estética Labial',
          price: 'R$ 750',
          description: 'Devolve a cor saudável, definição do contorno e aspecto aveludado aos lábios com efeito corado natural e hidratação profunda.',
          imageUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero saber mais e agendar a Micropigmentação Labial (Lip Blush)!'
        }
      ]
    }
  },
  {
    id: 'perfil_pessoal_wladmir',
    category: 'Perfil Pessoal & Executivo (Modelo Clonável)',
    title: 'Wladmir Garcia • WM Alimentos (Perfil Pessoal)',
    emoji: '👔',
    badge: '★ PERFIL PESSOAL CLONÁVEL',
    tagline: 'Modelo de Perfil Pessoal & Cartão Digital Executivo com Logo WM Alimentos de Fundo, Foto do Wladmir Garcia, Frase de Atuação e Links 1-Clique (WhatsApp & Instagram).',
    accentColor: '#e07b28',
    coverImage: WM_ALIMENTOS_LOGO_DATA_URI,
    config: {
      id: 'perfil_pessoal_wladmir',
      companyName: 'Wladmir Garcia',
      companyBrandName: 'WM Alimentos',
      personRole: 'WM Alimentos • Distribuidora de Alimentos',
      calligraphyTitle: 'Executive Digital Profile',
      niche: 'WM Alimentos • Distribuidora de Alimentos',
      city: 'São Paulo / Interior - SP',
      segmentType: 'geral',
      showInteractiveMenu: false,
      primaryColor: '#e07b28',
      fontFamily: 'jakarta',
      theme: 'personal_executive',
      personalProfileLayout: true,
      portraitImageUrl: WLADMIR_PHOTO_URL,
      heroStats: [
        { value: 'WM Alimentos', label: 'Distribuidora' },
        { value: '1-Clique', label: 'Contato Direto' },
        { value: '100% VIP', label: 'Parceria & Confiança' }
      ],
      nichePalette: {
        primary: '#e07b28',
        secondary: '#0b0806',
        bg: '#070605',
        cardBg: '#120f0d',
        text: '#f8fafc',
        accent: '#f59e0b',
        badgeText: 'WM Bronze & Executive Black'
      },
      coverImageUrl: WM_ALIMENTOS_LOGO_DATA_URI,
      tagline: 'WM Alimentos (distribuição de produtos Mellina e outras marcas) • Radialista, locutor profissional e anúncios em rádio.',
      logoUrl: WM_ALIMENTOS_LOGO_DATA_URI,
      marqueeText: '👔 WLADMIR GARCIA • WM ALIMENTOS DISTRIBUIDORA DE ALIMENTOS • LOCUÇÃO PROFISSIONAL & ANÚNCIOS EM RÁDIO ⭐',
      aboutText: 'Sou Wladmir Garcia, atuando na distribuição de produtos Mellina e outras marcas pela WM Alimentos — Distribuidora de Alimentos, além de atuar como radialista e locutor profissional para anúncios em rádio. Toque nos botões abaixo para falar diretamente comigo no WhatsApp ou acompanhar pelo Instagram.',
      amenities: [
        '🎙️ Locução Profissional • Radialista & Anúncios em Rádio',
        '🏆 Produtos WM Alimentos • Distribuição Mellina e Outras Marcas',
        '🤝 Atendimento Direto com Wladmir Garcia',
        '📲 Contato Rápido em 1 Clique via WhatsApp & Instagram'
      ],
      galleryUrls: [],
      testimonials: [
        {
          id: 'rwm1',
          author: 'Marcos Vinícius Prado',
          role: 'Parceiro Comercial • Google 5 Estrelas',
          text: 'O Wladmir Garcia e toda a equipe da WM Alimentos têm um padrão de atendimento exemplar. Parceria de total confiança, pontualidade e produtos de primeira linha.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'rwm2',
          author: 'Renata Albuquerque',
          role: 'Cliente & Parceira • Verificado',
          text: 'Atendimento direto, rápido e super profissional pelo WhatsApp. A WM Alimentos e o trabalho de locução do Wladmir são referência em qualidade!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5514999041500',
      whatsappMessage: 'Olá Wladmir! Vi seu Perfil Digital e gostaria de falar com você.',
      instagramUrl: 'https://www.instagram.com/wladgarcia_',
      instagramHandle: '@wladgarcia_',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 195,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com/?minisite=wladmir',
      pixKey: '',
      pixBeneficiary: 'WM Alimentos',
      pixKeyType: 'cnpj',
      wifiSsid: 'WM_Alimentos',
      wifiPassword: 'WM2026',
      address: 'Atendimento Comercial & Locução • Região de Bauru / Interior - SP',
      phone: '+55 (14) 99904-1500',
      openingHours: 'Atendimento Comercial: Segunda a Sexta das 08h às 18h',
      services: [
        {
          id: 'wm_locucao',
          title: 'Locução Profissional',
          category: 'Rádio & Locução',
          price: 'Falar no WhatsApp',
          description: 'Radialista e locutor profissional e anúncios em rádio.',
          imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá Wladmir! Gostaria de falar com você sobre Locução Profissional e anúncios em rádio.'
        },
        {
          id: 'wm_produtos',
          title: 'Produtos WM Alimentos',
          category: 'Distribuidora de Alimentos',
          price: 'Consultar Produtos',
          description: 'Distribuição de produtos Mellina e outras marcas.',
          imageUrl: WM_ALIMENTOS_LOGO_DATA_URI,
          customWhatsappMsg: 'Olá Wladmir! Gostaria de saber mais sobre os Produtos WM Alimentos (distribuição de produtos Mellina e outras marcas).'
        }
      ]
    }
  },
  {
    id: 'perfil_pessoal_corretor',
    category: 'Cliente Oficial • Imóveis de Alto Padrão (CRECI 73.286)',
    title: 'Nivaldo Furtuozo • CRECI 73.286',
    emoji: '🏢',
    badge: '★ CLIENTE OFICIAL • CRECI 73.286',
    tagline: 'Site Oficial de Nivaldo Furtuozo (CRECI 73.286): Corretor de Imóveis de Alto Padrão com 4 Imóveis em destaque, WhatsApp (+55 14 99704-7238) e Instagram (@nivaldocorretorimoveis) 1-Clique.',
    accentColor: '#c59b27',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'perfil_pessoal_corretor',
      companyName: 'Nivaldo Furtuozo',
      companyBrandName: 'Nivaldo Furtuozo • Corretor de Imóveis',
      personRole: 'CRECI 73.286 • Corretor de Imóveis de Alto Padrão',
      calligraphyTitle: 'Executive Real Estate Profile',
      niche: 'CRECI 73.286 • Corretor de Imóveis de Alto Padrão',
      city: 'Bauru, Interior & Grande SP',
      segmentType: 'geral',
      showInteractiveMenu: false,
      primaryColor: '#c59b27',
      fontFamily: 'jakarta',
      theme: 'corretor_luxury_gold',
      personalProfileLayout: true,
      portraitImageUrl: NIVALDO_PHOTO_URL,
      heroStats: [
        { value: 'CRECI 73.286', label: 'Registro Oficial' },
        { value: '4 Imóveis VIP', label: 'Em Destaque' },
        { value: '1-Clique', label: 'Contato Direto' }
      ],
      nichePalette: {
        primary: '#c59b27',
        secondary: '#292524',
        bg: '#faf8f5',
        cardBg: '#ffffff',
        text: '#1c1917',
        accent: '#d4af37',
        badgeText: 'Dourado & Tons Pastéis Neutros'
      },
      coverImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Assessoria imobiliária especializada em compra, venda e locação de imóveis de alto padrão. Atendimento personalizado e direto no WhatsApp.',
      logoUrl: NIVALDO_PHOTO_URL,
      marqueeText: '🏢 NIVALDO FURTUOZO • CRECI 73.286 • CORRETOR DE IMÓVEIS • 4 IMÓVEIS EXCLUSIVOS EM DESTAQUE • ATENDIMENTO VIP NO WHATSAPP & INSTAGRAM ⭐',
      aboutText: 'Sou Nivaldo Furtuozo (CRECI 73.286), corretor de imóveis especializado em imóveis residenciais e comerciais de alto padrão. Meu compromisso é encontrar a oportunidade imobiliária ideal com total transparência, agilidade e atendimento exclusivo no WhatsApp. Confira abaixo 4 imóveis em destaque ou entre em contato diretamente comigo.',
      amenities: [
        '🏛️ Imóveis Selecionados & Oportunidades de Alto Padrão',
        '📜 Assessoria Completa & Negociação Segura (CRECI 73.286)',
        '🔒 Sigilo & Atendimento Personalizado para Compradores e Proprietários',
        '📲 Atendimento Direto 1-Clique via WhatsApp & Agendamento de Visitas'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
      ],
      testimonials: [
        {
          id: 't_corretor_1',
          author: 'Carlos Eduardo Martins',
          role: 'Cliente & Investidor',
          text: 'O Nivaldo conduziu a negociação com extrema competência e pontualidade. Encontramos o imóvel perfeito com total tranquilidade.',
          rating: 5,
          timeAgo: 'há 4 dias'
        },
        {
          id: 't_corretor_2',
          author: 'Mariana Silveira Ramos',
          role: 'Proprietária',
          text: 'Atendimento nota 10 pelo WhatsApp! O Nivaldo foi muito prestativo, rápido e cuidou de todos os detalhes da visita.',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5514997047238',
      whatsappMessage: 'Olá Nivaldo Furtuozo! Vi seu Perfil Imobiliário Digital (CRECI 73.286) e gostaria de agendar uma consulta para conhecer os imóveis em destaque.',
      instagramUrl: 'https://www.instagram.com/nivaldocorretorimoveis?srtk=MTNqaTF0eHA5MTlqeA==',
      instagramHandle: '@nivaldocorretorimoveis',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 168,
      rating: 5.0,
      websiteUrl: 'https://automacaonfc.onrender.com/?minisite=nivaldo',
      pixKey: '14997047238',
      pixBeneficiary: 'Nivaldo Furtuozo',
      pixKeyType: 'telefone',
      wifiSsid: 'Nivaldo_Corretor_VIP',
      wifiPassword: 'Imoveis2026',
      address: 'Atendimento em Bauru, Interior e Região - SP',
      phone: '+55 (14) 99704-7238',
      openingHours: 'Atendimento: Segunda a Sábado das 08h às 20h',
      services: [
        {
          id: 'imovel_1',
          title: 'Mansão Contemporânea em Condomínio Fechado • 5 Suítes',
          category: 'Imóvel em Destaque 1',
          price: 'R$ 6.850.000',
          description: '680m² de área construída em terreno amplo. 5 suítes plenas com closet, living integrado pé-direito duplo de 6m, piscina com borda infinita aquecida, espaço gourmet completo e 6 vagas.',
          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
          customWhatsappMsg: 'Olá Nivaldo! Gostaria de receber fotos detalhadas e agendar uma visita na Mansão Contemporânea (R$ 6.850.000).'
        },
        {
          id: 'imovel_2',
          title: 'Cobertura Duplex com Vista Panorâmica • 4 Suítes',
          category: 'Imóvel em Destaque 2',
          price: 'R$ 4.200.000',
          description: '420m² privativos com vista espetacular. 4 suítes, living amplo integrado ao terraço gourmet com spa aquecido, acabamentos nobres e condomínio com lazer completo e segurança 24h.',
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
          customWhatsappMsg: 'Olá Nivaldo! Tenho interesse na Cobertura Duplex Vista Panorâmica (R$ 4.200.000). Podemos agendar uma visita?'
        },
        {
          id: 'imovel_3',
          title: 'Residência Moderna de Alto Padrão • 4 Suítes',
          category: 'Imóvel em Destaque 3',
          price: 'R$ 5.490.000',
          description: '510m² de arquitetura moderna assinada. Automação residencial, usina solar, sauna integrada à piscina aquecida, paisagismo exuberante e fino acabamento.',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
          customWhatsappMsg: 'Olá Nivaldo! Gostaria de mais informações sobre a Residência Moderna de Alto Padrão (R$ 5.490.000).'
        },
        {
          id: 'imovel_4',
          title: 'Villa Garden Térrea com Piscina & Gourmet • 4 Suítes',
          category: 'Imóvel em Destaque 4',
          price: 'R$ 3.850.000',
          description: '380m² de conceito aberto e totalmente térreo. 4 suítes com vista para o jardim, varanda gourmet integrada, fogo de chão, piscina aquecida e condomínio com clube privativo.',
          imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
          customWhatsappMsg: 'Olá Nivaldo! Gostaria de agendar uma visita e saber mais sobre a Villa Garden Térrea (R$ 3.850.000).'
        }
      ]
    }
  },
  {
    id: 'hamburgueria',
    category: 'Alimentação & Gastronomia',
    title: 'Burger Prime Artesanal',
    emoji: '🍔',
    badge: 'Cardápio + 4K',
    tagline: 'Hambúrgueres na brasa, smash burgers, cardápio digital integrado e rota GPS.',
    accentColor: '#f59e0b',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-hamburgueria',
      companyName: 'Burger Prime Artesanal',
      niche: 'Hamburgueria & Gastronomia',
      city: 'São Paulo - SP',
      segmentType: 'gastronomia',
      showInteractiveMenu: true,
      primaryColor: '#f59e0b',
      fontFamily: 'poppins',
      coverImageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Hambúrgueres artesanais na brasa, smash burgers suculentos e batatas crocantes especiais.',
      logoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=85',
      marqueeText: '🔥 PEDIDOS PELO WHATSAPP COM 10% OFF • SMASH BURGER DUPLO • CARDÁPIO DIGITAL 4K • ENTREGA RÁPIDA • PIX 1-CLIQUE 🔥',
      aboutText: 'Na Burger Prime Artesanal, moemos nosso próprio blend de carnes nobres diariamente e assamos na brasa de verdade. Escolha seus itens favoritos no nosso Cardápio Digital abaixo ou venha viver essa experiência no nosso espaço!',
      amenities: [
        '🔥 Blend 100% Angus na Brasa',
        '🛵 Delivery Rápido & Retirada',
        '❄️ Salão Climatizado & Música Boa',
        '💳 Aceitamos Pix, VR, Alelo & Cartões',
        '📶 Wi-Fi Grátis & Espaço Kids'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'r1',
          author: 'Ricardo Almeida',
          role: 'Local Guide • Nível 6 no Google',
          text: 'O melhor hambúrguer artesanal de São Paulo! Ponto da carne perfeito, pão brioche super macio e a batata com costela é de outro mundo.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'r2',
          author: 'Fernanda Costa',
          role: 'Avaliação Verificada no Google',
          text: 'Pedi pelo cardápio do Mini Site e chegou quentinho em 25 minutos! Atendimento pelo WhatsApp nota 1000.',
          rating: 5,
          timeAgo: 'há 4 dias'
        }
      ],
      whatsappNumber: '5511998765432',
      whatsappMessage: 'Olá! Vim pelo Mini Site da Burger Prime e gostaria de fazer um pedido!',
      instagramUrl: 'https://instagram.com/burgerprime.artesanal',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 348,
      rating: 4.9,
      websiteUrl: 'https://burgerprime.com.br',
      pixKey: 'contato@burgerprime.com.br',
      pixBeneficiary: 'Burger Prime Gastronomia Ltda',
      pixKeyType: 'email',
      wifiSsid: 'BurgerPrime_Clientes',
      wifiPassword: 'BurgerVip2026',
      address: 'Av. Paulista, 1500 - Bela Vista, São Paulo - SP',
      phone: '(11) 99876-5432',
      openingHours: 'Terça a Domingo: 18h às 23h45',
      services: [
        {
          id: 'b1',
          title: 'Smash Burger Duplo Prime',
          category: 'Burgers na Brasa',
          price: 'R$ 38,90',
          description: 'Pão brioche selado na manteiga, 2 smash 100g de fraldinha, cheddar inglês derretido e maionese defumada.',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Smash Burger Duplo Prime (R$ 38,90) pelo WhatsApp!'
        },
        {
          id: 'b2',
          title: 'Mega Bacon BBQ na Brasa',
          category: 'Burgers na Brasa',
          price: 'R$ 44,90',
          description: 'Blend 180g assado na brasa, tiras de bacon caramelizado crocante, queijo prato e barbecue artesanal.',
          imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir o Mega Bacon BBQ na Brasa (R$ 44,90) com entrega rápida!'
        },
        {
          id: 'b3',
          title: 'Batata Rústica c/ Costela & Cheddar',
          category: 'Porções & Entradas',
          price: 'R$ 29,90',
          description: 'Batatas com casca cortadas à mão, costela desfiada temperada, molho cheddar cremoso e cebolinha.',
          imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Adicione uma porção de Batata Rústica c/ Costela (R$ 29,90) ao meu pedido!'
        },
        {
          id: 'b4',
          title: 'Milkshake Nutella c/ Ninho 500ml',
          category: 'Sobremesas & Drinks',
          price: 'R$ 24,90',
          description: 'Sorvete artesanal de baunilha batido com Nutella pura, chantilly e borda farta de Leite Ninho.',
          imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de incluir o Milkshake de Nutella c/ Ninho (R$ 24,90)!'
        },
        {
          id: 'b5',
          title: 'Combo Casal: 2 Burgers + Fritas + 2 Latas',
          category: 'Combos Promocionais',
          price: 'R$ 84,90',
          description: 'O combo campeão de vendas: 2 Smash Duplos + Batata Rústica Média + 2 Refrigerantes Lata.',
          imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir o Combo Casal (R$ 84,90) pelo Cardápio Digital!'
        },
        {
          id: 'b6',
          title: 'Onion Rings Empanadas na Cerveja + Barbecue',
          category: 'Porções & Entradas',
          price: 'R$ 26,90',
          description: 'Anéis de cebola gigantes ultra crocantes acompanhados de molho barbecue defumado da casa.',
          imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir uma porção de Onion Rings (R$ 26,90)!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'barbearia',
    category: 'Beleza & Cuidados Masculinos',
    title: 'Barbearia Dom Corleone VIP',
    emoji: '💈',
    badge: 'Alta Conversão',
    tagline: 'Degradê navalhado, barba terapia com toalha quente, tabela de preços e agendamento.',
    accentColor: '#0ea5e9',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-barbearia',
      companyName: 'Barbearia Dom Corleone VIP',
      niche: 'Barbearia & Salão Masculino',
      city: 'Curitiba - PR',
      segmentType: 'servicos_beleza',
      showInteractiveMenu: true,
      primaryColor: '#0ea5e9',
      fontFamily: 'montserrat',
      coverImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Experiência clássica e moderna: degradê perfeito, barba terapia e chopp artesanal cortesia.',
      logoUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=85',
      marqueeText: '✂️ AGENDE SEU HORÁRIO PELO WHATSAPP • PRIMEIRA CERVEJA CORTESIA • CORTE & BARBA VIP • TOALHA QUENTE ✂️',
      aboutText: 'Mais que um corte de cabelo, a Barbearia Dom Corleone VIP entrega um verdadeiro clube de cavalheiros em Curitiba. Poltronas clássicas reclináveis, toalha quente com óleos essenciais, sinuca, videogame e primeira bebida por nossa conta!',
      amenities: [
        '🍺 Chopp ou Café Expresso Cortesia',
        '🧖‍♂️ Barba Terapia c/ Vapor de Ozônio',
        '❄️ Ambiente Climatizado & Sinuca',
        '🅿️ Estacionamento Próprio Conveniado',
        '📅 Hora Marcada Sem Espera'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'rb1',
          author: 'Lucas Mendonça',
          role: 'Local Guide • Google',
          text: 'Melhor barbearia de Curitiba! O degradê fica perfeito, atendimento pontual e ainda tem chopp gelado de cortesia.',
          rating: 5,
          timeAgo: 'há 1 dia'
        },
        {
          id: 'rb2',
          author: 'Gabriel Vasconcelos',
          role: 'Cliente Verificado • Google',
          text: 'A barba terapia com toalha quente e vapor de ozônio vale cada centavo. Ambiente sensacional!',
          rating: 5,
          timeAgo: 'há 5 dias'
        }
      ],
      whatsappNumber: '5541991234567',
      whatsappMessage: 'Olá! Gostaria de agendar um horário na Barbearia Dom Corleone!',
      instagramUrl: 'https://instagram.com/domcorleone.barbershop',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 412,
      rating: 5.0,
      websiteUrl: 'https://domcorleonebarber.com.br',
      pixKey: '41991234567',
      pixBeneficiary: 'Dom Corleone Barbearia',
      pixKeyType: 'telefone',
      wifiSsid: 'DomCorleone_VIP',
      wifiPassword: 'CorteFino2026',
      address: 'Rua das Flores, 890 - Centro, Curitiba - PR',
      phone: '(41) 99123-4567',
      openingHours: 'Segunda a Sábado: 09h às 20h',
      services: [
        {
          id: 'barb1',
          title: 'Corte Degradê Navalhado VIP',
          category: 'Cortes Masculinos',
          price: 'R$ 50,00',
          description: 'Corte moderno personalizado, fade perfeito na navalha, lavagem e finalização com pomada matte.',
          imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar o Corte Degradê Navalhado VIP (R$ 50,00)!'
        },
        {
          id: 'barb2',
          title: 'Barba Terapia c/ Toalha Quente',
          category: 'Barba & Pele',
          price: 'R$ 45,00',
          description: 'Esfoliação facial, vapor de ozônio, toalha quente relaxante e alinhamento impecável.',
          imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero agendar a Barba Terapia c/ Toalha Quente (R$ 45,00)!'
        },
        {
          id: 'barb3',
          title: 'Combo Corleone: Cabelo + Barba + Chopp',
          category: 'Combos VIP',
          price: 'R$ 85,00',
          description: 'O combo favorito da casa com direito a café expresso gourmet ou chopp artesanal cortesia.',
          imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar o Combo Completo Cabelo + Barba (R$ 85,00)!'
        },
        {
          id: 'barb4',
          title: 'Pigmentação & Camuflagem de Grisalhos',
          category: 'Acabamentos',
          price: 'R$ 40,00',
          description: 'Disfarce natural de fios brancos e falhas na barba com durabilidade de até 3 semanas.',
          imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Tenho interesse na Pigmentação de Barba (R$ 40,00). Quais horários livres?'
        },
        {
          id: 'barb5',
          title: 'Clube Assinatura VIP (Cortes Ilimitados no Mês)',
          category: 'Planos de Assinatura',
          price: 'R$ 139,90/mês',
          description: 'Corte quantas vezes quiser no mês com agendamento prioritário e descontos em produtos.',
          imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero saber como funciona o Clube de Assinatura VIP (R$ 139,90/mês)!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'estetica',
    category: 'Estética, Beleza & Saúde',
    title: 'Clínica Harmonize Estética & Spa',
    emoji: '💆‍♀️',
    badge: 'Luxo 4K',
    tagline: 'Procedimentos faciais e corporais, protocolos exclusivos e agendamento de avaliação.',
    accentColor: '#10b981',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-estetica',
      companyName: 'Clínica Harmonize Estética & Spa',
      niche: 'Estética Facial & Corporal',
      city: 'Belo Horizonte - MG',
      segmentType: 'saude_clinica',
      showInteractiveMenu: true,
      primaryColor: '#10b981',
      fontFamily: 'playfair',
      coverImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Harmonização facial sutil, tratamentos corporais de alta tecnologia e spa relaxante.',
      logoUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=400&q=85',
      marqueeText: '✨ AVALIAÇÃO PERSONALIZADA PELO WHATSAPP • BOTOX PREVENTIVO • LIMPEZA DE PELE LED • BIOESTIMULADORES ✨',
      aboutText: 'Na Clínica Harmonize Estética & Spa, realçamos sua beleza natural com protocolos seguros, tecnologia certificada pela ANVISA e equipe de especialistas em Belo Horizonte.',
      amenities: [
        '🩺 Especialistas Pós-Graduadas',
        '🔬 Tecnologias Certificadas ANVISA',
        '🍵 Recepção Spa c/ Chás & Aromaterapia',
        '💳 Parcelamento em até 12x & Pix',
        '🅿️ Estacionamento Privativo no Local'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 're1',
          author: 'Camila Vasconcelos',
          role: 'Local Guide • Google',
          text: 'Clínica impecável! Fiz minha limpeza de pele com LED e preenchimento labial, ficou super delicado e natural.',
          rating: 5,
          timeAgo: 'há 3 dias'
        },
        {
          id: 're2',
          author: 'Dra. Mariana Pires',
          role: 'Paciente Verificada • Google',
          text: 'Atendimento humanizado, ambiente super relaxante e produtos de primeiríssima linha. Recomendo!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5531988887777',
      whatsappMessage: 'Olá! Gostaria de agendar uma avaliação estética na Clínica Harmonize!',
      instagramUrl: 'https://instagram.com/clinica.harmonize.oficial',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 260,
      rating: 5.0,
      websiteUrl: 'https://harmonizeestetica.com.br',
      pixKey: 'clinica@harmonizeestetica.com.br',
      pixBeneficiary: 'Harmonize Estética e Saúde',
      pixKeyType: 'email',
      wifiSsid: 'Harmonize_Spa',
      wifiPassword: 'PeleRadiante2026',
      address: 'Av. do Contorno, 4500 - Savassi, Belo Horizonte - MG',
      phone: '(31) 98888-7777',
      openingHours: 'Segunda a Sexta: 08h às 19h30 | Sáb: 08h às 14h',
      services: [
        {
          id: 'est1',
          title: 'Limpeza de Pele Profunda + LEDterapia',
          category: 'Estética Facial',
          price: 'R$ 180,00',
          description: 'Extração indolor de impurezas, peeling ultrassônico, máscara calmante e LED regenerador.',
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar a Limpeza de Pele Profunda c/ LED (R$ 180,00)!'
        },
        {
          id: 'est2',
          title: 'Toxina Botulínica (Botox 3 Regiões)',
          category: 'Injetáveis & Harmonização',
          price: 'Consulte Condição',
          description: 'Suavização natural das linhas de expressão com retorno incluso em 15 dias.',
          imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de saber os valores e condições para aplicação de Botox!'
        },
        {
          id: 'est3',
          title: 'Hidratação & Preenchimento Labial',
          category: 'Injetáveis & Harmonização',
          price: 'A partir de R$ 890',
          description: 'Ácido hialurônico premium para devolver contorno, volume equilibrado e maciez aos lábios.',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero saber mais sobre o Preenchimento Labial e agendar avaliação!'
        },
        {
          id: 'est4',
          title: 'Drenagem Linfática & Massagem Relax Spa',
          category: 'Corporal & Spa',
          price: 'R$ 140,00',
          description: 'Manobras exclusivas que reduzem medidas, eliminam retenção hídrica e aliviam tensões.',
          imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma sessão de Drenagem Linfática (R$ 140,00)!'
        }
      ],
      theme: 'emerald_pro'
    }
  },
  {
    id: 'pizzaria',
    category: 'Pizzaria & Forno a Lenha',
    title: 'Forneria & Pizzaria Bella Napoli',
    emoji: '🍕',
    badge: 'Cardápio 4K',
    tagline: 'Pizzas artesanais napolitanas com fermentação lenta 48h, forno a lenha e cardápio digital.',
    accentColor: '#ef4444',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-pizzaria',
      companyName: 'Forneria & Pizzaria Bella Napoli',
      niche: 'Pizzaria Napolitana',
      city: 'Florianópolis - SC',
      segmentType: 'gastronomia',
      showInteractiveMenu: true,
      primaryColor: '#ef4444',
      fontFamily: 'poppins',
      coverImageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Farinha italiana 00, massa leve com 48h de maturação e assada no autêntico forno a lenha.',
      logoUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=85',
      marqueeText: '🍕 FORNO A LENHA NAPOLITANO • MASSA DE FERMENTAÇÃO NATURAL 48H • PEÇA PELO CARDÁPIO DIGITAL 🍕',
      aboutText: 'Tradição napolitana em Florianópolis! Nossas pizzas são abertas à mão com farinha italiana importada, molho de tomates San Marzano e assadas a 450°C no forno a lenha.',
      amenities: [
        '🔥 Autêntico Forno a Lenha 450°C',
        '🌾 Massa Leve Fermentação 48h',
        '🍷 Carta de Vinhos & Drinks Italianos',
        '🛵 Delivery Térmico Ultra Rápido',
        '🅿️ Estacionamento & Espaço Família'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'rp1',
          author: 'Henrique Bastos',
          role: 'Local Guide • Google',
          text: 'A melhor pizza de Floripa sem dúvidas! Massa super leve, borda aerada e ingredientes italianos de verdade.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'rp2',
          author: 'Letícia Albuquerque',
          role: 'Cliente Verificada • Google',
          text: 'Lugar lindo para jantar a dois ou com a família, e no delivery a pizza chega impecável!',
          rating: 5,
          timeAgo: 'há 6 dias'
        }
      ],
      whatsappNumber: '5548987654321',
      whatsappMessage: 'Olá! Gostaria de pedir uma pizza artesanal pelo WhatsApp!',
      instagramUrl: 'https://instagram.com/bellanapoli.pizzaria',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 520,
      rating: 4.9,
      websiteUrl: 'https://bellanapolipizza.com.br',
      pixKey: '48987654321',
      pixBeneficiary: 'Bella Napoli Forneria',
      pixKeyType: 'telefone',
      wifiSsid: 'BellaNapoli_WiFi',
      wifiPassword: 'PizzaLenha2026',
      address: 'Rua Bocaiúva, 120 - Beira Mar Norte, Florianópolis - SC',
      phone: '(48) 98765-4321',
      openingHours: 'Todos os dias: 18h30 às 23h30',
      services: [
        {
          id: 'piz1',
          title: 'Margherita Especial di Bufala',
          category: 'Pizzas Clássicas',
          price: 'R$ 68,00',
          description: 'Molho de tomate San Marzano italiano, mozzarella de búfala fresca, parmesão e manjericão.',
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir a pizza Margherita di Bufala (R$ 68,00) no WhatsApp!'
        },
        {
          id: 'piz2',
          title: 'Calabresa Artesanal Defumada',
          category: 'Pizzas Clássicas',
          price: 'R$ 62,00',
          description: 'Calabresa artesanal finamente fatiada, cebola roxa caramelizada, orégano fresco e azeitonas.',
          imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de pedir a Calabresa Artesanal Defumada (R$ 62,00)!'
        },
        {
          id: 'piz3',
          title: 'Parma & Grana Padano Trufado',
          category: 'Pizzas Especiais',
          price: 'R$ 79,00',
          description: 'Presunto cru de Parma, rúcula silvestre fresca, lascas de Grana Padano e azeite trufado.',
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir a pizza Parma & Grana Padano Trufada (R$ 79,00)!'
        },
        {
          id: 'piz4',
          title: 'Calzone Recheado Tradizionale',
          category: 'Calzones & Entradas',
          price: 'R$ 54,00',
          description: 'Massa dobrada e dourada no forno a lenha com ricota cremosa, provolone e salame italiano.',
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Calzone Recheado Tradicional (R$ 54,00)!'
        },
        {
          id: 'piz5',
          title: 'Pizza Doce de Nutella c/ Morangos & Pistache',
          category: 'Pizzas Doces',
          price: 'R$ 58,00',
          description: 'Massa crocante coberta com Nutella legítima, morangos selecionados e farofa de pistache.',
          imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero incluir a Pizza Doce de Nutella c/ Pistache (R$ 58,00)!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'cafe',
    category: 'Cafeteria, Bistrô & Doces',
    title: 'Café & Bistrô Aromas Especiais',
    emoji: '☕',
    badge: 'Charmoso',
    tagline: 'Cafés especiais premiados, brunch completo, croissants amanteigados e cardápio digital.',
    accentColor: '#d97706',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-cafe',
      companyName: 'Café & Bistrô Aromas Especiais',
      niche: 'Cafeteria & Confeitaria',
      city: 'Gramado - RS',
      segmentType: 'gastronomia',
      showInteractiveMenu: true,
      primaryColor: '#d97706',
      fontFamily: 'playfair',
      coverImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=90',
      tagline: 'O ponto de encontro dos apaixonados por café especial, brunch farto e doces artesanais.',
      logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=85',
      marqueeText: '☕ BRUNCH COMPLETO TODOS OS DIAS • CAFÉS ESPECIAIS 100% ARÁBICA • CROISSANTS QUENTINHOS • WI-FI GRÁTIS ☕',
      aboutText: 'No Café & Bistrô Aromas Especiais, torramos grãos 100% Arábica de microrregiões premiadas e preparamos diariamente nossa vitrine de confeitaria fina e pães de fermentação natural.',
      amenities: [
        '☕ Grãos 100% Arábica Torra Fresca',
        '🥐 Brunch & Viennoiserie Artesanal',
        '💻 Mesas c/ Tomadas & Wi-Fi Rápido',
        '🐾 Espaço Pet Friendly no Jardim',
        '🛵 Delivery de Box Café da Manhã'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'rc1',
          author: 'Helena Dornelles',
          role: 'Local Guide • Google',
          text: 'Lugar encantador! O croissant de pistache e o cappuccino aveludado são inesquecíveis.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'rc2',
          author: 'Bruno Silveira',
          role: 'Cliente Verificado • Google',
          text: 'Ótimo ambiente para trabalhar ou tomar um brunch em família. Atendimento impecável!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5554999998888',
      whatsappMessage: 'Olá! Gostaria de reservar uma mesa ou fazer um pedido no Café Aromas Especiais!',
      instagramUrl: 'https://instagram.com/cafearomas.especiais',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 295,
      rating: 4.9,
      websiteUrl: 'https://cafearomas.com.br',
      pixKey: 'contato@cafearomas.com.br',
      pixBeneficiary: 'Café Aromas Especiais Ltda',
      pixKeyType: 'email',
      wifiSsid: 'CafeAromas_Clientes',
      wifiPassword: 'CafezinhoBom123',
      address: 'Av. Borges de Medeiros, 2100 - Centro, Gramado - RS',
      phone: '(54) 99999-8888',
      openingHours: 'Todos os dias: 08h30 às 20h30',
      services: [
        {
          id: 'caf1',
          title: 'Combo Brunch Parisiense Completo',
          category: 'Brunch & Combos',
          price: 'R$ 44,00',
          description: 'Croissant folhado na manteiga francesa, ovos mexidos cremosos com bacon e cappuccino.',
          imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Brunch Parisiense Completo (R$ 44,00)!'
        },
        {
          id: 'caf2',
          title: 'Café Filtrado Especial V60 Grão Premiado',
          category: 'Cafés Especiais',
          price: 'R$ 15,00',
          description: 'Grãos selecionados com notas sensoriais de chocolate meio amargo e frutas vermelhas.',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de encomendar grãos ou pedir o café filtrado especial V60!'
        },
        {
          id: 'caf3',
          title: 'Torta Holandesa c/ Chocolate Belga',
          category: 'Confeitaria Fina',
          price: 'R$ 21,00',
          description: 'Base crocante, creme aveludado aerado e cobertura espelhada de ganache belga.',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de pedir fatias da Torta Holandesa c/ Chocolate Belga (R$ 21,00)!'
        },
        {
          id: 'caf4',
          title: 'Croissant Recheado de Creme de Pistache',
          category: 'Viennoiserie',
          price: 'R$ 23,50',
          description: 'Massa folhada artesanal dourada e crocante com recheio generoso de pistache.',
          imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Tem Croissant de Pistache disponível hoje? Quero pedir!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'automotivo',
    category: 'Automotivo & Estética Veicular',
    title: 'Auto Estética & Detailer Premium',
    emoji: '🚗',
    badge: 'Estética 4K',
    tagline: 'Polimento técnico, vitrificação cerâmica 9H, higienização interna e rota GPS rápida.',
    accentColor: '#06b6d4',
    coverImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-automotivo',
      companyName: 'Auto Estética & Detailer Premium',
      niche: 'Estética Automotiva',
      city: 'Campinas - SP',
      segmentType: 'automotivo_oficina',
      showInteractiveMenu: true,
      primaryColor: '#06b6d4',
      fontFamily: 'space',
      coverImageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Cuidado minucioso para o seu veículo com produtos importados e certificação internacional.',
      logoUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=85',
      marqueeText: '🚗 BRILHO ESPELHADO DE ZERO KM • VITRIFICAÇÃO CERÂMICA 9H • BUSCAMOS SEU VEÍCULO • ORÇAMENTO NO WHATSAPP 🚗',
      aboutText: 'No estúdio Auto Estética & Detailer Premium, tratamos cada veículo como uma obra de arte. Iluminação de inspeção em alta definição, produtos alemães e americanos e box monitorado.',
      amenities: [
        '💎 Vitrificadores Certificados 9H',
        '🚗 Serviço Leva e Traz Segurado',
        '🛋️ Lounge VIP Climatizado c/ Café',
        '🛡️ Certificado de Garantia de até 3 Anos',
        '💳 Parcelamento em até 10x sem Juros'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'ra1',
          author: 'Carlos Eduardo Silva',
          role: 'Local Guide • Google',
          text: 'Fiz a vitrificação cerâmica e higienização interna. O carro ficou mais brilhante do que quando tirei na concessionária!',
          rating: 5,
          timeAgo: 'há 3 dias'
        },
        {
          id: 'ra2',
          author: 'Rodrigo Tavares',
          role: 'Cliente Verificado • Google',
          text: 'Profissionalismo absurdo, cumpriram o horário combinado e o cuidado nos detalhes impressiona.',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ],
      whatsappNumber: '5519999887766',
      whatsappMessage: 'Olá! Gostaria de agendar uma avaliação para estética automotiva!',
      instagramUrl: 'https://instagram.com/autodetailer.premium',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 188,
      rating: 5.0,
      websiteUrl: 'https://autodetailerpremium.com.br',
      pixKey: '19999887766',
      pixBeneficiary: 'Detailer Premium Serviços Automotivos',
      pixKeyType: 'telefone',
      wifiSsid: 'Detailer_VIP_Guest',
      wifiPassword: 'CarroNovo2026',
      address: 'Av. José de Souza Campos, 1100 - Cambuí, Campinas - SP',
      phone: '(19) 99988-7766',
      openingHours: 'Segunda a Sábado: 08h às 18h',
      services: [
        {
          id: 'aut1',
          title: 'Lavagem Técnica Detalhada VIP',
          category: 'Lavagem & Detalhamento',
          price: 'R$ 130,00',
          description: 'Lavagem de chassi e caixas de roda, pincelamento de emblemas, descontaminação e cera de carnaúba.',
          imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de agendar a Lavagem Técnica Detalhada VIP (R$ 130,00)!'
        },
        {
          id: 'aut2',
          title: 'Polimento Técnico Espelhado 3 Etapas',
          category: 'Correção de Pintura',
          price: 'A partir de R$ 480',
          description: 'Remoção de até 95% dos micro-riscos, teias de aranha e marcas com espelhamento de verniz.',
          imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero um orçamento de Polimento Técnico para o meu carro!'
        },
        {
          id: 'aut3',
          title: 'Vitrificação Cerâmica 9H (Garantia 3 Anos)',
          category: 'Proteção Cerâmica',
          price: 'A partir de R$ 890',
          description: 'Película cerâmica ultra hidrofóbica contra raios UV, seiva de árvores e sujeira.',
          imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de informações e agendamento para Vitrificação Cerâmica 9H!'
        },
        {
          id: 'aut4',
          title: 'Higienização Interna + Hidratação de Couro',
          category: 'Interior & Ozônio',
          price: 'R$ 260,00',
          description: 'Limpeza extratora de bancos, teto e carpete com oxi-sanitização que elimina fungos e odores.',
          imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero agendar a Higienização Interna c/ Ozônio (R$ 260,00)!'
        }
      ],
      theme: 'cyber_blue'
    }
  },
  {
    id: 'boutique',
    category: 'Moda, Roupas & Acessórios',
    title: 'Boutique Bella Donna • Moda Feminina',
    emoji: '👗',
    badge: 'Vitrine 4K',
    tagline: 'Alfaiataria moderna, vestidos fluidos, catálogo de looks 4K e compra fácil no WhatsApp.',
    accentColor: '#ec4899',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90',
    config: {
      id: 'mockup-boutique',
      companyName: 'Boutique Bella Donna',
      niche: 'Moda Feminina & Roupas',
      city: 'Goiânia - GO',
      segmentType: 'loja_moda',
      showInteractiveMenu: true,
      primaryColor: '#ec4899',
      fontFamily: 'playfair',
      coverImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90',
      tagline: 'Coleções exclusivas que unem conforto, sofisticação e estilo contemporâneo.',
      logoUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=85',
      marqueeText: '👗 NOVA COLEÇÃO PRIMAVERA/VERÃO • ENVIAMOS PARA TODO O BRASIL • WHATSAPP VIP COM FRETE GRÁTIS 👗',
      aboutText: 'A Boutique Bella Donna seleciona peças de alfaiataria, vestidos e acessórios com acabamento de alta costura. Atendemos em nosso showroom climatizado em Goiânia e enviamos por motoboy ou Correios para todo o Brasil!',
      amenities: [
        '👗 Lançamentos Exclusivos Toda Quinta',
        '🛵 Entrega Expressa no Mesmo Dia',
        '💳Até 6x Sem Juros ou 10% OFF no Pix',
        '🥂 Provador VIP com Espumante & Café',
        '📦 Enviamos para Todo o Brasil'
      ],
      galleryUrls: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
      ],
      testimonials: [
        {
          id: 'rm1',
          author: 'Juliana Martins',
          role: 'Local Guide • Google',
          text: 'As roupas têm um caimento impecável e tecido maravilhoso! Comprei pelo WhatsApp e recebi em casa super cheiroso.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 'rm2',
          author: 'Beatriz Ribeiro',
          role: 'Cliente Verificada • Google',
          text: 'Atendimento nota mil! As meninas montam os looks completos e ajudam muito na escolha.',
          rating: 5,
          timeAgo: 'há 5 dias'
        }
      ],
      whatsappNumber: '5562998881122',
      whatsappMessage: 'Olá! Vi os lançamentos no Mini Site da Boutique Bella Donna e quero comprar!',
      instagramUrl: 'https://instagram.com/belladonna.boutique',
      googleReviewUrl: 'https://maps.google.com',
      reviewCount: 215,
      rating: 5.0,
      websiteUrl: 'https://belladonnamoda.com.br',
      pixKey: 'pix@belladonnamoda.com.br',
      pixBeneficiary: 'Boutique Bella Donna Comércio de Roupas',
      pixKeyType: 'email',
      wifiSsid: 'BellaDonna_Clientes',
      wifiPassword: 'ModaElegante26',
      address: 'Rua 9, 1340 - Setor Marista, Goiânia - GO',
      phone: '(62) 99888-1122',
      openingHours: 'Segunda a Sábado: 09h às 19h',
      services: [
        {
          id: 'mod1',
          title: 'Vestido Longo Seda Floral Primavera',
          category: 'Vestidos',
          price: 'R$ 289,90',
          description: 'Tecido nobre fluido com caimento impecável, estampa botânica exclusiva e decote delicado.',
          imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de comprar o Vestido Longo Seda Floral (R$ 289,90). Quais tamanhos disponíveis?'
        },
        {
          id: 'mod2',
          title: 'Conjunto Alfaiataria Blazer + Pantalona',
          category: 'Alfaiataria',
          price: 'R$ 359,00',
          description: 'Blazer forrado com corte estruturado e calça pantalona cintura alta elegante.',
          imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quero pedir o Conjunto Alfaiataria (R$ 359,00) pelo WhatsApp!'
        },
        {
          id: 'mod3',
          title: 'Camisa 100% Linho Puro Manga Longa',
          category: 'Camisaria',
          price: 'R$ 179,90',
          description: 'Respirabilidade máxima e toque macio para compor looks casuais chic ou de trabalho.',
          imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Quais cores da Camisa de Linho Puro (R$ 179,90) estão disponíveis?'
        },
        {
          id: 'mod4',
          title: 'Bolsa Estruturada em Couro c/ Alça Dourada',
          category: 'Bolsas & Acessórios',
          price: 'R$ 219,00',
          description: 'Acabamento premium com metais banhados, fechamento seguro e divisórias práticas.',
          imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',
          customWhatsappMsg: 'Olá! Gostaria de comprar a Bolsa Estruturada em Couro (R$ 219,00)!'
        }
      ],
      theme: 'sunset_purple'
    }
  }
];

export function getMockupByNiche(niche: string = ''): ReadyMockupTemplate {
  const n = (niche || '').toLowerCase();
  const byId = (id: string) => READY_MINISITE_MOCKUPS.find((m) => m.id === id) || READY_MINISITE_MOCKUPS[0];

  if (n.includes('corretor') || n.includes('imove') || n.includes('imóve') || n.includes('imobili') || n.includes('creci') || n.includes('alphaville') || n.includes('mansao') || n.includes('mansão')) {
    return byId('perfil_pessoal_corretor');
  }
  if (n.includes('wladmir') || n.includes('wlad') || n.includes('wm alimento') || n.includes('wmalimento') || n.includes('perfil pessoal') || n.includes('executivo')) {
    return byId('perfil_pessoal_wladmir');
  }
  if (n.includes('alf') || n.includes('automa') || n.includes('nfc') || n.includes('tecnologia') || n.includes('software') || n.includes('placa') || n.includes('marketing')) {
    return byId('alf_automacoes');
  }
  if (n.includes('sobrancelh') || n.includes('micropigment') || n.includes('nanoblad') || n.includes('microblad') || n.includes('cilios') || n.includes('cílios') || n.includes('lash') || n.includes('brow') || n.includes('regard')) {
    return byId('bio_sobrancelha');
  }
  if (n.includes('medic') || n.includes('médic') || n.includes('doutor') || n.includes('dra') || n.includes('dr.') || n.includes('saude') || n.includes('saúde') || n.includes('cardio') || n.includes('pediatr') || n.includes('ortop') || n.includes('ginec') || n.includes('nutro') || n.includes('endocr')) {
    return byId('bio_medica');
  }
  if (n.includes('facial') || n.includes('harmoniza') || n.includes('botox') || n.includes('estetica') || n.includes('estética') || n.includes('bioméd') || n.includes('biomed') || n.includes('derm') || n.includes('laser') || n.includes('lumiere') || n.includes('skincare')) {
    return byId('bio_estetica_facial');
  }
  if (n.includes('hamburg') || n.includes('burger') || n.includes('lanche')) {
    return byId('hamburgueria');
  }
  if (n.includes('barbear') || n.includes('barber') || n.includes('cabel') || n.includes('salao') || n.includes('salão')) {
    return byId('barbearia');
  }
  if (n.includes('beleza') || n.includes('spa') || n.includes('unha') || n.includes('clinic') || n.includes('clínic') || n.includes('dent') || n.includes('odont')) {
    return byId('estetica_spa');
  }
  if (n.includes('pizz') || n.includes('restaur') || n.includes('massas')) {
    return byId('pizzaria');
  }
  if (n.includes('caf') || n.includes('bistro') || n.includes('bistrô') || n.includes('doc') || n.includes('confeit') || n.includes('bolo')) {
    return byId('cafeteria');
  }
  if (n.includes('auto') || n.includes('carro') || n.includes('mecanic') || n.includes('lava') || n.includes('detail')) {
    return byId('automotivo');
  }
  if (n.includes('moda') || n.includes('roupa') || n.includes('boutique') || n.includes('calc') || n.includes('vestu')) {
    return byId('boutique');
  }
  return READY_MINISITE_MOCKUPS[0];
}



