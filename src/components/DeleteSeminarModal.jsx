import { useState } from "react";

export default function ({ seminarId, onSubmit, onClose }) {
	const [loading, setLoading] = useState(false);
	function handleSubmit() {
		setLoading(true);
		onSubmit(seminarId).then(() => {
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
				<h2 className="form-title">Вы уверены что хотите удалить семинар?</h2>
				<div className="form-actions">
					<button
						className="btn save-btn"
						onClick={() => handleSubmit()}
					>
						Да
					</button>
					<button
						className="btn delete-btn"
						onClick={onClose}
					>
						Нет
					</button>
				</div>
			</div>
		</div>
	);
}
