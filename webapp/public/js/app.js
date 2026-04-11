import { getProducts, addProduct } from './api.js';

const productForm = document.getElementById('product-form');
const notificationContainer = document.getElementById('notification-container');
const loadingMessage = document.getElementById('loading-message');
const tableBody = document.getElementById('product-table-body');
const refreshButton = document.getElementById('refresh-button');

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderEmpty(message) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="5" class="has-text-centered has-text-grey">${message}</td>
    </tr>
  `;
}

function renderProducts(products) {
  if (!products || !products.length) {
    renderEmpty('Nenhum produto cadastrado.');
    return;
  }

  const rows = products
    .map(product => {
      const needsRestock = product.quantity <= product.minQuantity;
      const statusClass = needsRestock ? 'tag-alert' : 'tag-ok';
      const statusText = needsRestock ? 'Repor' : 'Estável';

      return `
        <tr>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${product.minQuantity}</td>
          <td><span class="status-chip ${statusClass}">${statusText}</span></td>
          <td>${formatDate(product.createdAt)}</td>
        </tr>
      `;
    })
    .join('');

  tableBody.innerHTML = rows;
}

function showNotification(message, type = 'is-info') {
  if (!message) {
    notificationContainer.className = 'notification is-hidden';
    notificationContainer.textContent = '';
    return;
  }

  notificationContainer.textContent = message;
  notificationContainer.className = `notification ${type}`;
}

async function loadProducts() {
  loadingMessage.classList.remove('is-hidden');
  showNotification('Carregando produtos...');
  try {
    const products = await getProducts();
    renderProducts(products);
    showNotification('Lista atualizada com sucesso.', 'is-success');
  } catch (error) {
    renderEmpty('Não foi possível carregar a lista de produtos.');
    showNotification(error.message || 'Erro ao carregar produtos.', 'is-danger');
  } finally {
    loadingMessage.classList.add('is-hidden');
  }
}

productForm.addEventListener('submit', async event => {
  event.preventDefault();
  showNotification('Enviando produto...', 'is-info');

  const name = document.getElementById('name').value.trim();
  const quantity = Number(document.getElementById('quantity').value);
  const minQuantity = Number(document.getElementById('minQuantity').value);

  if (!name) {
    showNotification('Por favor, informe o nome do produto.', 'is-warning');
    return;
  }

  try {
    await addProduct({ name, quantity, minQuantity });
    productForm.reset();
    await loadProducts();
    showNotification(`Produto "${name}" cadastrado com sucesso.`, 'is-success');
  } catch (error) {
    showNotification(error.message || 'Não foi possível cadastrar o produto.', 'is-danger');
  }
});

refreshButton.addEventListener('click', loadProducts);
window.addEventListener('DOMContentLoaded', loadProducts);
