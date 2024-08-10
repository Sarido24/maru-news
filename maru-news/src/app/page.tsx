import { ArticlePopular } from "@/type";
import Image from "next/image";
import Link from "next/link";


async function getData() {
  const APIKEY = process.env.NEXT_NY_API_KEY;
  const res = await fetch(
    `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${APIKEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data: ArticlePopular = await getData();
  const result = data.results;

  return (
    <>
    <h1 className="p-10 text-center text-2xl">TOP NEWS</h1>
      <div className="grid lg:grid-cols-3 gap-5 p-16">
        {result?.map((el) => {
          return (
            <div key={el.id} className="card bg-base-100 lg:w-96 shadow-xl">
              <div className="p-2 flex justify-center">
                <Image
                  src={el?.media[0] && el.media[0]["media-metadata"][2].url}
                  alt={el?.title}
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="card-body">
                <Link href={el.url} target="_blank" className="card-title">
                  {el.title}
                </Link>
                <p>{el.abstract}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{el.source}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
