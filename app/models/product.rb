class Product < ApplicationRecord
    # Associations
    belongs_to :category
    has_many :order_items, dependent: :restrict_with_exception # Prevent deletion if referenced in orders
    has_many :orders, through: :order_items

    # Validates
    validates :name, :description, :price, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 0 }

end