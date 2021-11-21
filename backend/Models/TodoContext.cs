using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null) return;
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TodoItem>().ToTable("Todos");
            modelBuilder.Entity<Column>().ToTable("Columns");
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Column> Columns { get; set; }
    }

}
