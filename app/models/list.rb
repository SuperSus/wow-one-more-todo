# frozen_string_literal: true

class List < ApplicationRecord
  has_many :list_items
  has_many :items, through: :list_items
end
