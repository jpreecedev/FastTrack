using System.Threading.Tasks;
using FastTrack.Core.Domain;
using FastTrack.Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FastTrack.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserRepository(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<ApplicationUser> GetByEmailAsync(string email)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<IdentityResult> CreateAsync(ApplicationUser applicationUser, string password)
        {
            return _userManager.CreateAsync(applicationUser, password);
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUser applicationUser)
        {
            return await _userManager.DeleteAsync(applicationUser);
        }

        public async Task<SignInResult> SignInAsync(ApplicationUser applicationUser, string password)
        {
            return await _signInManager.PasswordSignInAsync(applicationUser, password, false, false);
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task SignOut()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser applicationUser)
        {
            return await _userManager.UpdateAsync(applicationUser);
        }
    }
}