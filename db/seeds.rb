Category.find_or_create_by(name: "Leasing", color: "#F06292")
Category.find_or_create_by(name: "Credit Card", color: "#5C6BC0")
Category.find_or_create_by(name: "Subscription", color: "#9CCC65")

Expense.find_or_create_by(name: "Car", category_id: 1, amount: 1200)
Expense.find_or_create_by(name: "TV", category_id: 2, amount: 400)
Expense.find_or_create_by(name: "Music", category_id: 3, amount: 12)
