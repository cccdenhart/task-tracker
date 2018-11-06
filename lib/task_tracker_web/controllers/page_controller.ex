defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    tasks = TaskTracker.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :description, :duration, :is_complete, :username])))
    render conn, "index.html", tasks: tasks
  end
end
