import axios from "axios";
import { useState, useCallback, useMemo } from "react";
import { HotpepperResponse } from "@/types/hotpepperResponse";

export const useShopsData = () => {
  console.log("useShopsData");
  const [shops, setShops] = useState<HotpepperResponse>({
    results: {
      api_version: "",
      results_available: 0,
      results_start: 0,
      shop: [],
    },
  });

  type QueryParams = {
    lat: string;
    lng: string;
    range: string;
    id: string;
    start: string;
  };

  // APIからデータをフェッチしてshopsに格納する関数
  const fetchAndSetShops = useCallback(async (queryParams: QueryParams) => {
    try {
      const { lat, lng, range, id, start } = queryParams;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      console.log("set query");
      console.log(queryParams);
      console.log(baseUrl);
      const response = await axios.get(`${baseUrl}api/hotpepper`, {
        params: {
          lat: lat,
          lng: lng,
          range: range,
          id: id,
          start: start,
        }, // APIリクエストにクエリパラメータを含める
      });
      setShops(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // このカスタムフックの戻り値としてshopsとfetchAndSetshops関数を返す
  return { shops, fetchAndSetShops };
};
