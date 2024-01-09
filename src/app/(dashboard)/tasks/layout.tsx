import { ReactNode } from "react";
import { Tasknav } from "./tasknav";

export default function TaskLayout({ children }: { children: ReactNode }) {
	return (
		<div className="pt-6">
			<Tasknav />
			{children}
		</div>
	);
}
