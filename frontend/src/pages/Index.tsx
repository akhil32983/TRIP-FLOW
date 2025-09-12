import Layout from "@/layouts/Layout";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Guide from "@/components/sections/Guide";

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Guide />
    </Layout>
  );
}
