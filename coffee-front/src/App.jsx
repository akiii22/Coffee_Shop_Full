import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Flavors from "./components/Flavors";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import DashBoardNavbar from "./ui/DashBoardNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FlavorsIn from "./pages/FlavorsIn";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

// Layout Components
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center px-4 md:px-8 lg:px-16">
        {children}
      </main>
    </>
  );
}

function DashboardLayout({ children }) {
  return (
    <>
      <main className="h-screen w-full">{children}</main>
    </>
  );
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <div className="m-0 box-border min-h-screen w-full p-0">
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <Routes>
            {/* Routes with MainLayout */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <HomePage />
                  <About />
                  <Flavors />
                  <Contacts />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <MainLayout>
                  <Login />
                </MainLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <MainLayout>
                  <SignUp />
                </MainLayout>
              }
            />

            {/* Routes with DashboardLayout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashBoardNavbar />
                    <FlavorsIn />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            {/* <Route
            path="/dashboard/flavors"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashBoardNavbar />
                </DashboardLayout>
              </ProtectedRoute>
            }
          /> */}
            <Route
              path="/dashboard/cart"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashBoardNavbar />
                    <Cart />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/order"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashBoardNavbar />
                    <Order />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
