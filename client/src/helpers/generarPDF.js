import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const generatePDF = (cursos) => {
	const doc = new jsPDF();

	const tableColumn = ["Curso", "Profesor", "Fecha"];
	const tableRows = [];

	// for each ticket pass all its data into an array
	cursos.forEach((curso) => {
		const cursoData = [
			curso.datosCurso.curso,
			curso.datosCurso.profesor,
			// called date-fns to format the date on the ticket
			moment(new Date(curso.id.creationTime)).format("L"),
		];
		// push each tickcet's info into a row
		tableRows.push(cursoData);
	});

	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 20 });
	const date = moment().format("L");
	// we use a date string to generate our filename.
	// ticket title. and margin-top + margin-left
	doc.text("Cursos cumplidos.", 14, 15);
	var img = new Image();
	img.src = "imgs/ipn.png";
	doc.addImage(img, 14, 30, 80, 100);
	// we define the name of our PDF file.
	doc.save(`reporte_${date}.pdf`);
};

export default generatePDF;
