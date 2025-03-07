import { useState, useEffect } from "react";
import DeleteSeminarModal from "./DeleteSeminarModal";
import EditSeminarModal from "./EditSeminarModal";

const API_URL = "http://localhost:3000/seminars";

export default function SeminarList() {
	const [seminars, setSeminars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedSeminar, setSelectedSeminar] = useState(null);
	const [deleteSeminar, setDeleteSeminar] = useState(false);
	const [editSeminar, setEditSeminar] = useState(false);

	useEffect(() => {
		const fetchSeminars = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) {
					throw new Error("Ошибка загрузки семинаров");
				}
				const data = await response.json();
				setSeminars(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchSeminars();
	}, []);

	function handleDeleteSubmit() {}

	function handleEditSubmit() {}
	return (
		<div className="seminar-list">
			{seminars.map((seminar) => (
				<div
					key={seminar.id}
					className="seminar-card"
				>
					<img
						src={seminar.photo}
						alt={seminar.title}
						className="seminar-image"
					/>
					<div className="seminar-content">
						<h3>{seminar.title}</h3>
						<p className="seminar-description">{seminar.description}</p>
						<div className="seminar-time">
							<span>{seminar.date}</span>
							<span>{seminar.time}</span>
						</div>
						<div className="action-buttons">
							<button
								className="btn edit-btn"
								onClick={() => {
									setEditSeminar(true);
									setSelectedSeminar(seminar);
								}}
							>
								Редактировать
							</button>
							<button
								className="btn delete-btn"
								onClick={() => {
									setDeleteSeminar(true);
									setSelectedSeminar(seminar);
								}}
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			))}
			{deleteSeminar && (
				<DeleteSeminarModal
					seminar={selectedSeminar}
					onSubmit={handleDeleteSubmit}
					onClose={() => setSelectedSeminar(null)}
				/>
			)}
			{editSeminar && (
				<EditSeminarModal
					seminar={selectedSeminar}
					onSubmit={handleEditSubmit}
					onClose={() => setSelectedSeminar(null)}
				/>
			)}
		</div>
	);
}
