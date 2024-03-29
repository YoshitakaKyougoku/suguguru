import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // クエリパラメータを取得
    const { lat, lng, range, id, start } = req.query;
    const hotpepperApiKey = process.env.HOTPEPPER_API_KEY || "";
    console.log("query");
    console.log(req.query);

    // クエリパラメータを使用してURLを構築
    const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperApiKey}&lat=${lat}&lng=${lng}&range=${range}&id=${id}&start=${start}&order=4&format=json`;
    console.log("url");
    console.log(url);
    const result = await axios.get(url).then((response) => response.data);
    console.log(result);
    return res.status(200).json(result);
  }
}
