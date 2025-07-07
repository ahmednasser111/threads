import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import ThreadCard from "@/components/cards/ThreadCard";

import Comment from "@/components/forms/Comment";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Link from "next/link";

export const revalidate = 0;

interface Author {
	name: string;
	image: string;
	id: string;
}

interface Thread {
	_id: string;
	parentId: string | null;
	text: string;
	author: Author;
	community: { id: string; name: string; image: string } | null;
	createdAt: string;
	likes: string[];
	children: Thread[];
}

async function page({
	params: paramsPromise,
}: {
	params: Promise<{ id: string }>;
}) {
	const params = await paramsPromise;
	if (!params.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	const thread: Thread = await fetchThreadById(params.id);

	return (
		<section className="relative">
			<div>
				<ThreadCard
					id={thread._id}
					currentUserId={user.id}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					likes={thread.likes}
					community={
						thread.community as {
							id: string;
							name: string;
							image: string;
						} | null
					}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>

			<div className="mt-7">
				<Comment
					threadId={params.id}
					currentUserImg={user.imageUrl}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className="mt-10">
				{thread.children.map((childItem: Thread) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={user.id}
						parentId={childItem.parentId}
						content={childItem.text}
						author={childItem.author}
						likes={childItem.likes}
						community={
							childItem.community as {
								id: string;
								name: string;
								image: string;
							} | null
						}
						createdAt={childItem.createdAt}
						comments={childItem.children}
						isComment
					/>
				))}
			</div>
		</section>
	);
}

export default page;
