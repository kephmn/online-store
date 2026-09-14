class Api::V1::OrdersController < Api::V1::BaseController
    # GET /api/v1/orders - list user's orders
    def index
        orders = current_user.orders.order(created_at: :desc)
        render json: orders, each_serializer: OrderSerializer, status: :ok
    end

    # GET /api/v1/orders/:id - show a specific order
    def show
        order = current_user.orders.find(params[:id])
        render json: order, serializer: OrderSerializer, status: :ok
    end

    # POST /api/v1/orders/:id/pay - payment simulation
    def pay
        order = current_user.orders.find(params[:id])
        if order.pending?
            order.update!(status: :paid)
            render json: order, serializer: OrderSerializer, status: :ok
        else
            render json: { error: 'Order cannot be paid' }, status: :unprocessable_entity
        end
    end
end