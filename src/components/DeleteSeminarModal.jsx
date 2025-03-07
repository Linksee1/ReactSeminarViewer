export default function ({ seminarId, onSubmit, onClose }) {
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="form-title">Вы уверены что хотите удалить семинар?</h2>
				<div className="form-actions">
					<button
						className="btn save-btn"
						onClick={() => onSubmit(seminarId)}
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
