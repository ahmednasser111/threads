"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
	personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
	const router = useRouter();

	const isCommunity = personType === "Community";

	return (
		<article className="user-card">
			<div className="user-card_avatar">
				<Link
					href={isCommunity ? `/communities/${id}` : `/profile/${id}`}
					className="relative h-12 w-12">
					<Image
						src={imgUrl}
						alt="user_logo"
						fill
						className="rounded-full object-cover"
					/>
				</Link>

				<div className="flex-1 text-ellipsis">
					<Link href={isCommunity ? `/communities/${id}` : `/profile/${id}`}>
						<h4 className="text-base-semibold text-light-1 hover:underline">
							{name}
						</h4>
					</Link>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<Button
				className="user-card_btn bg-black-1"
				onClick={() => {
					if (isCommunity) {
						router.push(`/communities/${id}`);
					} else {
						router.push(`/profile/${id}`);
					}
				}}>
				View
			</Button>
		</article>
	);
}

export default UserCard;
