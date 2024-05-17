class CreateCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :color

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :categories, :deleted_at
  end
end
