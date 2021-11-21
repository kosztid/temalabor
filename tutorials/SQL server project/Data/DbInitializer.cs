using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication4.Models;

namespace WebApplication4.Data
{
    public class DbInitializer
    {

        public static void Initialize(ProjectDbContext context)
        {
            if (context == null)
                return;
            context.Database.EnsureCreated();



            if (context.Columns.Any())
                return;

            var columns = new Column[]
            {
            new Column{},
            new Column{},
            };
            context.Columns.AddRange(columns);
            context.SaveChanges();

            if (context.Cards.Any())
                return;

            var cards = new Card[]
            {
            new Card{ColumnID=columns[0].ID,Name="Feladat1",Description=" Ez az első feladat",Position=0},
            new Card{ColumnID=columns[0].ID,Name="Feladat2",Description=" Ez az első feladat",Position=1},
            new Card{ColumnID=columns[1].ID,Name="Feladat1",Description=" Ez az első feladat",Position=0},
            new Card{ColumnID=columns[1].ID,Name="Feladat2",Description=" Ez az első feladat",Position=1},
            };
            context.Cards.AddRange(cards);
            context.SaveChanges();

        }

    }
}
