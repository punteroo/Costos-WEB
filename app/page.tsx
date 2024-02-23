import Image from "next/image";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="bg-red-500">
        <p className="text-white">Home</p>
      </div>
    </Layout>
  );
}
