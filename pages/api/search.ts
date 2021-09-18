// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import searchClient from "../../config/algolia";

type Data =
  | {
      data: any;
    }
  | {
      message: string;
    };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (!req.query) {
    res.status(400).json({ message: "Bad Request" });
  }
  const searchQuery = req.query.query as string;
  const page = req.query.page as string;
  const pageSize = req.query.pageSize as string;

  const index = searchClient.initIndex("Artworks");

  const data = await index.search(searchQuery, {
    page: parseInt(page) || 0,
    hitsPerPage: parseInt(pageSize) || 20,
  });
  res.status(200).json({ data: data });
};
