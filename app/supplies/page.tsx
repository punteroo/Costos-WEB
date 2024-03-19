import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import SupplyBody from "./SupplyBody";
import { SupplyTitleIcon } from "../assets/icons/TitleIcon";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Supply() {
  return (
    <Layout>
      <SectionTitle title="Insumos" icon={<SupplyTitleIcon />} />
      <SupplyBody />
    </Layout>
  );
}
