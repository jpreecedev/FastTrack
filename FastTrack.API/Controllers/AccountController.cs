using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FastTrack.API.ApiModels;
using FastTrack.API.Attributes;
using FastTrack.API.Helpers;
using FastTrack.Core.DTO.User;
using FastTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastTrack.API.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IJwtHelpers _jwt;

        public AccountController(IAuthenticationService authenticationService, IJwtHelpers jwt)
        {
            _authenticationService = authenticationService;
            _jwt = jwt;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerUser)
        {
            var result = await _authenticationService.CreateAsync(registerUser, registerUser.Password);

            if (result.Succeeded == true)
            {
                var user = await _authenticationService.GetUserByEmailAsync(registerUser.Email);
                return Ok(AuthenticationResponse(user));
            }

            return BadRequest(new BadRequestModel
            {
                Errors = result.Errors.Select(err => err.Description)
            });
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUser)
        {
            var result = await _authenticationService.SignInAsync(loginUser.Email, loginUser.Password);

            if (result.Succeeded)
            {
                var user = await _authenticationService.GetUserByEmailAsync(loginUser.Email);
                return Ok(AuthenticationResponse(user));
            }

            // Failed login attempt
            var errors = new List<string>();

            if (result.IsLockedOut) errors.Add("Your account is currently locked out due to too many failed login attempts, plese try again later.");

            if (result.IsNotAllowed) errors.Add("Your account has beed suspended.");

            if (errors.Count == 0) errors.Add("Email and password do not match,");

            return BadRequest(new BadRequestModel
            {
                Errors = errors
            });
        }

        [HttpGet("/api/[controller]/jwt")]
        [Authorize]
        public async Task<IActionResult> GetCurrentProfileFromJWT()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (currentUserId == null)
            {
                return BadRequest();
            }

            var user = await _authenticationService.GetUserByIdAsync(currentUserId);

            return Ok(AuthenticationResponse(user));
        }

        private AuthenticationResponseModel AuthenticationResponse(UserDTO userDto)
        {
            return new AuthenticationResponseModel
            {
                Profile = userDto,
                JWT = _jwt.GenerateTokenFromUser(userDto)
            };
        }
    }
}