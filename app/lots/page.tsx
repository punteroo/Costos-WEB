import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import LotsBody from "./LotsBody";
import { GlobeTitleIcon } from "../assets/icons/TitleIcon";

export default function Lot() {
  return (
    <Layout>
      <SectionTitle title="Lotes" icon={<GlobeTitleIcon />} />
      <LotsBody />
    </Layout>
  );
}
