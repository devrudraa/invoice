import { JSX } from "react";

export interface menuItem {
  text: string;
  url: string;
}

export interface benefit {
  title: string;
  description: string;
  imageSrc: string;
  imageW?: number;
  imageH?: number;
  bullets: benefitBullet[];
}

export interface benefitBullet {
  title: string;
  description: string;
  icon: JSX;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

export interface stats {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface socialsIcon {
  // icon: JSX;
  label: string;
  link: string;
}
