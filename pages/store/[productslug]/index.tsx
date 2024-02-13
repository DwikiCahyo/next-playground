import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProductDetail() {
  const { query } = useRouter();

  return (
    <div className="mt-5 rounded-xl border border-slate-200 flex gap-4  p-[30px] mx-[50px] items-center justify-between">
      <p className="">{query.productslug}</p>
      <button className="bg-red-500 px-2 py-2 rounded-md hover:ring-red-600 hover:ring-2">
        <Link
          href={{
            pathname: "/store/[productslug]/[productdiscountslug]",
            query: {
              productslug: `${query.productslug}`,
              productdiscountslug: "diskon",
            },
          }}
        >
          Cek Diskon
        </Link>
      </button>
    </div>
  );
}
