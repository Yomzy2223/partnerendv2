import { getServerSession } from "@/lib/helpers/getServerSession";
import CompletedTasks from "./completedTasks";

export default async function Page() {
  const session = await getServerSession();
  const userId = session?.user?.id;

  return <CompletedTasks userId={userId} />;
}

// table header
const tableHeaders = ["S/N", "SERVICE NAME", "PRODUCT NAME", "COUNTRY", "ASSIGNED"];
