# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  polyline   :text             not null
#  distance   :float            not null
#  elevation  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
  validates :title, :polyline, :distance, :elevation , presence: true
  validates :title, uniqueness: true

  # Change so that one user can't have routes with the same title
  # but different users can have a route with the same title

  belongs_to :user

  has_many :workouts
end
