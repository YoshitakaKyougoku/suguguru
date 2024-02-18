export type HotpepperResponse = {
  results: {
    api_version: string;
    results_available: number;
    results_start: number;
    shop: Shop[];
  };
};

export type Shop = {
  id: string;
  name: string;
  logo_image: string;
  nameKana: string;
  address: string;
  stationName: string;
  ktaiCoupon: number;
  largeServiceArea: {
    code: string;
    name: string;
  };

  lat: number;
  lng: number;
  genre: {
    name: string;
    catch: string;
    code: string;
  };
  sub_genre: {
    name: string;
    code: string;
  };
  budget: {
    code: string;
    name: string;
    average: string;
  };
  catch: string;
  capacity: number;
  access: string;
  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
  };
  open: string;
  urls: {
    pc: string;
  };
};
