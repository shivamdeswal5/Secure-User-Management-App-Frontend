"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup");
  }, [router]);
  return <div>"Secure User Management App"</div>;
}
