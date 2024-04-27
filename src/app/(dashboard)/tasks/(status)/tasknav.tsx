"use client";
import { Button } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Tasknav = () => {
	const pathname = usePathname();

	return (
		<div className="border-b border-gray-200 w-full flex gap-8">
			{links.map((each, index) => {
				const isActive = pathname === each.href;
				return (
					<Link href={each.href} key={index}>
						<Button
							color="ghost"
							size={"fit"}
							className={cn("px-5 pb-2.5 rounded-none", {
								"text-primary border-b-2 border-primary":
									isActive,
							})}
						>
							{each.text}
						</Button>
					</Link>
				);
			})}
		</div>
	);
};

const links = [
	{
		text: "Available tasks",
		href: "/tasks",
	},
	{
		text: "Ongoing tasks",
		href: "/tasks/ongoing",
	},
	{
		text: "Completed tasks",
		href: "/tasks/completed",
	},
];
