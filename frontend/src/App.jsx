import React from "react";
import { Routes, Route } from "react-router-dom";
import Default from "./pages/Default";
import DeleteClothes from "./pages/DeleteClothes";
import CreateClothes from "./pages/CreateClothes";
import ChangeClothes from "./pages/ChangeClothes";
import ShowClothes from "./pages/ShowClothes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/cloth/delete/:id" element={<DeleteClothes />} />
      <Route path="/cloth/create" element={<CreateClothes />} />
      <Route path="/cloth/edit/:id" element={<ChangeClothes />} />
      <Route path="/cloth/details/:id" element={<ShowClothes />} />
    </Routes>
  );
};

export default App;
