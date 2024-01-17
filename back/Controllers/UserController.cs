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
    }
}