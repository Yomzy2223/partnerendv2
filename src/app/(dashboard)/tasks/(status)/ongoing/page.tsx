import { getServerSession } from "@/lib/helpers/getServerSession";
import OngoingTask from "./ongoingTasks";

export default async function page() {
  const session = await getServerSession();
  const userId = session?.user?.id;

  return <OngoingTask userId={userId} />;
}
