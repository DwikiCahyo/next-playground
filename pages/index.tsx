import Image from "next/image";
import { Inter } from "next/font/google";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface Product {
  id: string;
  title: string;
}
interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  return (
    <div className="flex justify-center mt-20">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={{
                pathname: `/[pid]`,
                query: { pid: `${product.id}` },
              }}
            >
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating");

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const dataProducts: Props = JSON.parse(jsonData.toString());

  return {
    props: {
      products: dataProducts.products,
    },

    revalidate: 10,
  };
}
