# == Schema Information
#
# Table name: workouts
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  duration    :integer          not null
#  speed       :float            not null
#  user_id     :integer          not null
#  route_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Workout < ApplicationRecord
  validates :title, :description, :duration, :speed, presence:true
  validates :title, uniqueness: true

  belongs_to :user

  belongs_to :route
end
