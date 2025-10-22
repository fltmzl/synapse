import { CategoryNews, NewsItem } from "@/types/news.type";

export const newsData: NewsItem[] = [
  {
    category: "Economy",
    date: "Sep 2, 2025",
    title: "Guadeloupe unemployment drops to 12% in Q3 2025",
    image: "/images/news-1.png"
  },
  {
    category: "Investment",
    date: "Aug 29, 2025",
    title: "Martinique SMEs secure €15M funding for green transition projects",
    image: "/images/news-2.png"
  },
  {
    category: "Trade",
    date: "Aug 25, 2025",
    title:
      "Mayotte reports 5% increase in export activities for first half of 2025",
    image: "/images/news-3.png"
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
