import { useState, useEffect } from "react";
import DeleteSeminarModal from "./DeleteSeminarModal";
import EditSeminarModal from "./EditSeminarModal";
import SeminarListSkeleton from "./SeminarListSkeleton";

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
				//Вдруг мы удалили все семинары
				if (data.length === 0) {
					throw new Error("Нет семинаров в списке");
				}
				setSeminars(data);
			} catch (err) {
				setError(err.message);
			} finally {
				//небольшая задержка для показа плавной анимации предзагрузки
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			}
		};
		fetchSeminars();
	}, []);

	const handleDeleteSubmit = async (id) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Ошибка удаления");
			}
			setSeminars(seminars.filter((seminar) => seminar.id !== id));
		} catch (err) {
			setError(err.message);
		}
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setDeleteSeminar(false);
	};

	const handleEditSubmit = async (updatedSeminar) => {
		try {
			const response = await fetch(`${API_URL}/${updatedSeminar.id}`, {
				method: "PUT",
				body: JSON.stringify(updatedSeminar),
			});
			if (!response.ok) throw new Error("Ошибка обновления");
			//симулируем долгий ответ
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const data = await response.json();
			setSeminars(seminars.map((s) => (s.id === data.id ? data : s)));
		} catch (err) {
			setError(err.message);
		}
		setEditSeminar(false);
		setSelectedSeminar(null);
	};

	if (loading) {
		return (
			<div className="seminar-list">
				{[...Array(5)].map((_, index) => (
					<SeminarListSkeleton key={index} />
				))}
			</div>
		);
	}

	if (error) {
		return <h1 className="error">{error}</h1>;
	}

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
					seminarId={selectedSeminar.id}
					onSubmit={handleDeleteSubmit}
					onClose={() => {
						setDeleteSeminar(false);
						setSelectedSeminar(null);
					}}
				/>
			)}
			{editSeminar && (
				<EditSeminarModal
					seminar={selectedSeminar}
					onSubmit={handleEditSubmit}
					onClose={() => {
						setEditSeminar(false);
						setSelectedSeminar(null);
					}}
				/>
			)}
		</div>
	);
}
