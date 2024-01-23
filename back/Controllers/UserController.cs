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

        [HttpPost("login")]
        public async Task<ActionResult<string>> login([FromBody] UserLoginInputDto input)
        {
            try
            {
                var user = await _context.User.SingleOrDefaultAsync(x => x.Username == input.Username);
                if (user == null) return Unauthorized(new { message = "Account does not exist!" });
                if (input.Password != user.Password) return Unauthorized(new { message = "Wrong Password!" });
                else return Ok(new { currentUser = user.Username });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }
    }
}