# frozen_string_literal: true

class ListItem < ApplicationRecord
  belongs_to :list
  belongs_to :item
end
