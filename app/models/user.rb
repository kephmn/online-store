class User < ApplicationRecord
  
  extend Devise::Models

  # Devise modules: database_authenticatable, registerable, recoverable, rememberable, validatable
  # Also use :jwt_authenticatable with revocation strategy
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: :JwtDenylist

  # Enum for role: 0 => customer, 1 => admin
  enum :role, { customer: 0, admin: 1 }

  # Associations
  has_many :carts, dependent: :destroy           # User can have multiple carts (but usually one active)
  has_many :orders, dependent: :destroy          # User's placed orders
  has_many :addresses, dependent: :destroy       # User's shipping addresses

  # Validations
  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  # Helper to get the current active cart (or create one)
  def current_cart
    # Find an active cart or build a new one with status 'active'
    carts.find_or_create_by(status: :active)
  end
end