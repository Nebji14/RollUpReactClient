import React from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import AshParticles from "../Components/Common/ParticlesBackground";

export default function LeCoinDesPj() {
  return (
    <>
      <AshParticles />
      <Header />
      <section className="w-full h-screen bg-jdr-texture bg-cover bg-center overflow-hidden flex flex-col sm:flex-row items-center justify-center ">
        Le CoinCoin des Pj
      </section>
      <Footer />
    </>
  );
}
