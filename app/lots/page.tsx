import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import LotsBody from "./LotsBody";
import { GlobeTitleIcon } from "../components/icons/TitleIcon";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Lot() {
  return (
    <Layout>
      <SectionTitle title="Lotes" icon={<GlobeTitleIcon />} />
      <LotsBody />
    </Layout>
  );
}
