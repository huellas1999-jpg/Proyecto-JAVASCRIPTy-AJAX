// ---------------------- JS Funciones ----------------------

// Función para verificar si la cadena ingresada es un palíndromo
function ej1_palindromo() {
  // Obtener el valor que el usuario ingresó en el campo de texto
  let str = document.getElementById('palindromoStr').value;
    // Normalizar la cadena: eliminar espacios y convertir todo a minúsculas para comparar correctamente
  let norm = str.replace(/\s/g,'').toLowerCase();
    // Invertir la cadena normalizada y comparar con la original
  let esPalindromo = norm === norm.split('').reverse().join('');
    // Si el usuario escribió algo, mostrar el resultado:
  // "¡Es un palíndromo!" si coincide, o "No es un palíndromo." en caso contrario.
  document.getElementById('palindromoRes').textContent =
    str ? (esPalindromo ? "¡Es un palíndromo!" : "No es un palíndromo.") : "";
}

// Función para comparar dos números e indicar cuál es mayor
function ej2_mayor() {
  // Obtener el valor del primer número del campo de entrada y convertirlo a decimal
  let n1 = parseFloat(document.getElementById('num1').value);
  // Obtener el valor del segundo número y convertirlo a decimal
  let n2 = parseFloat(document.getElementById('num2').value);
    // Variable para almacenar el resultado que se mostrará al usuario
  let res = '';
    // Validación: Si algún valor no es un número, pedir al usuario que ingrese ambos números
  if (isNaN(n1) || isNaN(n2)) res = "Introduce ambos números.";
  // Si el primer número es mayor
  else if (n1 > n2) res = `${n1} es mayor que ${n2}`;
  // Si el segundo número es mayor
  else if (n1 < n2) res = `${n2} es mayor que ${n1}`;
  // Si ambos números son iguales
  else res = "Ambos números son iguales.";
    // Mostrar el resultado en el elemento de la página correspondiente
  document.getElementById('mayorRes').textContent = res;
}


// Función para detectar las vocales presentes en una frase ingresada por el usuario
function ej3_vocales() {
  // Captura el valor ingresado en el campo y lo convierte a minúsculas para evitar duplicados por mayúsculas/minúsculas
  let frase = document.getElementById('fraseVocales').value.toLowerCase();
    // Variable para ir acumulando las vocales detectadas
  let vocales = "";
  // Recorre cada letra en la frase
  for (let letra of frase) {
    // Si la letra es una vocal ('a', 'e', 'i', 'o', 'u') y no se ha registrado antes, la agrega
    if ("aeiou".includes(letra) && !vocales.includes(letra)) {
      vocales += letra + " ";
    }
  }
   // Muestra las vocales encontradas en el área de resultado,
  // solo si el usuario ingresó algún texto. El método trim() elimina espacios extra.
  document.getElementById('vocalesRes').textContent =
    frase ? "Vocales presentes: " + vocales.trim() : "";
}


// Función para contar la cantidad de veces que aparece cada vocal en la frase ingresada
function ej4_conteo() {
  // Captura la frase o texto ingresado, convirtiéndolo a minúsculas para evitar contar vocales duplicadas por mayúsculas
  let frase = document.getElementById('fraseConteo').value.toLowerCase();
    // Inicializa un objeto con las vocales, cada una comenzando en 0
  let conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    // Recorre cada letra de la frase
  for (let l of frase)
    // Si la letra es una vocal, suma uno al contador correspondiente
    if (conteo.hasOwnProperty(l)) conteo[l]++;
    // Construye el resultado final formando un arreglo de textos del tipo "vocal: cantidad"
  let resultados = [];
  for (let v in conteo) resultados.push(`${v}: ${conteo[v]}`);
    // Muestra el resultado, separando cada vocal y su número con '|' y solo si se introdujo texto
  document.getElementById('conteoRes').textContent =
    frase ? resultados.join(' | ') : "";
}


// ---------------------- AJAX Section ----------------------

// Se ejecuta al cargar la página: carga automáticamente la URL actual en el campo de entrada
window.onload = function() {
  // Inserta la URL de la página actual en el campo 'urlInput' como valor predeterminado
  document.getElementById('urlInput').value = window.location.href;
};
// Función para realizar una petición AJAX y mostrar el contenido de una URL
function mostrarContenidos() {
  // Captura la URL introducida por el usuario
  const url = document.getElementById('urlInput').value;
   // Obtiene referencias a los elementos donde se mostrarán los resultados
  const estadoPeticion = document.getElementById('estadoPeticion');
  const codigoEstado = document.getElementById('codigoEstado');
  const cabecerasHTTP = document.getElementById('cabecerasHTTP');
  const contenidos = document.getElementById('contenidos');
   // Reinicia todos los campos limpiando contenido anterior
  estadoPeticion.textContent = 'Cargando...';
  codigoEstado.textContent = '';
  cabecerasHTTP.textContent = '';
  contenidos.textContent = '';
   // Realiza la petición AJAX usando fetch() con la URL proporcionada
  fetch(url).then(response => {
    // Una vez recibida la respuesta, actualiza el estado a "Completada"
    estadoPeticion.textContent = 'Completada';
    // Muestra el código HTTP y su descripción (ej: 200 OK, 404 Not Found)
    codigoEstado.textContent = `${response.status} ${response.statusText}`;
     // Recorre todas las cabeceras HTTP de la respuesta
    let headersText = '';
    response.headers.forEach((value, key) => {
      // Formatea cada cabecera con el formato: "nombre: valor"
      headersText += key + ': ' + value + '\n';
    });
    // Muestra todas las cabeceras en la sección correspondiente
    cabecerasHTTP.textContent = headersText;
    // Convierte la respuesta a texto para poder mostrarla
    return response.text();
  }).then(texto => {
    // Muestra el contenido de la respuesta (HTML, JSON, etc.) en la página
    contenidos.textContent = texto;
  }).catch(error => {
    // Si algo falla (ej: error de CORS, URL no accesible), muestra el error
    estadoPeticion.textContent = 'Error';
    contenidos.textContent = error.toString();
  });
}

