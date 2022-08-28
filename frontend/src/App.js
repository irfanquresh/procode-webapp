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
const TestLibrary = Loadable(lazy(() => import("views/test-library")));
const Assessment = Loadable(lazy(() => import("views/assessment")));
const Home = Loadable(lazy(() => import("views/home")));

export default function App() {
  useEffect(() => {
    console.log(`🚀 ~ Server running in ${nodeEnv} mode`);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Promo />} />
        <Route path="/test" element={<TestLibrary />} />
        <Route path="/assessment/:id" element={<Assessment />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
