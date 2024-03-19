import { LaborTitleIcon } from "../assets/icons/TitleIcon";
import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import LaborBody from "./LaborBody";

export default function Labor() {
  return (
    <Layout>
      <SectionTitle title="Labores" icon={<LaborTitleIcon />} />
      <LaborBody />
    </Layout>
  );
}
