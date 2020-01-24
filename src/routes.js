import React from "react";
import { Route, IndexRedirect, Redirect } from "react-router";
import Layout from "./pages/layout";

import PageHome from "./pages/home/page-home";
import PageDetails from "./pages/details/page-details";
import PageInvoice from "./pages/invoice/page-invoice";
import PageSettings from "./pages/settings/page-settings";
import PageServices from "./pages/services/page-services";

function onRouteChange() {
  window.scrollTo(0, 0);
}

export default (
  <Route path="/" component={Layout} onChange={onRouteChange}>
    <IndexRedirect to="home" />
    <Route path="home" component={PageHome} />
    <Route path="invoice" component={PageInvoice} />
    <Route path="invoice-existing" component={PageInvoice} />
    <Route path="details" component={PageDetails} />
    <Route path="settings" component={PageSettings} />
    <Route path="services" component={PageServices} />
    <Redirect from="*" to="home" />
  </Route>
);
