import AvailableTasks from "./availableTasks";
import { getServerSession } from "@/lib/helpers/getServerSession";

export default async function page() {
  const session = await getServerSession();
  const userId = session?.user?.id;

  return <AvailableTasks userId={userId} />;
}
