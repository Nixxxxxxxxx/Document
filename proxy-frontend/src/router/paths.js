export const ROUTE_PATHS = {
  products: "products", // страница для справочника товаров
  individuals: "individuals", // страница для справочника физ. лиц
  organizations: "organizations", // страница для справочника организаций
  technique: "technique",
  cargo: "cargo",
  place: "place",
  podrazds: "podrazds",
  mechanics: "mechanics",
  proxy: {
    list: "proxy", // страница списка документов доверенность
    proxy: "proxy/:id", // страница конкретного документа доверенности со списком товаров
  },
  waybill: {
    list: "waybill",
    waybill: "waybill/:id",
  },
};
