"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface UpdateUserParams {
	userId: string;
	name: string;
	username: string;
	bio: string;
	image: string;
	path: string;
}

export async function updateUser({
	userId,
	name,
	username,
	bio,
	image,
	path,
}: UpdateUserParams): Promise<void> {
	connectToDB();

	try {
		await User.findOneAndUpdate(
			{
				id: userId,
			},
			{
				name,
				username,
				bio,
				image,
				onboarded: true,
			},
			{
				upsert: true,
			}
		);
		if (path === "/profile/edit") {
			console.log(`User ${userId} updated successfully`);
			revalidatePath(path);
		}
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}

export async function fetchUser(userId: string) {
	connectToDB();
	try {
		return await User.findOne({ id: userId }).populate({
			path: "communities",
			model: Community,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}

export async function fetchUsers({
	userId,
	searchString = "",
	pageNumber = 1,
	pageSize = 20,
	sortBy = "desc",
}: {
	userId: string;
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) {
	try {
		connectToDB();

		// Calculate the number of users to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize;

		// Create a case-insensitive regular expression for the provided search string.
		const regex = new RegExp(searchString, "i");

		// Create an initial query object to filter users.
		const query: FilterQuery<typeof User> = {
			id: { $ne: userId }, // Exclude the current user from the results.
		};

		// If the search string is not empty, add the $or operator to match either username or name fields.
		if (searchString.trim() !== "") {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}

		// Define the sort options for the fetched users based on createdAt field and provided sort order.
		const sortOptions = { createdAt: sortBy };

		const usersQuery = User.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize);

		// Count the total number of users that match the search criteria (without pagination).
		const totalUsersCount = await User.countDocuments(query);

		const users = await usersQuery.exec();

		// Check if there are more users beyond the current page.
		const isNext = totalUsersCount > skipAmount + users.length;

		return { users, isNext };
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
}

export async function fetchUserPosts(userId: string) {
	try {
		connectToDB();

		const threads = await User.findOne({ id: userId }).populate({
			path: "threads",
			model: Thread,
			populate: [
				{
					path: "community",
					model: Community,
					select: "name id image _id",
				},
				{
					path: "children",
					model: Thread,
					populate: {
						path: "author",
						model: User,
						select: "name image id",
					},
				},
			],
		});
		return threads;
	} catch (error) {
		console.error("Error fetching user threads:", error);
		throw error;
	}
}

export async function getActivity(userId: string) {
	try {
		connectToDB();

		// find all threads created by the user
		const threads = await Thread.find({ author: userId });

		// collect all the child threads ids (replies) from the children field
		const childThreadIds = threads.reduce((acc, userThread) => {
			return acc.concat(userThread.children);
		}, []);

		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			author: { $ne: userId }, // Exclude the user's own replies
		}).populate({
			path: "author",
			model: User,
			select: "name image _id",
		});
		return replies;
	} catch (error) {
		console.error("Error fetching user activity:", error);
		throw error;
	}
}
