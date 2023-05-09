import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigations/Navigation";
import { IndividualsView } from "../views/individual-view/IndividualView";
import { OrganizationsView } from "../views/organization-view/OrganizationView";
import { ProductsView } from "../views/product-view/ProductsView";
import { ProxyListView } from "../views/proxy-views/proxy-list-views/ProxyListView";
import { ProxyView } from "../views/proxy-views/proxy-view/ProxyView";
import { TechniqueView } from "../views/technique-view/TechniqueView";
import { CargoView } from "../views/cargo-view/CargoView";
import { PlaceView } from "../views/place-view/PlaceView";
import { WaybillListView } from "../views/waybill-view/waybill-list-view/WaybillListView";
import { MechanicsView } from "../views/mechanics-view/MechanicsView";
import { WayyBillView } from "../views/waybill-view/waybills-view/WaybillView";
import { ROUTE_PATHS } from "./paths";
import { PodrazdView } from "../views/podrazd-view/PodrazdView.jsx";

export const RouterIndex = (props) => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path={"/"} element={<ProxyListView />} />
          <Route path={ROUTE_PATHS.products} element={<ProductsView />} />
          <Route path={ROUTE_PATHS.individuals} element={<IndividualsView />} />
          <Route
            path={ROUTE_PATHS.organizations}
            element={<OrganizationsView />}
          />
          <Route path={ROUTE_PATHS.podrazds} element={<PodrazdView />} />
          <Route path={ROUTE_PATHS.proxy.list} element={<ProxyListView />} />
          <Route path={ROUTE_PATHS.proxy.proxy} element={<ProxyView />} />
          <Route path={ROUTE_PATHS.technique} element={<TechniqueView />} />
          <Route path={ROUTE_PATHS.cargo} element={<CargoView />} />

          <Route path={ROUTE_PATHS.place} element={<PlaceView />} />
          <Route path={ROUTE_PATHS.mechanics} element={<MechanicsView />} />
          <Route
            path={ROUTE_PATHS.waybill.list}
            element={<WaybillListView />}
          />
          <Route
            path={ROUTE_PATHS.waybill.waybill}
            element={<WayyBillView />}
          />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};
