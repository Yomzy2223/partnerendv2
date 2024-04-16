import AvailableTask from "./available";
export default function OngoingTask() {
	return (
		<div className="my-6 py-4 border rounded border-border flex flex-col gap-8">
			<div className="px-4">
				<div className="flex justify-between py-[18px] border-b border-border">
					<h4 className="text-2xl">Ongoing tasks</h4>
				</div>
			</div>
			<AvailableTask />
		</div>
	);
}
