# Export transaction history to CSV
import csv
def export_finance_data(transactions, path='finance_export.csv'):
    with open(path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['User', 'Amount', 'Date', 'Status'])
        for t in transactions:
            writer.writerow([t.user, t.amount, t.date, t.status])
    return path