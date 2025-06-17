import { SignedOut } from "@clerk/nextjs";
import React from "react";

const OnboardingPage = () => {
	return (
		<main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
			hi
			<SignedOut />
		</main>
	);
};

export default OnboardingPage;