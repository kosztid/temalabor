using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    interface IColumnRepository
    {
        Column? FindById(int id);
        ICollection<Column?> GetAll();
        int Update(Column column);
        int Insert(Column column);
        bool Delete(int id);
    }
}
