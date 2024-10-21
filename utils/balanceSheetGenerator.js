const generateBalanceSheet = (expenses) => {
    // Example logic to generate a CSV string for balance sheet
    let csvContent = 'Description,Amount,Owed By\n';
    
    expenses.forEach(expense => {
       csvContent += `${expense.description},${expense.amount},${expense.participants.map(p => `${p.user}: ${p.amountOwed}`).join('; ')}\n`;
    });
 
    return csvContent;
 };
 
 module.exports = { generateBalanceSheet };
 