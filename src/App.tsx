import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import { HeaderProvider } from "./contexts/HeaderContext";
import { TaskProvider } from "./contexts/TasksContext";

const App = () => {
  return (
    <>
      {/* Definindo rotas da aplicação */}
      <Routes>
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <HeaderProvider>
              <PrivateRoutes>
                <TaskProvider>
                  <Home />
                </TaskProvider>
              </PrivateRoutes>
            </HeaderProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
