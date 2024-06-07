import Login from "@/features/auth/Login.tsx";
import ProtectedLayout from "@/layout/ProtectedLayout.tsx";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layout/PublicLayout.tsx";
import Questions from "@/features/questions/Questions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicLayout>
        <Login />
      </PublicLayout>
    ),
    errorElement: <div>Error</div>,
  },
  {
    path: "/questions",
    element: (
      <ProtectedLayout>
        <Questions />
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/questions/:questionStatus",
        element: <Questions />,
      },
    ],
  },
]);

export default router;
