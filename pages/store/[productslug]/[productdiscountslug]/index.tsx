import React from "react";
import { useRouter } from "next/router";

export default function ProductDiscountPage() {
  const router = useRouter();

  const { query } = router;
  console.log(query);

  return (
    <div>
      <p>{query.productslug} mendapatkan diskon sebesar 50%</p>
    </div>
  );
}
