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
alias TaskTracker.repo
alias TaskTracker.Users.User

pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", is_manager: true, password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", is_manager: false, password_hash: pwhash, manager: "alice@example.com"})
