import loadable from "@/utils/loadable";

const Index = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Index")
);

const About = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/About")
);

const Config = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Config")
);

const Server = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/ServerInfo")
);

const Database = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Database")
);

const Import = loadable(() =>
  import(/* webpackChunkName: 'index' */ "@/views/Import")
);
const routes = [
  { path: "/index", exact: true, name: "Index", component: Index },
  { path: "/import", exact: true, name: "Import", component: Import },
  { path: "/database", exact: true, name: "Database", component: Database },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/server", exact: true, name: "Server", component: Server },
  { path: "/config", exact: true, name: "Config", component: Config }
];

export default routes;
