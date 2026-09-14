class AddAddressForeignKeyToOrders < ActiveRecord::Migration[8.1]
  def change
    add_foreign_key :orders, :addresses
  end
end
