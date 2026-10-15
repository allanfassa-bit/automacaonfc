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
    badge: 'Mais Vendido',
    tagline: 'Hambúrgueres na brasa, smash burgers e batatas rústicas com atendimento VIP.',
    accentColor: '#f59e0b',
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-hamburgueria',
      companyName: 'Burger Prime Artesanal',
      niche: 'Hamburgueria & Gastronomia',
      city: 'São Paulo - SP',
      tagline: 'Hambúrgueres artesanais na brasa, smash burgers e batatas crocantes especiais.',
      logoUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80',
      marqueeText: '🔥 PEDIDOS PELO WHATSAPP COM 10% OFF • SMASH BURGER DUPLO • BATATA CRUNCH • ENTREGA RÁPIDA • PIX 1-CLIQUE 🔥',
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
          price: 'R$ 38,90',
          description: 'Pão brioche selado, 2 smash 100g de fraldinha, cheddar inglês derretido e maionese defumada.',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Smash Burger Duplo Prime (R$ 38,90) pelo WhatsApp!'
        },
        {
          id: 'b2',
          title: 'Mega Bacon BBQ na Brasa',
          price: 'R$ 44,90',
          description: 'Blend 180g assado na brasa, tiras de bacon caramelizado, queijo prato e barbecue artesanal.',
          imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero pedir o Mega Bacon BBQ na Brasa (R$ 44,90) com entrega rápida!'
        },
        {
          id: 'b3',
          title: 'Batata Rústica c/ Costela & Cheddar',
          price: 'R$ 29,90',
          description: 'Batatas com casca cortadas à mão, costela desfiada temperada, molho cheddar cremoso e cebolinha.',
          imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Adicione uma porção de Batata Rústica c/ Costela (R$ 29,90) ao meu pedido!'
        },
        {
          id: 'b4',
          title: 'Milkshake Nutella c/ Ninho 500ml',
          price: 'R$ 24,90',
          description: 'Sorvete artesanal de baunilha batido com Nutella pura, chantilly e borda farta de Ninho.',
          imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de incluir o Milkshake de Nutella c/ Ninho (R$ 24,90)!'
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
    tagline: 'Degradê navalhado, barba terapia com toalha quente e cerveja artesanal gelada.',
    accentColor: '#38bdf8',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-barbearia',
      companyName: 'Barbearia Dom Corleone VIP',
      niche: 'Barbearia & Salão Masculino',
      city: 'Curitiba - PR',
      tagline: 'Experiência clássica e moderna: degradê perfeito, barba terapia e ambiente climatizado.',
      logoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=300&q=80',
      marqueeText: '✂️ AGENDE SEU HORÁRIO PELO WHATSAPP • BEBIDA CORTESIA • CORTE & BARBA VIP • TOALHA QUENTE • WI-FI ✂️',
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
          price: 'R$ 50,00',
          description: 'Corte moderno personalizado, fade perfeito na navalha e finalização com pomada matte.',
          imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de agendar o Corte Degradê Navalhado VIP (R$ 50,00)!'
        },
        {
          id: 'barb2',
          title: 'Barba Terapia c/ Toalha Quente',
          price: 'R$ 45,00',
          description: 'Esfoliação, óleos hidratantes para a pele, toalha quente relaxante e alinhamento impecável.',
          imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero agendar a Barba Terapia c/ Toalha Quente (R$ 45,00)!'
        },
        {
          id: 'barb3',
          title: 'Combo Corleone: Cabelo + Barba',
          price: 'R$ 85,00',
          description: 'O combo favorito da casa com direito a café expresso ou chopp artesanal cortesia.',
          imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de agendar o Combo Completo Cabelo + Barba (R$ 85,00)!'
        },
        {
          id: 'barb4',
          title: 'Pigmentação & Camuflagem de Grisalhos',
          price: 'R$ 40,00',
          description: 'Disfarce natural de fios brancos e falhas na barba com durabilidade de até 3 semanas.',
          imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Tenho interesse na Pigmentação de Barba (R$ 40,00). Quais horários livres?'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'estetica',
    category: 'Estética, Beleza & Saúde',
    title: 'Clínica Harmonize Estética & Spa',
    emoji: '💅',
    badge: 'Premium',
    tagline: 'Procedimentos faciais e corporais com tecnologia avançada e resultados naturais.',
    accentColor: '#10b981',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-estetica',
      companyName: 'Clínica Harmonize Estética & Spa',
      niche: 'Estética Facial & Corporal',
      city: 'Belo Horizonte - MG',
      tagline: 'Harmonização facial sutil, tratamentos corporais e relaxamento em ambiente acolhedor.',
      logoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80',
      marqueeText: '✨ AVALIAÇÃO FACIAL GRATUITA PELO WHATSAPP • BOTOX PREVENTIVO • LIMPEZA DE PELE LED • DRENAGEM VIP ✨',
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
          price: 'R$ 180,00',
          description: 'Extração indolor de impurezas, vapor de ozônio, máscara calmante e máscara de LED regeneradora.',
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de agendar a Limpeza de Pele Profunda c/ LED (R$ 180,00)!'
        },
        {
          id: 'est2',
          title: 'Aplicação de Botox & Linhas de Expressão',
          price: 'Consulte Valores',
          description: 'Suavização natural das rugas da testa, glabela e pés de galinha com marcas de referência mundial.',
          imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de saber os valores e condições para aplicação de Botox!'
        },
        {
          id: 'est3',
          title: 'Harmonização & Hidratação Labial',
          price: 'A partir de R$ 890,00',
          description: 'Ácido hialurônico de alta pureza para devolver o contorno, volume equilibrado e brilho aos lábios.',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero saber mais sobre a Harmonização Labial e agendar avaliação!'
        },
        {
          id: 'est4',
          title: 'Drenagem Linfática Método Exclusivo',
          price: 'R$ 140,00',
          description: 'Manobras suaves que eliminam a retenção de líquidos, desincham o corpo e ativam a circulação.',
          imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de agendar uma sessão de Drenagem Linfática (R$ 140,00)!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'pizzaria',
    category: 'Pizzaria & Forno a Lenha',
    title: 'Forneria & Pizzaria Bella Napoli',
    emoji: '🍕',
    badge: 'Tradição',
    tagline: 'Pizzas artesanais napolitanas com massa de fermentação lenta 48h e forno a lenha.',
    accentColor: '#ef4444',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-pizzaria',
      companyName: 'Forneria & Pizzaria Bella Napoli',
      niche: 'Pizzaria Napolitana',
      city: 'Florianópolis - SC',
      tagline: 'Farinha italiana, massa leve com 48h de descanso e assada no autêntico forno a lenha.',
      logoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
      marqueeText: '🍕 FORNO A LENHA NAPOLITANO • MASSA LEVE 48H • PEÇA NO WHATSAPP • ENTREGA QUENTINHA EM CASA 🍕',
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
          price: 'R$ 68,00',
          description: 'Molho de tomate San Marzano italiano, mozzarella de búfala fresca, queijo parmesão e manjericão.',
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero pedir a pizza Margherita di Bufala (R$ 68,00) no WhatsApp!'
        },
        {
          id: 'piz2',
          title: 'Calabresa Artesanal Defumada',
          price: 'R$ 62,00',
          description: 'Calabresa artesanal finamente fatiada, cebola roxa caramelizada, orégano fresco e azeitonas.',
          imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de pedir a Calabresa Artesanal Defumada (R$ 62,00)!'
        },
        {
          id: 'piz3',
          title: 'Parma & Grana Padano Trufado',
          price: 'R$ 79,00',
          description: 'Presunto cru de Parma fatiado na hora, rúcula silvestre fresca, lascas de Grana Padano e azeite trufado.',
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero pedir a pizza Parma & Grana Padano Trufada (R$ 79,00)!'
        },
        {
          id: 'piz4',
          title: 'Calzone Recheado Tradizionale',
          price: 'R$ 54,00',
          description: 'Massa dobrada e dourada com recheio cremoso de ricota, provolone defumado e salame italiano.',
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Calzone Recheado Tradicional (R$ 54,00)!'
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
    tagline: 'Cafés especiais premiados, brunch completo, croissants amanteigados e sobremesas finas.',
    accentColor: '#d97706',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-cafe',
      companyName: 'Café & Bistrô Aromas Especiais',
      niche: 'Cafeteria & Confeitaria',
      city: 'Gramado - RS',
      tagline: 'O ponto de encontro dos apaixonados por café especial, brunch farto e doces artesanais.',
      logoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80',
      marqueeText: '☕ BRUNCH COMPLETO TODOS OS DIAS • CAFÉS ESPECIAIS 100% ARÁBICA • CROISSANTS QUENTINHOS • WI-FI GRÁTIS ☕',
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
          price: 'R$ 44,00',
          description: 'Croissant folhado na manteiga francesa, ovos mexidos cremosos com bacon e capuccino aveludado.',
          imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de pedir o Brunch Parisiense Completo (R$ 44,00)!'
        },
        {
          id: 'caf2',
          title: 'Café Filtrado Especial V60 Grão Premiado',
          price: 'R$ 15,00',
          description: 'Grãos selecionados com notas sensoriais de chocolate meio amargo e frutas vermelhas.',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de encomendar grãos ou pedir o café filtrado especial V60!'
        },
        {
          id: 'caf3',
          title: 'Torta Holandesa c/ Chocolate Belga',
          price: 'R$ 21,00',
          description: 'Base de biscoitos crocantes, creme aveludado aerado e cobertura espelhada de ganache meio amargo.',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de pedir fatias da Torta Holandesa c/ Chocolate Belga (R$ 21,00)!'
        },
        {
          id: 'caf4',
          title: 'Croissant Recheado de Creme de Pistache',
          price: 'R$ 23,50',
          description: 'Massa folhada artesanal com crocância exterior e recheio farto de brigadeiro de pistache.',
          imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
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
    badge: 'Profissional',
    tagline: 'Polimento técnico, vitrificação cerâmica 9H, higienização interna e proteção.',
    accentColor: '#06b6d4',
    coverImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-automotivo',
      companyName: 'Auto Estética & Detailer Premium',
      niche: 'Estética Automotiva',
      city: 'Campinas - SP',
      tagline: 'Cuidado minucioso para o seu veículo com produtos importados e certificação internacional.',
      logoUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=300&q=80',
      marqueeText: '🚗 BRILHO ESPELHADO DE ZERO KM • VITRIFICAÇÃO CERÂMICA 9H • BUSCAMOS SEU CARRO • AGENDAMENTO VIA WHATSAPP 🚗',
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
          price: 'R$ 130,00',
          description: 'Lavagem a vapor de caixa de rodas, pincelamento de emblemas, descontaminação ferrosa e cera nobre.',
          imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de agendar a Lavagem Técnica Detalhada VIP (R$ 130,00)!'
        },
        {
          id: 'aut2',
          title: 'Polimento Técnico Espelhado',
          price: 'A partir de R$ 480,00',
          description: 'Remoção em 3 etapas de até 95% dos micro-riscos, hologramas e marcas de lavagens incorretas.',
          imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero um orçamento de Polimento Técnico para o meu carro!'
        },
        {
          id: 'aut3',
          title: 'Vitrificação Cerâmica 9H (Até 3 Anos)',
          price: 'A partir de R$ 890,00',
          description: 'Escudo hidrofóbico que repele água, poeira e raios UV com brilho vitrificado duradouro.',
          imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de informações e agendamento para Vitrificação Cerâmica 9H!'
        },
        {
          id: 'aut4',
          title: 'Higienização Interna c/ Ozônio',
          price: 'R$ 260,00',
          description: 'Lavagem profunda de bancos, carpetes e teto combinada com esterilização que elimina fungos e odores.',
          imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero agendar a Higienização Interna c/ Ozônio (R$ 260,00)!'
        }
      ],
      theme: 'dark_neon'
    }
  },
  {
    id: 'boutique',
    category: 'Moda, Roupas & Acessórios',
    title: 'Boutique Bella Donna • Moda Feminina',
    emoji: '👗',
    badge: 'Tendência',
    tagline: 'Alfaiataria moderna, vestidos fluidos em seda, conjuntos elegantes e envio para todo o Brasil.',
    accentColor: '#ec4899',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    config: {
      id: 'mockup-boutique',
      companyName: 'Boutique Bella Donna',
      niche: 'Moda Feminina & Roupas',
      city: 'Goiânia - GO',
      tagline: 'Coleções exclusivas que unem conforto, sofisticação e estilo contemporâneo.',
      logoUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80',
      marqueeText: '👗 NOVA COLEÇÃO PRIMAVERA/VERÃO • ENVIAMOS PARA TODO O BRASIL • WHATSAPP EXCLUSIVO COM FRETE GRÁTIS 👗',
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
          price: 'R$ 289,90',
          description: 'Tecido nobre fluido com caimento impecável, estampa botânica exclusiva e decote delicado.',
          imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de comprar o Vestido Longo Seda Floral (R$ 289,90). Quais tamanhos disponíveis?'
        },
        {
          id: 'mod2',
          title: 'Conjunto Alfaiataria Blazer + Pantalona',
          price: 'R$ 359,00',
          description: 'Blazer forrado com ombreiras estruturadas e calça pantalona cintura alta com caimento impecável.',
          imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quero pedir o Conjunto Alfaiataria (R$ 359,00) pelo WhatsApp!'
        },
        {
          id: 'mod3',
          title: 'Camisa 100% Linho Puro Manga Longa',
          price: 'R$ 179,90',
          description: 'Respirabilidade máxima e toque macio para compor looks casuais chic ou de trabalho.',
          imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Quais cores da Camisa de Linho Puro (R$ 179,90) estão disponíveis?'
        },
        {
          id: 'mod4',
          title: 'Bolsa Estruturada em Couro c/ Alça Dourada',
          price: 'R$ 219,00',
          description: 'Acabamento premium com detalhes banhados, fechamento seguro e divisórias práticas.',
          imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
          customWhatsappMsg: 'Olá! Gostaria de comprar a Bolsa Estruturada em Couro (R$ 219,00)!'
        }
      ],
      theme: 'dark_neon'
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
  if (n.includes('estet') || n.includes('estét') || n.includes('beleza') || n.includes('spa') || n.includes('unha') || n.includes('derm')) {
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
