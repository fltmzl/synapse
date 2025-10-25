import {
  CategoryNews,
  NewsItem,
  LegalNewsItem,
  SocialPost,
  productionDataType
} from "@/types/news.type";

export const newsData: NewsItem[] = [
  {
    slug: "martinique-green-transition-fund-2025",
    title: "Martinique SMEs secure €15M funding for green transition projects",
    category: "Juridique",
    author: "Regional Council of Martinique",
    date: "May 25, 2025",
    images: [
      "/images/news/news-1.png",
      "/images/news/news-2.png",
      "/images/news/news-3.png"
    ],
    content: [
      {
        text: `Small and medium-sized enterprises (SMEs) across Martinique have received a significant boost in their drive toward sustainability, as a new €15 million funding package is launched to support green transition initiatives across the island.`
      },
      {
        text: `The program — spearheaded by the French Development Agency (AFD) in partnership with the European Green Growth Fund (EGGF) and the Regional Council of Martinique — aims to accelerate the island’s economic transformation by promoting renewable energy, eco-innovation, and low-carbon development within local industries.`
      },
      {
        heading: "Empowering local businesses for a sustainable future",
        text: `The fund will primarily target Martinique’s agriculture, construction, tourism, and transport sectors, which together account for nearly 70% of the island’s carbon emissions. Through the initiative, eligible SMEs will receive a combination of low-interest loans, innovation grants, and technical support to help them modernize operations and reduce environmental impact.`
      },
      {
        text: `“This investment is not just about funding projects,” said Isabelle Moreau, Regional Delegate for Economic Cooperation. “It’s about empowering local entrepreneurs to take the lead in building a more resilient and sustainable Martinique — one that creates jobs while protecting our natural heritage.”`
      },
      {
        text: `The new funding will also help SMEs transition to renewable energy sources, such as solar, wind, and bioenergy, with several pilot installations already planned across the island. In Fort-de-France, for instance, food-processing cooperatives will receive financial and technical assistance to install solar panels and energy-efficient cooling systems, reducing operational emissions by up to 35%.`
      },
      {
        heading: "Supporting innovation and green jobs",
        text: `A portion of the fund — approximately €3 million — has been earmarked for innovation and research, encouraging startups and small firms to develop sustainable technologies tailored to the Caribbean climate. The initiative will also support vocational training programs to equip local workers with the skills needed in emerging green sectors.`
      },
      {
        text: `“The transition to a greener economy will only succeed if it’s inclusive,” said Jean-Luc Pierre, President of the Chamber of Commerce of Martinique. “We must ensure that small businesses, farmers, and artisans all benefit from this transformation, not just large corporations.”`
      },
      {
        text: `By 2030, the project aims to reduce Martinique’s SME carbon emissions by 40% and create over 1,200 green jobs, while fostering cross-island partnerships with Guadeloupe and Saint Lucia to share sustainable development expertise.`
      },
      {
        heading: "Part of a broader regional effort",
        text: `This initiative is part of the French Overseas Green Pact, a national policy framework launched in 2023 to support environmental transition across France’s overseas territories. The program prioritizes islands such as Martinique, Réunion, and Guadeloupe, which face unique climate challenges due to their reliance on imported energy and vulnerability to extreme weather events.`
      },
      {
        text: `Experts believe the €15 million investment could mark a turning point in how overseas territories approach sustainability — not as an obligation, but as an opportunity.`
      },
      {
        text: `“Martinique can become a regional model for the green economy,” said Dr. Claire Bérard, environmental economist at the University of the French Antilles. “If the private sector continues to innovate at this pace, the island could achieve carbon neutrality well before 2040.”`
      }
    ]
  },
  {
    slug: "martinique-smes-secure-15m-funding",
    title: "Martinique SMEs secure €15M funding for green transition projects",
    category: "Analyse",
    author: "Citizen",
    date: "Aug 29, 2025",
    images: [
      "/images/news/news-2.png",
      "/images/news/news-3.png",
      "/images/news/news-4.png"
    ],
    content: [
      {
        text: `Small and medium-sized enterprises (SMEs) across Martinique have received over €15 million in funding to support their green transition efforts. The initiative will help companies reduce emissions and modernize production processes.`
      },
      {
        heading: "Empowering local businesses for sustainability",
        text: `The funding program encourages entrepreneurs to invest in renewable energy, waste management, and eco-friendly logistics. It is expected to create more than 400 green jobs across the island.`
      },
      {
        heading: "Regional collaboration",
        text: `This initiative is part of a broader Caribbean-wide green development plan, aligning Martinique with global sustainability goals.`
      }
    ]
  },
  {
    slug: "mayotte-exports-increase-h1-2025",
    title:
      "Mayotte reports 5% increase in export activities for first half of 2025",
    category: "Juridique",
    author: "Mayotte Trade Bureau",
    date: "Aug 25, 2025",
    images: [
      "/images/news/news-3.png",
      "/images/news/news-4.png",
      "/images/news/news-5.png"
    ],
    content: [
      {
        text: `Mayotte’s export volume increased by 5% in the first half of 2025, driven primarily by agricultural products and artisanal goods. The rise highlights growing demand from European and East African markets.`
      },
      {
        heading: "Agriculture and trade innovation",
        text: `Farmers in Mayotte have adopted new digital supply chain systems to manage exports more efficiently. The regional government also introduced incentives for sustainable farming practices.`
      },
      {
        text: `The local Chamber of Commerce stated that this growth represents “a strong signal of economic diversification.”`
      }
    ]
  },
  {
    slug: "overseas-territories-representation-parliament",
    title:
      "Debate intensifies over representation of overseas territories in parliament",
    category: "Citoyenne",
    author: "Le Journal Outre-mer",
    date: "Sep 2, 2025",
    images: [
      "/images/news/news-4.png",
      "/images/news/news-5.png",
      "/images/news/news-6.png"
    ],
    content: [
      {
        text: `A growing political debate has emerged regarding how France’s overseas territories are represented in the national parliament. Lawmakers argue that the current system underrepresents island populations.`
      },
      {
        heading: "Proposals for change",
        text: `Several parliament members have suggested new representation models that better reflect demographic realities and ensure stronger local voices in decision-making.`
      },
      {
        text: `Citizens’ groups across Guadeloupe and Réunion have called for public consultations to ensure transparency and participation.`
      }
    ]
  },
  {
    slug: "unified-judicial-system-french-overseas",
    title: "Unified judicial system proposed for French overseas territories",
    category: "Politique",
    author: "Le Monde Juridique",
    date: "Oct 29, 2025",
    images: [
      "/images/news/news-5.png",
      "/images/news/news-1.png",
      "/images/news/news-2.png"
    ],
    content: [
      {
        text: `Legal experts are advocating for a unified judicial system across France’s overseas territories to improve efficiency and reduce administrative disparities.`
      },
      {
        heading: "Legal consistency across territories",
        text: `The reform would align judicial processes and court structures with those in mainland France, while maintaining consideration for local customs.`
      },
      {
        text: `Critics, however, fear that such centralization might erode the autonomy of local courts and overlook specific regional issues.`
      }
    ]
  },
  {
    slug: "legal-experts-call-unified-judicial-system",
    title:
      "Legal experts call for unified judicial system across French overseas territories",
    category: "Politique",
    author: "France Info",
    date: "Oct 15, 2025",
    images: [
      "/images/news/news-6.png",
      "/images/news/news-2.png",
      "/images/news/news-3.png"
    ],
    content: [
      {
        text: `A coalition of legal scholars and government advisors has reiterated calls for a unified legal framework governing all French overseas territories.`
      },
      {
        heading: "Addressing inequality and efficiency",
        text: `The proposal seeks to streamline administrative processes, improve case management, and ensure equal access to justice across regions.`
      },
      {
        heading: "Political implications",
        text: `While the government has shown interest, some local representatives caution that any reform must respect territorial autonomy and cultural diversity.`
      }
    ]
  }
];

export const productionData: productionDataType[] = [
  {
    category: "Legislation",
    date: "Sep 2, 2025",
    title:
      "New labor law reform enhances worker protections in French Territories.",
    image: "/images/prod-1.png"
  },
  {
    category: "Tax Policy",
    date: "Aug 29, 2025",
    title:
      "Corporate tax adjustments for SMEs operating in Réunion and Mayotte",
    image: "/images/prod-2.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/prod-1.png"
  },
  {
    category: "Judicial",
    date: "Aug 25, 2025",
    title: "Constitutional review on overseas ownership disputes continues",
    image: "/images/prod-2.png"
  }
];

export const lastInfo: CategoryNews[] = [
  {
    category: "politique",
    title: "French Assembly debates overseas tax reform bill",
    description:
      "The French Assembly is debating a tax reform bill for overseas territories, aiming to adjust fiscal structures and revenue allocation to create fairer economic conditions.",
    date: "April 3, 2025",
    image: "/images/actualite.png"
  },
  {
    category: "politique",
    title: "French Senate reviews proposal on overseas economic autonomy",
    description:
      "The French Senate is reviewing a proposal to grant more autonomy to overseas territories, strengthening local governance and fiscal control.",
    date: "April 3, 2025",
    image: "/images/news/news-2.png"
  },
  {
    category: "politique",
    title:
      "Debate intensifies over representation of overseas territories in parliament",
    description:
      "A growing debate centers on how overseas territories are represented in parliament, with calls for stronger voices from these regions.",
    date: "April 3, 2025",
    image: "/images/news/news-3.png"
  },
  {
    category: "juridique",
    title: "New legislation enhances worker rights in overseas regions",
    description:
      "The new bill aims to standardize labor protections across all French territories, ensuring fair conditions for workers.",
    date: "March 20, 2025",
    image: "/images/news/news-2.png"
  },
  {
    category: "juridique",
    title: "Court rules in favor of tax exemptions for SMEs",
    description:
      "A landmark court decision grants tax relief to small and medium enterprises operating in overseas French territories.",
    date: "March 18, 2025",
    image: "/images/news/news-3.png"
  },
  {
    category: "juridique",
    title: "Legal experts call for unified judicial system",
    description:
      "Legal professionals are urging the government to streamline the judicial system across overseas territories for consistency.",
    date: "March 15, 2025",
    image: "/images/news/news-1.png"
  },
  {
    category: "citoyenne",
    title: "Youth programs foster innovation in overseas territories",
    description:
      "Social initiatives are helping young people develop digital skills and connect with global markets.",
    date: "Feb 28, 2025",
    image: "/images/news/news-3.png"
  },
  {
    category: "citoyenne",
    title: "Community hubs expand in rural regions",
    description:
      "Local governments are opening new centers to strengthen social engagement and cultural identity.",
    date: "Feb 22, 2025",
    image: "/images/news/news-2.png"
  },
  {
    category: "citoyenne",
    title: "Online platforms empower women entrepreneurs",
    description:
      "New digital tools are helping women from overseas territories launch and grow their own businesses.",
    date: "Feb 20, 2025",
    image: "/images/news/news-1.png"
  }
];

export const socialPosts: SocialPost[] = [
  {
    platform: "Instagram",
    username: "@greenmartinique",
    contentMain: "Local SMEs are embracing green energy solutions 🌱☀️.",
    contentHighlight: "Over 50 projects have launched this year in Martinique.",
    image: "/images/news/news-1.png",
    likes: 1240,
    comments: 87
  },
  {
    platform: "Instagram",
    username: "@guadeloupe_economy",
    contentMain: "Local SMEs are embracing green energy solutions 🌱☀️.",
    contentHighlight: "Over 50 projects have launched this year in Martinique.",
    image: "/images/news/news-3.png",
    likes: 890,
    retweets: 430
  },
  {
    platform: "X (Twitter)",
    username: "@greenmartinique",
    contentMain:
      "Mayotte’s export activity up by 5% in the first half of 2025 — ",
    contentHighlight: "SMEs lead the way with strong international demand.",
    image: "/images/news/news-2.png",
    likes: 890,
    retweets: 430
  },

  {
    platform: "X (Twitter)",
    username: "@guadeloupe_economy",
    contentMain: "A look inside the new Guadeloupe Startup Grant Program 🚀✨",
    contentHighlight: "",
    image: "/images/news/news-4.png",
    likes: 890,
    retweets: 430
  }
];

export const legalPost: LegalNewsItem[] = [
  {
    category: "Privacy Law",
    territory: "France",
    person: "Emmanuel Macron",
    title: "Court Ruling on Digital Privacy",
    excerpt:
      "The EU Court of Justice upholds stricter user data protection, reinforcing privacy standards across member states.",
    tags: ["Privacy", "Law"],
    place: "EU",
    publisher: "Journal Officiel",
    platform: ["Facebook", "LinkedIn"],
    image: "/images/legal-news/legal-1.png",
    date: "May 21, 2025"
  },
  {
    category: "Tax Law",
    territory: "France",
    person: "",
    title: "Corporate Tax Reform Passed",
    excerpt: "Government approves new corporate tax framework effective 2026.",
    tags: ["Tax Law", "Regulation"],
    place: "Paris",
    publisher: "Le Monde",
    platform: ["Instagram"],
    image: "/images/legal-news/legal-2.png",
    date: "May 22, 2025"
  },
  {
    category: "Land Law",
    territory: "Martinique",
    person: "Philippe Antoine",
    title: "Land Reform Case in Martinique",
    excerpt:
      "A regional court rules on land ownership disputes between local communities and private developers.",
    tags: ["Labor Law", "Remote Work"],
    place: "Martinique",
    publisher: "France-Antilles",
    platform: ["Twitter"],
    image: "/images/legal-news/legal-3.png",
    date: "Sep 3, 2025"
  },
  {
    category: "Labor Law",
    territory: "Guadeloupe",
    person: "Louis Caron",
    title: "Guadeloupe Labor Dispute Settled",
    excerpt:
      "The tribunal resolves a conflict over dockworkers’ contracts at Pointe-à-Pitre port.",
    tags: ["Labor Law", "Union"],
    place: "Guadeloupe",
    publisher: "",
    platform: ["LinkedIn", "Facebook"],
    image: "/images/legal-news/legal-4.png",
    date: "May 20, 2025"
  },
  {
    category: "Mining Law",
    territory: "French Guiana",
    person: "Jean-Paul Lévy",
    title: "French Guiana Mining Law Enforcement",
    excerpt:
      "Authorities crack down on illegal gold mining under a new regional legal framework.",
    tags: ["Mining Law", "Environment"],
    place: "Guyane",
    publisher: "France-Guyane",
    platform: ["Twitter"],
    image: "/images/legal-news/legal-5.png",
    date: "May 15, 2025"
  },
  {
    category: "Transport Law",
    territory: "Réunion",
    person: "Claire Bernard",
    title: "Réunion Transport Regulation",
    excerpt:
      "Court blocks unauthorized ride-hailing services for failing to meet local safety standards.",
    tags: ["Transport Law", "Business"],
    place: "Réunion",
    publisher: "France-Guyane",
    platform: ["LinkedIn"],
    image: "/images/legal-news/legal-6.png",
    date: "May 15, 2025"
  },
  {
    category: "Healthcare Law",
    territory: "Saint-Pierre-et-Miquelon",
    person: "Dr. Louise Morel",
    title: "Public Health Law in Saint-Pierre-et-Miquelon",
    excerpt:
      "Court validates compulsory vaccination measures for healthcare workers amid rising infection cases.",
    tags: ["Healthcare", "Public Safety"],
    place: "Saint-Pierre",
    publisher: "Le Monde",
    platform: ["Facebook"],
    image: "/images/legal-news/legal-7.png",
    date: "May 22, 2025"
  },
  {
    category: "Housing Law",
    territory: "Martinique",
    person: "Marc Dufresne",
    title: "Housing Law Reform in Martinique",
    excerpt:
      "New regulations address unsafe housing and construction permits in urban areas.",
    tags: ["Housing", "Urban Law"],
    place: "",
    publisher: "France-Antilles",
    platform: ["Twitter"],
    image: "/images/legal-news/legal-8.png",
    date: "May 10, 2025"
  },
  {
    category: "Indigenous Rights",
    territory: "French Guiana",
    person: "Aline Laurent",
    title: "Indigenous Rights Case in French Guiana",
    excerpt:
      "A landmark ruling strengthens land rights protections for Amerindian communities.",
    tags: ["Labor Law", "Union"],
    place: "Guadeloupe",
    publisher: "Guadeloupe 1ère",
    platform: ["Instagram"],
    image: "/images/legal-news/legal-9.png",
    date: "May 20, 2025"
  },
  {
    category: "Fisheries Law",
    territory: "New Caledonia",
    person: "Paul Mercier",
    title: "Fisheries Law in New Caledonia",
    excerpt: "High Court enforces quotas to protect endangered marine species.",
    tags: ["Healthcare", "Sustainability"],
    place: "Nouméa",
    publisher: "Le Monde",
    platform: ["LinkedIn"],
    image: "/images/legal-news/legal-10.png",
    date: "May 22, 2025"
  },
  {
    category: "Equality Law",
    territory: "Guadeloupe",
    person: "Lucie Garnier",
    title: "Workplace Equality Ruling in Guadeloupe",
    excerpt:
      "Court decision mandates equal pay reforms in the hospitality sector.",
    tags: ["Labor Law", "Equality"],
    place: "Guadeloupe",
    publisher: "France-Antilles",
    platform: ["Facebook"],
    image: "/images/legal-news/legal-11.png",
    date: "May 20, 2025"
  },
  {
    category: "Urban Law",
    territory: "French Polynesia",
    person: "Henri Teva",
    title: "Land Use Planning in French Polynesia",
    excerpt:
      "A tribunal validates urban development limits to protect traditional land in Tahiti.",
    tags: ["Urban Law", "Cultural Heritage"],
    place: "Tahiti",
    publisher: "Guadeloupe 1ère",
    platform: ["Twitter"],
    image: "/images/legal-news/legal-12.png",
    date: "May 20, 2025"
  }
];
