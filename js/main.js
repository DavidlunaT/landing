const databaseURL = "https://landing-eaf66-default-rtdb.firebaseio.com/nombresito2.json";

let sendData = ( ) => {  
    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })
 // Realiza la petición POST con fetch

 fetch(databaseURL, {
    method: 'POST', // Método de la solicitud
    headers: {
        'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
    },
    body: JSON.stringify(data) // Convierte los datos a JSON
})

.then(response => {
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    console.log(JSON.stringify(data));
    return response.json(); // Procesa la respuesta como JSON
})
.then(result => {
    alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
    form.reset()

    // Recuperación de datos
    getData()
})
.catch(error => {
    alert(error); // Maneja el error con un mensaje
});


}   
let getData = async () => {  

    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map()

     if (Object.keys(data).length > 0) {
         for (let key in data) {

             let { email, saved } = data[key]
                
             let date = saved.split(",")[0]
                
             let count = countSuscribers.get(date) || 0;
             countSuscribers.set(date, count + 1)
         }
     }
   
            // END

            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countSuscribers.size > 0) {

                subscribers.innerHTML = ''
       
                let index = 1;
                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                        <tr>
                            <th>${index}</th>
                            <td>${date}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                    index++;
                }
            }
            // END

        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}
let ready = () => {
    console.log('DOM está listo')
    getData();
}

let loaded = ( eventLoaded ) => {

    let myform = document.getElementById('form');
       
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
           
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;
        if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
          emailElement.focus()

          return;

        }
        sendData();
    })

  }

// Inicializa el contador
let cartCount = 0;

// Selecciona todos los elementos con la clase 'clickable'
const clickableElements = document.querySelectorAll('.clickacle');

// Función para manejar el clic
clickableElements.forEach(element => {
    element.addEventListener('click', () => {
        // Verifica si el elemento ya tiene la clase 'active' (si fue clickeado previamente)
        if (element.classList.contains('active')) {
            // Si tiene la clase, disminuye el contador
            cartCount--;
            element.classList.remove('active'); // Elimina la clase 'active'
        } else {
            // Si no tiene la clase, aumenta el contador
            cartCount++;
            element.classList.add('active'); // Añade la clase 'active'
        }

        // Actualiza el valor del contador en el elemento con id 'cartC'
        document.getElementById('cartC').textContent = `Cart: (${cartCount})`;
        document.getElementById('cartC2').textContent = `Cart: (${cartCount})`;
    });
});
// Seleccionamos todos los elementos con la clase 'product-item'
const productItems = document.querySelectorAll('.product-item');

// Añadimos el evento de click a cada uno de ellos
productItems.forEach(item => {
  item.addEventListener('click', () => {
    // Alternamos la clase 'clicked' al hacer clic
    item.classList.toggle('clicked');
  });
});

  window.addEventListener("DOMContentLoaded", ready);
  window.addEventListener("load", loaded)