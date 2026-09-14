class CartItem < ApplicationRecord
    # Associations
    belongs_to :cart
    belongs_to :product

    # Validations
    validates :quantity, presence: true, numericality: { greater_than: 0 }
    # Ensure each product appears only once per cart
    validates :product_id, uniqueness: { scope: :cart_id, message: 'already in cart' }
end