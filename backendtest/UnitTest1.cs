using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TodoApi.Controllers;
using TodoApi.Data;
using TodoApi.Models;
using Xunit;

namespace TestProject1
{
    public class UnitTest1
    {
     
        public UnitTest1()
        {
            context = new DbContextOptionsBuilder<TodoContext>()
            .UseSqlite("Data Source=TEST.db")
            .Options;

        }

        public DbContextOptions<TodoContext> context { get; }
     

        [Fact]
        public void TodotestPostTodo()
        {
            var db = new TodoContext(context);
            db.Database.EnsureDeleted();
            DbInitializer.Initialize(db);

            var Todoitems = new TodoItemsController(db);
            var todo =new TodoItem { ColumnID = 1, Name = "Feladat3", Description = " Ez a harmadik feladat" };

            Todoitems.PostTodoItem(todo);
            var item = Todoitems.GetTodoItem(5);
            Assert.Equal(5, item.Result.Value.Id);

        }

        [Fact]
        public void TodotestGetTodo()
        {
            var tcontext = new TodoContext(context);
            tcontext.Database.EnsureDeleted();
            DbInitializer.Initialize(tcontext);

            var Todoitems = new TodoItemsController(tcontext);

            var item = Todoitems.GetTodoItem(1);
            Assert.Equal(1,item.Result.Value.Id);

        }

        [Fact]
        public void TodotestDeleteTodo()
        {
            var tcontext = new TodoContext(context);
            tcontext.Database.EnsureDeleted();
            DbInitializer.Initialize(tcontext);

            var Todoitems = new TodoItemsController(tcontext);
            //törlés elõtt, id=1
            var item = Todoitems.GetTodoItem(1);
            Assert.Equal(item.Result.Value.Id, 1);
            Todoitems.DeleteTodoItem(1);

            //törlés megtörtént, így nullal tér vissza
            item = Todoitems.GetTodoItem(1);
            Assert.Null(item.Result.Value);
        }
    }
}
