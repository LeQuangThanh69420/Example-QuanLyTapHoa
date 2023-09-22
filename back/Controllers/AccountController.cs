using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto.Account;
using back.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        private async Task<bool> UserExists(string Username)
        {
            return await _context.Account.AnyAsync(x => x.Username == Username.ToLower());
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> register(AccountRegisterInputDto input)
        {
            if (await UserExists(input.Username))
            {
                return BadRequest("Ten tai khoan da co nguoi dung.");
            }
            var newAccount = new Account();
            newAccount.Username = input.Username.ToLower();
            newAccount.Password = input.Password;
            newAccount.IsActive = false;
            _context.Account.Add(newAccount);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Tao tk thanh cong, lien he sep de kick hoat!" });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> login(AccountLoginInputDto input)
        {
            var account = await _context.Account.SingleOrDefaultAsync(x => x.Username == input.Username);
            if (account == null) return Unauthorized("tk cua anh ko ton tai, thu lai nhe!");
            if (input.Password != account.Password) return Unauthorized("Sai mk r onii-chan!");
            if (account.IsActive != true) return Unauthorized("tk cua onii-chan chua dc kick hoat, lien he admin duriu de kick hoat nhe!");
            else return Ok(new { currentUser = account.Username});
        }
    }
}