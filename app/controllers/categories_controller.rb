class CategoriesController < ApplicationController
  before_action :set_category, only: %i[ update destroy ]

  # GET /categories
  def index
    @categories = Category.all

    render inertia: "categories/index", props: {
      categories: @categories
    }
  end

  # GET /categories api
  def all
    @categories = Category.all

    if @categories
      render json: @categories, status: :ok
    else
      render json: @categories.errors, status: :unprocessable_entity
    end
  end

  # POST /categories
  def create
    @category = Category.new(category_params)
  
    if @category.save
      render json: @category, notice: "Category was successfully created.", status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category, notice: "Category was successfully updated.", status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    if @category.destroy!
      head :no_content
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name, :color)
    end
end
