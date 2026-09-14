class Api::V1::CategoriesController < Api::V1::BaseController
    # Allow public (unauthenticated) access to list categories and show a single category
    skip_before_action :authenticate_user!, only: [:index, :show]

    # GET /api/v1/categories
    # Returns a list of all categories (for dropdowns or filtering)
    def index
        categories = Category.all
        render json: categories, each_serializer: CategorySerializer, status: :ok
    end

    # GET /api/v1/categories/:id
    # Returns details of a single category by ID
    def show
        category = Category.find(params[:id])
        render json: category, serializer: CategorySerializer, status: :ok
    end
end