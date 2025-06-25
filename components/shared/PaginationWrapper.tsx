"use client";

import Pagination from "./Pagination";

interface Props {
	pageNumber: number;
	isNext: boolean;
	path: string;
}

export default function PaginationWrapper({ pageNumber, isNext, path }: Props) {
	return <Pagination pageNumber={pageNumber} isNext={isNext} path={path} />;
}
