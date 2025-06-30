import { benefit, FAQ, menuItem, socialsIcon, testimonial } from "@/types/type";
import { BarChart2, CheckCircle, Edit, Send, Trash2 } from "lucide-react";

export const siteDetails = {
  siteName: "EzyInvoice",
  siteUrl: "https://invoice.rudracode.com/",
  metadata: {
    title: "EzyInvoice - A Invoice management platform made by Dev Rudra",
    description:
      "EzyInvoice empowers businesses with smart invoicing solutions to streamline billing, track payments, and boost cash flow efficiency.",
  },
  siteLogo: `${process.env.BASE_PATH || ""}/images/logo.png`,
};

export const footerDetails: {
  subheading: string;
  quickLinks: menuItem[];
  email: string;
  telephone: string;
  socials: socialsIcon[];
} = {
  subheading:
    "EzyInvoice empowers with smart invoicing solutions to streamline billing, track payments, and boost cash flow efficiency.",
  quickLinks: [
    {
      text: "Features",
      url: "#features",
    },
    {
      text: "Testimonials",
      url: "#testimonials",
    },
    {
      text: "FAQs",
      url: "#faq",
    },
  ],
  email: "contact@rudracode.com",
  telephone: "+91 9951xxxxxx",
  socials: [
    {
      label: "GItHub",
      link: "https://github.com/devrudraa/invoice",
    },
    {
      label: "Linkedin",
      link: "https://linkedin.com/in/devrudraa",
    },
    {
      label: "Website",
      link: "https://rudracode.com",
    },
  ],
};

export const heroDetails = {
  heading: "Smart, Secure, Simple Invoice Management",
  subheading:
    "Take charge of your finances with seamless budgeting, smart invoicing, and instant insights — all in one place.",
  centerImageSrc: "/images/dashboard-mac-3.png",
};

export const benefits: benefit[] = [
  {
    title: "Effortless Invoicing",
    description:
      "Create and send professional invoices in seconds. Save time and get paid faster with our intuitive invoicing system.",
    bullets: [
      {
        title: "Quick Invoice Creation",
        description:
          "Generate polished, ready-to-send invoices with just a few clicks.",
        icon: Edit,
      },
      {
        title: "One-Click Sending",
        description: "Email invoices directly to clients—no manual follow-up.",
        icon: Send,
      },
      {
        title: "Editable Anytime",
        description:
          "Need to change something? Edit or update invoices even after sending.",
        icon: Edit,
      },
    ],
    imageSrc: "/images/feature-1.png",
    imageH: 499,
    imageW: 269,
  },
  {
    title: "Smart Invoice Management",
    description:
      "Track every invoice from creation to payment. Stay organized, spot unpaid invoices, and manage your cash flow effortlessly.",
    bullets: [
      {
        title: "Status Tracking",
        description: "Monitor which invoices are paid, pending, or overdue.",
        icon: CheckCircle,
      },
      {
        title: "Income Analytics",
        description: "Visualize your earnings with insightful reports.",
        icon: BarChart2,
      },
      {
        title: "Delete & Manage",
        description:
          "Easily delete, archive, or modify invoices from your dashboard.",
        icon: Trash2,
      },
    ],
    imageSrc: "/images/feature-2.png",
    imageW: 523,
    imageH: 468,
  },
];

export const testimonials: testimonial[] = [
  {
    name: "John Smith",
    role: "Founder at XYZ Solutions",
    message: `${siteDetails.siteName} has completely streamlined our invoicing process. Creating, sending, and tracking invoices has never been this simple.`,
    avatar: "/images/testimonial-1.webp",
  },
  {
    name: "Jane Doe",
    role: "CTO at ABC",
    message: `From smart invoice tracking to automated reminders, ${siteDetails.siteName} delivers exactly what our growing startup needs—efficiency and peace of mind.`,
    avatar: "/images/testimonial-2.webp",
  },
  {
    name: "Emily Johnson",
    role: "Freelance Designer",
    message: `I used to dread managing invoices, but ${siteDetails.siteName} made it effortless. It saves me hours each month and ensures I never miss a payment.`,
    avatar: "/images/testimonial-3.webp",
  },
];

export const faqs: FAQ[] = [
  {
    question: `Is ${siteDetails.siteName} secure?`,
    answer:
      "Absolutely. We use industry-grade encryption to protect your data. Your invoices, customer details, and financial information are stored securely and privately.",
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer: `Yes! ${siteDetails.siteName} works seamlessly across desktop, tablet, and mobile so you can manage invoices from anywhere.`,
  },
  {
    question: "Can I send invoices to any client?",
    answer: `Definitely. You can create and send invoices to any client via email or download them as PDFs for manual delivery.`,
  },
  {
    question: "Can I customize my invoices?",
    answer: `Yes! ${siteDetails.siteName} lets you personalize your invoices with logos, colors, terms, and notes to match your brand.`,
  },
  {
    question: "Can I track which invoices are paid or unpaid?",
    answer:
      "Absolutely. Each invoice has a clear status—paid, pending, or overdue—so you always know what needs follow-up.",
  },
  {
    question: "What if I need help using the platform?",
    answer: `Our support team is available via chat and email. We also provide tutorials and step-by-step guides to help you navigate ${siteDetails.siteName} with ease.`,
  },
];

export const ctaDetails = {
  heading: "Join Over 200k Businesses Simplifying Invoicing",
  subheading: `Take control of your billing and payments. Start using ${siteDetails.siteName} today and streamline your finances with ease.`,
};
