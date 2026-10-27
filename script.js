let transactions = [
    {
        id: 1,
        date: "2026-10-20",
        amount: -440,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "2026-10-18",
        amount: -440,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "2026-10-16",
        amount: -440,
        status: "Success",
        type: "expense",
    },
];

let monthlyIncome = 2645;
let monthlyExpenses = 1895;

const today = new Date().toISOString().split('T')[0]
document.getElementById('incomeDate').value = today
document.getElementById('expenseDate').value = today

function openIncomeModal() {
    document.getElementById('incomeModal').style.display = 'block';
    document.body.style.overflow = 'hidden'
}

function openExpenseModal() {
    document.getElementById('expenseModal').style.display = 'block'
    document.body.style.overflow = 'hidden'
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'
    document.body.style.overflow = 'auto'

    if (modalId === 'incomeModal') {
        document.getElementById('incomeForm').reset()
        document.getElementById('incomeDate').value = today
    } else {
        document.getElementById('expenseForm').reset()
        document.getElementById('expenseDate').value = today
    }
}

window.onclick = function (event) {
    const incomeModal = document.getElementById('incomeModal')
    const expenseModal = document.getElementById('expenseModal')

    if (event.target === incomeModal) {
        closeModal('incomeModal')
    }

    if (event.target === expenseModal) {
        closeModal('expenseModal')
    }
}

function addIncome() {
    const amount = parseFloat(document.getElementById('incomeAmount').value)
    const category = document.getElementById('incomeCategory').value
    const description = document.getElementById('incomeDescription').value
    const date = document.getElementById('incomeDate').value

    if (!amount || !category || !date) {
        alert('Please fill in all required fields')
        return
    }

    const newTransaction = {
        id: transactions.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: amount,
        status: 'Success',
        type: 'income',
        description: description,
    }

    transactions.unshift(newTransaction);

    updateDashboard();
    updateTransactionsTable();

    closeModal('incomeModal');
    showNotification('Income added successfully', 'success')
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value)
    const category = document.getElementById('expenseCategory').value
    const description = document.getElementById('expenseDescription').value
    const date = document.getElementById('expenseDate').value

    if (!amount || !category || !date) {
        alert('Please fill in all required fields')
        return
    }

    const newTransaction = {
        id: transactions.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: -amount,
        status: 'Success',
        type: 'expense',
        description: description,
    }

    transactions.unshift(newTransaction)

    monthlyIncome += amount
    updateDashboard()
    updateTransactionsTable()

    closeModal('expenseModal');
    showNotification('Expense added successfully', 'success')
}

function updateDashboard() {
    document.querySelector('.income-amount').textContent = `${monthlyIncome.toLocaleString()}.00`
    document.querySelector('.expense-amount').textContent = `${monthlyExpenses.toLocaleString()}.00`

    let spendingLimit = 12645
    const usedAmount = monthlyExpenses
    const precentage = (usedAmount / spendingLimit) * 100
    document.querySelector('.spending-limit').textContent = `${(spendingLimit - usedAmount).toLocaleString()}.00`
    document.querySelector('.progress-fill').style.width = `${Math.min(precentage, 100)}%`
}
