import { CompletedTable} from "./completedtable";
import { Search } from "./search";

export default function CompletedTask() {
	return (
		<div className="my-6 py-4 border rounded border-border flex flex-col gap-8">
			<div className="px-4">
				<div className="flex justify-between py-[18px] border-b border-border">
					<h4 className="text-2xl">Completed tasks</h4>
					<Search />
				</div>
			</div>
			<CompletedTable />
		</div>
	);
}
