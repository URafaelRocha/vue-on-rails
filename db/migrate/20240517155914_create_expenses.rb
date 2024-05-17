class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses do |t|
      t.string :name
      t.decimal :amount
      t.references :category, null: false, foreign_key: true

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :expenses, :deleted_at
  end
end
