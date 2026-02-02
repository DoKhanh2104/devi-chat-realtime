import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ChatApp from "./pages/ChatApp";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
