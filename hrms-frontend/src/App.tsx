import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
