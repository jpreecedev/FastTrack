using System.Threading.Tasks;
using FastTrack.Core.Domain;
using Microsoft.AspNetCore.Identity;

namespace FastTrack.Core.Repositories
{
    public interface IUserRepository
    {
        Task<ApplicationUser> GetByEmailAsync(string email);
        Task<ApplicationUser> GetByIdAsync(string id);
        Task<IdentityResult> CreateAsync(ApplicationUser applicationUser, string password);
        Task<IdentityResult> UpdateAsync(ApplicationUser applicationUser);
        Task<IdentityResult> DeleteAsync(ApplicationUser applicationUser);
        Task<SignInResult> SignInAsync(ApplicationUser applicationUser, string password);
        Task SignOutAsync();
    }
}