import { useState } from "react";
//Вспомогательные функции для работы с датами
const formatDateForInput = (dateString) => {
	const [day, month, year] = dateString.split(".");
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const formatTimeForInput = (timeString) => {
	return timeString.length === 5 ? timeString : `0${timeString}`;
};

export default function ({ seminar, onSubmit, onClose }) {
	const [formData, setFormData] = useState({
		...seminar,
		date: formatDateForInput(seminar.date),
		time: formatTimeForInput(seminar.time),
	});
	const [loading, setLoading] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		const formattedData = {
			...formData,
			date: formData.date.split("-").reverse().join("."),
			time: formData.time.replace(/^0/, ""),
		};
		setLoading(true);
		onSubmit(formattedData).then(() => {
			setLoading(false);
		});
	}
	if (loading) {
		return (
			<div className="modal-overlay">
				<div className="modal-content">
					<h2 className="form-title">Отправляем данные</h2>
					<div className="loader-wrapper">
						<div className="loader"></div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="form-title">Редактирование семинара</h2>
				<form
					onSubmit={handleSubmit}
					className="edit-form"
				>
					<label>
						Название:
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						Описание:
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows="4"
							required
						/>
					</label>

					<div className="form-row">
						<label>
							Дата:
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleChange}
								required
							/>
						</label>

						<label>
							Время:
							<input
								type="time"
								name="time"
								value={formData.time}
								onChange={handleChange}
								required
							/>
						</label>
					</div>

					<label>
						URL фотографии:
						<input
							type="text"
							name="photo"
							value={formData.photo}
							onChange={handleChange}
							placeholder="https://example.com/image.jpg"
							required
						/>
					</label>

					<div className="form-actions">
						<button
							type="submit"
							className="btn save-btn"
						>
							Сохранить
						</button>
						<button
							type="button"
							className="btn cancel-btn"
							onClick={onClose}
						>
							Отмена
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
