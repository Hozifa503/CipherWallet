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
let currentFilter = 'all';
let currentSort = 'date-desc'

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
    monthlyIncome += amount

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

    monthlyExpenses += amount
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

function updateTransactionsTable() {
    const tbody = document.querySelector('.transactions-table tbody')
    tbody.innerHTML = ''

    let filteredTransactions = transactions.filter(transaction => {
        if (currentFilter === 'income') return transaction.amount > 0;
        if (currentFilter === 'expense') return transaction.amount < 0;
        return true;
    });

    filteredTransactions.sort((a, b) => {
        if (currentSort === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (currentSort === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (currentSort === 'amount-desc') return Math.abs(b.amount) - Math.abs(a.amount);
        if (currentSort === 'amount-asc') return Math.abs(a.amount) - Math.abs(b.amount);
    })

    const recentTransactions = filteredTransactions.slice(0, 10)

    recentTransactions.forEach((transaction) => {
        const row = document.createElement('tr');
        const formattedDate = new Date(transaction.date).toLocaleDateString(
            'en-Us',
            {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }
        )

        const amountDisplay = transaction.amount > 0 ? `+${transaction.amount.toLocaleString()}.00` : `-${Math.abs(transaction.amount).toLocaleString()}.00`

        row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${transaction.category}</td>
                <td style="color: ${transaction.amount > 0 ? '#10b981' : '#ef4444'}">${amountDisplay}</td>
                <td><span class="status-success">${transaction.status}</span></td>
                <td><button class="action-btn"><i class="fa-solid fa-ellipsis-h"></i></td>
        `;
        tbody.appendChild(row)
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div')
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease'
        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300);
    }, 3000);
}

function setFilter(filterType) {
    currentFilter = filterType;
    updateTransactionsTable();
}

function setSort(sortType) {
    currentSort = sortType;
    updateTransactionsTable();
}

function toggleFilter() {
    if (currentFilter === 'all') {
        currentFilter = 'income';
        showNotification('Filtered by: Income', 'success');
    } else if (currentFilter === 'income') {
        currentFilter = 'expense';
        showNotification('Filterd by: Expenses', 'success');
    } else {
        currentFilter = 'all';
        showNotification('Showing: All Transactions', 'success');
    }
    updateTransactionsTable();
}

function toggleSort() {
    if (currentSort === 'date-desc') {
        currentSort = 'amount-desc';
        showNotification('Sorted by: Highest Amount', 'success');
    } else {
        currentSort = 'date-desc';
        showNotification('Sorted by: Newest Date', 'success');
    }
    updateTransactionsTable();
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {transform: translateX(100%); opacity: 0;}
        to {transform: translateX(0); opacity: 1;}
    }

    @keyframes slideOutRight {
        from {transform: translateX(0); opacity: 1;}
        to {transform: translateX(100%); opacity: 1;}
    }

`

document.head.appendChild(style)


document.addEventListener('DOMContentLoaded', function() {
    updateTransactionsTable()
})