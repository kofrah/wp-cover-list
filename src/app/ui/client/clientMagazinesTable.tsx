"use client";

import { Magazine } from "@/app/lib/definitions";
import MagazinesTable from "../table";

export default function ClientMagazinesTable({
  magazines,
}: {
  magazines: Magazine[];
}) {
  return <MagazinesTable magazines={magazines} />;
}
