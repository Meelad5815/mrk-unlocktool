const views=[...document.querySelectorAll('.view')];const nav=[...document.querySelectorAll('.nav-item')];const title=document.getElementById('pageTitle');const logBox=document.getElementById('logBox');let operations=0;let detected=false;
function log(message){const t=new Date().toLocaleTimeString();logBox.textContent+=`[${t}] ${message}\n`;logBox.scrollTop=logBox.scrollHeight}
function showView(name){views.forEach(v=>v.classList.toggle('active-view',v.id===name));nav.forEach(n=>n.classList.toggle('active',n.dataset.view===name));title.textContent=name.charAt(0).toUpperCase()+name.slice(1).replace('-', ' ')}
nav.forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));
async function detect(){operations++;document.getElementById('opCount').textContent=operations;log('Starting device detection...');const connection=document.getElementById('connection');connection.textContent='Checking…';document.getElementById('connectionHint').textContent='Attempting local agent connection';await new Promise(r=>setTimeout(r,700));
  // Browser-safe placeholder: a real implementation should call a local companion agent/API.
  connection.textContent='Agent Required';document.getElementById('connectionHint').textContent='Connect the Windows service agent to enable USB detection';log('No local agent connected. Browser cannot directly access ADB/Fastboot or Windows drivers.');
  document.getElementById('adbCount').textContent='0';document.getElementById('fastbootCount').textContent='0';renderDeviceTable();
}
function renderDeviceTable(){document.getElementById('deviceTable').innerHTML='<div class="table-empty">No device available through the web interface. Connect the authorized local service agent.</div>'}
document.querySelectorAll('#detectBtn,#detectBtn2,#detectBtn3').forEach(b=>b.addEventListener('click',detect));
document.getElementById('clearLogs').addEventListener('click',()=>{logBox.textContent='[SYSTEM] Logs cleared.\n'});
document.getElementById('themeBtn').addEventListener('click',()=>document.body.classList.toggle('dark'));
document.getElementById('saveSettings').addEventListener('click',()=>{localStorage.setItem('mrkAgentUrl',document.getElementById('agentUrl').value.trim());document.getElementById('saveMsg').textContent='Settings saved locally.';log('Agent URL settings saved.');});
const saved=localStorage.getItem('mrkAgentUrl');if(saved)document.getElementById('agentUrl').value=saved;renderDeviceTable();
