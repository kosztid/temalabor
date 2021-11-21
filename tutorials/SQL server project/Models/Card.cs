using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class Card
    {
        public int ID { get; set; }
        public int ColumnID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public int Position { get; set; }
        public Column Column { get; set; }
        //public DateTime EnrollmentDate { get; set; }

    }
}
