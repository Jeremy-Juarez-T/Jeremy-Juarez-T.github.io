// dashboard.js - Panel de Administración Completo
document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // VERIFICACIÓN DE ROLES
  // =====================
  const userData = sessionStorage.getItem("currentUser");

  // Redirigir si no hay sesión
  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userData);

  // Solo permitir acceso a administradores
  if (user.role !== "admin") {
    alert("Acceso restringido: Se requieren privilegios de administrador");
    window.location.href = "denuncia.html";
    return;
  }

  // =====================
  // ELEMENTOS DEL DOM
  // =====================
  const welcomeMessage = document.getElementById("welcomeMessage");
  const logoutBtn = document.getElementById("logoutBtn");
  const denunciasHoyElement = document.getElementById("denunciasHoy");
  const usuariosRegistradosElement = document.getElementById(
    "usuariosRegistrados"
  );
  const recentActivitiesList = document.getElementById("recentActivities");
  const userTableBody = document.getElementById("userTableBody");

  // =====================
  // DATOS INICIALES
  // =====================
  // Cargar datos existentes o inicializar
  let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
  let usuarios = JSON.parse(localStorage.getItem("users")) || [];

  // =====================
  // FUNCIONES PRINCIPALES
  // =====================
  function actualizarUI() {
    // Mensaje de bienvenida
    welcomeMessage.textContent = `Bienvenido, ${user.name}`;

    // Estadísticas
    const hoy = new Date().toLocaleDateString();
    const denunciasHoy = denuncias.filter(
      (d) => new Date(d.fechaRegistro).toLocaleDateString() === hoy
    ).length;

    denunciasHoyElement.textContent = denunciasHoy;
    usuariosRegistradosElement.textContent = usuarios.length;

    // Actividad reciente (últimas 5 denuncias)
    recentActivitiesList.innerHTML = denuncias
      .slice(-5)
      .reverse()
      .map(
        (d) => `
        <li>
          <strong>${d.folio}</strong>
          <span>${d.escuela} (${d.municipio})</span>
          <small>${new Date(d.fechaRegistro).toLocaleString()}</small>
        </li>
      `
      )
      .join("");

    // Tabla de usuarios
    userTableBody.innerHTML = usuarios
      .map(
        (u) => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          <button class="btn-edit" data-id="${u.id}">
            <i class="ri-edit-line"></i>
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  // =====================
  // EVENT LISTENERS
  // =====================
  // Cerrar sesión
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  // Editar usuario (delegación de eventos)
  document.addEventListener("click", function (e) {
    if (e.target.closest(".btn-edit")) {
      const userId = parseInt(e.target.closest(".btn-edit").dataset.id);
      const usuario = usuarios.find((u) => u.id === userId);
      editarUsuario(usuario);
    }
  });

  // =====================
  // FUNCIONES AUXILIARES
  // =====================
  function editarUsuario(usuario) {
    const nuevoRol = prompt(
      "Cambiar rol de usuario (admin/denuncias/user):",
      usuario.role
    );

    if (nuevoRol && ["admin", "denuncias", "user"].includes(nuevoRol)) {
      usuario.role = nuevoRol;
      localStorage.setItem("users", JSON.stringify(users));
      actualizarUI();
      alert("Rol actualizado correctamente");
    }
  }

  // =====================
  // INICIALIZACIÓN
  // =====================
  actualizarUI();

  // Cargar datos cada 30 segundos (simular actualización)
  setInterval(() => {
    denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    actualizarUI();
  }, 30000);

  // =====================
  // EXPORTAR DATOS (OPCIONAL)
  // =====================
  window.exportarDatos = function () {
    const dataStr = JSON.stringify(
      {
        denuncias,
        usuarios,
      },
      null,
      2
    );

    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-tlaxcala-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
});
