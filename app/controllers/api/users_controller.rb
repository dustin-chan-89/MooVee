class Api::UsersController < ApplicationController
	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
				sign_in(@user)
				render json: @user
		else
			render json: @user.errors.full_messages[0], status: 401
		end 
	end

	def index
		@users = User.all
		render json: @users
	end

	def show
		@user = User.find(params[:id])
		render json: @user
	end

	private
	def user_params
		params.require(:user).permit(:password, :username, :id)
	end
end
