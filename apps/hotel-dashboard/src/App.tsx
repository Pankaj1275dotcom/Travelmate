import useInitializeAuth from "./hooks/useInitializeAuth";
import AppRoutes from "./routes/AppRoutes";

function App() {
    useInitializeAuth();

    return <AppRoutes />;
}

export default App;