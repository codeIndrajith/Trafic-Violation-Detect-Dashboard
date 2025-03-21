import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.ts";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import SignInPage from "./pages/Auth/SignInPage.tsx";
import SignUpPage from "./pages/Auth/SignUpPage.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import RulesPage from "./pages/Rules/pages/RulesPage.tsx";
import ViolationPage from "./pages/Violations/pages/ViolationPage.tsx";
import ReportPage from "./pages/Reports/pages/ReportPage.tsx";
import PaymentPage from "./pages/Payment/pages/PaymentPage.tsx";
import ProfilePage from "./pages/Profile/pages/ProfilePage.tsx";
import NotificationPage from "./pages/Notifications/pages/NotificationPage.tsx";
import EmailPage from "./pages/Emails/pages/EmailPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Route - Shows Welcome Page Only If NOT Authenticated */}
      <Route element={<PublicRoute />}>
        <Route index element={<WelcomePage />} />
      </Route>

      {/* Always Accessible Routes */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Protected Routes - Only Accessible If Authenticated */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<HomePage />} />

        {/* Rules Related Routes */}
        <Route path="/trafic-rules" element={<RulesPage />} />

        {/* Violations Related Rules */}
        <Route path="/violations" element={<ViolationPage />} />

        {/* Reports Related Routes */}
        <Route path="/reports" element={<ReportPage />} />

        {/* Payment Related Routes */}
        <Route path="/payments" element={<PaymentPage />} />

        {/* Profile Related Routes */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Notification Related Routes */}
        <Route path="/notifications" element={<NotificationPage />} />

        {/* Email Related Routes */}
        <Route path="/emails" element={<EmailPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
