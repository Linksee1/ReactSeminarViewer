export default function SeminarListSkeleton() {
	return (
		<div className="seminar-card skeleton">
			<div className="skeleton-image"></div>
			<div className="seminar-content">
				<div className="skeleton-title"></div>
				<div className="skeleton-description"></div>
				<div className="skeleton-time">
					<div className="skeleton-date"></div>
					<div className="skeleton-date"></div>
				</div>
				<div className="skeleton-actions">
					<div className="skeleton-button"></div>
					<div className="skeleton-button"></div>
				</div>
			</div>
		</div>
	);
}
