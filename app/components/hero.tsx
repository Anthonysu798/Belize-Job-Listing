"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Ambergris Caye",
    link: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVsaXplfGVufDB8fDB8fHww",
    thumbnail:
      "https://images.unsplash.com/photo-1585541115010-5ea9833eacfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVsaXplfGVufDB8fDB8fHww",
  },
  {
    title: "Altun Ha Ruins",
    link: "https://images.unsplash.com/photo-1625106170026-eb5cc1c45f04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVsaXplfGVufDB8fDB8fHww",
    thumbnail:
      "https://images.unsplash.com/photo-1625106170026-eb5cc1c45f04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVsaXplfGVufDB8fDB8fHww",
  },
  {
    title: "Landscape",
    link: "https://images.unsplash.com/photo-1674929996758-306553741841?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU1fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1674929996758-306553741841?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU1fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },

  {
    title: "Reef",
    link: "https://plus.unsplash.com/premium_photo-1661841439995-1706237c83dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVsaXplfGVufDB8fDB8fHww",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661841439995-1706237c83dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVsaXplfGVufDB8fDB8fHww",
  },
  {
    title: "Barrcauda",
    link: "https://images.unsplash.com/photo-1582395880240-8a89060981de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1582395880240-8a89060981de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "The Truck Stop",
    link: "https://images.unsplash.com/photo-1585544314867-bb664ca348c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1585544314867-bb664ca348c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },

  {
    title: "Angels Falls Belize",
    link: "https://images.unsplash.com/photo-1575495361815-f5e1f0c9532b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1575495361815-f5e1f0c9532b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Mountain Pine Ridge Forest Reserver",
    link: "https://images.unsplash.com/photo-1589072894364-cdafe42024b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1589072894364-cdafe42024b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Caye Caulker",
    link: "https://images.unsplash.com/photo-1591556491622-f4d7eaf3f2b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1591556491622-f4d7eaf3f2b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Lobster",
    link: "https://images.unsplash.com/photo-1585545337182-05139d58f21a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1585545337182-05139d58f21a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGJlbGl6ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Sunset",
    link: "https://images.unsplash.com/photo-1584763829754-8dd6c5e1ade4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1584763829754-8dd6c5e1ade4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },

  {
    title: "Reptile",
    link: "https://images.unsplash.com/photo-1561692298-30669ad8a360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1561692298-30669ad8a360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "San Ignacio",
    link: "https://images.unsplash.com/photo-1585531455806-9491a2f62068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgyfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1585531455806-9491a2f62068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgyfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Urban",
    link: "https://images.unsplash.com/photo-1585531455673-c4c7dc0c4dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1585531455673-c4c7dc0c4dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Night Photography",
    link: "https://images.unsplash.com/photo-1585531453847-161b1a6fe956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
    thumbnail:
      "https://images.unsplash.com/photo-1585531453847-161b1a6fe956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxiZWxpemV8ZW58MHx8MHx8fDA%3D",
  },
];
