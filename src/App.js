import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AddPatient from "./pages/AddPatient";
import GetPatient from "./pages/GetPatient";
import AddDiagnose from "./pages/AddDiagnose";

const Home = lazy(() => import("./pages/Home"));
const Main = lazy(() => import("./pages/Main"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addpatient" element={<AddPatient />} />
            <Route path="/patient/:id" element={<GetPatient />} />
            <Route path="/diagnose/:id" element={<AddDiagnose />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
