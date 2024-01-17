using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto;
using back.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }

        private async Task<bool> UserExists(string Username)
        {
            return await _context.User.AnyAsync(x => x.Username == Username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> login(UserLoginInputDto input)
        {
            var account = await _context.User.SingleOrDefaultAsync(x => x.Username == input.Username);
            if (account == null) return Unauthorized("tk cua anh ko ton tai, thu lai nhe!");
            if (input.Password != account.Password) return Unauthorized("Sai mk r onii-chan!");
            if (account.IsActive != true) return Unauthorized("tk cua onii-chan chua dc kick hoat, lien he admin duriu de kick hoat nhe!");
            else return Ok(new { currentUser = account.Username});
        }
    }
}