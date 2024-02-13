import { useRouter } from "next/router";

function PortofolioProjectDetail() {
  const router = useRouter();

  const { query } = router;

  return (
    <div>
      <h1 className="font-bold text-[32px]">Portofolio Detail Page</h1>
      <p className="font-bold text-[20px] mt-4">On page {query.slug} </p>
    </div>
  );
}

export default PortofolioProjectDetail;
