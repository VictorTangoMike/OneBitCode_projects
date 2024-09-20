let transactions = [];

function createTransactionTitle(name) {
  const title = document.createElement("span");
  title.classList.add("transaction-title");
  title.textContent = name;
  return title;
}

function formaterValue(value) {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    compactDisplay: "short",
    style: "currency",
    currency: "BRL",
  }).format(value);
  return formattedValue;
}

function createTransactionValue(value) {
  const span = document.createElement("span");
  span.classList.add("transaction-value");
  const formatedValue = formaterValue(value);
  if (value > 0) {
    span.textContent = `${formatedValue} C`;
    span.classList.add("credit");
  } else {
    span.textContent = `${formatedValue} D`;
    span.classList.add("debit");
  }
  return span;
}

function createTransactionContainer(id) {
  const container = document.createElement("div");
  container.classList.add("transaction");
  container.id = `transaction-${id}`;

  return container;
}

function updateBalance() {
  const balanceElement = document.querySelector("#balance");
  const balance = formaterValue(
    transactions.reduce((sum, transaction) => sum + transaction.value, 0)
  );

  balanceElement.textContent = balance;
}

async function saveTransaction(ev) {
  ev.preventDefault();

  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const value = parseFloat(document.querySelector("#value").value);

  if (id) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const transaction = await response.json();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1, transaction);
    document.querySelector(`#transaction-${id}`).remove();
    renderTransaction(transaction);
  } else {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      body: JSON.stringify({ name, value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const transaction = await response.json();
    transactions.push(transaction);
    renderTransaction(transaction);
  }

  ev.target.reset();
  updateBalance();
}

function createEditTransactionBtn(transaction) {
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Editar";
  editBtn.addEventListener("click", () => {
    document.querySelector("#id").value = transaction.id;
    document.querySelector("#name").value = transaction.name;
    document.querySelector("#value").value = transaction.value;
  });
  return editBtn;
}

function createDeleteTransactionButton(id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Excluir";
  deleteBtn.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });
    deleteBtn.parentElement.remove();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1);
    updateBalance();
  });
  return deleteBtn;
}

async function fetchTransactions() {
  return await fetch("http://localhost:3000/transactions").then((res) =>
    res.json()
  );
}

function renderTransaction(transaction) {
  const container = createTransactionContainer(transaction.id);
  const title = createTransactionTitle(transaction.name);
  const value = createTransactionValue(transaction.value);
	const editBtn = createEditTransactionBtn(transaction);
	const deleteBtn = createDeleteTransactionButton(transaction.id);

  container.append(title, value, editBtn, deleteBtn);
  document.querySelector("#transactions").append(container);
}

async function setup() {
  const results = await fetchTransactions();
  transactions.push(...results);
  transactions.forEach(
    renderTransaction,
    createEditTransactionBtn,
    createDeleteTransactionButton
  );
  updateBalance();
}

document.addEventListener("DOMContentLoaded", setup);
document.querySelector("form").addEventListener("submit", saveTransaction);
