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

interface Products {
  products: Product[];
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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const dataProducts = JSON.parse(jsonData.toString());

  return dataProducts;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productData: Products = await getData();
  const paramsId = productData.products.map((product) => ({
    params: { pid: product.id },
  }));
  return {
    paths: paramsId,
    fallback: true, //true & "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = (params as ParsedUrlQuery).pid;

  const dataProducts = await getData();

  const productData: Product = dataProducts.products.find(
    (product: Product) => product.id === productId
  );

  if (!productData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: productData,
    },
    // revalidate: 10,
  };
};
