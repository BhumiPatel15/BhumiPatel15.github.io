async function loadData(){
  // fetch YAML
  const res = await fetch('data.yml?_=' + Date.now());
  const text = await res.text();
  const data = jsyaml.load(text);

  // header
  document.getElementById('name').textContent = data.name || '';
  document.getElementById('summary').textContent = data.summary || '';

  // contact line centered: LinkedIn | Email | Phone
  const c = data.contact || {};
  const links = [];
  if (c.linkedin) links.push(`<a href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (c.email) links.push(`<a href="mailto:${c.email}">Email</a>`);
  if (c.phone) links.push(`<a href="tel:${c.phone.replace(/[^+\d]/g,'')}">${c.phone}</a>`);
  document.getElementById('contactLine').innerHTML = links.join('<span class="sep">|</span>');

  const renderList = (arr)=> (arr||[]).map(e=>`
    <div class="item">
      <h3>${e.role || e.degree || e.name} ${e.company ? '— ' + e.company : (e.school ? '— ' + e.school : '')}</h3>
      <div class="meta">${[e.location, e.year, e.start, e.end].filter(Boolean).join(' • ')}</div>
      ${e.details ? `<div class="meta">${e.details}</div>` : ''}
      ${e.highlights ? `<ul class="compact">${e.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  // sections in requested order
  document.getElementById('experience').innerHTML = '<h2>Experience</h2>' + renderList(data.experience);
  document.getElementById('certs').innerHTML = '<h2>Certifications</h2>' + renderList(data.certifications);
  document.getElementById('skills').innerHTML = '<h2>Skills</h2><div class="item"><div class="meta">' + (data.skills||[]).join(' • ') + '</div></div>';
  document.getElementById('organizations').innerHTML = '<h2>Organizations</h2>' + renderList(data.organizations);
  document.getElementById('volunteering').innerHTML = '<h2>Volunteering</h2>' + renderList(data.volunteering);
  document.getElementById('education').innerHTML = '<h2>Education</h2>' + renderList(data.education);
  document.getElementById('projects').innerHTML = '<h2>Projects</h2>' + renderList(data.projects);

  // footer time
  document.getElementById('lastUpdated').textContent = data.lastUpdated || new Date().toISOString().slice(0,10);

  // theme toggle
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  if(saved === 'light') root.classList.add('light');
  document.getElementById('themeToggle').addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}
loadData();
