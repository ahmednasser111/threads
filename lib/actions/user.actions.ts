"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "./community.model";

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
