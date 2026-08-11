import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";


function DashboardLayout() {

    return (

        <div
            className="
                min-h-screen
                bg-slate-100
            "
        >

            {/* Fixed Sidebar */}

            <Sidebar />


            {/* Main Area */}

            <div
                className="
                    ml-72
                    flex
                    min-h-screen
                    flex-col
                "
            >

                <Header />

                <main
                    className="
                        flex-1
                        p-8
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}


export default DashboardLayout;