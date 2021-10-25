import type { NextPage } from "next";
import { Form } from "../components/Form";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className='max-w-full h-screen mx-14'>
        <Header />
        <Form />
    </div>
  );
};

export default Home;
