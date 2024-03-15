import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import ListPriceBody from "./ListPriceBody";
import { ListPriceTitleIcon } from "../assets/icons/TitleIcon";

export default function ListPrice() {
  return (
    <Layout>
      <SectionTitle title="Lista de Precios" icon={<ListPriceTitleIcon />} />
      <ListPriceBody />
    </Layout>
  );
}