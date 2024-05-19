class ExpensesController < ApplicationController
  before_action :set_expense, only: %i[ update destroy ]

  # GET /expenses
  def index
    @expenses = Expense.includes(:category).all.map do |expense|
      expense.attributes.merge(category: expense.category.attributes)
    end
  
    render inertia: "expenses/index", props: {
      expenses: @expenses
    }
  end

  # GET /expenses api
  def all
    @expenses = Expense.includes(:category).all.map do |expense|
      expense.attributes.merge(category: expense.category.attributes)
    end

    if @expenses.present?
      render json: @expenses, status: :ok
    else
      render json: { error: "No Expenses found" }, status: :not_found
    end
  end

  # POST /expenses
  def create
    @expense = Expense.new(expense_params)
  
    if @expense.save
      render json: @expense, notice: "Expense was successfully created.", status: :created
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /expenses/1
  def update
    if @expense.update(expense_params)
      render json: @expense, notice: "Expense was successfully updated.", status: :ok
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/1
  def destroy
    if @expense.destroy!
      head :no_content
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def expense_params
      params.require(:expense).permit(:name, :amount, :category_id)
    end
end
