import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <Outlet />
        </div>
    );
}

export default AuthLayout;