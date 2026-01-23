// Небольшая логика: год в футере + добавление задач в мокап
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('btn-primary').addEventListener('click', function() {
    window.open('https://t.me/wishlyssupport', '_blank');
  });

const addBtn = document.getElementById('addTaskBtn');
const input = document.getElementById('newTaskInput');
const list = document.querySelector('.task-list');

function escapeHtml(str){
  return str.replace(/[&<>"'`=\/]/g, function(s) {
    return ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;'
    })[s];
  });
}

function createTask(title){
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
    <div class="left">
      <input type="checkbox" id="t-${Date.now()}">
      <label for="t-${Date.now()}">${escapeHtml(title)}</label>
    </div>
    <div class="right"><span class="badge">Новая</span></div>
  `;
  li.style.opacity = 0;
  li.style.transform = 'translateY(10px)';
  
  list.prepend(li);
  requestAnimationFrame(()=>{
    li.style.transition = 'all 260ms cubic-bezier(.2,.9,.3,1)';
    li.style.opacity = 1;
    li.style.transform = 'translateY(0)';
  });
}

if(addBtn && input){
  addBtn.addEventListener('click', ()=>{
    const v = input.value.trim();
    if(!v) return;
    createTask(v);
    input.value = '';
  });

  input.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') addBtn.click();
  });
}


 // --- Анимация отзывов (автоскролл бесконечный) ---
const slider = document.getElementById('reviewsSlider');
if(slider){
  // Клонируем контент, чтобы лента шла циклом
  slider.innerHTML += slider.innerHTML;
}
