document.addEventListener("DOMContentLoaded", function () {
  // ======================
  // 1. USUARIOS DEMO (SIMULACIÓN)
  // ======================
  const demoUsers = [
    {
      id: 1,
      email: "admin@tlax.com",
      password: "admin123", // Case-sensitive
      name: "Administrador Principal",
      role: "admin",
      lastLogin: null,
    },
    {
      id: 2,
      email: "denuncias@tlax.com",
      password: "admin123",
      name: "Coordinador de Denuncias",
      role: "denuncias",
      lastLogin: null,
    },
  ];

  // ======================
  // 2. EFECTO VISUAL (PARTÍCULAS)
  // ======================
  const formContainer = document.querySelector(".form-section");
  if (formContainer) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.setProperty("--x", Math.random());
      particle.style.setProperty("--y", Math.random());
      particle.style.setProperty("--delay", Math.random() * 5 + "s");
      formContainer.appendChild(particle);
    }
  }

  // ======================
  // 3. VALIDACIONES
  // ======================
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass) => pass.length >= 6;

  document.querySelectorAll(".input-group input").forEach((input) => {
    input.addEventListener("input", () => {
      const isValid =
        input.type === "email"
          ? validateEmail(input.value)
          : validatePassword(input.value);
      input.classList.toggle("invalid", !isValid);
      input.classList.toggle("valid", isValid);
    });
  });

  // ======================
  // 4. LOGIN PRINCIPAL
  // ======================
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Buscar usuario
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Actualizar último acceso
      user.lastLogin = new Date().toISOString();

      // Guardar sesión (simulación)
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          id: user.id,
          name: user.name,
          role: user.role,
          token: btoa(`${email}:${Date.now()}`), // Token básico
        })
      );

      // Redirección segura
      const targetPage =
        user.role === "admin" ? "dashboard.html" : "denuncia.html";
      window.location.href = targetPage;
    } else {
      alert(
        "Credenciales incorrectas. Prueba con:\n\nADMIN: admin@tlaxcala.gob.mx / Admin123\nDENUNCIAS: reportes@tlaxcala.gob.mx / Denuncias2023"
      );
    }
  });
});
