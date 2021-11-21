using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class Column
    {

        public int ID { get; set; }
        public ICollection<Card> Cards { get; set; }

    }
}
