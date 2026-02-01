import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ChatApp from "./pages/ChatApp";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* protected route */}
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
