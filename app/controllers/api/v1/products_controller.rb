class Api::V1::ProductsController < Api::V1::BaseController
    # Allow public (unauthenticated) access to index and show
    skip_before_action :authenticate_user!, only: [:index, :show]

    # GET /api/v1/products
    def index
        # Fetch all products, optionally filter by category
        products = Product.all
        products = products.where(category_id: params[:category_id]) if params[:category_id].present?
        # Render with serializer
        render json: products, each_serializer: ProductSerializer, status: :ok
    end

    # GET /api/v1/products/:id
    def show
        product = Product.find(params[:id])
        render json: product, serializer: ProductSerializer, status: :ok
    end

    # POST /api/v1/products (admin only)
    def create
        # Ensure user is admin
        authorize_admin!
        product = Product.new(product_params)
        product.save!
        render json: product, serializer: ProductSerializer, status: :created
    end

    # PUT /api/v1/products/:id
    def update
        authorize_admin!
        product = Product.find(params[:id])
        product.update!(product_params)
        render json: product, serializer: ProductSerializer, status: :ok
    end

    # DELETE /api/v1/products/:id
    def destroy
        authorize_admin!
        product = Product.find(params[:id])
        product.destroy!
        head :no_content
    end

    private

    def product_params
        params.require(:product).permit(:name, :description, :price, :category_id)
    end

    def authorize_admin!
        # Check if current_user is admin; if not, return 403
        unless current_user.admin?
            render json: { error: 'Forbidden' }, status: :forbidden
            return
        end
    end
end