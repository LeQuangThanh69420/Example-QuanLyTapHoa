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
        public async Task<ActionResult<string>> login([FromBody] UserLoginInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(x => x.Username == input.Username);
            if (user == null) return Unauthorized(new {message = "Account does not exist!"});
            if (input.Password != user.Password) return Unauthorized(new {message = "Wrong Password!"});
            if (user.IsActive != true) return Unauthorized(new {message = "Account is unactived!"});
            else return Ok(new { currentUser = user.Username});
        }
    }
}