class Api::RoutesController < ApplicationController

  def index
    @user = current_user
    # @routes = @user.routes
    @routes = Route.all.where(user_id: @user.id)
    # Also works?
    # @routes = Route.all.where(user_id: user.id)
    render :index
  end

  def show
    @route = Route.find(params[:id])
    render :show
  end

  def create
    puts route_params
    @user = current_user
    @route = Route.new(route_params)
    @route.user_id = @user.id
    if @route.save
      render :show
    else
      render json: @route.errors.full_messages, status: 401
    end
  end

  def destroy
    @route = Route.find(params[:id])
    @route.destroy
    render :show
  end

  private

  def route_params
    params.require(:routes).permit(:title, :polyline, :distance, :elevation)
  end

end
