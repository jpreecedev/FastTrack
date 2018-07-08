using System.Threading.Tasks;
using FastTrack.Core.Domain;
using FastTrack.Core.DTO;
using FastTrack.Core.DTO.User;
using FastTrack.Core.Interfaces;
using FastTrack.Core.Repositories;
using Microsoft.AspNetCore.Identity;

namespace FastTrack.Core.Services
{
    public class AccountService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;

        public AccountService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task SignOut()
        {
            return _userRepository.SignOutAsync();
        }

        public async Task<IdentityResult> CreateAsync(RegisterUserDTO userDto, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userDto.UserName,
                Email = userDto.Email
            };

            return await _userRepository.CreateAsync(user, password);
        }

        public async Task<UserDTO> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            return UserDTO.From(user);
        }

        public async Task<UserDTO> GetUserByIdAsync(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            return UserDTO.From(user);
        }

        public async Task<SignInResult> SignInAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            return await _userRepository.SignInAsync(user, password);
        }
    }
}