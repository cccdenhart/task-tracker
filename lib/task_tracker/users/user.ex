defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :is_manager, :boolean, default: false
    field :manager, :string
    field :password_hash, :string

    has_many :tasks, TaskTracker.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :is_manager, :manager])
    |> unique_constraint(:email)
    |> validate_required([:email, :password_hash, :is_manager])
  end
end
