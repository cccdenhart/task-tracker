# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTracker.Repo
alias TaskTracker.Users.User
alias TaskTracker.Users

pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "charlie@example.com", password_hash: pwhash})

alias TaskTracker.Tasks.Task
Repo.insert!(%Task{title: "homework", description: "due friday", username: "alice@example.com", user_id: Users.get_user_by_email("alice@example.com").id})
Repo.insert!(%Task{title: "red sox", description: "playing the yankees", username: "bob@example.com", user_id: Users.get_user_by_email("bob@example.com").id})
Repo.insert!(%Task{title: "example", description: "example description", username: "alice@example.com", user_id: Users.get_user_by_email("alice@example.com").id})
Repo.insert!(%Task{title: "testing", description: "testing description", username: "charlie@example.com", user_id: Users.get_user_by_email("charlie@example.com").id})
Repo.insert!(%Task{title: "music", description: "music description", username: "bob@example.com", user_id: Users.get_user_by_email("bob@example.com").id})
Repo.insert!(%Task{title: "movie", description: "movie description", username: "alice@example.com", user_id: Users.get_user_by_email("alice@example.com").id})
Repo.insert!(%Task{title: "elixir", description: "elixir description", username: "charlie@example.com", user_id: Users.get_user_by_email("charlie@example.com").id})
