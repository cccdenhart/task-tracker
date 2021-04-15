defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :duration, :integer
    field :is_complete, :boolean, default: false
    field :title, :string
    field :username, :string
    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :username, :duration, :is_complete, :user_id])
    |> unique_constraint(:title)
    |> validate_required([:title, :description, :username, :user_id])
  end
end
