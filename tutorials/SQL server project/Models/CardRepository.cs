using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication4.Data;

namespace WebApplication4.Models
{
    public class CardRepository : ICardRepository
    {
        private ProjectDbContext db;

        public CardRepository(ProjectDbContext db)
        {
            this.db = db;
        }
        public void Delete(int id)
        {
            var qDelete = db.Cards.Where(c => c.ID == id).SingleOrDefault();
            if (qDelete == null)
                return;
            int position = qDelete.Position;
            db.Cards.Remove(qDelete);
            foreach(var c in db.Cards)
            {
                if (c.Position > position)
                    c.Position--;
            }
            db.SaveChanges();
        }

        public Card FindById(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<Card> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Insert(Card card)
        {
          if (card == null) return;
          db.Cards.Add(card);
            /*
            var cardcolumn = card.ColumnID;
            var position = card.Position;

            */
            
        }

        public int Update(Card card)
        {
            throw new NotImplementedException();
        }
    }
}
