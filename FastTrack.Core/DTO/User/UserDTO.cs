using System.ComponentModel.DataAnnotations;
using FastTrack.Core.Domain;

namespace FastTrack.Core.DTO.User
{
    public class UserDTO
    {
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public static UserDTO From(ApplicationUser user)
        {
            return new UserDTO
            {
                UserName = user.UserName,
                Email = user.Email,
                Id = user.Id
            };
        }
    }
}