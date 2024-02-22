//name, hobby , age

import { log } from "console";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type About = {
  name: string;
  hobby?: string;
  age: number;
};

export default function AboutPage(
  myData: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(myData);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-[32px]">About Page</h1>
      <div className="text-center mt-[20px]">
        <h3>Name : {myData.name}</h3>
        <h3>Hobby : {myData.hobby}</h3>
        <h3>Age: {myData.age}</h3>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  console.log("Server side props");

  const myData: About = {
    name: "Darman",
    hobby: "Swimming",
    age: 20,
  };
  return {
    props: myData,
  };
};
