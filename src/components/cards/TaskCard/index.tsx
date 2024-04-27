"use client"
import { useState } from "react";
import { Badge, Checkbox, Button } from "flowbite-react";
import Image from "next/image";
import { useActions } from "@/app/(dashboard)/tasks/(status)/actions";
import {  useSearchParams } from "next/navigation";

export const TaskCard = ({
	id,
	countryName,
	countryCode,
	businessName,
	servicename,
	onAcceptTask,
	onRejectTask
}: {
	id:string;
	countryName: string;
	countryCode: string;
	businessName: string;
	servicename:string;
	onAcceptTask: (taskId: string) => void;
	onRejectTask: (taskId: string) => void;
}) => {

	// const { acceptTask } = useActions();
	const [isChecked, setIsChecked] = useState(false);
    // const { get } = useSearchParams();
	
	// const handleAcceptTask = () => {
	// 	const userId = get("userId") as string || "5c99014f-4d5f-4771-9c6e-8e56d3afd819";
        
	// 	const taskValues = {
    //         userId: userId,
    //         requestIds: ["4220aa59-efe0-4818-bcc1-e26da84ff192"]
    //     };

    //     acceptTask(taskValues);
    // };

	const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
        onAcceptTask(id);
    }
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
						<p>Nigeria</p>
					</div>
					<Badge color={"green"}>{servicename}</Badge>
				</div>
				<p>{businessName}</p>
				{/* <Button color="ghost" size={"fit"}>
					<div className="flex space-x-2 items-center">
						<Checkbox checked={isChecked} onChange={handleCheckboxChange}/>
						<p className="font-normal text-sm leading-normal">
							Accept task
						</p>
					</div>
				</Button> */}
				 <div className="flex justify-between w-full">
					<Button color="primary" onClick={() => onAcceptTask(id)} >Accept Task</Button>
					<Button color="danger" onClick={() => onRejectTask(id)} title="Reject" className="border-gray-200 border-2">Reject </Button>
				</div>
			</div>
		</div>
	);
};
