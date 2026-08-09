import { Metadata } from "next";
import GalerieClient from "./GalerieClient";

export const metadata: Metadata = {
  title: "Galerie — Leader Jus Naturel",
  description:
    "Découvrez Leader en images — nos produits, nos moments, notre identité africaine.",
};

export default function GaleriePage() {
  return <GalerieClient />;
}
