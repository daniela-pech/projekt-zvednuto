import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { StickmanPage } from "./components/StickmanPage/StickmanPage";
import { UpperBody } from "./components/UpperBody/UpperBody";
import { LowerBody } from "./components/LowerBody/LowerBody";
import { Core } from "./components/Core/Core";
import { ExerciseDetail } from "./components/ExerciseDetail/ExerciseDetail";
import { WorkoutSummary } from "./components/WorkoutSummary/WorkoutSummary";
import { WorkoutForm } from "./components/WorkoutForm/WorkoutForm";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import "./global.css";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "stickman",
    element: <StickmanPage />,
  },
  {
    path: "/upper",
    element: <UpperBody />,
  },
  {
    path: "/lower",
    element: <LowerBody />,
  },
  {
    path: "/core",
    element: <Core />,
  },

  {
    path: "exercise/:id",
    element: <ExerciseDetail />,
  },
  {
    path: "/workoutform",
    element: <WorkoutForm />,
  },
  {
    path: "/workoutsummary",
    element: <WorkoutSummary />,
  },
]);

createRoot(document.querySelector("#app")).render(
  <RouterProvider router={router} />,
);
