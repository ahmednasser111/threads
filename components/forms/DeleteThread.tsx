"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { deleteThread } from "@/lib/actions/thread.actions";
import ConfirmDeleteModal from "@/components/forms/ConfirmDeleteModal";

interface Props {
	threadId: string;
	currentUserId: string;
	authorId: string;
	parentId: string | null;
	isComment?: boolean;
}

function DeleteThread({ threadId, currentUserId, authorId }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const [showConfirm, setShowConfirm] = useState(false);

	const handleConfirm = async () => {
		await deleteThread(JSON.parse(threadId), pathname);
		setShowConfirm(false);

		// Route to home if we're on a thread page
		if (pathname.includes("/thread/")) {
			router.push("/");
		}
	};

	if (currentUserId !== authorId || pathname === "/") return null;

	return (
		<>
			<Image
				src="/assets/delete.svg"
				alt="delete"
				width={18}
				height={18}
				className="cursor-pointer object-contain"
				onClick={() => setShowConfirm(true)}
			/>
			<ConfirmDeleteModal
				open={showConfirm}
				onConfirm={handleConfirm}
				onCancel={() => setShowConfirm(false)}
			/>
		</>
	);
}

export default DeleteThread;
