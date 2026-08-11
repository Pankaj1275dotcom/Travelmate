import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";


const queryClient =
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 1,
            },
        },
    });


createRoot(
    document.getElementById("root")!
).render(

    <StrictMode>

        <QueryClientProvider
            client={queryClient}
        >

            <BrowserRouter>

                <App />

            </BrowserRouter>


            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                }}
            />

        </QueryClientProvider>

    </StrictMode>

);