import Layout from "./components/Layout";
import {Provider} from 'react-redux'

export default function Home() {
  return (
    <Layout>
      <div className="bg-red-500">
        <p className="text-white">Home</p>
      </div>
    </Layout>
  );
}
