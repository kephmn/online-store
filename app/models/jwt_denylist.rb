class JwtDenylist < ApplicationRecord
    include Devise::JWT::RevocationStrategies::Denylist

    self.table_name = 'jwt_denylist' # Use the table we created
end
