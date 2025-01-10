import Image from "next/image";
import {
  formatDateToLocal,
  formatCurrency,
  getMagazinesByPersonId,
  getAllMagazines,
  getPersonIdByName,
} from "@/app/lib/data";
// import { fetchFilteredInvoices } from "@/app/lib/data";
import { createClient } from "@/app/utils/supabase/server";

export default async function MagazinesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  console.log("query", query);

  const magazeinesResponse = await getAllMagazines();
  if ("error" in magazeinesResponse) {
    console.log(magazeinesResponse.error);
    return <div>magazinesの取得でエラーが発生しました</div>;
  }
  const magazines = magazeinesResponse.data;
  console.log("magazines", magazines);

  const personIdResponse = await getPersonIdByName(query);
  if ("error" in personIdResponse) {
    console.log(personIdResponse.error);
    return <div>person_idの取得でエラーが発生しました</div>;
  }
  const personId = personIdResponse.data;
  console.log("personId", personId);

  // const magazinesResponse = await getMagazinesByPersonId(personId);
  // if ("error" in magazinesResponse) {
  //   console.log(magazinesResponse.error);
  //   return <div>雑誌の取得でエラーが発生しました</div>;
  // }
  // const magazines = magazinesResponse.data;
  // console.log("magazines", magazines);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {magazines?.map((magazine) => (
              <div
                key={magazine.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        // src={magazine.image_url}
                        src="/public/images/sports_pro_wrestler_woman_805_600.png"
                        className="mr-2 rounded-full"
                        width={60}
                        height={80}
                        alt={`${magazine.persons}'s profile picture`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {magazines?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        // src={magazine.image_url}
                        src="/public/images/sports_pro_wrestler_woman_805_600.png"
                        className="rounded-full"
                        width={600}
                        height={805}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td> */}
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
