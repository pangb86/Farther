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

require 'test_helper'

class RouteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
