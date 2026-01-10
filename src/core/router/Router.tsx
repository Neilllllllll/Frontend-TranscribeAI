import { createBrowserRouter, Navigate } from "react-router-dom";
import { transcriptionRoutes } from "../../modules/TranscriptionBatch/routes.tsx";
import { diarizationRoutes } from "../../modules/Diarization/routes.tsx"
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import {AlertProvider} from '../../Shared/contexts/AlertContext.tsx'
import HomePage from "../../modules/Home/HomePage.tsx";
import AuthPage from "../../modules/Auth/AuthPage.tsx";
import MainLayout from "../../Shared/layouts/MainLayout.tsx";
import NotFoundPage from "../../Shared/pages/NotFoundPage.tsx";

export const router = createBrowserRouter([
  // 1. Redirection initiale
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },

  // 2. Page d'authentification
  {
    path: "/auth",
    element: <AuthPage />,
  },

  // 3. La partie Application (Protégée)
  {
    element: <ProtectedRoute />, 
    children: [
      { path: "/home", index: true, element: <HomePage /> },
      {
        path: "/app",
        element: (<AlertProvider><MainLayout /></AlertProvider>),
        children: [
          ...transcriptionRoutes,
          ...diarizationRoutes,
        ],
      },
    ],
  },

  // 4. Page de capture d'erreur (404)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);