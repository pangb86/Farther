class Api::WorkoutsController < ApplicationController

  def index
    @user = current_user
    @workouts = Workout.all.where(user_id: @user.id)
    render :index
  end

  def show
    @workout = Workout.find(params[:id])
    render :show
  end

  def create
    puts workout_params
    @user = current_user
    @workout = Workout.new(workout_params)
    @workout.user_id = @user.id
    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 400
    end
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update_attributes(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 400
    end
  end

  def destroy
    @workout = Workout.find(params[:id])
    @workout.destroy
    render :show
  end

  private

  def workout_params
    params.require(:workouts).permit(:title, :description, :duration, :speed, :route_id)
  end

end
