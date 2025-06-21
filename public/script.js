// ✅ Auth redirect
if (window.location.pathname.includes("dashboard.html")) {
  const auth = localStorage.getItem("authenticated");
  if (!auth) window.location.href = "index.html";
}

// ✅ Element references
const jobList = document.getElementById("jobList");
const filter = document.getElementById("jobFilter");
const searchInput = document.getElementById("searchInput");
const postJobBtn = document.getElementById("postJobBtn");
const logoutBtn = document.getElementById("logoutBtn");
const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const postForm = document.getElementById("postJobForm");
const toggle = document.getElementById("darkToggle");

// ✅ Sample jobs (initial)
let jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    type: "full-time",
    location: "New York, NY",
    logo: "https://via.placeholder.com/50"
  },
  {
    title: "Backend Developer",
    company: "Innovate Inc.",
    type: "part-time",
    location: "Remote",
    logo: "https://via.placeholder.com/50"
  },
  {
    title: "UI/UX Designer",
    company: "Designify",
    type: "remote",
    location: "Remote",
    logo: "https://via.placeholder.com/50"
  }
];

// ✅ Render jobs
function renderJobs(type = "all", keyword = "") {
  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    jobList.innerHTML = "";

    const filtered = jobs.filter(job =>
      (type === "all" || job.type === type) &&
      (job.title.toLowerCase().includes(keyword.toLowerCase()) ||
       job.company.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (filtered.length === 0) {
      jobList.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    filtered.forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <div class="card-header">
          <img src="${job.logo || 'https://via.placeholder.com/50'}" alt="logo" class="job-logo" />
          <div>
            <h2>${job.title}</h2>
            <p><strong>${job.company}</strong> - ${job.location}</p>
          </div>
        </div>
        <span class="job-type">${job.type}</span>
        <button class="apply-btn">Apply Now</button>
      `;
      jobList.appendChild(card);
    });
  }, 500);
}

// ✅ Initial render
window.onload = () => renderJobs();

// ✅ Filter and search
filter?.addEventListener("change", () => renderJobs(filter.value, searchInput.value));
searchInput?.addEventListener("input", () => renderJobs(filter.value, searchInput.value));

// ✅ Post job modal open/close
postJobBtn?.addEventListener("click", () => (modal.style.display = "flex"));
closeModal?.addEventListener("click", () => (modal.style.display = "none"));

// ✅ Handle post job form
postForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("jobType").value;
  const logo = document.getElementById("logoUrl").value;

  jobs.push({ title, company, location, type, logo });
  modal.style.display = "none";
  postForm.reset();
  renderJobs(filter.value, searchInput.value);
});

// ✅ Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

// ✅ Dark mode toggle
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

toggle?.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", toggle.checked);
});
