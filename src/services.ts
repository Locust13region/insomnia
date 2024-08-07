export const postReport = async () => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "insomnia/9.3.2",
		},
		body: "false",
	};

	return await fetch(
		"https://delayed-reports-duergagnf2d3epe0.northeurope-01.azurewebsites.net/reports",
		options
	)
		.then((response) => response.json())
		.catch((err) => console.error(err));
};

export const getReports = async () => {
	const options = {
		method: "GET",
		headers: { "User-Agent": "insomnia/9.3.2" },
	};

	const response = await fetch(
		"https://delayed-reports-duergagnf2d3epe0.northeurope-01.azurewebsites.net/reports",
		options
	)
		.then((response) => response.json())
		.catch((err) => console.error(err));
	return response;
};

export const getReportStatus = async (reportId: number) => {
	const options = {
		method: "GET",
		headers: { "User-Agent": "insomnia/9.3.2" },
	};
	const url = `https://delayed-reports-duergagnf2d3epe0.northeurope-01.azurewebsites.net/reports/${reportId}/status`;
	return await fetch(url, options)
		.then((response) => response.json())
		.catch((err) => console.error(err));
};

export const getReportDone = async (reportId: number) => {
	const options = {
		method: "GET",
		headers: { "User-Agent": "insomnia/9.3.2" },
	};
	const url = `https://delayed-reports-duergagnf2d3epe0.northeurope-01.azurewebsites.net/reports/${reportId}`;

	return await fetch(url, options)
		.then((response) => response.json())
		.catch((err) => console.error(err));
};
