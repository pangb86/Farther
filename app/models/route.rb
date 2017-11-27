# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  polyline   :string           not null
#  distance   :float            not null
#  elevation  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
  validates :title, :polyline, :distance, :elevation , presence: true
  validates :title, uniqueness: true

  belongs_to :user
end
