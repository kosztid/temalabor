using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    interface ICardRepository
    {
        Card? FindById(int id);
        ICollection<Card?> GetAll();
        int Update(Card card);
        void Insert(Card card);
        void Delete(int id);
    }
}
