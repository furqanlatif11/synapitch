import { Metadata } from "next";
import React from "react";
import Hero from "./_components/hero-section";
import TrustedBy from "./_components/trustedBy";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy/>
    </>
  );
}
