import { Navigate, Route, Routes } from "react-router-dom";
import { OptionsLayout } from "./layout/OptionsLayout";
import { CoverLetterPage } from "./pages/CoverLetterPage";
import { DebugPage } from "./pages/DebugPage";
import { FaqPage } from "./pages/FaqPage";
import { FiltersPage } from "./pages/FiltersPage";
import { JobsPage } from "./pages/JobsPage";
import { LogsPage } from "./pages/LogsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SubscriptionPage } from "./pages/SubscriptionPage";

export function App() {
  return (
    <Routes>
      <Route element={<OptionsLayout />}>
        <Route index element={<JobsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="debug" element={<DebugPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="filters" element={<FiltersPage />} />
        <Route path="cover-letter" element={<CoverLetterPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
