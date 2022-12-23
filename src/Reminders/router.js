import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reminders from "./remindersApp";

const Router = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Reminders />} />
      <Route path="/dashboard" element={<Reminders dashboard={true} />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default Router;
