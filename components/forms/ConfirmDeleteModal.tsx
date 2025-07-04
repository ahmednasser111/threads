"use client";

import { useForm } from "react-hook-form";

interface ConfirmDeleteModalProps {
	open: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmDeleteModal = ({
	open,
	onConfirm,
	onCancel,
}: ConfirmDeleteModalProps) => {
	const { handleSubmit } = useForm();

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<form
				onSubmit={handleSubmit(onConfirm)}
				className="bg-dark-2 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 min-w-[280px]">
				<p className="text-light-1 text-center">
					Are you sure you want to delete this thread?
				</p>
				<div className="flex gap-4 mt-2">
					<button
						type="submit"
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
						Delete
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default ConfirmDeleteModal;
