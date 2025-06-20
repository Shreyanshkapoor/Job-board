// Auth redirect
if (window.location.pathname.includes("dashboard.html")) {
  const auth = localStorage.getItem("authenticated");
  if (!auth) window.location.href = "index.html";
}

const jobList = document.getElementById("jobList");
const filter = document.getElementById("jobFilter");
const searchInput = document.getElementById("searchInput");
const postJobBtn = document.getElementById("postJobBtn");
const logoutBtn = document.getElementById("logoutBtn");

let jobs = [
  { title: "Frontend Developer", company: "TechCorp", type: "full-time", location: "New York, NY" },
  { title: "Backend Developer", company: "Innovate Inc.", type: "part-time", location: "Remote" },
  { title: "UI/UX Designer", company: "Designify", type: "remote", location: "Remote" },
  { title: "Full Stack Developer", company: "Startup Hub", type: "full-time", location: "San Francisco, CA" }
];

function renderJobs(filterType, keyword = "") {
  jobList.innerHTML = "";
  const filtered = jobs.filter(job =>
    (filterType === "all" || job.type === filterType) &&
    (job.title.toLowerCase().includes(keyword.toLowerCase()) ||
     job.company.toLowerCase().includes(keyword.toLowerCase()))
  );
  if (filtered.length === 0) {
    jobList.innerHTML = "<p>No matching jobs found.</p>";
  }
  filtered.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <span class="job-type">${job.type}</span>
    `;
    jobList.appendChild(card);
  });
}

filter?.addEventListener("change", () => renderJobs(filter.value, searchInput.value));
searchInput?.addEventListener("input", () => renderJobs(filter.value, searchInput.value));
window.onload = () => renderJobs("all");

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("authenticated");
  window.location.href = "index.html";
});

// Modal controls
const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const postForm = document.getElementById("postJobForm");

postJobBtn?.addEventListener("click", () => modal.style.display = "flex");
closeModal?.addEventListener("click", () => modal.style.display = "none");

postForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("jobType").value;

  jobs.push({ title, company, location, type });
  modal.style.display = "none";
  postForm.reset();
  renderJobs(filter.value, searchInput.value);
});
