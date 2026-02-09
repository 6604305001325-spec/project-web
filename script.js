/* =========================
   ตั้งค่าแอดมินเริ่มต้น
========================= */
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { username: "admin", password: "admin123", role: "admin" }
  ]));
}

/* =========================
   สมัครสมาชิก
========================= */
function register(event) {
  event.preventDefault();

  const username = regUsername();
  const password = regPassword();
  const confirm  = regConfirm();

  if (password !== confirm) {
    cuteError("รหัสผ่านไม่ตรงกัน");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));

  if (users.some(u => u.username === username)) {
    cuteError("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
    return;
  }

  users.push({ username, password, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));

  alert("🎉 สมัครสมาชิกสำเร็จ");
  window.location.href = "index.html";
}

/* =========================
   เข้าสู่ระบบ
========================= */
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users"));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    cuteError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "home.html";
  }
}

/* =========================
   ลูกเล่นน่ารัก
========================= */
const inputs = document.querySelectorAll("input");
const mood = document.getElementById("mood");
const card = document.getElementById("card");

inputs.forEach(i => {
  i.addEventListener("input", () => {
    if (mood) mood.textContent = "😊";
  });
});

function cuteError(msg) {
  alert("💔 " + msg);
  if (card) {
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 300);
  }
  if (mood) mood.textContent = "🥺";
}

/* helper */
function regUsername(){return document.getElementById("reg-username").value;}
function regPassword(){return document.getElementById("reg-password").value;}
function regConfirm(){return document.getElementById("reg-confirm").value;}