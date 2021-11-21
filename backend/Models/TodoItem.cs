using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public int ColumnID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}