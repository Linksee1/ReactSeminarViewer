import { useState } from "react";

export default function ({ seminar, onClose }) {
	function handleChange() {}
	const [formData, setFormData] = useState(seminar);
	function handleSubmit(e) {
		e.preventDefault();
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
