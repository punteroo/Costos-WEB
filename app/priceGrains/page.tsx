import { PriceGrainTitleIcon } from "../assets/icons/TitleIcon";
import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import PriceGrainBody from "./priceGrainsBody";

export default function Cost() {
  return (
    <Layout>
      <SectionTitle title="Precio x Grano" icon={<PriceGrainTitleIcon />} />
      <PriceGrainBody />
    </Layout>
  );
}