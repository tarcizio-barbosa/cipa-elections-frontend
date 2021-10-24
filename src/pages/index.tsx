import type { NextPage } from "next";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className='max-w-full h-screen mx-14'>
        <Header />
    </div>
  );
};

export default Home;
