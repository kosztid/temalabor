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
    public class DeleteModel : PageModel
    {
        private readonly WebApplication4.Data.ProjectDbContext _context;

        public DeleteModel(WebApplication4.Data.ProjectDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Column Column { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Column = await _context.Column.FirstOrDefaultAsync(m => m.ID == id);

            if (Column == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Column = await _context.Column.FindAsync(id);

            if (Column != null)
            {
                _context.Column.Remove(Column);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
