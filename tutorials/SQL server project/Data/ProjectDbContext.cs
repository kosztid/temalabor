using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Models;

namespace WebApplication4.Data
{
    public class ProjectDbContext : DbContext
    {
        public ProjectDbContext (DbContextOptions<ProjectDbContext> options)
            : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Column> Columns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null) return;
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Card>().ToTable("Cards");
            modelBuilder.Entity<Column>().ToTable("Columns");

            modelBuilder.Entity<Column>().HasMany(column => column.Cards).WithOne();
            modelBuilder.Entity<Card>().HasOne(todo => todo.Column).WithMany(column => column.Cards);
        }
        public DbSet<WebApplication4.Models.Column> Column { get; set; }
    }
}
