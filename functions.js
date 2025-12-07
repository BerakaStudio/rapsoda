
// Base de datos de canciones
const trackData = {
    1: {
        title: "Nuevo Nativo",
        lyricsFile: "letras/1.txt",
        creditsFile: "creditos/1.txt"
    },
    2: {
        title: "La Vida en Rimas",
        lyricsFile: "letras/2.txt",
        creditsFile: "creditos/2.txt"
    },
    3: {
        title: "Ritmo y Libertad ft. MC Guerrero",
        lyricsFile: "letras/3.txt",
        creditsFile: "creditos/3.txt"
    },
    4: {
        title: "Cremita Neoyorquina",
        lyricsFile: "letras/4.txt",
        creditsFile: "creditos/4.txt"
    },
    5: {
        title: "Gracia Natural ft. DJ SDC",
        lyricsFile: "letras/5.txt",
        creditsFile: "creditos/5.txt"
    },
    6: {
        title: "Canutitos",
        lyricsFile: "letras/6.txt",
        creditsFile: "creditos/6.txt"
    },
    7: {
        title: "Bestial",
        lyricsFile: "letras/7.txt",
        creditsFile: "creditos/7.txt"
    },
    8: {
        title: "Reacción, Arte y Protesta ft. Dyestroh",
        lyricsFile: "letras/8.txt",
        creditsFile: "creditos/8.txt"
    },
    9: {
        title: "Oye, Come Back",
        lyricsFile: "letras/9.txt",
        creditsFile: "creditos/9.txt"
    },
    10: {
        title: "¡Tres, Dos, Uno! ft. Pastor MC",
        lyricsFile: "letras/11.txt",
        creditsFile: "creditos/11.txt"
    },
    11: {
        title: "Girasoles ft. Sofía Brand",
        lyricsFile: "letras/10.txt",
        creditsFile: "creditos/10.txt"
    },
    12: {
        title: "Caminata",
        lyricsFile: "letras/12.txt",
        creditsFile: "creditos/12.txt"
    },
    13: {
        title: "Soliloquio",
        lyricsFile: "letras/13.txt",
        creditsFile: "creditos/13.txt"
    },
    14: {
        title: "María Elena ft. Jetzabel Rodríguez y Bryan Mella",
        lyricsFile: "letras/14.txt",
        creditsFile: "creditos/14.txt"
    },
    15: {
        title: "Convicciones ft. Tony Capredi",
        lyricsFile: "letras/15.txt",
        creditsFile: "creditos/15.txt"
    },
    16: {
        title: "Último Llamado",
        lyricsFile: "letras/16.txt",
        creditsFile: "creditos/16.txt"
    }
};

// Inicialización del modal (solo si existe en la página)
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('trackModal');
    
    if (modal) {
        const closeBtn = document.getElementById('closeModal');
        const trackItems = document.querySelectorAll('.track-item[data-track]');

        // Abrir modal al hacer clic en una canción
        trackItems.forEach(item => {
            item.addEventListener('click', async function() { 
                const trackNum = this.getAttribute('data-track');
                const track = trackData[trackNum];
                if (track) {
                    // Carga ASÍNCRONA 1: Letra
                    const lyricsResponse = await fetch(track.lyricsFile); 
                    const lyricText = await lyricsResponse.text();
                    // Carga ASÍNCRONA 2: Créditos
                    const creditsResponse = await fetch(track.creditsFile); 
                    const creditText = await creditsResponse.text(); 
                    // 1. Dividir el texto en un array de líneas usando el salto de línea ('\n')
                    const creditLines = creditText.split('\n');
                    // 2. Procesar las líneas: limpiar y convertir en <li>
                    const listItems = creditLines
                        .map(line => line.trim())         // 2a. Quitar espacios innecesarios al inicio/fin
                        .filter(line => line.length > 0)  // 2b. Filtrar y eliminar cualquier línea que quede vacía
                        .map(line => `<li>${line}</li>`)  // 2c. Convertir cada línea restante en un elemento <li>
                        .join('');                        // 2d. Unir todos los <li> en una sola cadena

                    // 3. Envolver los <li> en la etiqueta <ul>
                    const creditListHtml = `<ul>${listItems}</ul>`;                    
                    // Actualizar el DOM
                    document.getElementById('modalTrackNumber').textContent = `Track ${trackNum.padStart(2, '0')}`;
                    document.getElementById('modalTitle').textContent = track.title;
                    
                    // Insertar la letra como texto (sigue usando textContent para preservar los saltos de línea)
                    document.getElementById('modalLyrics').textContent = lyricText;
                    
                    // Insertar los créditos como HTML (innerHTML para renderizar la lista)
                    document.getElementById('modalCredits').innerHTML = creditListHtml; 
                    
                    modal.classList.add('active');
                }
            });
        });

        // Cerrar modal con el botón X, clic fuera y tecla ESC
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
});

// Función para smooth scroll (opcional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});