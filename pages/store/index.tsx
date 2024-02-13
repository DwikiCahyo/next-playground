import Link from "next/link";

export default function StorePage() {
  return (
    <main className="w-full text-center">
      <h1 className="font-bold text-2xl ">COC Komputer </h1>
      <ul className="mt-[10px]">
        <li>
          <Link
            href={{
              pathname: "/store/[productslug]",
              query: { productslug: "rtx-4060" },
            }}
          >
            RTX 4060
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/store/[productslug]",
              query: { productslug: "rtx-4050" },
            }}
          >
            RTX 4050
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/store/[productslug]",
              query: { productslug: "rtx-4080" },
            }}
          >
            RTX 4080
          </Link>
        </li>
      </ul>
    </main>
  );
}
