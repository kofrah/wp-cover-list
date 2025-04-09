import { Suspense } from "react";
import { TestComponent } from "../ui/Test/test";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestComponent />
    </Suspense>
  );
}
