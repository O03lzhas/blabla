const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


let currentDate = new Date();

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDate();

  const monthYearString = currentDate.toLocaleDateString('default', {month:'long', year: 'numeric'});
  monthYearElement.textContent = monthYearString;

  let datesHTML = '';

  for(let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }
  for(let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  for(let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML+=`<div class="date inactive">${nextDate.getDate()}</div>`
  }

  datesElement.innerHTML=datesHTML;
}

prevBtn.addEventListener('click', ()=> {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
})

nextBtn.addEventListener('click', ()=> {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
})


updateCalendar();

/*Модальное окно*/
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open_modal_btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close_modal_btn');
  const overlay = modal.querySelector('.overlay');

  // Открыть модалку
  openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // чтобы ссылка не прыгала
    modal.style.display = 'flex';
  });

  // Закрыть модалку по кнопке "×"
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закрыть по клику на overlay (тёмный фон)
  overlay.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});



// === POST RENDER WITH DELETE BUTTON ===
function renderPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postsContainer = document.querySelector(".dynamic-posts");
  if (!postsContainer) return;

  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="post-card">
        ${post.image ? `<img src="\${post.image}" class="post-image">` : ""}
        <p class="post-text">\${post.text}</p>
        <p class="post-author">Автор: \${post.author}</p>
        <button class="delete-post-btn" data-index="\${index}">Удалить</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });

  document.querySelectorAll(".delete-post-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderPosts);
