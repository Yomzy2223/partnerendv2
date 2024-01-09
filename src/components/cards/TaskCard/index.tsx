import { Badge, Checkbox, Button } from "flowbite-react";
import Image from "next/image";

export const TaskCard = ({
	countryName,
	countryCode,
	businessName,
}: {
	countryName: string;
	countryCode: string;
	businessName: string;
}) => {
	return (
		<div className="p-3 border border-gray-200 rounded">
			<div className="flex flex-col gap-3.5 items-start">
				<div className="flex justify-between w-full">
					<div className="flex gap-4 items-center">
						<div className="relative w-7 h-5 rounded overflow-hidden outline-4 outline-black">
							<Image
								src={`https://flagcdn.com/w160/${countryCode}.png`}
								alt={countryName}
								fill
							/>
						</div>
						<p>{countryName}</p>
					</div>
					<Badge color={"green"}>Business certification</Badge>
				</div>
				<p>{businessName}</p>
				<Button color="ghost" size={"fit"}>
					<div className="flex space-x-2 items-center">
						<Checkbox />
						<p className="font-normal text-sm leading-normal">
							Accept task
						</p>
					</div>
				</Button>
			</div>
		</div>
	);
};
