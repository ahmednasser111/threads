import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import PaginationWrapper from "@/components/shared/PaginationWrapper";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

interface Author {
	name: string;
	image: string;
	id: string;
}

interface Community {
	id: string;
	name: string;
	image: string;
}

interface Post {
	_id: string;
	parentId: string | null;
	text: string;
	author: Author;
	community: Community | null;
	createdAt: string;
	children: Post[];
}

async function Home({
	searchParams: searchParamsPromise,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const searchParams = await searchParamsPromise;
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	const result = await fetchPosts(
		searchParams.page ? +searchParams.page : 1,
		30
	);

	return (
		<>
			<h1 className="head-text text-left">Home</h1>

			<section className="mt-9 flex flex-col gap-10">
				{result.posts.length === 0 ? (
					<p className="no-result">No threads found</p>
				) : (
					<>
						{result.posts.map((post: Post) => (
							<ThreadCard
								key={post._id}
								id={post._id}
								currentUserId={user.id}
								parentId={post.parentId}
								content={post.text}
								author={post.author}
								community={post.community}
								createdAt={post.createdAt}
								comments={post.children}
							/>
						))}
					</>
				)}
			</section>

			<PaginationWrapper
				path="/"
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				isNext={result.isNext}
			/>
		</>
	);
}

export default Home;
