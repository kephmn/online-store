class Api::V1::BaseController < ActionController::API
  # Standard Devise helpers (provide authenticate_user!, current_user, etc.)
  include Devise::Controllers::Helpers

  # Require authentication for all endpoints unless skipped
  before_action :authenticate_user!

  # Exception handling
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private

  def render_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end