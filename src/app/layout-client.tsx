"use client";
import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
// Components
import QueryString from "./components/QueryString";
import { AuthProvider } from "./hooks/auth-hook";

function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    useEffect(() => {
        window.czpSdk?.setBackButtonVisible?.(true);
    }, [pathname]);

    return (
        <AuthProvider>

            <Suspense fallback={null}>
                <QueryString />
            </Suspense>

            {children}

        </AuthProvider>
    );
}

export default RootLayoutClient;