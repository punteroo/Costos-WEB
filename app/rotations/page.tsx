import Layout from "../components/Layout";
import SectionTitle from "../components/section-title";
import RotationBody from "./RotationBody";
import { RotationTitleIcon } from "../assets/icons/TitleIcon";


export default function Rotations() {
  return (
    <Layout>
      <SectionTitle title="Rotacion" icon={<RotationTitleIcon />} />
      <RotationBody />
    </Layout>
  );
}

