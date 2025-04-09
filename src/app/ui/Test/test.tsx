"use client";

import { useSearchParams } from "next/navigation";

export function TestComponent() {
  const searchParams = useSearchParams();
  console.log("searchParams:", searchParams);

  return <p>test</p>;
}
