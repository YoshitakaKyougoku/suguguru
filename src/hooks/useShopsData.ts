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
  };

  // APIからデータをフェッチしてshopsに格納する関数
  const fetchAndSetShops = useCallback(async (queryParams: QueryParams) => {
    try {
      const { lat, lng, range, id } = queryParams;
      console.log("set query");
      console.log(queryParams);
      const response = await axios.get(
        `https://suguguru.vercel.app/api/hotpepper`,
        {
          params: {
            lat: lat,
            lng: lng,
            range: range,
            id: id,
          }, // APIリクエストにクエリパラメータを含める
        }
      );
      setShops(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // このカスタムフックの戻り値としてshopsとfetchAndSetshops関数を返す
  return { shops, fetchAndSetShops };
};
