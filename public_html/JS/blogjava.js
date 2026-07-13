(function(){
  const KEY = 'tb_user_posts_v1';
  const postsEl = document.getElementById('userPosts');
  const author = document.getElementById('author');
  const content = document.getElementById('content');
  const publishBtn = document.getElementById('publish');
  const resetBtn = document.getElementById('reset');
  if (!postsEl || !author || !content || !publishBtn) return;

  let posts = JSON.parse(localStorage.getItem(KEY) || '[]');
  const save = () => localStorage.setItem(KEY, JSON.stringify(posts));
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  function render(){
    postsEl.innerHTML = '';
    posts.forEach((p,i) => {
      const d = document.createElement('div');
      d.className = 'post user-post';
      d.innerHTML = `
        <div class="post-date">${esc(p.author||'Anónimo')} · ${new Date(p.date).toLocaleString()}</div>
        <div class="post-content"><div class="section"><p class="user-text">${esc(p.content)}</p></div></div>
        <div class="post-controls">
          <button class="btn small edit" data-i="${i}">Editar</button>
          <button class="btn small danger" data-i="${i}">Eliminar</button>
        </div>`;
      postsEl.appendChild(d);
    });
    document.querySelectorAll('.edit').forEach(b => b.onclick = e => {
      const i = +e.currentTarget.dataset.i;
      const t = prompt('Editar comentario:', posts[i].content);
      if (t === null) return;
      posts[i].content = t.trim() || posts[i].content;
      save(); render();
    });
    document.querySelectorAll('.danger').forEach(b => b.onclick = e => {
      const i = +e.currentTarget.dataset.i;
      if (!confirm('Eliminar este comentario?')) return;
      posts.splice(i,1); save(); render();
    });
  }

  publishBtn.onclick = () => {
    const txt = content.value.trim();
    if (!txt) return alert('Escribe algo antes de publicar.');
    posts.push({ author: author.value.trim() || 'Anónimo', content: txt, date: new Date().toISOString() });
    save(); render();
    author.value = ''; content.value = ''; content.focus();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  resetBtn && (resetBtn.onclick = () => { author.value=''; content.value=''; content.focus(); });

  render();
})();