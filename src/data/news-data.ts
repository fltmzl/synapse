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
    description:
      "A new €15 million fund has been launched to support small and medium-sized enterprises (SMEs) in Martinique in their transition to sustainable practices.",
    category: "Juridique",
    author: "Regional Council of Martinique",
    date: "May 25, 2025",
    images: ["/images/news/news-1.png"],
    content: `
      <h1>Martinique launches €15 million green transition fund for local SMEs</h1>
      <p>Small and medium-sized enterprises (SMEs) across Martinique have received a significant boost in their drive toward sustainability, as a new €15 million funding package is launched to support green transition initiatives across the island.</p>

      <h2>Overview of the program</h2>
      <p>The program — spearheaded by the French Development Agency (AFD) in partnership with the European Green Growth Fund (EGGF) and the Regional Council of Martinique — aims to accelerate the island’s economic transformation by promoting renewable energy, eco-innovation, and low-carbon development within local industries.</p>

      <h3>Key objectives</h3>
      <ul>
        <li>Provide low-interest loans for green investments.</li>
        <li>Offer innovation grants to startups and SMEs developing sustainable tech.</li>
        <li>Deliver technical assistance and training to local businesses.</li>
      </ul>

      <h3>Targeted sectors</h3>
      <p>The fund will primarily target Martinique’s agriculture, construction, tourism, and transport sectors, which together account for nearly 70% of the island’s carbon emissions.</p>

      <h4>Grants and loans breakdown</h4>
      <ol>
        <li>€3M reserved for innovation and R&amp;D projects.</li>
        <li>€8M allocated as low-interest loans for capital expenditures (solar, HVAC, etc.).</li>
        <li>€4M for technical assistance, training and pilot installations.</li>
      </ol>

      <h4>Case studies & quotes</h4>
      <p>“This investment is not just about funding projects,” said Isabelle Moreau, Regional Delegate for Economic Cooperation. “It’s about empowering local entrepreneurs to take the lead in building a more resilient and sustainable Martinique — one that creates jobs while protecting our natural heritage.”</p>

      <h5>Implementation timeline</h5>
      <p>Pilot installations are scheduled across the island within the first 12 months, with a rolling grant application process to follow.</p>

      <h6>Expected outcomes</h6>
      <p>By 2030, the project aims to reduce Martinique’s SME carbon emissions by 40% and create over 1,200 green jobs.</p>
    `
  },

  {
    slug: "martinique-smes-secure-15m-funding",
    title:
      "Martinique SMEs secure €15M funding for green transition projects (analysis)",
    category: "Analyse",
    author: "Citizen",
    date: "Aug 29, 2025",
    description:
      "An in-depth analysis of the recently launched €15 million fund supporting Martinique's SMEs in their green transition efforts.",
    images: [
      "/images/news/news-2.png",
      "/images/news/news-3.png",
      "/images/news/news-4.png",
      "/images/news/news-2.png",
      "/images/news/news-3.png",
      "/images/news/news-4.png",
      "/images/news/news-2.png",
      "/images/news/news-3.png",
      "/images/news/news-4.png"
    ],
    content: `
      <h1>Analysis: What €15M means for Martinique's SMEs</h1>
      <p>Small and medium-sized enterprises (SMEs) across Martinique have received over €15 million in funding to support their green transition efforts. The initiative will help companies reduce emissions and modernize production processes.</p>

      <h2>Main pillars of the funding</h2>
      <ul>
        <li>Renewable energy adoption</li>
        <li>Waste reduction and circular economy measures</li>
        <li>Skills & training for green jobs</li>
      </ul>

      <h3>Projected impact</h3>
      <p>Experts estimate the fund could enable more than 400 new green jobs and stimulate investment in local manufacturing and services aimed at sustainability.</p>
    `
  },

  {
    slug: "mayotte-exports-increase-h1-2025",
    title:
      "Mayotte reports 5% increase in export activities for first half of 2025",
    category: "Juridique",
    author: "Mayotte Trade Bureau",
    description:
      "Mayotte's export activities have shown resilience amidst global economic challenges.",
    date: "Aug 25, 2025",
    images: [
      "/images/news/news-3.png",
      "/images/news/news-4.png",
      "/images/news/news-5.png"
    ],
    content: `
      <h1>Mayotte's exports rise by 5% in H1 2025</h1>
      <p>Mayotte’s export volume increased by 5% in the first half of 2025, driven primarily by agricultural products and artisanal goods.</p>

      <h2>Drivers of growth</h2>
      <ul>
        <li>Improved logistics and port facilities</li>
        <li>Higher demand from European and East African markets</li>
        <li>Support programs for export-oriented SMEs</li>
      </ul>

      <h3>Quotes</h3>
      <p>“The growth underscores the potential of Mayotte’s agro-food sector to compete internationally,” the Chamber of Commerce said.</p>
    `
  },

  {
    slug: "overseas-territories-representation-parliament",
    title:
      "Debate intensifies over representation of overseas territories in parliament",
    category: "Citoyenne",
    author: "Le Journal Outre-mer",
    date: "Sep 2, 2025",
    description:
      "A political debate is intensifying over the representation of overseas territories in the French parliament.",
    images: [
      "/images/news/news-4.png",
      "/images/news/news-5.png",
      "/images/news/news-6.png"
    ],
    content: `
      <h1>Representation debate for France's overseas territories</h1>
      <p>A growing political debate has emerged regarding how France’s overseas territories are represented in the national parliament.</p>

      <h2>Proposals on the table</h2>
      <ol>
        <li>Adjust seat allocation to reflect demographic shifts</li>
        <li>Create advisory seats for territorial councils</li>
        <li>Introduce regular public consultations</li>
      </ol>

      <h3>Community response</h3>
      <p>Local citizens' groups across Guadeloupe and Réunion have called for transparent consultations to ensure any changes reflect local needs.</p>
    `
  },

  {
    slug: "unified-judicial-system-french-overseas",
    title: "Unified judicial system proposed for French overseas territories",
    category: "Politique",
    description:
      "A proposal has been made to establish a unified judicial system for all French overseas territories.",
    author: "Le Monde Juridique",
    date: "Oct 29, 2025",
    images: [
      "/images/news/news-5.png",
      "/images/news/news-1.png",
      "/images/news/news-2.png"
    ],
    content: `
      <h1>Proposal: Unified judicial system for overseas territories</h1>
      <p>Legal experts are advocating for a unified judicial system across France’s overseas territories to improve efficiency.</p>

      <h2>Benefits claimed</h2>
      <ul>
        <li>Consistency in legal procedures</li>
        <li>Better resource allocation</li>
        <li>Improved training & mobility for judges</li>
      </ul>

      <h3>Concerns raised</h3>
      <p>Critics warn that centralization may erode local autonomy and fail to reflect regional cultural specificities.</p>
    `
  },

  {
    slug: "legal-experts-call-unified-judicial-system",
    title:
      "Legal experts call for unified judicial system across French overseas territories",
    category: "Politique",
    description:
      "Legal experts are advocating for a unified judicial system across all French overseas territories.",
    author: "France Info",
    date: "Oct 15, 2025",
    images: [
      "/images/news/news-6.png",
      "/images/news/news-2.png",
      "/images/news/news-3.png"
    ],
    content: `
      <h1>Coalition calls for a single legal framework</h1>
      <p>A coalition of legal scholars and advisors has reiterated calls for a unified legal framework governing all French overseas territories.</p>

      <h2>Key recommendations</h2>
      <ol>
        <li>Standardize court procedures</li>
        <li>Create shared case management systems</li>
        <li>Increase training and resource sharing</li>
      </ol>

      <h3>Next steps</h3>
      <p>Policymakers have suggested a phased approach with pilot regions and regular impact assessments.</p>
    `
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
  },
  {
    category: "économique",
    title: "Overseas territories see 4% GDP growth in 2024",
    description:
      "Economic reports indicate a steady growth rate driven by tourism, agriculture, and digital services sectors.",
    date: "Jan 15, 2025",
    image: "/images/news/news-4.png"
  },
  {
    category: "économique",
    title: "Investment in renewable energy soars",
    description:
      "Significant capital is being directed towards solar and wind projects across overseas territories.",
    date: "Jan 10, 2025",
    image: "/images/news/news-5.png"
  },
  {
    category: "économique",
    title: "SMEs lead job creation in overseas regions",
    description:
      "Small and medium enterprises are at the forefront of employment growth, particularly in tech and green industries.",
    date: "Jan 5, 2025",
    image: "/images/news/news-6.png"
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
