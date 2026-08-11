import AppRoutes from "./routes/AppRoutes.tsx";

import useInitializeAuth from "./hooks/useInitializeAuth.ts";

function App() {
    useInitializeAuth();

    return <AppRoutes />;
}

export default App;