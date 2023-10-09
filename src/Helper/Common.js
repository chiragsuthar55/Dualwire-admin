import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const renderMsg = (e) => {
  console.log("e", e);
  return e?.response?.status === 401 ||
    e?.response?.status === 404 ||
    e?.response?.status === 400
    ? e?.response?.data?.message
    : "Something goes wrong, please try again later!";
};

export const getPaymentStatus = (val, str) => {
  if (!val) return;
  if (str === "Active") {
    if (val === 1) return "Active";
    else if (val === 2) return "InActive";
  } else {
    if (val === 1) return "SUCCESS";
    else if (val === 2) return "CANCELED";
  }
};

export const formattedDateWithTime = (date) => {
  if (!date) return;
  const jsDate = new Date(date);
  if (isNaN(jsDate)) return date;

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = jsDate.toLocaleString("en-US", options)?.split(",");
  return `${formattedDate[0]} at${formattedDate[1]}`;
};

export const getShortNumber = (number) => {
  if (number >= 1000000) return (number / 1000000)?.toFixed(1) + "M";
  else if (number >= 1000) return (number / 1000)?.toFixed(1) + "K";
  else return number?.toString();
};

const onViewReportPdf = async (data) => {
  // Define the table headers and data
  const tableHeaders = [
    {
      text: "Name",
      style: "header",
      fillColor: "#f7d794",
      fontSize: 12,
    },
    { text: "From", style: "header", fillColor: "#f7d794", fontSize: 12 },
    { text: "To", style: "header", fillColor: "#f7d794", fontSize: 12 },
    {
      text: "Total Duration",
      style: "header",
      fillColor: "#f7d794",
      fontSize: 12,
    },
    {
      text: "Estimated Distance",
      style: "header",
      fillColor: "#f7d794",
      fontSize: 12,
    },
    {
      text: "Max Speed",
      style: "header",
      fillColor: "#f7d794",
      fontSize: 12,
    },
    {
      text: "Average Speed",
      style: "header",
      fillColor: "#f7d794",
      fontSize: 12,
    },
  ];

  const tableData = data.map((item) => [
    item.name,
    item.from,
    item.to,
    item.totalDuration,
    item.estimatedDistance,
    item.maxSpeed,
    item.avgSpeed,
  ]);

  // Define the PDF document definition
  const docDefinition = {
    content: [
      { text: "Codezee Solutions Pvt Ltd.", style: "company" },
      { text: "Report", style: "header" },
      {
        text: ["Tracker Id : 846456546874789", " Tracker Name : huehrheth"],
      },
      {
        layout: {
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths.length ? "black" : "gray";
          },
        },
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
          body: [tableHeaders, ...tableData],
        },
      },
    ],
    styles: {
      header: {
        bold: true,
        margin: [0, 0, 0, 8],
        fontSize: 12,
        alignment: "center",
      },
      body: {
        fontSize: 5,
      },
      company: {
        fontSize: 14,
        alignment: "center",
      },
    },
  };

  // Generate the PDF document and open in a new tab
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator?.open();
};
