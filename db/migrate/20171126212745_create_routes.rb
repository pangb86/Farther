class CreateRoutes < ActiveRecord::Migration[5.1]
  def change
    create_table :routes do |t|
      t.string :title, null: false
      t.text :polyline, null: false
      t.float :distance, null: false
      t.integer :elevation, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :routes, :user_id
  end
end
