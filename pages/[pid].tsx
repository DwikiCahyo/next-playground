import path from "path";
import fs from "fs/promises";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

interface Product {
  id: string;
  title: string;
}

export default function ProductDetailPage({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h1>Product Name : {product.title}</h1>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = (params as ParsedUrlQuery).pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const dataProducts = JSON.parse(jsonData.toString());

  const productData: Product = dataProducts.products.find(
    (product: Product) => product.id === productId
  );

  return {
    props: {
      product: productData,
    },
    // revalidate: 10,
  };
};
