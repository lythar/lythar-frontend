"use client";

import HeadlineBranding from "@/components/branding/headline-branding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const [redirectIn, setRedirectIn] = useState(3);

    useEffect(() => {
        if (redirectIn <= 0) {
            router.replace("/");
        }

        const interval = setInterval(() => {
            setRedirectIn((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    })

    return <div className="h-screen w-screen ">
        <HeadlineBranding />
        <div className="flex flex-col items-center justify-center fixed w-full">
            <h1 className="text-2xl font-bold">404 - Nie Znaleziono</h1>
            <p>Przenoszenie spowrotem za {redirectIn}...</p>
        </div>
    </div>
}