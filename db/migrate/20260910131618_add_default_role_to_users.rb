class AddDefaultRoleToUsers < ActiveRecord::Migration[8.1]
  def up
    change_column_default :users, :role, from: nil, to: 0
    User.where(role: nil).update_all(role: 0)
  end

  def down
    change_column_default :users, :role, from: 0, to: nil
  end
end
