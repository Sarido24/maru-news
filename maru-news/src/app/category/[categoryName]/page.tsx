import Link from "next/link";
import Image from "next/image";

export interface CategoryData {
  status: string;
  copyright: string;
  response: Response;
}

export interface Response {
  docs: Doc[];
  meta: Meta;
}

export interface Doc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: Multimedum[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface Multimedum {
  rank: number;
  subtype: string;
  caption: any;
  credit: any;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}

export interface Legacy {
  xlarge?: string;
  xlargewidth?: number;
  xlargeheight?: number;
  thumbnail?: string;
  thumbnailwidth?: number;
  thumbnailheight?: number;
  widewidth?: number;
  wideheight?: number;
  wide?: string;
}

export interface Headline {
  main: string;
  kicker?: string;
  content_kicker: any;
  print_headline: string;
  name: any;
  seo: any;
  sub: any;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Byline {
  original: string;
  person: Person[];
  organization: any;
}

export interface Person {
  firstname: string;
  middlename: any;
  lastname: string;
  qualifier: any;
  title: any;
  role: string;
  organization: string;
  rank: number;
}

export interface Meta {
  hits: number;
  offset: number;
  time: number;
}

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
  console.log(data);

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
                {/* <Image
                  src={ `https://static01.nyt.com/${el?.multimedia[1] && el.multimedia[1]?.url}`}
                  alt={el?.abstract}
                  width={300}
                  height={200}
                  className="object-cover"
                /> */}
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
