using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.Models;

namespace WebApplication4.Pages.Columns
{
    public class IndexModel : PageModel
    {
        private readonly WebApplication4.Data.ProjectDbContext _context;

        public IndexModel(WebApplication4.Data.ProjectDbContext context)
        {
            _context = context;
        }

        public IList<Column> Column { get;set; }

        public async Task OnGetAsync()
        {
            Column = await _context.Column.ToListAsync();
        }
    }
}
