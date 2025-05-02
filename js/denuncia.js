document.addEventListener("DOMContentLoaded", function () {
  // Variables globales
  const form = document.getElementById("denunciaForm");
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const confirmation = document.getElementById("confirmation");
  const newDenunciaBtn = document.getElementById("newDenunciaBtn");

  // Navegación entre pasos
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentStep = this.closest(".form-step");
      const nextStep = currentStep.nextElementSibling;

      // Validar campos antes de avanzar
      const inputs = currentStep.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value) {
          input.style.borderColor = "red";
          isValid = false;
        } else {
          input.style.borderColor = "";
        }
      });

      if (isValid) {
        currentStep.style.display = "none";
        nextStep.style.display = "block";
      } else {
        alert("Por favor complete todos los campos requeridos");
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentStep = this.closest(".form-step");
      const prevStep = currentStep.previousElementSibling;

      currentStep.style.display = "none";
      prevStep.style.display = "block";
    });
  });

  // Envío del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envío a "base de datos"
    const denunciaData = {
      nivel: document.getElementById("nivel").value,
      municipio: document.getElementById("municipio").value,
      escuela: document.getElementById("escuela").value,
      tipo: document.getElementById("tipo").value,
      fecha: document.getElementById("fecha").value,
      descripcion: document.getElementById("descripcion").value,
      fechaRegistro: new Date().toISOString(),
      folio: generarFolio(),
    };

    // Guardar en localStorage (simulación)
    const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    denuncias.push(denunciaData);
    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    // Mostrar confirmación
    form.style.display = "none";
    confirmation.style.display = "block";
    document.getElementById("folioNumber").textContent = denunciaData.folio;
  });

  // Nueva denuncia
  newDenunciaBtn.addEventListener("click", function () {
    form.reset();
    confirmation.style.display = "none";
    form.style.display = "block";
    steps[0].style.display = "block";
    steps[1].style.display = "none";
  });

  // Generar folio aleatorio
  function generarFolio() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `TLX-${new Date().getFullYear()}-${randomLetter}${randomNumbers}`;
  }

  // Cargar municipios dinámicamente (simulación)
  document.addEventListener("DOMContentLoaded", function () {
    // Listado completo de municipios de Tlaxcala
    const municipiosTlaxcala = [
      "Amaxac de Guerrero",
      "Apetatitlán de Antonio Carvajal",
      "Atlangatepec",
      "Altzayanca",
      "Apizaco",
      "Calpulalpan",
      "Chiautempan",
      "Contla de Juan Cuamatzi",
      "Cuapiaxtla",
      "Cuaxomulco",
      "El Carmen Tequexquitla",
      "Emiliano Zapata",
      "Españita",
      "Huamantla",
      "Hueyotlipan",
      "Ixtacuixtla de Mariano Matamoros",
      "Ixtenco",
      "Mazatecochco de José María Morelos",
      "Muñoz de Domingo Arenas",
      "Nanacamilpa de Mariano Arista",
      "Nativitas",
      "Panotla",
      "Papalotla de Xicohténcatl",
      "San Damián Texóloc",
      "San Francisco Tetlanohcan",
      "San Jerónimo Zacualpan",
      "San José Teacalco",
      "San Juan Huactzinco",
      "San Lorenzo Axocomanitla",
      "San Lucas Tecopilco",
      "San Pablo del Monte",
      "Sanctórum",
      "Santa Ana Nopalucan",
      "Santa Apolonia Teacalco",
      "Santa Catarina Ayometla",
      "Santa Cruz Quilehtla",
      "Santa Cruz Tlaxcala",
      "Santa Isabel Xiloxoxtla",
      "Tenancingo",
      "Teolocholco",
      "Tepetitla de Lardizábal",
      "Tepeyanco",
      "Terrenate",
      "Tetla de la Solidaridad",
      "Tetlatlahuca",
      "Tlaxcala",
      "Tlaxco",
      "Tocatlán",
      "Totolac",
      "Tzompantepec",
      "Xaloztoc",
      "Xaltocan",
      "Xicohtzinco",
      "Yauhquemehcan",
      "Zacatelco",
      "Ziltlaltépec de Trinidad Sánchez Santos",
    ];

    // Obtener el select del DOM
    const selectMunicipio = document.getElementById("municipio");

    // Llenar el select con los municipios
    if (selectMunicipio) {
      municipiosTlaxcala.forEach((municipio) => {
        const option = document.createElement("option");
        option.value = municipio.toLowerCase().replace(/ /g, "-");
        option.textContent = municipio;
        selectMunicipio.appendChild(option);
      });
    }

    // Resto de tu lógica para el formulario...
    // (validación, envío, etc.)
  });

  const municipioSelect = document.getElementById("municipio");
  municipios.forEach((mun) => {
    const option = document.createElement("option");
    option.value = mun.toLowerCase().replace(/\s+/g, "-");
    option.textContent = mun;
    municipioSelect.appendChild(option);
  });
});
