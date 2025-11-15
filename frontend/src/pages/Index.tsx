import Layout from "@/layouts/Layout";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Guide from "@/components/sections/Guide";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Guide />
      <Faq />
      <Cta />
    </Layout>
  );
}
