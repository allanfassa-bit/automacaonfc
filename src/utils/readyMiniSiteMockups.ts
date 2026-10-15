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

export const READY_MINISITE_MOCKUPS: ReadyMockupTemplate[] = [
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
  if (n.includes('hamburg') || n.includes('burger') || n.includes('lanche')) {
    return READY_MINISITE_MOCKUPS[0];
  }
  if (n.includes('barbear') || n.includes('barber') || n.includes('cabel') || n.includes('salao') || n.includes('salão')) {
    return READY_MINISITE_MOCKUPS[1];
  }
  if (n.includes('estet') || n.includes('estét') || n.includes('beleza') || n.includes('spa') || n.includes('unha') || n.includes('derm') || n.includes('clinic') || n.includes('clínic') || n.includes('dent') || n.includes('odont')) {
    return READY_MINISITE_MOCKUPS[2];
  }
  if (n.includes('pizz') || n.includes('restaur') || n.includes('massas')) {
    return READY_MINISITE_MOCKUPS[3];
  }
  if (n.includes('caf') || n.includes('bistro') || n.includes('bistrô') || n.includes('doc') || n.includes('confeit') || n.includes('bolo')) {
    return READY_MINISITE_MOCKUPS[4];
  }
  if (n.includes('auto') || n.includes('carro') || n.includes('mecanic') || n.includes('lava') || n.includes('detail')) {
    return READY_MINISITE_MOCKUPS[5];
  }
  if (n.includes('moda') || n.includes('roupa') || n.includes('boutique') || n.includes('calc') || n.includes('vestu')) {
    return READY_MINISITE_MOCKUPS[6];
  }
  return READY_MINISITE_MOCKUPS[0];
}
