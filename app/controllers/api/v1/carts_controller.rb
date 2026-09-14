class Api::V1::CartsController < Api::V1::BaseController
    # GET /api/v1/cart - show current cart
    def show
        cart = current_user.current_cart
        render json: cart, serializer: CartSerializer, status: :ok
    end

      # POST /api/v1/cart/add_item - add product to cart
    def add_item
        cart = current_user.current_cart
        product = Product.find(params[:product_id])
        # Find existing cart_item or build new
        cart_item = cart.cart_items.find_or_initialize_by(product: product)
        # Increment quantity by provided amount (default 1)
        cart_item.quantity = (cart_item.quantity || 0) + params[:quantity].to_i
        cart_item.save!
        render json: cart, serializer: CartSerializer, status: :ok
    end

      # DELETE /api/v1/cart/remove_item - remove product from cart
    def remove_item
        cart = current_user.current_cart
        cart_item = cart.cart_items.find_by(product_id: params[:product_id])
        if cart_item
          cart_item.destroy!
          render json: cart, serializer: CartSerializer, status: :ok
        else
          render json: { error: 'Product not in cart' }, status: :not_found
        end
    end

      # PUT /api/v1/cart/update_item - update quantity of a cart item
    def update_item
        cart = current_user.current_cart
        cart_item = cart.cart_items.find_by(product_id: params[:product_id])
        if cart_item
          cart_item.update!(quantity: params[:quantity])
          render json: cart, serializer: CartSerializer, status: :ok
        else
          render json: { error: 'Product not in cart' }, status: :not_found
        end
    end

      # DELETE /api/v1/cart/clear - remove all items from cart
    def clear
        cart = current_user.current_cart
        cart.cart_items.destroy_all
        render json: { message: 'Cart cleared' }, status: :ok
    end

      # POST /api/v1/cart/checkout - convert cart to order
    def checkout
        cart = current_user.current_cart
        # Check if cart has items
        if cart.cart_items.empty?
          render json: { error: 'Cart is empty' }, status: :unprocessable_entity
          return
        end
        # Validate address_id parameter
        address = current_user.addresses.find(params[:address_id])
        order = cart.checkout(address_id: address.id)
        render json: order, serializer: OrderSerializer, status: :created
    end
end