import Login from "@/features/auth/Login.tsx";
import ProtectedLayout from "@/layout/ProtectedLayout.tsx";
import { createBrowserRouter } from "react-router-dom";
import Sample from "../features/sample/Sample.tsx";
import PublicLayout from "@/layout/PublicLayout.tsx";

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
    path: "/sample",
    element: (
      <ProtectedLayout>
        <Sample />
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/sample/:sampleId",
        element: <Sample />,
      },
    ],
  },
]);

export default router;
