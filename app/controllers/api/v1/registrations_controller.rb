class Api::V1::RegistrationsController < Devise::RegistrationsController
    # Override create to respond with JSON and JWT token
    def create
        build_resource(sign_up_params)
        resource.save
        if resource.persisted?
            sign_in(resource_name, resource, store: false) # Skip session storage - JWT is stateless
            token = request.env['warden-jwt_auth.token'] # Get JWT from env
            render json: {
                user: UserSerializer.new(resource),
                token: token
            }, status: :created
        else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def sign_up_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end