const databaseURL = "https://landing-eaf66-default-rtdb.firebaseio.com/feedback.json"; // Cambié el nombre a feedback.json para más claridad

let currentRating = 0;

function rate(star) {
    // Establece la calificación
    currentRating = star;

    // Actualiza el input hidden con la calificación
    document.getElementById("rating").value = star;

    // Cambia el color de las estrellas (activas hasta la estrella seleccionada)
    const stars = document.querySelectorAll('.star');
    stars.forEach((el, index) => {
        if (index < star) {
            el.style.color = 'gold'; // Color dorado para las estrellas seleccionadas
        } else {
            el.style.color = 'gray'; // Color gris para las estrellas no seleccionadas
        }
    });
}

let sendData = () => {
    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

    // Agrega la calificación seleccionada
    const rating = document.querySelector('input[name="rating"]:checked');
    if (rating) {
        data['rating'] = rating.value;
    }

    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });

    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); 
        })
        .then(result => {
            alert('Gracias por tu comentario y calificación!'); // Mensaje de éxito
            form.reset();
            getData();
        })
        .catch(error => {
            alert('Error, por favor intenta nuevamente.'); // Manejo de errores
        });
};

let getData = async () => {
    try {
        // Realiza la petición fetch para obtener los datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!');
            return;
        }

        const data = await response.json();

        if (data != null) {
            // No se necesita manejo de suscriptores, así que omito esta parte
        }

    } catch (error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!');
    }
};

let ready = () => {
    console.log('DOM está listo');
    getData();
};

let loaded = () => {
    let myform = document.getElementById('form');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        const commentElement = document.querySelector('#input-form');
        const commentText = commentElement.value;

        if (commentText.length === 0) {
            commentElement.focus();
            commentElement.animate(
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
            );
            return;
        }

        sendData();
    });
};

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);
