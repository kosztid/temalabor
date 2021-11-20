using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class DbInitializer
    {

        public static void Initialize(TodoContext context)
        {
            if (context == null)
                return;
            context.Database.EnsureCreated();
            if (context.TodoItems.Any())
                return;

            if (context.Columns.Any())
                return;

            var columns = new Column[]
            {
            new Column{},
            new Column{},
            };
            context.Columns.AddRange(columns);
            context.SaveChanges();
            var cards = new TodoItem[]
            {
            new TodoItem{ColumnID=columns[0].ID,Name="Feladat1",Description=" Ez az első feladat"},
            new TodoItem{ColumnID=columns[0].ID,Name="Feladat2",Description=" Ez az első feladat"},
            new TodoItem{ColumnID=columns[1].ID,Name="Feladat1",Description=" Ez az első feladat"},
            new TodoItem{ColumnID=columns[1].ID,Name="Feladat2",Description=" Ez az első feladat"},
            };
            context.TodoItems.AddRange(cards);
            context.SaveChanges();

        }

    }
}
