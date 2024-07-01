import { metadata } from "./metadata";
export { metadata };

import { HeroParallaxDemo } from "./components/hero";
import Navbar from "./components/navbar2";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroParallaxDemo />
    </div>
  );
}
