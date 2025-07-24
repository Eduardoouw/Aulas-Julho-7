const texto = document.getElementById('texto');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontWeight = document.getElementById('fontWeight');
const fontStyle = document.getElementById('fontStyle');
function upadateFont() {
    texto.style.fontFamily = fontFamily.value;
    texto.style.fontSize = fontSize.value + 'px';
    texto.style.fontWeight = fontWeight.checked ? 'bold' : 'normal';
    texto.style.fontStyle = fontStyle.checked ? 'italic' : 'normal';
}
fontFamily.addEventListener('change', upadateFont);
fontSize.addEventListener('input', upadateFont);
fontWeight.addEventListener('change', upadateFont);
fontStyle.addEventListener('change', upadateFont);

upadateFont();