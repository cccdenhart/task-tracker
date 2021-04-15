defmodule TaskTracker.TasksTest do
  use TaskTracker.DataCase

  alias TaskTracker.Tasks

  describe "tasks" do
    alias TaskTracker.Tasks.Task

    @valid_attrs %{description: "some description", duration: 42, is_complete: true, title: "some title", username: "some username"}
    @update_attrs %{description: "some updated description", duration: 43, is_complete: false, title: "some updated title", username: "some updated username"}
    @invalid_attrs %{description: nil, duration: nil, is_complete: nil, title: nil, username: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.description == "some description"
      assert task.duration == 42
      assert task.is_complete == true
      assert task.title == "some title"
      assert task.username == "some username"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Tasks.update_task(task, @update_attrs)

      
      assert task.description == "some updated description"
      assert task.duration == 43
      assert task.is_complete == false
      assert task.title == "some updated title"
      assert task.username == "some updated username"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
