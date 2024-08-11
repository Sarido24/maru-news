import Link from "next/link";
import Image from "next/image";
import { CategoryData } from "@/typeCategory";



async function getData(categoryName: string) {
  const res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk%3A(%22${categoryName}%22)&api-key=${process.env.NEXT_NY_API_KEY}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: { categoryName: string };
}) {
  const APIKEY = process.env.NEXT_NY_API_KEY;
  // console.log(APIKEY);

  const categoryName = params.categoryName;
  const data: CategoryData = await getData(categoryName);
  // console.log(data);

  const results = data.response.docs

  // console.log(results, "INI RESULTttttt");

  return (
    <div>
      <h1 className="text-2xl font-bold flex justify-center items-center uppercase">
        Category {params.categoryName}
      </h1>
      <div className="grid lg:grid-cols-3 gap-5 p-16">
        {results?.map((el, i) => {
          return (
            <div key={i} className="card bg-base-100 lg:w-96 shadow-xl">
              <div className="p-2 flex justify-center">
                 <Image
                  src={ `https://static01.nyt.com/${el.multimedia[1]?.url}`}
                  alt={el?.abstract}
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="card-body">
                <Link href={el.web_url} target="_blank" className="card-title">
                  {el.abstract}
                </Link>
                <p>{el.lead_paragraph}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{el.source}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
