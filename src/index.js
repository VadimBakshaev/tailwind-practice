import "./styles.css";

const aside = document.getElementById('aside');

document.getElementById('write-to-chat').addEventListener('input', (e) => {
  if (e.target.innerText.trim() === "") e.target.innerHTML = "";
});

document.getElementById('aside-toggle').addEventListener('click',()=>{
    aside.classList.toggle('hidden');
});
