"use client";

import Image from "next/image";
import { useState } from "react";
import { repostThread, unrepostThread } from "@/lib/actions/thread.actions";

interface Props {
	threadId: string;
	currentUserId: string;
	reposts: string[];
}

function ThreadRepostButton({ threadId, currentUserId, reposts }: Props) {
	const [isReposted, setIsReposted] = useState<boolean>(
		reposts.includes(currentUserId)
	);
	const [repostCount, setRepostCount] = useState<number>(reposts.length);

	const handleRepostClick = async () => {
		if (isReposted) {
			await unrepostThread(threadId, currentUserId);
			setIsReposted(false);
			setRepostCount((prev) => prev - 1);
		} else {
			await repostThread(threadId, currentUserId);
			setIsReposted(true);
			setRepostCount((prev) => prev + 1);
		}
	};

	return (
		<div className="flex gap-1 items-center">
			<Image
				src="/assets/repost.svg"
				alt="repost"
				width={24}
				height={24}
				title={isReposted ? "Unrepost" : "Repost"}
				className="cursor-pointer object-contain"
				onClick={handleRepostClick}
			/>
			{repostCount > 0 && (
				<span className="text-subtle-medium text-gray-1">{repostCount}</span>
			)}
		</div>
	);
}

export default ThreadRepostButton;
