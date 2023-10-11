import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

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

export const onViewReportPdf = async (data, module) => {
  let tableColumn = [];
  let tableData = [];

  let pdfConfig = {
    orientation: "1",
    unit: "pt",
    pageSize: "a4",
  };

  try {
    if (module === "Users") {
      tableColumn = [
        { dataKey: "first_name", title: "First Name" },
        { dataKey: "last_name", title: "Last Name" },
        { dataKey: "email", title: "Email" },
        { dataKey: "joined_date", title: "Joined Date" },
        { dataKey: "plan", title: "Plan" },
        { dataKey: "status", title: "Status" },
      ];

      tableData = data?.map((item, i) => [
        item.first_name,
        item.last_name,
        item.email,
        item.joined_date,
        item.plan,
        item.status ? "Active" : "InActive",
      ]);
    } else if (module === "Plans") {
      tableColumn = [
        { dataKey: "name", title: "Name" },
        { dataKey: "description", title: "Description" },
        { dataKey: "monthly", title: "Price Monthly" },
        { dataKey: "yearly", title: "Price Yearly" },
        { dataKey: "currency", title: "Currency" },
        { dataKey: "status", title: "Status" },
      ];

      tableData = data?.map((item, i) => [
        item.name,
        item.description,
        item.monthly,
        item.yearly,
        item.currency,
        item.status ? "Active" : "InActive",
      ]);
    } else if (module === "Activity") {
      tableColumn = [
        { dataKey: "username", title: "UserName" },
        { dataKey: "logon_time", title: "Login Time" },
        { dataKey: "logout_time", title: "Logout Time" },
        { dataKey: "ip_address", title: "Ip Address" },
        { dataKey: "country_code", title: "Country" },
        { dataKey: "average_time", title: "Average Time Spended" },
        { dataKey: "status", title: "Status" },
      ];

      tableData = data?.map((item, i) => [
        item.username,
        item.logon_time,
        item.logout_time,
        item.ip_address,
        item.country_code,
        item.average_time,
        item.status,
      ]);
    } else if (module === "Subscriptions") {
      tableColumn = [
        { dataKey: "recipient", title: "Recipient" },
        { dataKey: "plan_name", title: "Plan" },
        { dataKey: "amount", title: "Amount" },
        { dataKey: "customer_email", title: "Customer Email" },
        { dataKey: "stripe_subscription_id", title: "Subscription Id" },
        { dataKey: "plan_interval", title: "Plan Interval" },
        { dataKey: "created", title: "Date & Time" },
        { dataKey: "plan_period_start", title: "Plan Period Start" },
        { dataKey: "plan_period_end", title: "Plan Period End" },
        { dataKey: "status", title: "Status" },
      ];

      tableData = data?.map((item, i) => [
        `${item?.first_name} ${item?.last_name}`,
        item?.plan_name,
        item?.amount,
        item?.customer_email,
        item?.stripe_subscription_id,
        item?.plan_interval,
        item?.created,
        item?.plan_period_start,
        item?.plan_period_end,
        item?.status?.toUpperCase(),
      ]);
      pdfConfig.orientation = "landscape";
    } else if (module === "Raffles") {
      tableColumn = [
        { dataKey: "title", title: "Title" },
        { dataKey: "channelTitle", title: "Channel Title" },
        { dataKey: "comments", title: "Comments" },
        { dataKey: "winner", title: "Winner" },
      ];

      tableData = data?.map((item, i) => [
        item.title,
        item.channelTitle,
        item.comments,
        item.winner,
      ]);
    }

    // to dynamic page width =  landscape create common settings
    const doc = new jsPDF(
      pdfConfig?.orientation,
      pdfConfig?.unit,
      pdfConfig?.pageSize
    );
    doc.setFontSize(15);
    doc.setTextColor(45);
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const topHight = 25;
    doc.text("Dual Wire", pageWidth / 2, topHight, { align: "center" });
    doc.line(35, topHight + 10, pageWidth - 35, topHight + 10);
    doc.setFontSize(10);
    doc.setTextColor(40);

    doc.autoTable({
      head: [tableColumn],
      body: tableData,
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (var i = 1; i < pageCount + 1; i++) {
      let horizontalPos = pageWidth - 35;
      let verticalPos = pageHeight - 10;
      doc.line(30, pageHeight - 30, pageWidth - 35, pageHeight - 30);
      doc.setPage(i);
      doc.text("Page : " + String(i), 40, verticalPos, {
        align: "left",
      });
      doc.text(
        "Print Date : " + new Date(Date.now()).toLocaleString().split(",")[0],
        horizontalPos,
        verticalPos,
        {
          align: "right",
        }
      );
    }

    doc.setProperties({
      title: "Dual Wire",
    });

    window.open(doc.output("bloburl"));
  } catch (e) {
    console.log("e", e);
    toast.error("Unable to generate pdf !");
  }
};
