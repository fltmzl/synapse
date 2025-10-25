import {
  CategoryNews,
  LegalNewsItem,
  NewsItem,
  SocialPost
} from "@/types/news.type";

export const newsData: NewsItem[] = [
  {
    category: "Economy",
    date: "Sep 2, 2025",
    title: "Guadeloupe unemployment drops to 12% in Q3 2025",
    image: "/images/news/news-1.png"
  },
  {
    category: "Investment",
    date: "Aug 29, 2025",
    title: "Martinique SMEs secure €15M funding for green transition projects",
    image: "/images/news/news-2.png"
  },
  {
    category: "Trade",
    date: "Aug 25, 2025",
    title:
      "Mayotte reports 5% increase in export activities for first half of 2025",
    image: "/images/news/news-3.png"
  },
  {
    category: "Citizen",
    date: "Sep 2, 2025",
    title:
      "Debate intensifies over representation of overseas territories in parliament",
    image: "/images/news/news-4.png"
  },
  {
    category: "Politics",
    date: "Oct 29, 2025",
    title:
      "Debate intensifies over representation of overseas territories in parliament",
    image: "/images/news/news-5.png"
  },
  {
    category: "Law",
    date: "Oct 15, 2025",
    title:
      "Legal experts call for unified judicial system across French overseas territories",
    image: "/images/news/news-6.png"
  }
];

export const productionData: NewsItem[] = [
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

export const lastInfo: CategoryNews = {
  politique: [
    {
      title: "French Assembly debates overseas tax reform bill",
      description:
        "The French Assembly is debating a tax reform bill for overseas territories, aiming to adjust fiscal structures and revenue allocation to create fairer economic conditions.",
      date: "April 3, 2025",
      image: "/images/actualite.png"
    },
    {
      title: "French Senate reviews proposal on overseas economic autonomy",
      description:
        "The French Senate is reviewing a proposal to grant more autonomy to overseas territories, strengthening local governance and fiscal control.",
      date: "April 3, 2025",
      image: "/images/news-2.png"
    },
    {
      title:
        "Debate intensifies over representation of overseas territories in parliament",
      description:
        "A growing debate centers on how overseas territories are represented in parliament, with calls for stronger voices from these regions.",
      date: "April 3, 2025",
      image: "/images/news-3.png"
    }
  ],
  juridique: [
    {
      title: "New legislation enhances worker rights in overseas regions",
      description:
        "The new bill aims to standardize labor protections across all French territories, ensuring fair conditions for workers.",
      date: "March 20, 2025",
      image: "/images/news-2.png"
    },
    {
      title: "Court rules in favor of tax exemptions for SMEs",
      description:
        "A landmark court decision grants tax relief to small and medium enterprises operating in overseas French territories.",
      date: "March 18, 2025",
      image: "/images/news-3.png"
    },
    {
      title: "Legal experts call for unified judicial system",
      description:
        "Legal professionals are urging the government to streamline the judicial system across overseas territories for consistency.",
      date: "March 15, 2025",
      image: "/images/news-1.png"
    }
  ],
  citoyenne: [
    {
      title: "Youth programs foster innovation in overseas territories",
      description:
        "Social initiatives are helping young people develop digital skills and connect with global markets.",
      date: "Feb 28, 2025",
      image: "/images/news-3.png"
    },
    {
      title: "Community hubs expand in rural regions",
      description:
        "Local governments are opening new centers to strengthen social engagement and cultural identity.",
      date: "Feb 22, 2025",
      image: "/images/news-2.png"
    },
    {
      title: "Online platforms empower women entrepreneurs",
      description:
        "New digital tools are helping women from overseas territories launch and grow their own businesses.",
      date: "Feb 20, 2025",
      image: "/images/news-1.png"
    }
  ]
};

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
