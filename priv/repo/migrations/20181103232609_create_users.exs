defmodule TaskTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :is_manager, :boolean, default: false, null: false
      add :manager, :string

      timestamps()
    end

    create index(:users, [:email], unique: true)
  end
end
