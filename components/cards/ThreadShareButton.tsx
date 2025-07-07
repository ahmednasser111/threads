"use client";

import Image from "next/image";
import { toast } from "sonner";

interface ThreadShareButtonProps {
	threadId: string;
}

const ThreadShareButton = ({ threadId }: ThreadShareButtonProps) => {
	const threadUrl =
		typeof window !== "undefined"
			? window.location.origin + `/thread/${threadId}`
			: `/thread/${threadId}`;

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(threadUrl);
			toast("Link copied!", {
				description: "Thread link has been copied to your clipboard.",
			});
		} catch (err: unknown) {
			toast("Copy failed", {
				description: "Failed to copy link.",
			});
		}
	};

	return (
		<Image
			src="/assets/share.svg"
			alt="share"
			width={24}
			height={24}
			title="Share"
			className="cursor-pointer object-contain"
			onClick={handleShare}
		/>
	);
};

export default ThreadShareButton;
