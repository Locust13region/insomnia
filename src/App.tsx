import { useEffect, useState } from "react";
import "./App.css";
import { getReportDone, getReportStatus, postReport } from "./services";
import { ClockLoader } from "react-spinners";

type Report = {
	id: number;
	isComplete: boolean;
	url: string;
};

function App() {
	const [reports, setReports] = useState<Report[]>([]);

	const handleAddReport = async () =>
		await postReport().then((result: Report) =>
			setReports((prev) => [...prev, result])
		);

	const handleClear = () => setReports([]);

	// const interval = useRef<NodeJS.Timeout | null>(null);

	function requestStatus(reports: Report[]) {
		console.log("requestStatus");
		reports.forEach((report) => {
			if (report.isComplete) {
				return;
			}
			getReportStatus(report.id).then((result) => {
				if (result) {
					getReportDone(report.id).then((result: Report) => {
						setReports((prev) =>
							prev.map((prevReport) =>
								prevReport.id === report.id
									? {
											...prevReport,
											isComplete: result.isComplete,
											url: result.url,
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  }
									: prevReport
							)
						);
					});
				}
			});
		});
	}

	useEffect(() => {
		let interval: string | number | NodeJS.Timeout | undefined;
		if (reports.every((report) => report.isComplete)) {
			if (interval) {
				clearInterval(interval);
			}
		} else {
			interval = setInterval(() => {
				requestStatus(reports);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [reports]);

	return (
		<>
			<div className="header">
				<button
					className="btn addReport"
					onClick={handleAddReport}
				>
					Наплодить отчетов
				</button>
				<button
					className="btn clear"
					onClick={handleClear}
				>
					Очистить список
				</button>
			</div>
			<div className="list">
				{reports.length === 0 ? (
					<div className="item">Отчетов на исполнении нет</div>
				) : (
					reports
						.slice()
						.reverse()
						// .filter((report) => report.id === 1)
						.map((report, index) => (
							<div
								key={index}
								className="item"
							>
								<div className="item__id">{report.id}</div>
								<div className="item__status">
									{"Статус отчета: " +
										(report.isComplete
											? '"выполнен"'
											: '"в процессе выполнения"')}
								</div>
								<div className="item__image">
									{report.isComplete ? (
										<img
											src={report.url}
											alt={`report${report.id}`}
											className="reportImage"
										/>
									) : (
										<ClockLoader color="rgba(255, 255, 255, 0.4)" />
									)}
								</div>
							</div>
						))
				)}
			</div>
		</>
	);
}

export default App;
