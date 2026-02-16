import { fetchUserReposts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: "User" | "Community";
}

async function RepostsTab({ currentUserId, accountId, accountType }: Props) {
	if (accountType !== "User") {
		return;
	}

	const result = await fetchUserReposts(accountId);

	return (
		<section className="mt-9 flex flex-col gap-10">
			{result.threads.map((thread) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
					likes={thread.likes}
					reposts={thread.reposts}
				/>
			))}
		</section>
	);
}

export default RepostsTab;
