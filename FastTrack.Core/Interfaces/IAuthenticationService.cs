using System.Threading.Tasks;
using FastTrack.Core.DTO;
using FastTrack.Core.DTO.User;
using Microsoft.AspNetCore.Identity;

namespace FastTrack.Core.Interfaces
{
    public interface IAuthenticationService
    {
        Task SignOut();
        Task<IdentityResult> CreateAsync(RegisterUserDTO user, string password);
        Task<SignInResult> SignInAsync(string email, string password);
        Task<UserDTO> GetUserByEmailAsync(string email);
        Task<UserDTO> GetUserByIdAsync(string email);
    }
}