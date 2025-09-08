import React from "react";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Common/Button";

export default function LeCoinDesPj() {
  return (
    <>
      <Header />
      <section className="w-full h-screen bg-donjon bg-cover bg-center overflow-hidden flex flex-col pt-32 px-6">
        {/* Titre */}
        <h1 className="text-center text-[32px] font-bold text-[#F3CC7A] mb-8">
          Le coin des joueurs
        </h1>

        {/* Boutons */}
        <div className="flex justify-center gap-6">
          <Button color="primary" text="À table !" className="px-3 py-1" />
          <Button color="primary" text="À table !" className="px-3 py-1" />
          <Button color="primary" text="À table !" className="px-3 py-1" />
        </div>
      </section>
      <Footer />
    </>
  );
}
