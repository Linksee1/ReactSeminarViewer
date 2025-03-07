export default function ({ seminar, onClose }) {
	function handleDelete() {}
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="form-title">Вы уверены что хотите удалить семинар?</h2>
				<div className="form-actions">
					<button
						className="btn save-btn"
						onClick={() => handleDelete()}
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
