"use client";

import { TextInput, Button } from "flowbite-react";
import { SearchIcon } from "@/assets/svg";

export const Search = () => {
	return (
		<form className="flex">
			<TextInput
				id="search"
				type="text"
				icon={SearchIcon}
				placeholder="Search"
				required
				className="w-[380px] rounded-r-none"
			/>
			<Button color="primary" className="rounded-l-none -ml-1 z-10">
				Search
			</Button>
		</form>
	);
};
