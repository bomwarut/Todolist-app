import Signincomponent from "./login/signin";
import Registercomponent from "./login/register";
import Todolistcomponent from "./todolist/todolist";
import Dashboardcomponent from "./todolist/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainhomecomponent from "./todolist/mainhome";
import ProtectedRoute from "./auth/protextedroute";
import { AuthProvider } from "./auth/authcontext";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { ConfigProvider, theme as antdTheme } from "antd";

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          algorithm:
            theme === "dark"
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Mainhomecomponent />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboardcomponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/todolist"
                element={
                  <ProtectedRoute>
                    <Todolistcomponent />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/signin" element={<Signincomponent />} />
            <Route path="register" element={<Registercomponent />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
