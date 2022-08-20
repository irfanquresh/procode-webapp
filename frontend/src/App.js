import { lazy, useEffect } from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

// Config
import { nodeEnv } from "config/constants";

// Components
import Loadable from "components/Loadable";

// Views
const Promo = Loadable(lazy(() => import("views/promo")));
const Home = Loadable(lazy(() => import("views/home")));

export default function App() {
  useEffect(() => {
    console.log(`🚀 ~ Server running in ${nodeEnv} mode`);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Promo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
