import fs from 'fs';
import path from 'path';

// 1. Read existing backup-alf-sistema-oficial.json
let existingLeads = [];
try {
  const existingBackup = JSON.parse(fs.readFileSync('backup-alf-sistema-oficial.json', 'utf8'));
  existingLeads = existingBackup.leads || [];
} catch (e) {
  console.warn('Could not read existing backup-alf-sistema-oficial.json', e.message);
}

// 2. Official Leads (ALF, Mabini, Wladmir)
const OFFICIAL_MABINI_LEAD = {
  id: "lead_1",
  name: "MABINI Locação de Cadeiras e Mesas",
  address: "Rua Antônio Galvão, 150 - Jardim Bandeirantes, Marília - SP",
  phone: "(14) 99876-5432",
  rating: 5.0,
  reviewCount: 38,
  hasWebsite: true,
  websiteUrl: "https://mabinilocacao.com.br",
  googleMapsUrl: "https://search.google.com/local/writereview?placeid=ChIJN2yUo4jVv5QRC6D92p6pTJk",
  niche: "Locação de Cadeiras, Mesas e Materiais para Eventos",
  city: "Marília - SP",
  weakness: "Potencial gigante no Google Meu Negócio ainda pouco explorado",
  stage: "won",
  saleValue: 180,
  productType: "nfc",
  isGoogleRegistered: true,
  googleReviewsStatus: "⭐⭐⭐⭐⭐ Avaliações 5 Estrelas Ativas!",
  isPlaqueActive: true,
  isPlaquePrinted: true,
  isCustomerAccepted: true,
  nfcCustomUrl: "https://search.google.com/local/writereview?placeid=ChIJN2yUo4jVv5QRC6D92p6pTJk",
  nfcRedirectActive: "gmb",
  nfcBillingStatus: "active",
  nfcPassword: "1234",
  totalScans: 48,
  lastScanAt: new Date().toISOString(),
  lastScanChannel: "gmb",
  nfcModulesAllowed: {
    gmb: true,
    whatsapp: true,
    instagram: true,
    website: true,
    custom: true
  }
};

const OFFICIAL_ALF_LEAD = {
  id: "lead_alf",
  name: "ALF Automation • Inteligência Artificial & Estratégia Digital",
  address: "Atendimento Digital e Envio de Placas & Cartões NFC para Todo o Brasil",
  phone: "(14) 98130-4973",
  rating: 5.0,
  reviewCount: 184,
  hasWebsite: true,
  websiteUrl: "https://automacaonfc.onrender.com",
  googleMapsUrl: "https://www.google.com/search?q=ALF+Automation#lrd=0x0:0x0,3",
  niche: "Inteligência Artificial • Estratégia Digital • Gestão de Vendas",
  city: "Atendimento em Todo o Brasil",
  weakness: "Negócio Modelo Oficial e Flagship da Empresa",
  stage: "won",
  saleValue: 2490,
  productType: "combo",
  isGoogleRegistered: true,
  googleReviewsStatus: "⭐⭐⭐⭐⭐ 184 avaliações 5 estrelas verificadas",
  isPlaqueActive: true,
  isPlaquePrinted: true,
  isCustomerAccepted: true,
  nfcCustomUrl: "https://automacaonfc.onrender.com/?minisite=alf_automacoes",
  nfcRedirectActive: "minisite",
  nfcBillingStatus: "active",
  nfcWhatsappNum: "5514981304973",
  nfcWhatsappMsg: "Olá Allan! Vi o Mini Site da ALF Automation e gostaria de agendar uma consultoria sobre Placas NFC e Bio Sites!",
  nfcInstagramUrl: "https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==",
  nfcModulesAllowed: {
    gmb: true,
    whatsapp: true,
    instagram: true,
    website: true,
    custom: true
  },
  miniSiteConfig: {
    id: "alf_automacoes",
    theme: "apple_titanium_dark",
    companyName: "ALF Automation",
    founderName: "Allan Fassa",
    founderRole: "Fundador & Diretor de Tecnologia",
    founderPhoto: "/assets/aistudio/AISelect_20261023_121343_Chrome_7e3dbd88.jpg",
    headline: "Transforme visitas em clientes que compram todos os dias.",
    subheadline: "Automação com IA, Placas de Avaliação Google NFC 5★ e Mini Sites de Alta Conversão que multiplicam seu faturamento no WhatsApp em até 7 dias.",
    whatsappNumber: "5514981304973",
    whatsappDisplay: "(14) 98130-4973",
    instagramHandle: "@alfautomation",
    instagramUrl: "https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==",
    metrics: [
      { value: "+300%", label: "Avaliações 5★ Google", desc: "Top 1 no Google Maps local" },
      { value: "7 Dias", label: "Para Ver Resultados", desc: "Instalação rápida e imediata" },
      { value: "3x Mais", label: "Vendas no WhatsApp", desc: "Fechamento direto sem fricção" },
      { value: "0.3s", label: "Aproximação NFC", desc: "Compatível com iPhone e Android" }
    ],
    products: [
      {
        id: "prod_placa",
        title: "Placa de Avaliação Google NFC 5★",
        badge: "Mais Vendido",
        tag: "Google Meu Negócio",
        price: "Sob Consulta",
        description: "Acrílico cast black com chip NFC NTAG213 de aproximação instantânea + QR Code dinâmico gravado a laser. O cliente encosta o celular e cai direto na tela de 5 estrelas do seu Google.",
        whatsappCta: "Olá Allan! Quero encomendar a Placa Google NFC 5★ para minha empresa!"
      },
      {
        id: "prod_minisite",
        title: "Mini Site & Bio Site Apple Style",
        badge: "Alta Conversão",
        tag: "Web & Mobile",
        price: "Sob Consulta",
        description: "Página mobile ultrarrápida com design estilo Apple Titanium, botões de ação imediata, vitrine de produtos/serviços e direcionamento direto para seu WhatsApp.",
        whatsappCta: "Olá Allan! Quero criar um Mini Site / Bio Site de alta conversão para o meu negócio!"
      },
      {
        id: "prod_cartao",
        title: "Cartão de Visita Inteligente NFC",
        badge: "Tecnologia",
        tag: "Networking Pro",
        price: "Sob Consulta",
        description: "Cartão em PVC fosco premium com chip NFC integrado. Encoste no celular do cliente para salvar seu contato na agenda (vCard) e abrir seu portfólio instantaneamente.",
        whatsappCta: "Olá Allan! Tenho interesse no Cartão de Visita Inteligente NFC!"
      },
      {
        id: "prod_combo",
        title: "Combo Aceleração Digital Completo",
        badge: "Melhor Custo-Benefício",
        tag: "Solução Total",
        price: "Sob Consulta",
        description: "Placa Google NFC 5★ + Mini Site personalizado estilo Apple + Cartão de Visita NFC + Estratégia de posicionamento no Google Maps.",
        whatsappCta: "Olá Allan! Quero a consultoria do Combo Completo de Aceleração Digital!"
      }
    ]
  }
};

// Combine leads deduplicating by id
const leadsMap = new Map();
// Add initial/official leads first
leadsMap.set(OFFICIAL_ALF_LEAD.id, OFFICIAL_ALF_LEAD);
leadsMap.set(OFFICIAL_MABINI_LEAD.id, OFFICIAL_MABINI_LEAD);
// Add all existing leads
for (const lead of existingLeads) {
  if (lead && lead.id) {
    leadsMap.set(lead.id, lead);
  }
}
const allLeads = Array.from(leadsMap.values());

// 3. Physical Plates & Redirect Routing Table
const PHYSICAL_PLATES_ROUTING = [
  {
    plateId: "lead_1",
    aliases: ["mabini", "mabinilocacao", "placa1", "1", "01"],
    company: "MABINI Locação de Cadeiras e Mesas",
    destinationType: "Google Review 5★ Instantâneo",
    targetUrl: "https://search.google.com/local/writereview?placeid=ChIJN2yUo4jVv5QRC6D92p6pTJk",
    nfcRoute: "/r/lead_1",
    qrRoute: "/qr/lead_1",
    status: "Ativo & Gravado na Placa Física"
  },
  {
    plateId: "alf_automacoes",
    aliases: ["alf", "alfautomacoes", "modelo_alf"],
    company: "ALF Automation (Allan Fassa)",
    destinationType: "Mini Site Apple Titanium Oficial",
    targetUrl: "https://automacaonfc.onrender.com/?minisite=alf_automacoes",
    nfcRoute: "/r/alf_automacoes",
    qrRoute: "/qr/alf_automacoes",
    status: "Ativo & Gravado na Placa / Cartão NFC"
  },
  {
    plateId: "bellariobrancomesas",
    aliases: ["empresa06", "empresa_06", "bella", "bellariobranco", "mesas"],
    company: "BELLA RIO BRANCO PADARIA E CONFEITARIA",
    destinationType: "Google Review 5★ Instantâneo",
    targetUrl: "https://search.google.com/local/writereview?placeid=ChIJTTKzQz_Xv5QRjyhnE6zQpyI",
    nfcRoute: "/r/bellariobrancomesas",
    qrRoute: "/qr/empresa06",
    status: "Ativo & Gravado na Placa Física"
  },
  {
    plateId: "empre08",
    aliases: ["empresa08", "suica", "padariasuica"],
    company: "PADARIA SUIÇA",
    destinationType: "Google Review 5★ Instantâneo",
    targetUrl: "https://search.google.com/local/writereview?placeid=ChIJx2ytYDXXv5QRQzIXgn7RRrc",
    nfcRoute: "/r/empre08",
    qrRoute: "/qr/empresa08",
    status: "Ativo & Gravado na Placa Física"
  },
  {
    plateId: "assadosdojapa",
    aliases: ["japa", "assados"],
    company: "ASSADOS DO JAPA",
    destinationType: "Google Review 5★ Instantâneo",
    targetUrl: "https://www.google.com/search?q=ASSADOS+DO+JAPA#lrd=0x0:0x0,3",
    nfcRoute: "/r/assadosdojapa",
    qrRoute: "/qr/assadosdojapa",
    status: "Ativo & Gravado na Placa Física"
  },
  {
    plateId: "danipontello",
    aliases: ["cbcell", "cb_cell", "pontello"],
    company: "CB CELL / Dani Pontello",
    destinationType: "Google Review 5★ Instantâneo",
    targetUrl: "https://www.google.com/search?q=Dani%20pontello#lrd=0x0:0x0,3",
    nfcRoute: "/r/danipontello",
    qrRoute: "/qr/danipontello",
    status: "Ativo & Gravado na Placa Física"
  }
];

// 4. Complete System Structure Payload
const fullBackupPayload = {
  backupTitle: "ALF Automação & Placas NFC - Backup Completo e Estrutura Integral do Sistema",
  exportedAt: new Date().toISOString(),
  systemVersion: "2.5.0-apple-titanium",
  author: "Allan Fassa - ALF Automation",
  contactWhatsApp: "+55 (14) 98130-4973",
  contactInstagram: "@alfautomation",
  
  deploymentInfo: {
    productionUrl: "https://automacaonfc.onrender.com",
    alfMiniSiteUrl: "https://automacaonfc.onrender.com/?minisite=alf_automacoes",
    mabiniReviewUrl: "https://automacaonfc.onrender.com/r/lead_1",
    hostProvider: "Render (Node.js Web Service)",
    renderYamlConfig: {
      type: "web",
      name: "automacaonfc",
      env: "node",
      plan: "free",
      buildCommand: "npm install && npm run build",
      startCommand: "npm start",
      healthCheckPath: "/health",
      port: 3000
    }
  },

  gitHubStatus: {
    isGitRepositoryInsideContainer: false,
    explanation: "O ambiente de desenvolvimento em nuvem do Google AI Studio não mantém uma pasta local '.git' inicializada dentro deste container isolado por padrão. No entanto, o seu serviço de hospedagem no Render (https://automacaonfc.onrender.com) está conectado ao seu repositório no GitHub para os deploys em produção. Todas as alterações feitas aqui no código-fonte estão 100% salvas nos arquivos do projeto e você pode baixar este JSON como backup completo ou exportar o código para sincronizar com seu GitHub.",
    howToSyncGitHub: [
      "1. Caso queira salvar uma cópia local no seu computador: Baixe os arquivos do projeto.",
      "2. No seu repositório Git local: 'git add .', 'git commit -m \"Atualização ALF Mini Site Apple + Backup 2026\"', 'git push origin main'.",
      "3. O Render detectará automaticamente o push no GitHub e fará o build com 'npm install && npm run build'."
    ]
  },

  physicalPlatesRouting: PHYSICAL_PLATES_ROUTING,

  systemArchitecture: {
    frontend: {
      framework: "React 19 (TypeScript) + Vite 8",
      styling: "Tailwind CSS v4 + Framer Motion 12 + GSAP 3 + Lucide Icons",
      appleDesignFeatures: [
        "Titanium Obsidian dark theme (#07090e base)",
        "Apple Glassmorphism borders (rgba(255,255,255,0.08))",
        "Allan Fassa verified squircle avatar com gatilho de upload de foto",
        "Bento Grid de 4 métricas de alto impacto (+300% Google 5★, 7 Dias, 3x Vendas no WhatsApp, 0.3s NFC)",
        "3 Pilares Tecnológicos: Placas Google NFC, Mini Sites & Bio Sites, Cartões Inteligentes NFC",
        "Depoimentos reais com selo Google Verificado 5.0",
        "4 Vitrines de Produtos com botões de orçamento 1-clique no WhatsApp",
        "Download instantâneo de vCard do Allan Fassa para agenda de contatos"
      ]
    },
    backend: {
      framework: "Node.js + Express (server.ts)",
      port: 3000,
      routingEngine: [
        "/r/:id -> Redirecionamento 302 instantâneo (0ms) para Google Review ou Mini Site da empresa",
        "/qr/:id -> Redirecionamento 302 instantâneo para QR Code",
        "/p/:id -> Redirecionamento para placa física",
        "/api/redirect/:id -> API de status e rota",
        "/api/leads -> CRUD completo de clientes",
        "/health -> Healthcheck do Render"
      ],
      optimizations: [
        "NGINX lua public bypass para evitar bloqueios de autenticação em leituras de QR/NFC",
        "Memória Cache de 0ms para placas físicas mesmo em caso de limite de cota do Firestore",
        "Circuit Breaker inteligente de escrita no Firestore"
      ]
    },
    database: {
      provider: "Google Firebase Cloud Firestore",
      projectId: "gen-lang-client-0330090716",
      databaseId: "ai-studio-alfautomaogmbsal-702a33aa-2f38-4afe-9ac9-5641b8c276cd",
      collections: ["leads", "mini_sites", "qr_tags", "analytics"]
    }
  },

  totalLeadsCount: allLeads.length,
  leads: allLeads
};

// Write both to root and public for download
const rootPath = path.resolve('backup-alf-sistema-completo-2026.json');
const publicPath = path.resolve('public/backup-alf-sistema-completo-2026.json');

fs.writeFileSync(rootPath, JSON.stringify(fullBackupPayload, null, 2), 'utf8');
fs.writeFileSync(publicPath, JSON.stringify(fullBackupPayload, null, 2), 'utf8');

console.log('Backup generated successfully!');
console.log('Root:', rootPath, 'Size:', fs.statSync(rootPath).size, 'bytes');
console.log('Public:', publicPath, 'Size:', fs.statSync(publicPath).size, 'bytes');
console.log('Total leads saved in backup:', allLeads.length);
