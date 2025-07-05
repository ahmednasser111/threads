"use client";

import Image from "next/image";
import { useState } from "react";
import { likeThread, unlikeThread } from "@/lib/actions/thread.actions";

interface ThreadLikeButtonProps {
	threadId: string;
	currentUserId: string;
	likes: string[];
}

const ThreadLikeButton = ({
	threadId,
	currentUserId,
	likes,
}: ThreadLikeButtonProps) => {
	const [liked, setLiked] = useState(likes.includes(currentUserId));
	const [likeCount, setLikeCount] = useState(likes.length);

	const handleLike = async () => {
		if (liked) {
			await unlikeThread(threadId, currentUserId);
			setLiked(false);
			setLikeCount((prev) => prev - 1);
		} else {
			await likeThread(threadId, currentUserId);
			setLiked(true);
			setLikeCount((prev) => prev + 1);
		}
	};

	return (
		<div className="flex items-center gap-1">
			<Image
				src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
				alt="heart"
				width={24}
				height={24}
				title="Like"
				className="cursor-pointer object-contain"
				onClick={handleLike}
			/>
			{likeCount > 0 && (
				<span className="text-xs text-light-2">{likeCount}</span>
			)}
		</div>
	);
};

export default ThreadLikeButton;
