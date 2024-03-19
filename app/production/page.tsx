import { ProductionTitleIcon } from "../assets/icons/TitleIcon";
import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import ProductionBody from "./ProductionBody";

export default function Production() {
  return (
    <Layout>
      <SectionTitle title="Produccion" icon={<ProductionTitleIcon />} />
      <ProductionBody />
    </Layout>
  );
}