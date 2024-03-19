import { CostTitleIcon } from "../assets/icons/TitleIcon";
import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import CostBody from "./CostBody";

export default function Cost() {
  return (
    <Layout>
      <SectionTitle title="Costos" icon={<CostTitleIcon />} />
      <CostBody />
    </Layout>
  );
}