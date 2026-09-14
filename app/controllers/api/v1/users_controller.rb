class Api::V1::UsersController < Api::V1::BaseController
    # GET /api/v1/users/me
    def me
        render json: current_user, serializer: UserSerializer, status: :ok
    end
end