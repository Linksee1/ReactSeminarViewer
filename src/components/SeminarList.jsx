import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/seminars";

export default function SeminarList() {
	const [seminars, setSeminars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

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
							<button className="btn edit-btn">Редактировать</button>
							<button className="btn delete-btn">Удалить</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
