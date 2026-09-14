class Api::V1::AddressesController < Api::V1::BaseController
    # GET /api/v1/addresses
    def index
        addresses = current_user.addresses
        render json: addresses, each_serializer: AddressSerializer, status: :ok
    end

    # POST /api/v1/addresses
    def create
        address = current_user.addresses.new(address_params)
        address.save!
        render json: address, serializer: AddressSerializer, status: :created
    end

    # PUT /api/v1/addresses/:id
    def update
        address = current_user.addresses.find(params[:id])
        address.update!(address_params)
        render json: address, serializer: AddressSerializer, status: :ok
    end

    # DELETE /api/v1/addresses/:id
    def destroy
        address = current_user.addresses.find(params[:id])
        address.destroy!
        head :no_content
    end

    private

    def address_params
        params.require(:address).permit(:street, :city, :state, :zip, :country)
    end
end