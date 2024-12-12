import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ProductPage from "./pages/product/ProductPage";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/authPage/AuthPage";
import MusicPage from "./pages/musicPage/MusicPage";
import ProtectedRoute from "./hooks/auth/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/products",
                element: <ProtectedRoute> <ProductPage /> </ProtectedRoute>,
            },
            {
                path: "ex",
                element: <p>Exemplo</p>,
            },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/auth",
                element: <AuthPage />
            },
            {
                path: "/musicas",
                element: <MusicPage />
            }
        ],
    },
]);
