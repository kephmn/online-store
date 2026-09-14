class Api::V1::SessionsController < Devise::SessionsController

    skip_before_action :verify_signed_out_user, only: [:destroy]
    before_action :authenticate_user!, only: [:me]

    # API-only: there is no login form to render, so disable Devise's
    # default `new` action entirely rather than let it crash on
    # sign_in_params (which requires :user on every call, including this one).
    def new
        render json: { error: 'Not Found' }, status: :not_found
    end

    # Override create to respond with JSON including token
    def create
        # Authenticate user using Warden
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource, store: false)
        # Devise JWT automatically generates token; retrieve from request env
        token = request.env['warden-jwt_auth.token']
        render json: {
            user: UserSerializer.new(resource),
            token: token
        }, status: :created
    end

    def me
        render json: current_user, serializer: UserSerializer, status: :ok
    end

    # Override destroy to sign out and revoke token
    def destroy
        sign_out(resource_name)
        render json: { message: 'Signed out'}, status: :ok
    end

    private

    # Permit sign-in parameters
    def sign_in_params
        params.require(:user).permit(:email, :password)
    end
end