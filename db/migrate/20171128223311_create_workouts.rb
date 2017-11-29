class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :duration, null: false
      t.float :speed, null: false
      t.integer :user_id, null: false
      t.integer :route_id, null: false

      t.timestamps
    end

    add_index :workouts, :user_id
    add_index :workouts, :route_id
  end
end
