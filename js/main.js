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
      <div class="card card_space" data-id="${post.id}">
        <div class="user-info">
          <div class="profile">
            <div class="profile-img">
              <img src="./img/1.jpg" alt="" class="cover">
            </div>
            <h3>${fullName}<br><span>Контент</span></h3>
          </div>
        </div>
        <div class="img">
          <img src="${post.image}" alt="">
        </div>
        <div class="buttons">
          <div class="like-button ${likedPosts[post.id] ? 'liked' : ''}">
            <img src="https://img.icons8.com/ios-glyphs/30/like--v1.png"/>
            <span class="like-count">${likedPosts[post.id] ? 1 : 0}</span>
          </div>
          <img src="./img/comment_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="">
        </div>
        <h4 class="message"><b>${post.text}</b><br><span class="post-id">ID: ${post.id}</span></h4>
        <button class="delete-btn"><b>удалить</b></button>
      </div>
    `;

    const deleteBtn = postElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts = posts.filter(p => p.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(posts));
      postElement.remove();
    });

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
