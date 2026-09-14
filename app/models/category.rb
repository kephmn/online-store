class Category < ApplicationRecord
    # A category can have many products; if category deleted, set products' category to NULL
    has_many :products, dependent: :nullify

    # validations
    validates :name, presence: true, uniqueness: true
end