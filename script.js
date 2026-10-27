let transaction = [
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