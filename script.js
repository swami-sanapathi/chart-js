const qcData = [
  {
    title: "QC1",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC2",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC3",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something",
  },
  {
    title: "QC4",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC5",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC6",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC7",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC8",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC9",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC10",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC11",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC12",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC13",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "QC14",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
];

// 4 PT's data
const ptData = [
  {
    title: "PT1",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "PT2",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "PT3",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
  {
    title: "PT4",
    status: "online",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
];

// 1 TRN
const trnData = [
  {
    title: "TRN2",
    status: "offline",
    buildDate: "Build Date: --------",
    description: "Something Some",
  },
];

// Function to dynamically generate grid items
function generateGridItems(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.innerHTML = `
            <div class="circle"></div>
            <div class="info">
                <div class="title">${item.title}</div>
                <div class="status ${item.status}">${
      item.status.charAt(0).toUpperCase() + item.status.slice(1)
    }</div>
                <div class="build-date">${item.buildDate}</div>
                <div class="description">${item.description}</div>
            </div>
        `;
    container.appendChild(gridItem);
  });
}

// General function to draw a pie chart
function drawPieChart(data, canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  const onlinePercentage = calculateOnlinePercentage(data);
  const offlinePercentage = 100 - onlinePercentage;
  const chartData = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        label: "Server Status",
        data: [onlinePercentage, offlinePercentage],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 4,
        // Implementing a monochromatic color scheme with transparency
        // backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(54, 162, 235, 0.3)"],
        // borderColor: ["rgba(54, 162, 235, 1)"], // Solid color for border
        // borderWidth: 1, // Adding border width for clarity
        // hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "pie",
    data: chartData,
  };
  new Chart(ctx, config);
}

// Simplified event listener for top circles
document.querySelector(".top-circles").addEventListener("click", (e) => {
  let targetCircle = e.target.closest(".top-circle");
  if (targetCircle) {
    document
      .querySelectorAll(".content")
      .forEach((section) => (section.style.display = "none"));
    document
      .querySelectorAll(".top-circle")
      .forEach((circle) => circle.classList.remove("active"));
    targetCircle.classList.add("active");
    const sectionId = targetCircle.id.replace("show-", "") + "-section";
    document.getElementById(sectionId).style.display = "block";
  }
});

// Call the function for QC, PT, and TRN items with their respective data and container IDs.
generateGridItems(qcData, "qc-grid-container");
generateGridItems(ptData, "pt-grid-container");
generateGridItems(trnData, "trn-grid-container");

// Call the function to draw the chart for each type
drawPieChart(qcData, "qc-percentage-chart");
drawPieChart(ptData, "pt-percentage-chart");
drawPieChart(trnData, "trn-percentage-chart");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("canvas").forEach((canvas) => {
    canvas.addEventListener("click", (event) => {
      // Add logic for displaying content related to the clicked canvas
    });
  });
});
// Example function to calculate online percentage
function calculateOnlinePercentage(data) {
  const total = data.length;
  const onlineCount = data.filter((item) => item.status === "online").length;
  return (onlineCount / total) * 100;
}
