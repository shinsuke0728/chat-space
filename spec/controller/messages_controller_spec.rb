require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  
  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index,params