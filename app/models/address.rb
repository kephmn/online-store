class Address < ApplicationRecord
    # Associations
    belongs_to :user
    
    # Validations
    validates :street, :city, :state, :zip, :country, presence: true
end