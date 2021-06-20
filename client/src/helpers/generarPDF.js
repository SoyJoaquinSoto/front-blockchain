import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment-with-locales-es6";

const generatePDF = (cursos) => {
	const doc = new jsPDF("p", "px", "letter");

	var ipn = new Image();
	ipn.src = "imgs/ipn.png";
	doc.addImage(ipn, "png", 20, 15, 40, 68);

	doc.setFont("helvetica", "bold");
	doc.text(
		"Instituto Politécnico Nacional",
		doc.internal.pageSize.getWidth() / 2,
		30,
		{
			align: "center",
		}
	);

	doc.setFontSize(12);

	doc.setFont("helvetica", "normal");
	doc.text(
		"Unidad Profesional Interdisciplinaria de Ingeniería y \n Ciencias Sociales y Administrativas",
		doc.internal.pageSize.getWidth() / 2,
		45,
		{ align: "center" }
	);

	doc.text("otorga la presente", doc.internal.pageSize.getWidth() / 2, 75, {
		align: "center",
	});

	doc.setFontSize(30);

	doc.setFont("helvetica", "bold");
	doc.text("CONSTACIA", doc.internal.pageSize.getWidth() / 2, 110, {
		align: "center",
	});

	doc.setFontSize(30);

	doc.setFont("helvetica", "normal");
	doc.text("a", doc.internal.pageSize.getWidth() / 2, 140, {
		align: "center",
	});

	doc.setFontSize(20);

	doc.text(
		cursos[0].datosAlumno.nombre,
		doc.internal.pageSize.getWidth() / 2,
		170,
		{
			align: "center",
		}
	);

	doc.setFontSize(12);

	doc.text(
		"por su participación en los cursos",
		doc.internal.pageSize.getWidth() / 2,
		200,
		{
			align: "center",
		}
	);

	moment.locale("es");

	const tableColumn = [["Curso", "Fecha"]];
	const tableRows = [];

	cursos.forEach((curso) => {
		const cursoData = [
			curso.datosCurso.curso,
			moment(curso.id.creationTime).format("L"),
		];
		tableRows.push(cursoData);
	});

	doc.autoTable({
		head: tableColumn,
		body: tableRows,
		startY: 220,
		headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
		styles: { halign: "center" },
		theme: "grid",
	});

	doc.setFontSize(18);

	doc.setFont("helvetica", "bolditalic");
	doc.text(
		"CON EVALUACIÓN APROBATORIA",
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 50,
		{
			align: "center",
		}
	);

	doc.setFontSize(12);

	doc.setFont("helvetica", "normal");
	doc.text(
		`México, CDMX. a ${moment().format("D [de] MMMM [del] YYYY")}`,
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 80,
		{
			align: "center",
		}
	);

	doc.text(
		'"LA TÉCNICA AL SERVICIO DE LA PATRIA"',
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 100,
		{
			align: "center",
		}
	);

	doc.setFont("helvetica", "bold");
	doc.text(
		"Validado con blockchain",
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 120,
		{
			align: "center",
		}
	);

	doc.text(
		"FERNANDO VÁZQUEZ TORRES",
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 200,
		{
			align: "center",
		}
	);

	doc.setFont("helvetica", "normal");
	doc.text(
		"DIRECTOR INTERINO",
		doc.internal.pageSize.getWidth() / 2,
		doc.lastAutoTable.finalY + 215,
		{
			align: "center",
		}
	);

	const date = moment().format("L");

	doc.save(`constancia_${date}.pdf`);
};

export default generatePDF;
