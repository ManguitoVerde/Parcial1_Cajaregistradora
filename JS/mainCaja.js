const productSelect = document.getElementById('productSelect');
const priceInput = document.getElementById('priceInput');
const quantityInput = document.getElementById('quantityInput');
const totalInput = document.getElementById('totalInput');
const buyButton = document.getElementById('buyButton');
const clearButton = document.getElementById('clearButton');
const invoiceBody = document.getElementById('invoiceBody');
const totalToPay = document.getElementById('totalToPay');

// Cuando cambias el producto se actualiza el precio
productSelect.addEventListener('change', function() {
    const price = parseFloat(productSelect.value);
    priceInput.value = `$${price.toLocaleString('es-CO')}`;
    updateTotal();
});

// Actualiza el total cuando cambias la cantidad
quantityInput.addEventListener('input', updateTotal);

buyButton.addEventListener('click', function() {
    const productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
    const price = parseFloat(productSelect.value);
    const quantity = parseInt(quantityInput.value);
    const total = price * quantity;

    // Formato COP para el total del producto
    const formattedTotal = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });

    // Crear una nueva fila para la tabla
    const invoiceRow = document.createElement('tr');

    // Crear columnas para producto, cantidad y total
    const productCell = document.createElement('td');
    const quantityCell = document.createElement('td');
    const totalCell = document.createElement('td');

    // Asignar los valores a las columnas
    productCell.textContent = productName;
    quantityCell.textContent = quantity;
    totalCell.textContent = formattedTotal;

    // Agregar las celdas a la fila
    invoiceRow.appendChild(productCell);
    invoiceRow.appendChild(quantityCell);
    invoiceRow.appendChild(totalCell);

    // Agregar la fila al cuerpo de la tabla
    invoiceBody.appendChild(invoiceRow);

    // Actualizar el total a pagar
    const currentTotal = parseFloat(totalToPay.textContent.replace(/[^0-9]/g, '')) || 0;
    const newTotal = currentTotal + total;

    // Formatea el total a pagar con formato COP
    totalToPay.textContent = newTotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
});

clearButton.addEventListener('click', function() {
    priceInput.value = '';
    quantityInput.value = 1;
    totalInput.value = '';
    invoiceBody.innerHTML = ''; // Borrar todas las filas de la tabla
    totalToPay.textContent = '0'; // Reiniciar el total a pagar
});

// Función para actualizar el total del producto en tiempo real
function updateTotal() {
    const price = parseFloat(productSelect.value) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    const total = price * quantity;

    // Formatea el total del producto
    const formattedTotal = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
    totalInput.value = formattedTotal;
}

// Inicializar el precio y el total al cargar la página
productSelect.dispatchEvent(new Event('change'));
