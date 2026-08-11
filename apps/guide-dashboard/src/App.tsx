import AppRoutes from "./routes/AppRoutes";

import useInitializeAuth from "./hooks/useInitializeAuth";

function App() {
    useInitializeAuth();

    return <AppRoutes />;
}

export default App;