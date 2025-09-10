import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const SectionTitle = ({
	className,
	children,
}: HTMLAttributes<HTMLHeadElement>) => {
	return (
		<h2 className={cn("text-2xl font-semibold text-primary-950", className)}>
			{children}
		</h2>
	);
};

export default SectionTitle;
