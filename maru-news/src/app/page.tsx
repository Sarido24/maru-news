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
      <div className="grid lg:grid-cols-3 gap-5 p-16">
        {result?.map((el) => {
          return (
            <div className="card bg-base-100 lg:w-96 shadow-xl">
              {/* <figure>
                <Image
                  src={el.media[0]["media-metadata"][1].url}
                  alt="Shoes"
                  width={300}
                  height={300}
                />
              </figure> */}
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
